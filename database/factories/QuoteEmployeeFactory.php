<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ClientEmployee;
use App\Quote;
use App\QuoteEmployee;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Quote employee factory
|--------------------------------------------------------------------------
|
| Puts one census member on a quote. The client is the quote's client and the
| member (emp_id) is a new census row of that same client.
|
*/

$factory->define(QuoteEmployee::class, function (Faker $faker) {
    return [
        'quote_id' => factory(Quote::class),
        'client_id' => function (array $row) {
            return Quote::findOrFail($row['quote_id'])->client_id;
        },
        'emp_id' => function (array $row) {
            return factory(ClientEmployee::class)->create(['client_id' => $row['client_id']])->id;
        },
    ];
});
