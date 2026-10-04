<?php

namespace App\Services\Authorization;

use App\Client;
use App\ClientEmployee;
use App\LicensedEmployee;
use App\Quote;
use App\QuotePlan;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

/**
 * Who may call which API route, and on which records.
 *
 * Every API route that needs a signed-in user has one entry in table(). An entry
 * names the roles that may use the route and the records the request points at
 * (by id, in the path, the query string or the JSON body). Those records must
 * belong to the caller: an id that belongs to someone else is answered exactly
 * like an id that does not exist (404), so no one can probe for other people's
 * data. Administrators (role 1) may use every route on any record.
 *
 * A route that has no entry is refused (fail closed), so a new route cannot be
 * forgotten: tests/ and the Phase 8 checks list every protected route and fail
 * if one is missing here.
 *
 * Ownership means:
 *   user         the id is the caller's own
 *   client       clients.user_id is the caller
 *   quote        quotes.user_id is the caller
 *   employee     a census member of one of the caller's clients
 *   quotePlan    quote_plans.user_id is the caller
 *   licensed     licensed_employees.broker_id is the caller (the broker's agents)
 *   codeOwner    the one-time code belongs to the caller
 *
 * Spec strings in an entry: "type=source" where the source is r.NAME (route
 * parameter) or i.PATH (request input, dot notation; "*" selects every element).
 * A "?" after the type skips the check when the value is empty, a "*" after the
 * type checks every value found.
 */
class RoutePolicy
{
    /** Any signed-in user (broker, administrator or licensed employee). */
    const ANY = 'any';

    /** Brokers and administrators; licensed employees (role 3) are refused. */
    const BROKER = 'broker';

    /** Administrators only. */
    const ADMIN = 'admin';

    const ROLE_ADMIN = 1;
    const ROLE_BROKER = 2;
    const ROLE_AGENT = 3;

    /**
     * Decides a request: ['allow' => bool, 'status' => 200|403|404].
     *
     * @param  \App\User|null  $user
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public static function decide($user, Request $request)
    {
        $entry = self::entryFor($request);
        if ($user === null || $entry === null) {
            return ['allow' => false, 'status' => 403];
        }

        if ((int) $user->role_id === self::ROLE_ADMIN) {
            return ['allow' => true, 'status' => 200];
        }

        if ($entry[0] === self::ADMIN) {
            return ['allow' => false, 'status' => 403];
        }
        if ($entry[0] === self::BROKER && (int) $user->role_id === self::ROLE_AGENT) {
            return ['allow' => false, 'status' => 403];
        }

        $specs = is_callable($entry[1]) ? call_user_func($entry[1], $request) : $entry[1];
        foreach ($specs as $spec) {
            if (!self::owns($user, $spec, $request)) {
                return ['allow' => false, 'status' => 404];
            }
        }

        return ['allow' => true, 'status' => 200];
    }

    /** The entry of a request's route, or null when the route has none. */
    public static function entryFor(Request $request)
    {
        $route = $request->route();
        if ($route === null) {
            return null;
        }

        return self::entry($request->getMethod(), $route->uri());
    }

    public static function entry($method, $uri)
    {
        $table = self::table();
        $key = strtoupper($method) . ' ' . rtrim($uri, '/');

        return isset($table[$key]) ? $table[$key] : null;
    }

    /** Every route key that has an entry (used by the tests). */
    public static function keys()
    {
        return array_keys(self::table());
    }

    /** True when the user owns what one spec string points at. */
    private static function owns($user, $spec, Request $request)
    {
        if (!preg_match('/^(\w+)([?*]?)=(r|i)\.(.+)$/', $spec, $m)) {
            return false;
        }
        list(, $type, $flag, $from, $path) = $m;

        if ($from === 'r') {
            $values = [$request->route($path)];
        } elseif ($flag === '*') {
            $values = Arr::flatten((array) data_get($request->all(), $path));
        } else {
            $values = [data_get($request->all(), $path)];
        }

        if ($flag === '*' && !$values) {
            return true;
        }

        foreach ($values as $value) {
            // "?" and "*" only check the ids that are there: forms send null, "" or 0 for "no id yet"
            // (a new census member, a new licensed employee).
            if ($flag !== '' && ($value === null || $value === '' || $value === 0 || $value === '0')) {
                continue;
            }
            if (!self::ownsOne($user, $type, $value)) {
                return false;
            }
        }

        return true;
    }

    private static function ownsOne($user, $type, $value)
    {
        if ($type === 'codeOwner') {
            return is_scalar($value) && (string) $value !== ''
                && (int) User::where('email_verification_code', (string) $value)->value('id') === (int) $user->id;
        }

        if (!is_scalar($value) || !preg_match('/^\d{1,18}$/', (string) $value)) {
            return false;
        }
        $id = (int) $value;

        switch ($type) {
            case 'user':
                return $id === (int) $user->id;
            case 'client':
                return Client::where('id', $id)->where('user_id', $user->id)->exists();
            case 'quote':
                return Quote::where('id', $id)->where('user_id', $user->id)->exists();
            case 'employee':
                return ClientEmployee::where('id', $id)
                    ->whereIn('client_id', Client::where('user_id', $user->id)->select('id'))->exists();
            case 'quotePlan':
                return QuotePlan::where('id', $id)->where('user_id', $user->id)->exists();
            case 'licensed':
                return LicensedEmployee::where('id', $id)->where('broker_id', $user->id)->exists();
        }

        return false;
    }

    /**
     * The policy: "METHOD uri" => [role, specs]. `specs` is a list of spec
     * strings, or a function of the request that returns one.
     */
    private static function table()
    {
        $any = self::ANY;
        $broker = self::BROKER;
        $admin = self::ADMIN;

        return [
            // ---- account (the caller's own profile and password)
            'POST api/password-update' => [$any, ['user=i.user_id']],
            'POST api/email-update' => [$any, ['user=i.user_id']],
            'POST api/email-code' => [$any, ['user=i.user_id']],
            'POST api/info-update' => [$any, ['user=i.user_id']],
            'POST api/verify-code' => [$any, ['codeOwner=i.code']],
            'GET api/fetch-user-data/{id}' => [$any, ['user=r.id']],
            'GET api/get-user/{id}' => [$any, ['user=r.id']],
            'DELETE api/delete-logo/{id}' => [$any, ['user=r.id']],
            'DELETE api/delete-profile-img/{id}' => [$any, ['user=r.id']],

            // ---- administration
            'GET api/get-users' => [$admin, []],
            'POST api/update-admin-password' => [$admin, []],
            'POST api/add-company' => [$admin, []],

            // ---- clients and census
            'GET api/check-existing-client/{name}' => [$any, []],   // answers only about the caller's own clients (ClientController)
            'GET api/clients/{id}' => [$any, ['user=r.id']],
            'PUT api/add-client' => [$any, ['user=i.userid', 'client?=i.clientId']],
            'PUT api/add-employee' => [$any, ['client=i.client_id', 'quote=i.quote_id', 'employee*=i.all_employees.*.id']],
            'PUT api/update-client' => [$any, ['client=i.clientId', 'quote=i.quoteId']],
            'DELETE api/empty-row/{id}' => [$any, ['quote=r.id']],
            'GET api/change-census/{id}' => [$any, ['client=r.id']],
            'PUT api/add-census-employee' => [$any, ['client=i.client_id']],
            'POST api/delete-censusEmployees' => [$any, ['employee=i.id', 'quote=i.quote_id']],
            'GET api/get-date-census/{id}' => [$any, ['client=r.id']],
            'GET api/client/{id}' => [$any, ['client=r.id']],
            'GET api/client-details/{id}' => [$any, ['client=r.id']],
            'GET api/existing-client/{id}' => [$any, ['client=r.id']],
            'GET api/edit-clientemployee/{id}' => [$any, ['employee=r.id']],
            'POST api/update-client-employee' => [$any, ['employee=i.empId']],
            'DELETE api/delete-clientEmployees/{id}' => [$any, ['employee=r.id']],
            'DELETE api/delete-Client/{id}' => [$any, ['client=r.id']],
            'PUT api/check-credentials' => [$any, []],              // answers only about the caller's own clients (ClientController)

            // ---- quotes, plans, saved quotes
            'GET api/get-calculated-employees/{id}/{user_id}' => [$any, ['client=r.id', 'user=r.user_id']],
            'PUT api/filter-plans' => [$any, function (Request $request) {
                return $request->input('mode') === 'ReAssignPlan' ? ['quote=i.quote_id'] : ['client=i.id'];
            }],
            'PUT api/compare-plans' => [$any, function (Request $request) {
                $first = $request->input('0');

                return is_array($first) && !empty($first['recheckPlan'])
                    ? ['client=i.0.clientId', 'quote=i.0.quoteId']
                    : ['client=i.1'];
            }],
            'PUT api/save-quote' => [$any, ['user=i.user_id', 'client=i.client_id', 'quote=i.quote_id', 'quotePlan?=i.quote_plans_id']],
            'GET api/get-saved-quotes/{id}' => [$any, ['user=r.id']],
            'POST api/print-plans' => [$any, ['client=i.1']],
            'PUT api/remove-chosen-plans' => [$any, ['user=i.user_id', 'client=i.client_id', 'quote=i.quote_id']],
            'PUT api/assign-plan' => [$any, ['client=i.client_id']],
            'GET api/see-compared-plans/{id}' => [$any, ['quote=r.id']],
            'POST api/see-compared-plans-print' => [$any, ['quote=i.1']],
            'GET api/quote-preview/{id}' => [$any, ['quote=r.id']],
            'DELETE api/delete-Quote/{id}' => [$any, ['quote=r.id']],
            'GET api/reset-quote-plans/{id}/{quote_id}' => [$any, ['client=r.id', 'quote=r.quote_id']],
            'GET api/quotes/{id}' => [$any, ['user=r.id']],
            'GET api/previous-quotes/{id}' => [$any, ['user=r.id']],
            'GET api/quotes30Days/{id}' => [$any, ['user=r.id']],
            'GET api/totalquotes30Days/{id}' => [$any, ['user=r.id']],
            'GET api/last-client-details/{id}' => [$any, ['user=r.id']],

            // ---- reference data and legacy routes that touch no one's records
            'POST api/check-quote' => [$any, []],
            'PUT api/check-credentialZip' => [$any, []],
            'GET api/check-credentialDate' => [$any, []],
            'POST api/get-files' => [$any, []],
            'GET api/add-details' => [$any, []],
            'GET api/test-value' => [$any, []],
            'GET api/check-email' => [$any, []],

            // ---- billing, licenses and the broker's licensed employees (brokers only)
            'POST api/update-billing' => [$broker, ['user=i.user_id']],
            'GET api/billing-cycle' => [$broker, ['user=i.user_id']],
            'GET api/check-available-licenses/{id}' => [$broker, ['user=r.id']],
            'GET api/check-license/{id}' => [$broker, ['user=r.id']],
            'PUT api/return-license' => [$broker, ['user=i.user_id']],
            'POST api/add-broker-employee' => [$broker, ['user=i.user_id']],
            'POST api/check-broker-email' => [$broker, ['licensed?=i.id']],
            'GET api/edit-broker-employee/{id}' => [$broker, ['licensed=r.id']],
            'POST api/update-broker-employee' => [$broker, ['licensed=i.id', 'user=i.user_id']],
            'GET api/employees/{userid}' => [$broker, ['user=r.userid']],
            'DELETE api/delete-employees/{id}' => [$broker, ['licensed=r.id']],
        ];
    }
}
