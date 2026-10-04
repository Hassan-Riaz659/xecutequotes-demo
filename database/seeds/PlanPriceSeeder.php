<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * The rate sheet: one row per carrier, year, plan, service area, quarter and age.
 * About 22,000 rows, inserted in chunks.
 *
 * Rows are written year by year, carrier by carrier, so the ids are always the
 * same. Run after ProviderSeeder and PlanDetailSeeder.
 */
class PlanPriceSeeder extends Seeder
{
    /** Rows per INSERT. Nine columns each, far below the 65,535 placeholder limit. */
    const CHUNK = 1000;

    public function run()
    {
        if (DB::table('plan_prices')->exists()) {
            $this->command->info('plan_prices already seeded, skipping');

            return;
        }

        $total = 0;
        $chunk = [];
        foreach (DemoReferenceData::years() as $year) {
            $stamp = DemoReferenceData::stamp($year);
            foreach (DemoReferenceData::carriers() as $carrier => $info) {
                $ages = DemoReferenceData::ageLabels($carrier, $year);
                foreach (DemoReferenceData::plans($carrier, $year) as $plan) {
                    list($name, $type, $metal, $slot) = $plan;
                    foreach ($info['areas'] as $areaIndex => $area) {
                        foreach (array_keys(DemoReferenceData::QUARTERS) as $quarter) {
                            foreach ($ages as $age) {
                                $chunk[] = [
                                    'provider' => $carrier,
                                    'year' => $year,
                                    'quarter' => $quarter,
                                    'county' => $area,
                                    'plan_name' => $name,
                                    'age' => $age,
                                    'value' => DemoReferenceData::premium($carrier, $year, $type, $metal, $slot, $areaIndex, $quarter, $age),
                                    'created_at' => $stamp,
                                    'updated_at' => $stamp,
                                ];
                                if (count($chunk) === self::CHUNK) {
                                    DB::table('plan_prices')->insert($chunk);
                                    $total += count($chunk);
                                    $chunk = [];
                                }
                            }
                        }
                    }
                }
            }
        }

        if ($chunk) {
            DB::table('plan_prices')->insert($chunk);
            $total += count($chunk);
        }

        $this->command->info($total . ' plan prices');
    }
}
