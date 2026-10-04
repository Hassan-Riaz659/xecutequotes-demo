<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Provider;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Provider (carrier) factory
|--------------------------------------------------------------------------
|
| The application knows four carriers by name. The states below create them
| with their placeholder logo file in public/images/. The default provider is a
| generic carrier, so tests can create as many as they need.
|
*/

$factory->define(Provider::class, function (Faker $faker) {
    return [
        'name' => 'Carrier ' . strtoupper($faker->unique()->lexify('???')),
        'logo' => 'bcbs.png',
    ];
});

$factory->state(Provider::class, 'bcbs', ['name' => 'BCBS', 'logo' => 'bcbs.png']);
$factory->state(Provider::class, 'friday', ['name' => 'Friday', 'logo' => 'friday.png']);
$factory->state(Provider::class, 'presbyterian', ['name' => 'Presbyterian', 'logo' => 'presbyterian.png']);
$factory->state(Provider::class, 'thnm', ['name' => 'THNM', 'logo' => 'truehealth.png']);
