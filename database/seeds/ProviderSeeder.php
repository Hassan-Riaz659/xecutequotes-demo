<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * The four insurance carriers the quote engine knows by name. Their rows must
 * exist before plan_prices and plan_details (both reference providers.name).
 */
class ProviderSeeder extends Seeder
{
    public function run()
    {
        if (DB::table('providers')->exists()) {
            $this->command->info('providers already seeded, skipping');

            return;
        }

        $stamp = DemoReferenceData::stamp((int) date('Y'));
        $rows = [];
        foreach (DemoReferenceData::carriers() as $name => $carrier) {
            $rows[] = ['name' => $name, 'logo' => $carrier['logo'], 'created_at' => $stamp, 'updated_at' => $stamp];
        }

        DB::table('providers')->insert($rows);
        $this->command->info(count($rows) . ' providers');
    }
}
