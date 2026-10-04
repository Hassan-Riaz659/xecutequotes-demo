<?php

namespace App\Services\Quote;

use App\ClientEmployee;
use App\QuoteEmployee;

class QuoteCensus
{
    /**
     * Loads the employees of a quote and counts them by member type.
     *
     * Each quote employee is looked up with its own ClientEmployee query, in
     * quote order, exactly as the quote calculation always did.
     *
     * @param  mixed  $quoteId
     * @return array  [$employees, $spouse_count, $dependent_count, $employee_count]
     */
    public static function forQuote($quoteId)
    {
        $quote_employees = QuoteEmployee::where('quote_id',$quoteId)->get();

        $employees = [];
        $spouse_count = 0;
        $dependent_count = 0;
        $employee_count =0;
        foreach($quote_employees as $quote_employee)
        {
            $employee= ClientEmployee::where('id',$quote_employee['emp_id'])->first();
            array_push($employees,$employee);
            if($employee['member_type']=='Spouse')
            {
                $spouse_count = $spouse_count + 1;
            }
            else if($employee['member_type']=='Dependent'){
                $dependent_count = $dependent_count + 1;
            }
            else if($employee['member_type']=='Employee'){
                $employee_count = $employee_count + 1;
            }
        }

        return [$employees, $spouse_count, $dependent_count, $employee_count];
    }
}
