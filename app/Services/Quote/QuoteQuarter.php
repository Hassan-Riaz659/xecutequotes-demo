<?php

namespace App\Services\Quote;

class QuoteQuarter
{
    /**
     * Calendar quarter label ('1st' to '4th') used to look up plan prices
     * for the month of a quote's effective date.
     *
     * @param  int|string  $month  Month number (1-12), as returned by date('n').
     * @return string
     */
    public static function label($month)
    {
        $yearQuarter = ceil($month / 3);

        if ($yearQuarter == 1.0) {
            $quarter = '1st';
        } elseif ($yearQuarter == 2.0) {
            $quarter = '2nd';
        } elseif ($yearQuarter == 3.0) {
            $quarter = '3rd';
        } else {
            $quarter = '4th';
        }

        return $quarter;
    }
}
