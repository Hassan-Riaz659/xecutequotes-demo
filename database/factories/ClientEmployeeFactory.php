<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Client;
use App\ClientEmployee;
use Carbon\Carbon;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Client employee (census member) factory
|--------------------------------------------------------------------------
|
| The date of birth and the age always agree. The default member is the
| employee; spouse and dependent members get a fitting age range.
|
| States: spouse, dependent, softDeleted (the app removes members by setting
| deleted_at, so the row stays but is filtered out).
|
*/

$factory->define(ClientEmployee::class, function (Faker $faker) {
    return [
        'client_id' => factory(Client::class),
        'member_type' => 'Employee',
        'f_name' => $faker->firstName,
        'l_name' => $faker->lastName,
        'dob' => $faker->dateTimeBetween('-64 years', '-21 years')->format('Y-m-d'),
        'age' => function (array $member) {
            return Carbon::parse($member['dob'])->age;
        },
        'deleted_at' => null,
    ];
});

$factory->state(ClientEmployee::class, 'spouse', function (Faker $faker) {
    return [
        'member_type' => 'Spouse',
        'dob' => $faker->dateTimeBetween('-60 years', '-21 years')->format('Y-m-d'),
    ];
});

$factory->state(ClientEmployee::class, 'dependent', function (Faker $faker) {
    return [
        'member_type' => 'Dependent',
        'dob' => $faker->dateTimeBetween('-20 years', '-1 month')->format('Y-m-d'),
    ];
});

$factory->state(ClientEmployee::class, 'softDeleted', function () {
    return [
        'deleted_at' => Carbon::now()->toDateTimeString(),
    ];
});
