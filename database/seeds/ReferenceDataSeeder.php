<?php

use Illuminate\Database\Seeder;

/**
 * Everything the quote engine needs before the first quote can be run:
 * carriers, zip codes, plan benefits and the rate sheet. No users or demo
 * accounts are created here.
 *
 * The order matters: providers are referenced by plan_details and plan_prices.
 */
class ReferenceDataSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            ProviderSeeder::class,
            ZipCodeSeeder::class,
            PlanDetailSeeder::class,
            PlanPriceSeeder::class,
        ]);
    }
}
