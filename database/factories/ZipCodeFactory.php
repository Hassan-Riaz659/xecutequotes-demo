<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ZipCode;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Zip code factory
|--------------------------------------------------------------------------
|
| A zip code with the county each carrier prices it under. The demo uses
| three counties; by default all four carriers serve the zip.
|
*/

$factory->define(ZipCode::class, function (Faker $faker) {
    $county = $faker->randomElement(['Bernalillo', 'Sandoval', 'Valencia']);

    return [
        'zip_code' => $faker->unique()->numberBetween(87101, 87199),
        'pres' => $county,
        'bcbs' => $county,
        'thnm' => $county,
        'friday' => $county,
    ];
});

// A zip that two of the carriers do not serve: their county stays empty.
$factory->state(ZipCode::class, 'partialCoverage', [
    'thnm' => null,
    'friday' => null,
]);
