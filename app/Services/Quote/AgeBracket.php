<?php

namespace App\Services\Quote;

/**
 * Maps an employee's age to the age key used in the plan_prices table.
 *
 * The rules are kept exactly as they were written inline in ClientController,
 * including how they behave for strings and other loosely typed input.
 */
class AgeBracket
{
    /**
     * Age key for every carrier except Presbyterian.
     *
     * Ages above 63 map to '64+'. For quotes effective in 2021, ages under 15
     * map to '0-14'. Historical note: these copies once also carried a
     * '21-24' bracket (age 21 to 24 in 2021); it was disabled for these
     * carriers and is now only applied by presbyterian().
     *
     * @param  mixed  $age   Age as read from the database or a previous bracket.
     * @param  mixed  $year  Effective year of the quote.
     * @return mixed
     */
    public static function standard($age, $year)
    {
        if ($age > 63) {
            $age = '64+';
        }
        if ($year == 2021) {
            if ($age < 15 && $age >= 0) {
                $age = '0-14';
            }
        }

        return $age;
    }

    /**
     * Age key for Presbyterian plans: the standard rules plus the '21-24'
     * bracket for quotes effective in 2021.
     *
     * @param  mixed  $age   Age as read from the database or a previous bracket.
     * @param  mixed  $year  Effective year of the quote.
     * @return mixed
     */
    public static function presbyterian($age, $year)
    {
        if ($age > 63) {
            $age = '64+';
        }
        if ($year == 2021) {
            if ($age < 15 && $age >= 0) {
                $age = '0-14';
            } elseif ($age <= 24 && $age >= 21) {
                $age = '21-24';
            }
        }

        return $age;
    }
}
