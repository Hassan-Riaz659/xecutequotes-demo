<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * The nine demo accounts (see DemoScenarioData::users()). They are built from
 * the User factory states, with every value that the factory would randomise
 * replaced by a fixed one. Password for all of them: Password123!
 *
 *   admin@example.test              administrator
 *   maria.broker@example.test       annual broker, 4 extra licenses
 *   noah.free@example.test          free broker, 1 free quote left
 *   priya.credits@example.test      free broker with 8 bought credits
 *   new.broker@example.test         brand-new broker, no data
 *   agent.lee@example.test          licensed employee of Maria
 *   agent.kim@example.test          licensed employee of Maria
 *   agent.pending@example.test      invited agent, password not set yet
 *   unverified.broker@example.test  registered, email not verified
 */
class PersonaSeeder extends Seeder
{
    public function run()
    {
        if (DB::table('users')->exists()) {
            $this->command->info('users already seeded, skipping');

            return;
        }

        $count = 0;
        foreach (DemoScenarioData::users() as $spec) {
            $verified = !in_array('unverified', $spec['states'], true) && !in_array('pendingAgent', $spec['states'], true);
            $created = DemoScenarioData::stamp($spec['created']);

            $attributes = array_merge([
                'name' => $spec['name'],
                'email' => $spec['email'],
                'password' => DemoScenarioData::PASSWORD_HASH,
                'remember_token' => null,
                'email_verified_at' => $verified ? $created : null,
                'created_at' => $created,
                'updated_at' => $created,
            ], $spec['attributes']);

            factory(User::class)->states($spec['states'])->create($attributes);
            $count++;
        }

        $this->command->info($count . ' users');
    }
}
