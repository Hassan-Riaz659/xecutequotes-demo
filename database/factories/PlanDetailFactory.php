<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\PlanDetail;
use App\Provider;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Plan details factory
|--------------------------------------------------------------------------
|
| Benefit summary of one plan. Plan names follow the patterns the quote filter
| searches for: "<HMO|PPO> <Metal> <letter>" and "<Metal> EPO <letter>" (the
| metal is capitalised because the app detects the tier from the name).
|
| Values are display strings like the real data: plain numbers become "$30" in
| the responses, anything else ("20%", "No charge") is shown as it is, and
| the deductible fields are numbers that the app formats itself.
|
| States: hmo, ppo, epo (plan type) and bronze, silver, gold, platinum (metal
| level). They are independent, so they combine in any order: ->states('epo',
| 'gold') gives "Gold EPO C". The benefits are always derived from the final
| plan name, so they match the metal level.
|
*/

// Factory files are all required from the same method, so the helpers live in
// a closure to keep their variables out of the other factory files.
(function () use ($factory) {
    $metals = ['Bronze', 'Silver', 'Gold', 'Platinum'];

    // One column per metal level, in the order of $metals.
    $values = [
        'hsa_compliant' => ['Yes', 'No', 'No', 'No'],
        'primary_care_office_visit' => ['40', '30', '20', '10'],
        'preventive_care_services' => ['No charge', 'No charge', 'No charge', 'No charge'],
        'specialist_care_office_visit' => ['80', '60', '40', '30'],
        'behavioral_health_visits' => ['40', '30', '20', '10'],
        'urgent_care' => ['100', '75', '50', '40'],
        'emergency_room' => ['500', '400', '300', '250'],
        'ct_pet_scan_mri' => ['600', '500', '350', '250'],
        'x_rays' => ['80', '60', '40', '30'],
        'outpatient_hospital' => ['30%', '20%', '15%', '10%'],
        'inpatient_hospital' => ['40%', '30%', '20%', '10%'],
        'laboratory_tests' => ['40', '30', '20', '10'],
        'chiropractic_and_acupuncture' => ['Not covered', '$30', '$25', '$20'],
        'rehabilitation_therapy' => ['40', '30', '20', '10'],
        'tier1' => ['15', '10', '10', '5'],
        'tier2' => ['30', '20', '15', '10'],
        'tier3' => ['60', '50', '40', '30'],
        'tier4' => ['100', '80', '60', '50'],
        'tier5' => ['40%', '35%', '30%', '25%'],
        'tier6' => ['50%', '45%', '40%', '30%'],
    ];
    $deductible = [6000, 4000, 1500, 500];
    $outOfPocket = [8500, 8000, 6500, 4000];

    // Position of the metal level inside a plan name ("HMO Gold A" -> 2).
    $levelOf = function ($planName) use ($metals) {
        foreach ($metals as $index => $metal) {
            if (strpos($planName, $metal) !== false) {
                return $index;
            }
        }

        return 0;
    };

    // "HMO Gold A" / "Gold EPO A" for a type, a metal and a letter.
    $nameOf = function ($type, $metal, $letter) {
        return $type === 'EPO' ? "$metal EPO $letter" : "$type $metal $letter";
    };

    $letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    $factory->define(PlanDetail::class, function (Faker $faker) use ($metals, $values, $deductible, $outOfPocket, $levelOf, $nameOf, $letters) {
        $metal = $faker->randomElement($metals);
        $letter = $faker->randomElement($letters);

        $card = [
            'provider' => function () {
                return factory(Provider::class)->create()->name;
            },
            'year' => (int) date('Y'),
            'type' => $faker->randomElement(['HMO', 'PPO', 'EPO']),
            // Resolved after `type`, so a type state changes the name too.
            'plan_name' => function (array $plan) use ($nameOf, $metal, $letter) {
                return $nameOf($plan['type'], $metal, $letter);
            },
            // Deductibles and out-of-pocket maximums: out of network is double,
            // family is double the individual amount.
            'deductible_individual_in_network' => function (array $plan) use ($deductible, $levelOf) {
                return (string) $deductible[$levelOf($plan['plan_name'])];
            },
            'deductible_individual_out_network' => function (array $plan) use ($deductible, $levelOf) {
                return (string) ($deductible[$levelOf($plan['plan_name'])] * 2);
            },
            'deductible_family_in_network' => function (array $plan) use ($deductible, $levelOf) {
                return (string) ($deductible[$levelOf($plan['plan_name'])] * 2);
            },
            'deductible_family_out_network' => function (array $plan) use ($deductible, $levelOf) {
                return (string) ($deductible[$levelOf($plan['plan_name'])] * 4);
            },
            'out_of_pocket_max_individual_in_network' => function (array $plan) use ($outOfPocket, $levelOf) {
                return (string) $outOfPocket[$levelOf($plan['plan_name'])];
            },
            'out_of_pocket_max_individual_out_network' => function (array $plan) use ($outOfPocket, $levelOf) {
                return (string) ($outOfPocket[$levelOf($plan['plan_name'])] * 2);
            },
            'out_of_pocket_max_family_in_network' => function (array $plan) use ($outOfPocket, $levelOf) {
                return (string) ($outOfPocket[$levelOf($plan['plan_name'])] * 2);
            },
            'out_of_pocket_max_family_out_network' => function (array $plan) use ($outOfPocket, $levelOf) {
                return (string) ($outOfPocket[$levelOf($plan['plan_name'])] * 4);
            },
        ];

        foreach ($values as $column => $perMetal) {
            $card[$column] = function (array $plan) use ($perMetal, $levelOf) {
                return $perMetal[$levelOf($plan['plan_name'])];
            };
        }

        return $card;
    });

    foreach (['HMO', 'PPO', 'EPO'] as $planType) {
        $factory->state(PlanDetail::class, strtolower($planType), ['type' => $planType]);
    }

    foreach ($metals as $planMetal) {
        $factory->state(PlanDetail::class, strtolower($planMetal), function (Faker $faker) use ($nameOf, $planMetal, $letters) {
            $letter = $faker->randomElement($letters);

            return [
                'plan_name' => function (array $plan) use ($nameOf, $planMetal, $letter) {
                    return $nameOf($plan['type'], $planMetal, $letter);
                },
            ];
        });
    }
})();
