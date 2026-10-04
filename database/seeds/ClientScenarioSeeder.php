<?php

use App\Services\Quote\AgeBracket;
use App\Services\Quote\QuoteQuarter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Clients, their census, the quotes run for them, the plans compared on each
 * quote, saved quotes and assigned plans (see DemoScenarioData).
 *
 * The rows look like what the app writes through its own screens:
 *  - a client's census members are attached to every quote of that client
 *    through quote_employees (a renewal re-uses the same people);
 *  - the compared plans are stored as a JSON array of plan_prices ids, picked
 *    for the quote's own year, quarter, service area and first member's age;
 *  - assigning a plan sets quotes.plan_assign and clients.plan_assigned.
 * Quotes are inserted oldest first, so ids follow time. Run after
 * ReferenceDataSeeder and PersonaSeeder.
 */
class ClientScenarioSeeder extends Seeder
{
    /** zip_codes column that holds the service area of each carrier. */
    const AREA_COLUMN = ['BCBS' => 'bcbs', 'Friday' => 'friday', 'Presbyterian' => 'pres', 'THNM' => 'thnm'];

    public function run()
    {
        if (DB::table('clients')->exists()) {
            $this->command->info('clients already seeded, skipping');

            return;
        }

        $users = DemoScenarioData::users();
        $userId = [];
        foreach ($users as $key => $spec) {
            $userId[$key] = DB::table('users')->where('email', $spec['email'])->value('id');
        }

        $clients = DemoScenarioData::clients();
        $quotes = DemoScenarioData::quotes();
        // Oldest first; quotes created on the same day keep their listed order.
        $order = array_keys($quotes);
        usort($order, function ($a, $b) use ($quotes, $order) {
            $byAge = $quotes[$b]['created'] - $quotes[$a]['created'];

            return $byAge !== 0 ? $byAge : array_search($a, $order) - array_search($b, $order);
        });

        $clientId = [];
        $employeeId = [];
        $employeeAge = [];
        $counts = ['clients' => 0, 'employees' => 0, 'quotes' => 0, 'quote_plans' => 0, 'save_quotes' => 0];

        foreach ($order as $quoteKey) {
            $quote = $quotes[$quoteKey];
            $clientKey = $quote['client'];
            $client = $clients[$clientKey];
            $owner = $userId[$client['owner']];
            $created = DemoScenarioData::stamp($quote['created'], 9 + $counts['quotes'] % 8);
            $effective = DemoScenarioData::effectiveDate($quote['eff']);

            // The client and its census are created together with the client's first quote.
            if (!isset($clientId[$clientKey])) {
                $clientId[$clientKey] = DB::table('clients')->insertGetId([
                    'user_id' => $owner,
                    'name' => $client['name'],
                    'zip' => $client['zip'],
                    'effective_date' => !empty($client['no_date']) ? null : $effective,
                    'plan_assigned' => null,
                    'created_at' => $created,
                    'updated_at' => $created,
                ]);
                $counts['clients']++;
                foreach ($client['census'] as $member) {
                    $employeeId[$clientKey][$member[0]] = DB::table('client_employees')->insertGetId([
                        'client_id' => $clientId[$clientKey],
                        'member_type' => $member[1],
                        'f_name' => $member[2],
                        'l_name' => $member[3],
                        'dob' => DemoScenarioData::birthDate($member[4]),
                        'age' => $member[4],
                        'deleted_at' => isset($member[5]) ? DemoScenarioData::stamp($member[5]) : null,
                        'created_at' => $created,
                        'updated_at' => $created,
                    ]);
                    $employeeAge[$clientKey][$member[0]] = $member[4];
                    $counts['employees']++;
                }
            }

            $quoteId = DB::table('quotes')->insertGetId([
                'client_id' => $clientId[$clientKey],
                'user_id' => $owner,
                'zip' => $client['zip'],
                'nickName' => $quote['nick'],
                'effective_date' => $effective,
                'plan_assign' => null,
                'is_complete' => $quote['free'] ? 1 : 0,
                'is_free' => $quote['free'] ? 1 : 0,
                'created_at' => $created,
                'updated_at' => $created,
            ]);
            $counts['quotes']++;

            foreach ($quote['census'] as $memberKey) {
                DB::table('quote_employees')->insert([
                    'quote_id' => $quoteId,
                    'client_id' => $clientId[$clientKey],
                    'emp_id' => $employeeId[$clientKey][$memberKey],
                    'created_at' => $created,
                    'updated_at' => $created,
                ]);
            }

            if (!$quote['plans']) {
                continue;
            }

            $firstAge = $employeeAge[$clientKey][$quote['census'][0]];
            $chosen = [];
            foreach ($quote['plans'] as $plan) {
                $chosen[] = $this->planId($plan[0], $plan[1], $client['zip'], $effective, $firstAge);
            }
            $quotePlanId = DB::table('quote_plans')->insertGetId([
                'user_id' => $owner,
                'client_id' => $clientId[$clientKey],
                'quote_id' => $quoteId,
                'chosen_plans' => json_encode($chosen),
                'created_at' => $created,
                'updated_at' => $created,
            ]);
            $counts['quote_plans']++;

            if ($quote['assigned']) {
                $planId = $this->planId($quote['assigned'][0], $quote['assigned'][1], $client['zip'], $effective, $firstAge);
                DB::table('quotes')->where('id', $quoteId)->update(['plan_assign' => $planId]);
                DB::table('clients')->where('id', $clientId[$clientKey])->update(['plan_assigned' => $planId]);
            }

            if ($quote['saved']) {
                DB::table('save_quotes')->insert([
                    'user_id' => $owner,
                    'client_id' => $clientId[$clientKey],
                    'quote_id' => $quoteId,
                    'quote_plans_id' => $quotePlanId,
                    'created_at' => $created,
                    'updated_at' => $created,
                ]);
                $counts['save_quotes']++;
            }
        }

        $this->command->info($counts['clients'] . ' clients, ' . $counts['employees'] . ' census members, ' . $counts['quotes'] . ' quotes, ' . $counts['quote_plans'] . ' compared-plan sets, ' . $counts['save_quotes'] . ' saved quotes');
    }

    /**
     * Id of the plan_prices row the app would show for a carrier's product
     * (slot in DemoReferenceData::carriers()) on a quote: the zip's service area,
     * the quote's year and quarter and the first member's age bracket.
     */
    private function planId($carrier, $slot, $zip, $effectiveDate, $age)
    {
        $year = (int) substr($effectiveDate, 0, 4);
        $quarter = QuoteQuarter::label((int) substr($effectiveDate, 5, 2));
        $area = DB::table('zip_codes')->where('zip_code', (int) $zip)->value(self::AREA_COLUMN[$carrier]);
        $planName = DemoReferenceData::plans($carrier, $year)[$slot][0];
        $bracket = $carrier === 'Presbyterian' ? AgeBracket::presbyterian($age, $year) : AgeBracket::standard($age, $year);

        $id = DB::table('plan_prices')
            ->where('provider', $carrier)->where('year', $year)->where('quarter', $quarter)
            ->where('county', $area)->where('plan_name', $planName)->where('age', (string) $bracket)
            ->value('id');
        if ($id === null) {
            throw new RuntimeException("No price row for $carrier $planName in zip $zip ($year $quarter, age $age)");
        }

        return (int) $id;
    }
}
