<?php

namespace App\Services\Quote;

use App\Quote;
use App\QuoteEmployee;

class QuoteRecords
{
    /**
     * Creates and saves a quote for a client. The attributes are assigned in
     * the order client_id, user_id, zip, nickName, effective_date.
     *
     * @param  mixed  $clientId
     * @param  mixed  $userId
     * @param  mixed  $zip
     * @param  mixed  $nickName
     * @param  mixed  $effectiveDate
     * @return \App\Quote
     */
    public static function createQuote($clientId, $userId, $zip, $nickName, $effectiveDate)
    {
        $quote = new Quote();
        $quote->client_id = $clientId;
        $quote->user_id = $userId;
        $quote->zip = $zip;
        $quote->nickName = $nickName;
        $quote->effective_date = $effectiveDate;
        $quote->save();

        return $quote;
    }

    /**
     * Adds an employee to a quote.
     *
     * @param  mixed  $clientId
     * @param  mixed  $quoteId
     * @param  mixed  $employeeId
     * @return \App\QuoteEmployee
     */
    public static function attachEmployee($clientId, $quoteId, $employeeId)
    {
        $quote_employee = new QuoteEmployee();
        $quote_employee->client_id = $clientId;
        $quote_employee->quote_id = $quoteId;
        $quote_employee->emp_id = $employeeId;
        $quote_employee->save();

        return $quote_employee;
    }

    /**
     * The most recent quote (highest id) of a client.
     *
     * @param  mixed  $clientId
     * @return \App\Quote|null
     */
    public static function latestForClient($clientId)
    {
        return Quote::where('client_id',$clientId)->orderBy('id','DESC')->first();
    }

    /**
     * The most recent quote (highest id) of a client that belongs to the
     * given user. Not the same query as latestForClient().
     *
     * @param  mixed  $userId
     * @param  mixed  $clientId
     * @return \App\Quote|null
     */
    public static function latestForClientOfUser($userId, $clientId)
    {
        return Quote::where('user_id',$userId)->where('client_id',$clientId)->orderBy('id','DESC')->first();
    }
}
