<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * The OAuth "personal access client" that Passport needs to issue the login
 * token (AuthenticationController::login calls createToken()). Without this row
 * every login ends in a 500 error.
 *
 * The secret is a fixed demo value: personal access tokens are signed with the
 * key pair in storage/ (php artisan passport:keys), not with this secret.
 */
class PassportClientSeeder extends Seeder
{
    public function run()
    {
        if (DB::table('oauth_clients')->where('personal_access_client', 1)->exists()) {
            $this->command->info('passport personal access client already seeded, skipping');

            return;
        }

        $stamp = DemoScenarioData::stamp(730, 9);

        DB::table('oauth_clients')->insert([
            'id' => 1,
            'user_id' => null,
            'name' => 'Demo Personal Access Client',
            'secret' => 'demoPersonalAccessClientSecret000000000',
            'provider' => null,
            'redirect' => 'http://localhost',
            'personal_access_client' => 1,
            'password_client' => 0,
            'revoked' => 0,
            'created_at' => $stamp,
            'updated_at' => $stamp,
        ]);
        DB::table('oauth_personal_access_clients')->insert([
            'id' => 1,
            'client_id' => 1,
            'created_at' => $stamp,
            'updated_at' => $stamp,
        ]);

        $this->command->info('passport personal access client');
    }
}
