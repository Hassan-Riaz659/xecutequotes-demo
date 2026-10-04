<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Zip codes and the service-area name each carrier uses for them
 * (zip_codes.pres / bcbs / thnm / friday). A carrier that does not serve a zip
 * gets no area, so that carrier returns no plans for it.
 */
class ZipCodeSeeder extends Seeder
{
    public function run()
    {
        if (DB::table('zip_codes')->exists()) {
            $this->command->info('zip_codes already seeded, skipping');

            return;
        }

        $carriers = DemoReferenceData::carriers();
        $stamp = DemoReferenceData::stamp((int) date('Y'));

        $rows = [];
        foreach (DemoReferenceData::zips() as $zip) {
            list($code, $area, $notServed) = $zip;
            $row = ['zip_code' => $code];
            foreach (['pres' => 'Presbyterian', 'bcbs' => 'BCBS', 'thnm' => 'THNM', 'friday' => 'Friday'] as $column => $carrier) {
                $row[$column] = in_array($carrier, $notServed, true) ? null : $carriers[$carrier]['areas'][$area];
            }
            $row['created_at'] = $stamp;
            $row['updated_at'] = $stamp;
            $rows[] = $row;
        }

        DB::table('zip_codes')->insert($rows);
        $this->command->info(count($rows) . ' zip codes');
    }
}
