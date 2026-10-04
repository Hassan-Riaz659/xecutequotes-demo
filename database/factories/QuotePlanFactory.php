<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\PlanPrice;
use App\Quote;
use App\QuotePlan;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Quote plan factory
|--------------------------------------------------------------------------
|
| The plans a broker chose to compare for a quote. `chosen_plans` is the JSON
| array of plan_prices ids as text, exactly as the app stores it. By default
| three new plan prices are created; pass `chosen_plans` to use existing rows.
|
*/

$factory->define(QuotePlan::class, function (Faker $faker) {
    return [
        'quote_id' => factory(Quote::class),
        'user_id' => function (array $row) {
            return Quote::findOrFail($row['quote_id'])->user_id;
        },
        'client_id' => function (array $row) {
            return Quote::findOrFail($row['quote_id'])->client_id;
        },
        'chosen_plans' => function () {
            return json_encode(factory(PlanPrice::class, 3)->create()->pluck('id')->all());
        },
    ];
});
