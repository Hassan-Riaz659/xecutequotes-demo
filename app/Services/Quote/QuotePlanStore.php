<?php

namespace App\Services\Quote;

use App\QuotePlan;

class QuotePlanStore
{
    /**
     * Makes sure a QuotePlan exists for the user, client and quote, creating it
     * with the chosen plans when it does not. Returns the existing record that
     * was found, or null when a new one had to be created.
     *
     * @param  mixed   $userId
     * @param  mixed   $clientId
     * @param  mixed   $quoteId
     * @param  string  $encodedArray  JSON encoded chosen plan ids.
     * @return mixed
     */
    public static function ensureForQuote($userId, $clientId, $quoteId, $encodedArray)
    {
        $check_quote_plan = QuotePlan::where('user_id', $userId)->where('client_id', $clientId)->where('quote_id', $quoteId)->first();

        if ($check_quote_plan == null) {
            $quote_plan = new QuotePlan();
            $quote_plan->user_id = $userId;
            $quote_plan->client_id = $clientId;
            $quote_plan->quote_id = $quoteId;
            $quote_plan->chosen_plans = $encodedArray;
            $quote_plan->save();
        }

        return $check_quote_plan;
    }

    /**
     * Same as ensureForQuote(), but an existing record only counts when it holds
     * exactly these chosen plans (used by the print flow).
     *
     * @param  mixed   $userId
     * @param  mixed   $clientId
     * @param  mixed   $quoteId
     * @param  string  $encodedArray  JSON encoded chosen plan ids.
     * @return mixed
     */
    public static function ensureForChosenPlans($userId, $clientId, $quoteId, $encodedArray)
    {
        $check_quote_plan = QuotePlan::where('user_id', $userId)->where('client_id', $clientId)->where('quote_id', $quoteId)->where('chosen_plans', $encodedArray)->first();

        if ($check_quote_plan == null) {
            $quote_plan = new QuotePlan();
            $quote_plan->user_id = $userId;
            $quote_plan->client_id = $clientId;
            $quote_plan->quote_id = $quoteId;
            $quote_plan->chosen_plans = $encodedArray;
            $quote_plan->save();
        }

        return $check_quote_plan;
    }
}
