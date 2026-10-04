<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Benefit summary of every plan: four plans per carrier for each year
 * (the current year and 2021), 32 rows in all.
 */
class PlanDetailSeeder extends Seeder
{
    public function run()
    {
        if (DB::table('plan_details')->exists()) {
            $this->command->info('plan_details already seeded, skipping');

            return;
        }

        $rows = [];
        foreach (DemoReferenceData::years() as $year) {
            $stamp = DemoReferenceData::stamp($year);
            foreach (array_keys(DemoReferenceData::carriers()) as $carrier) {
                foreach (DemoReferenceData::plans($carrier, $year) as $plan) {
                    list($name, $type, $metal) = $plan;
                    $rows[] = array_merge(
                        ['provider' => $carrier, 'year' => $year, 'plan_name' => $name],
                        DemoReferenceData::benefits($carrier, $year, $type, $metal),
                        ['created_at' => $stamp, 'updated_at' => $stamp]
                    );
                }
            }
        }

        DB::table('plan_details')->insert($rows);
        $this->command->info(count($rows) . ' plan details');
    }
}
