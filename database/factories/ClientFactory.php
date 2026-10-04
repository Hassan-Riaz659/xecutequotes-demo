<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Client;
use App\PlanPrice;
use App\User;
use Carbon\Carbon;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Client factory
|--------------------------------------------------------------------------
|
| An employer group that a broker quotes. It belongs to a (free) broker unless
| `user_id` is given, and renews on the first day of next month.
|
| States: withAssignedPlan (the broker assigned a plan to the client),
| withoutEffectiveDate (the app then reads the date from the quote).
|
*/

$factory->define(Client::class, function (Faker $faker) {
    return [
        'user_id' => factory(User::class),
        'name' => $faker->company,
        'zip' => (string) $faker->numberBetween(87101, 87199),
        'effective_date' => Carbon::today()->addMonthNoOverflow()->startOfMonth()->toDateString(),
        'plan_assigned' => null,
    ];
});

$factory->state(Client::class, 'withAssignedPlan', function () {
    return [
        'plan_assigned' => factory(PlanPrice::class),
    ];
});

$factory->state(Client::class, 'withoutEffectiveDate', [
    'effective_date' => null,
]);
