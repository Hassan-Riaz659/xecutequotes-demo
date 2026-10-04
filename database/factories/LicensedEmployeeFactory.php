<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Charge;
use App\LicensedEmployee;
use App\User;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Licensed employee (agent) factory
|--------------------------------------------------------------------------
|
| The link between a broker and an agent the broker added. The agent is a real
| role 3 user, and the name, email and phone here are copied from that user.
|
| States: withCharge (the agent took one of the broker's paid licenses),
| pending (the agent has not set a password yet).
|
*/

$factory->define(LicensedEmployee::class, function (Faker $faker) {
    return [
        'broker_id' => factory(User::class)->states('annual', 'withExtraLicenses'),
        'user_id' => function (array $row) {
            return factory(User::class)->states('agent')->create([
                'company_logo' => User::findOrFail($row['broker_id'])->company_logo,
            ])->id;
        },
        'charge_id' => null,
        'first_name' => function (array $row) {
            return explode(' ', User::findOrFail($row['user_id'])->name, 2)[0];
        },
        'last_name' => function (array $row) {
            return explode(' ', User::findOrFail($row['user_id'])->name, 2)[1];
        },
        'email' => function (array $row) {
            return User::findOrFail($row['user_id'])->email;
        },
        'phone_no' => function (array $row) {
            return User::findOrFail($row['user_id'])->phone_number;
        },
    ];
});

$factory->state(LicensedEmployee::class, 'withCharge', function () {
    return [
        'charge_id' => function (array $row) {
            return factory(Charge::class)->states('withLicenses')->create(['user_id' => $row['broker_id']])->id;
        },
    ];
});

$factory->state(LicensedEmployee::class, 'pending', function () {
    return [
        'user_id' => function () {
            return factory(User::class)->states('pendingAgent')->create()->id;
        },
    ];
});
