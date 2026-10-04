<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Quote;
use App\QuotePlan;
use App\SaveQuote;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Saved quote factory
|--------------------------------------------------------------------------
|
| A quote a broker saved together with the plans that were being compared
| (a quote_plans row of the same quote).
|
| States: withoutPlans (saved before any plan was chosen).
|
*/

$factory->define(SaveQuote::class, function (Faker $faker) {
    return [
        'quote_id' => factory(Quote::class),
        'user_id' => function (array $row) {
            return Quote::findOrFail($row['quote_id'])->user_id;
        },
        'client_id' => function (array $row) {
            return Quote::findOrFail($row['quote_id'])->client_id;
        },
        'quote_plans_id' => function (array $row) {
            return factory(QuotePlan::class)->create(['quote_id' => $row['quote_id']])->id;
        },
    ];
});

$factory->state(SaveQuote::class, 'withoutPlans', [
    'quote_plans_id' => null,
]);
