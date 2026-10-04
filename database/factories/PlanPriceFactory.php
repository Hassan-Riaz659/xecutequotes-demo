<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\PlanPrice;
use App\Provider;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Plan price factory
|--------------------------------------------------------------------------
|
| Monthly premium of a plan for one age. `age` is a label: a single age as
| text, "64+", or for 2021 the "0-14" and "21-24" brackets. The premium grows
| with the age, like a real rate sheet.
|
| States: seniors ("64+"), child ("0-14"), presbyterianYoungAdult ("21-24").
|
*/

(function () use ($factory) {

// A representative age in years for a label, used to scale the premium.
$yearsOf = function ($age) {
    $labels = ['64+' => 64, '0-14' => 8, '21-24' => 22];

    return isset($labels[$age]) ? $labels[$age] : (int) $age;
};

$factory->define(PlanPrice::class, function (Faker $faker) use ($yearsOf) {
    return [
        'provider' => function () {
            return factory(Provider::class)->create()->name;
        },
        'year' => (int) date('Y'),
        'quarter' => $faker->randomElement(['1st', '2nd', '3rd', '4th']),
        'county' => $faker->randomElement(['Bernalillo', 'Sandoval', 'Valencia']),
        'plan_name' => $faker->randomElement(['HMO', 'PPO']) . ' ' . $faker->randomElement(['Bronze', 'Silver', 'Gold', 'Platinum']) . ' ' . $faker->randomElement(['A', 'B', 'C']),
        'age' => (string) $faker->numberBetween(21, 63),
        'value' => function (array $price) use ($faker, $yearsOf) {
            return round(190 + $yearsOf($price['age']) * 9.5 + $faker->numberBetween(0, 40), 2);
        },
    ];
});

$factory->state(PlanPrice::class, 'seniors', ['age' => '64+']);
$factory->state(PlanPrice::class, 'child', ['age' => '0-14']);
$factory->state(PlanPrice::class, 'presbyterianYoungAdult', ['age' => '21-24']);

})();
