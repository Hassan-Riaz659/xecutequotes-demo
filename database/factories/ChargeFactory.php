<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Charge;
use App\User;
use Carbon\Carbon;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Charge factory
|--------------------------------------------------------------------------
|
| A payment. The default is the annual subscription ($2,500) of an annual
| broker; its renewal date is the user's. Only the last four digits of the card
| are stored, and the transaction reference is synthetic (demo gateway style).
|
| States: creditPack (4 credits for $100, bought by a free broker, no renewal),
| withLicenses (annual fee plus two extra agent licenses at $1,000 each).
|
*/

$factory->define(Charge::class, function (Faker $faker) {
    return [
        'user_id' => factory(User::class)->states('annual'),
        'retref' => 'DEMO' . $faker->numerify('########'),
        'amount' => '2500.00',
        'card_num' => '1111',
        'exp_month' => Carbon::today()->addYears(2)->format('my'),
        'exp_year' => Carbon::today()->addYears(2)->format('my'),
        'bought_credits' => null,
        'total_additional_licenses' => 0,
        'additional_licenses_left' => 0,
        'next_charge_date' => function (array $charge) {
            return User::findOrFail($charge['user_id'])->next_charge_date;
        },
        'status' => 1,
    ];
});

$factory->state(Charge::class, 'creditPack', function () {
    return [
        'user_id' => factory(User::class),
        'amount' => '100.00',
        'bought_credits' => 4,
        'next_charge_date' => null,
    ];
});

$factory->state(Charge::class, 'withLicenses', [
    'amount' => '4500.00',
    'total_additional_licenses' => 2,
    'additional_licenses_left' => 2,
]);
