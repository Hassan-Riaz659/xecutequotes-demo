<?php

namespace Tests\Feature;

use App\Client;
use App\ClientEmployee;
use App\Quote;
use App\Services\Authorization\RoutePolicy;
use App\Services\Quote\PlanPdfPrinter;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Passport;
use Tests\TestCase;

/**
 * Every API route that needs a signed-in user may only be used on that user's own
 * records (App\Services\Authorization\RoutePolicy). A record that belongs to someone
 * else is answered like one that does not exist.
 */
class AuthorizationTest extends TestCase
{
    use RefreshDatabase;

    private $owner;
    private $other;
    private $client;
    private $quote;
    private $employee;

    protected function setUp(): void
    {
        parent::setUp();

        $this->owner = factory(User::class)->create();
        $this->other = factory(User::class)->create();
        $this->client = factory(Client::class)->create(['user_id' => $this->owner->id]);
        $this->quote = factory(Quote::class)->create(['client_id' => $this->client->id, 'user_id' => $this->owner->id]);
        $this->employee = factory(ClientEmployee::class)->create(['client_id' => $this->client->id]);
        DB::table('quote_employees')->insert([
            'quote_id' => $this->quote->id,
            'client_id' => $this->client->id,
            'emp_id' => $this->employee->id,
        ]);
    }

    /** Replaces {user}, {client}, {quote} and {employee} in a route template. */
    private function uri($template, $ids = null)
    {
        $ids = $ids ?: [
            'user' => $this->owner->id, 'client' => $this->client->id,
            'quote' => $this->quote->id, 'employee' => $this->employee->id,
        ];

        return '/api/' . str_replace(
            ['{user}', '{client}', '{quote}', '{employee}'],
            [$ids['user'], $ids['client'], $ids['quote'], $ids['employee']],
            $template
        );
    }

    /** Routes that read or change one record of the owner. */
    public function recordRoutes()
    {
        return [
            'user data' => ['GET', 'fetch-user-data/{user}'],
            'client list' => ['GET', 'clients/{user}'],
            'previous quotes' => ['GET', 'previous-quotes/{user}'],
            'saved quotes' => ['GET', 'get-saved-quotes/{user}'],
            'last client' => ['GET', 'last-client-details/{user}'],
            'client details' => ['GET', 'client-details/{client}'],
            'client' => ['GET', 'client/{client}'],
            'census of a client' => ['GET', 'change-census/{client}'],
            'quote preview' => ['GET', 'quote-preview/{quote}'],
            'compared plans' => ['GET', 'see-compared-plans/{quote}'],
            'census member' => ['GET', 'edit-clientemployee/{employee}'],
            'delete a census member' => ['DELETE', 'delete-clientEmployees/{employee}'],
            'delete a quote' => ['DELETE', 'delete-Quote/{quote}'],
            'delete a client' => ['DELETE', 'delete-Client/{client}'],
            'empty a quote' => ['DELETE', 'empty-row/{quote}'],
        ];
    }

    /** @dataProvider recordRoutes */
    public function testAnotherBrokerGetsNotFoundForSomeoneElsesRecords($method, $template)
    {
        Passport::actingAs($this->other);

        $this->json($method, $this->uri($template))
            ->assertStatus(404)
            ->assertExactJson(['message' => 'Not Found.']);
    }

    public function testRefusedRequestsChangeNothing()
    {
        Passport::actingAs($this->other);

        foreach ($this->recordRoutes() as $route) {
            if ($route[0] === 'DELETE') {
                $this->json('DELETE', $this->uri($route[1]));
            }
        }

        $this->assertDatabaseHas('clients', ['id' => $this->client->id]);
        $this->assertDatabaseHas('quotes', ['id' => $this->quote->id]);
        $this->assertDatabaseHas('client_employees', ['id' => $this->employee->id, 'deleted_at' => null]);
        $this->assertDatabaseHas('quote_employees', ['quote_id' => $this->quote->id]);
    }

    public function testTheOwnerCanReadTheirOwnRecords()
    {
        Passport::actingAs($this->owner);

        foreach (['fetch-user-data/{user}', 'clients/{user}', 'previous-quotes/{user}', 'get-saved-quotes/{user}', 'last-client-details/{user}', 'client-details/{client}', 'client/{client}', 'change-census/{client}', 'edit-clientemployee/{employee}'] as $template) {
            $this->json('GET', $this->uri($template))->assertStatus(200);
        }
    }

    public function testAnAdministratorCanUseAnyonesRecords()
    {
        Passport::actingAs(factory(User::class)->states('admin')->create());

        foreach (['fetch-user-data/{user}', 'clients/{user}', 'client-details/{client}', 'change-census/{client}', 'edit-clientemployee/{employee}'] as $template) {
            $this->json('GET', $this->uri($template))->assertStatus(200);
        }
    }

    public function testAResponseIsTheSameForTheOwnerAndTheAdministrator()
    {
        Passport::actingAs($this->owner);
        $asOwner = $this->json('GET', $this->uri('client-details/{client}'))->getContent();

        Passport::actingAs(factory(User::class)->states('admin')->create());
        $asAdmin = $this->json('GET', $this->uri('client-details/{client}'))->getContent();

        $this->assertSame($asOwner, $asAdmin);
    }

    public function testARecordThatDoesNotExistIsAnsweredLikeSomeoneElsesRecord()
    {
        Passport::actingAs($this->other);

        $foreign = $this->json('GET', $this->uri('client-details/{client}'));
        $missing = $this->json('GET', $this->uri('client-details/{client}', ['user' => 1, 'client' => 99999999, 'quote' => 1, 'employee' => 1]));

        $this->assertSame($foreign->getStatusCode(), $missing->getStatusCode());
        $this->assertSame($foreign->getContent(), $missing->getContent());
    }

    public function testIdsInTheBodyAreChecked()
    {
        Passport::actingAs($this->other);
        $ownClient = factory(Client::class)->create(['user_id' => $this->other->id]);
        $ownQuote = factory(Quote::class)->create(['client_id' => $ownClient->id, 'user_id' => $this->other->id]);

        // another user's client in the body
        $this->json('PUT', '/api/assign-plan', ['client_id' => $this->client->id, 'plan_id' => 1])->assertStatus(404);
        // own client, someone else's quote
        $this->json('PUT', '/api/add-employee', ['client_id' => $ownClient->id, 'quote_id' => $this->quote->id, 'all_employees' => []])->assertStatus(404);
        // own client and quote, but a census member of someone else
        $this->json('PUT', '/api/add-employee', ['client_id' => $ownClient->id, 'quote_id' => $ownQuote->id, 'all_employees' => [['id' => $this->employee->id]]])->assertStatus(404);
        // someone else's user id
        $this->json('POST', '/api/info-update', ['user_id' => $this->owner->id, 'name' => 'renamed'])->assertStatus(404);
        $this->assertNotSame('renamed', User::find($this->owner->id)->name);
    }

    public function testBrokersAndAgentsCannotUseTheAdministratorRoutes()
    {
        Passport::actingAs($this->owner);
        $this->json('GET', '/api/get-users')->assertStatus(403);
        $this->json('POST', '/api/update-admin-password', ['id' => $this->owner->id, 'name' => 'x', 'password' => 'x'])->assertStatus(403);

        Passport::actingAs(factory(User::class)->states('agent')->create());
        $this->json('GET', '/api/get-users')->assertStatus(403);

        Passport::actingAs(factory(User::class)->states('admin')->create());
        $this->json('GET', '/api/get-users')->assertStatus(200);
    }

    public function testLicensedEmployeesCannotUseBillingOrAgentManagement()
    {
        $agent = factory(User::class)->states('agent')->create();
        Passport::actingAs($agent);

        $this->json('GET', "/api/check-license/{$agent->id}")->assertStatus(403);
        $this->json('GET', "/api/employees/{$agent->id}")->assertStatus(403);
        $this->json('POST', '/api/update-billing', ['user_id' => $agent->id, 'amount' => 1])->assertStatus(403);

        // a broker may use them on their own account
        Passport::actingAs($this->owner);
        $this->json('GET', "/api/check-license/{$this->owner->id}")->assertStatus(200);
        $this->json('GET', "/api/employees/{$this->owner->id}")->assertStatus(200);
    }

    public function testAnAgentWorksOnTheirOwnClientsOnly()
    {
        $agent = factory(User::class)->states('agent')->create();
        $client = factory(Client::class)->create(['user_id' => $agent->id]);
        factory(Quote::class)->create(['client_id' => $client->id, 'user_id' => $agent->id]);
        Passport::actingAs($agent);

        $this->json('GET', "/api/clients/{$agent->id}")->assertStatus(200);
        $this->json('GET', "/api/client-details/{$client->id}")->assertStatus(200);
        $this->json('GET', $this->uri('client-details/{client}'))->assertStatus(404);
    }

    public function testDuplicateClientChecksOnlySeeTheCallersOwnClients()
    {
        $name = rawurlencode($this->client->name);

        Passport::actingAs($this->owner);
        $this->assertTrue($this->json('GET', "/api/check-existing-client/$name")->json('status'));

        Passport::actingAs($this->other);
        $this->assertFalse($this->json('GET', "/api/check-existing-client/$name")->json('status'));
    }

    public function testAnonymousCallersAreRefusedFirst()
    {
        $this->json('GET', $this->uri('client-details/{client}'))->assertStatus(401);
        $this->json('GET', '/api/get-users')->assertStatus(401);
    }

    public function testEveryProtectedRouteHasAPolicyEntry()
    {
        $protected = [];
        foreach (app('router')->getRoutes() as $route) {
            if (strpos($route->uri(), 'api/') !== 0 || $route->uri() === 'api/user') {
                continue;
            }
            if (!in_array('auth:api', $route->gatherMiddleware(), true)) {
                continue;
            }
            $this->assertContains('ownership', $route->gatherMiddleware(), $route->uri() . ' has no ownership middleware');
            foreach ($route->methods() as $method) {
                if ($method !== 'HEAD') {
                    $protected[] = $method . ' ' . $route->uri();
                }
            }
        }

        $this->assertNotEmpty($protected);
        $this->assertSame([], array_values(array_diff($protected, RoutePolicy::keys())), 'routes without a policy entry');
        $this->assertSame([], array_values(array_diff(RoutePolicy::keys(), $protected)), 'policy entries without a route');
    }

    public function testARouteWithoutAPolicyEntryIsRefused()
    {
        $decision = RoutePolicy::decide($this->owner, Request::create('/api/a-route-nobody-wrote-a-rule-for', 'GET'));

        $this->assertFalse($decision['allow']);
    }

    public function testOneTimeTokensAreNeverSerialized()
    {
        $user = factory(User::class)->create([
            'verify_code' => 'v', 'email_verification_code' => 'e', 'reset_password_token' => 'r', 'create_password_token' => 'c',
        ]);

        $json = $user->fresh()->toArray();

        foreach (['verify_code', 'email_verification_code', 'reset_password_token', 'create_password_token', 'password', 'remember_token'] as $field) {
            $this->assertArrayNotHasKey($field, $json);
        }
        $this->assertSame('r', $user->fresh()->reset_password_token);
    }

    public function testPdfFileNamesCannotLeaveTheirFolder()
    {
        $this->assertSame('Rio Grande Dental Group7', PlanPdfPrinter::fileName('Rio Grande Dental Group', 7));

        foreach (['../../etc/passwd', '..\\..\\windows', 'a/b/c', "x\0y", 'x?y#z', '....'] as $hostile) {
            $name = PlanPdfPrinter::fileName($hostile, 9);

            $this->assertNotRegExp('#[/\\\\:\0?\#]#', $name);
            $this->assertStringNotContainsString('..', $name);
            $this->assertNotSame('.', substr($name, 0, 1));
        }
    }
}
