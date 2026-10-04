<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Newsletter;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Newsletter subscriber factory
|--------------------------------------------------------------------------
|
| An address subscribed through the public newsletter form. The column is
| called `nemail`.
|
*/

$factory->define(Newsletter::class, function (Faker $faker) {
    return [
        'nemail' => $faker->unique()->userName . '@example.test',
    ];
});
