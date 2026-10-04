<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Payment history (charges) and the annual broker's licensed employees.
 *
 * The numbers follow what the app itself writes: renewals and license
 * purchases create charge rows, each agent takes one license
 * (users.additional_license goes down, the charge's additional_licenses_left
 * goes down) and gets a licensed_employees row pointing at the charge.
 * Run after PersonaSeeder.
 */
class BillingSeeder extends Seeder
{
    public function run()
    {
        if (DB::table('charges')->exists() || DB::table('licensed_employees')->exists()) {
            $this->command->info('billing already seeded, skipping');

            return;
        }

        $users = DemoScenarioData::users();
        $userId = [];
        foreach ($users as $key => $spec) {
            $userId[$key] = DB::table('users')->where('email', $spec['email'])->value('id');
        }

        $expiry = DemoScenarioData::today()->addYears(2)->format('my');
        $chargeId = [];
        foreach (DemoScenarioData::charges() as $charge) {
            $chargeId[$charge['retref']] = DB::table('charges')->insertGetId([
                'user_id' => $userId[$charge['user']],
                'retref' => $charge['retref'],
                'amount' => $charge['amount'],
                'card_num' => '1111',
                'exp_month' => $expiry,
                'exp_year' => $expiry,
                'bought_credits' => $charge['credits'],
                'total_additional_licenses' => $charge['licenses'],
                'additional_licenses_left' => $charge['left'],
                'next_charge_date' => $charge['next'],
                'status' => 1,
                'created_at' => $charge['when'],
                'updated_at' => $charge['when'],
            ]);
        }

        // All three agents were added after the licenses were bought, so they use that charge.
        $licenseCharge = $chargeId['DEMO00000003'];
        foreach (DemoScenarioData::agents() as $agent) {
            list($key, $daysAgo) = $agent;
            $names = explode(' ', $users[$key]['name'], 2);
            $stamp = DemoScenarioData::stamp($daysAgo, 11);
            DB::table('licensed_employees')->insert([
                'broker_id' => $userId['maria'],
                'user_id' => $userId[$key],
                'charge_id' => $licenseCharge,
                'first_name' => $names[0],
                'last_name' => $names[1],
                'email' => $users[$key]['email'],
                'phone_no' => $users[$key]['attributes']['phone_number'],
                'created_at' => $stamp,
                'updated_at' => $stamp,
            ]);
        }

        $this->command->info(count($chargeId) . ' charges, ' . count(DemoScenarioData::agents()) . ' licensed employees');
    }
}
