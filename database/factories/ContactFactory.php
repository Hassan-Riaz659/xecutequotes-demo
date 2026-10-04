<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Contact;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Contact message factory
|--------------------------------------------------------------------------
|
| A message sent through the public contact form.
|
*/

$factory->define(Contact::class, function (Faker $faker) {
    return [
        'name' => $faker->firstName . ' ' . $faker->lastName,
        'phone_number' => '505-555-' . $faker->numerify('01##'),
        'email' => $faker->unique()->userName . '@example.test',
        'message' => $faker->paragraph(2),
    ];
});
