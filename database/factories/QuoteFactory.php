<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Client;
use App\PlanPrice;
use App\Quote;
use Carbon\Carbon;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Quote factory
|--------------------------------------------------------------------------
|
| A quote run for a client. The owner, zip code and effective date come from
| the client, so a quote always agrees with the client it belongs to.
|
| States: complete (finished, used a paid quote), free (finished with one of the
| free credits), withAssignedPlan.
|
*/

$factory->define(Quote::class, function (Faker $faker) {
    return [
        'client_id' => factory(Client::class),
        'user_id' => function (array $quote) {
            return Client::findOrFail($quote['client_id'])->user_id;
        },
        'zip' => function (array $quote) {
            return Client::findOrFail($quote['client_id'])->zip;
        },
        'nickName' => $faker->randomElement(['Renewal', 'New group', 'Open enrollment', 'Mid-year review']),
        'effective_date' => function (array $quote) {
            $client = Client::findOrFail($quote['client_id']);

            return $client->effective_date ?: Carbon::today()->addMonthNoOverflow()->startOfMonth()->toDateString();
        },
        'plan_assign' => null,
        'is_complete' => false,
        'is_free' => false,
    ];
});

$factory->state(Quote::class, 'complete', [
    'is_complete' => true,
]);

$factory->state(Quote::class, 'free', [
    'is_complete' => true,
    'is_free' => true,
]);

$factory->state(Quote::class, 'withAssignedPlan', function () {
    return [
        'plan_assign' => factory(PlanPrice::class),
    ];
});
