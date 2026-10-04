<?php

use Illuminate\Database\Seeder;

/**
 * The demo accounts and everything they own. Needs the reference data
 * (ReferenceDataSeeder) for the plan ids. The order matters: users first, then
 * their payments and agents, then clients with quotes.
 */
class DemoDataSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            PersonaSeeder::class,
            BillingSeeder::class,
            ClientScenarioSeeder::class,
        ]);
    }
}
