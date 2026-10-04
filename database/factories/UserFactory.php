<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Carbon\Carbon;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| User factory
|--------------------------------------------------------------------------
|
| The default user is what AuthenticationController::register creates once the
| email is verified: a broker (role 2) on the free plan with 3 credits.
|
| States: admin, annual, withExtraLicenses, withBoughtCredits, unverified,
| agent, pendingAgent. Every address uses the reserved example.test domain and
| every account has the demo password "Password123!".
|
*/

$factory->define(User::class, function (Faker $faker) {
    // Hashing is slow on purpose, so the demo password is hashed once per process.
    static $password;
    $password = $password ?: Hash::make('Password123!');

    return [
        'name' => $faker->firstName . ' ' . $faker->lastName,
        'email' => $faker->unique()->userName . '@example.test',
        'email_verified_at' => now(),
        'password' => $password,
        'remember_token' => Str::random(10),
        'phone_number' => '505-555-' . $faker->numerify('01##'),
        'company_url' => $faker->domainWord . '.example.test',
        'company_logo' => 'No Image',
        'role_id' => 2,
        'status' => 1,
        'subscription_type' => 'free',
        'credits_left' => 3,
        'bought_credits' => 0,
        'additional_license' => 0,
        'total_additional_licenses' => 0,
        'next_charge_date' => null,
    ];
});

// Administrator (role 1): manages users, has no subscription of its own.
$factory->state(User::class, 'admin', [
    'role_id' => 1,
    'subscription_type' => '0',
    'credits_left' => null,
]);

// Broker on the annual plan: unlimited quotes, renews in the future (never
// today, because the daily renewal command charges users whose date is today).
$factory->state(User::class, 'annual', function (Faker $faker) {
    return [
        'subscription_type' => 'annual',
        'credits_left' => 'unlimited',
        'bought_credits' => null,
        'next_charge_date' => Carbon::today()->addDays($faker->numberBetween(30, 330))->toDateString(),
    ];
});

// Annual broker who paid for two extra agent licenses.
$factory->state(User::class, 'withExtraLicenses', [
    'additional_license' => 2,
    'total_additional_licenses' => 2,
]);

// Free broker who bought credit packages (a package is 4 credits).
$factory->state(User::class, 'withBoughtCredits', function (Faker $faker) {
    return [
        'bought_credits' => 4 * $faker->numberBetween(1, 3),
    ];
});

// Registered but has not clicked the email link yet.
$factory->state(User::class, 'unverified', function () {
    return [
        'status' => 0,
        'email_verified_at' => null,
        'verify_code' => bin2hex(random_bytes(16)),
    ];
});

// Licensed employee (role 3) added by a broker: no company URL, no plan.
$factory->state(User::class, 'agent', [
    'role_id' => 3,
    'subscription_type' => '0',
    'credits_left' => null,
    'bought_credits' => 0,
    'company_url' => null,
]);

// Agent who has been invited but has not set a password yet.
$factory->state(User::class, 'pendingAgent', function () {
    return [
        'role_id' => 3,
        'subscription_type' => '0',
        'credits_left' => null,
        'bought_credits' => 0,
        'company_url' => null,
        'status' => 0,
        'email_verified_at' => null,
        'create_password_token' => bin2hex(random_bytes(16)),
    ];
});
