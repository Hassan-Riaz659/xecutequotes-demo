<?php

namespace App\Services\Quote;

use App\Quote;

class QuoteLogo
{
    /**
     * Logo shown on a compared or printed quote: free quotes use the default
     * logo, otherwise the user's company logo (when they have one). The given
     * logo is returned unchanged when neither applies.
     *
     * @param  mixed  $lastQuote  Id of the quote the logo is chosen for.
     * @param  mixed  $image      The owning user.
     * @param  mixed  $logo       Logo chosen so far.
     * @return mixed
     */
    public static function forQuote($lastQuote, $image, $logo)
    {
        $isFree = Quote::where('id', $lastQuote)->first();
        if ($isFree->is_free == 1) {
            $logo = "xecute_logo.jpg";
        } else {
            if ($image->company_logo != null) {
                $logo = $image->company_logo;
            }
        }

        return $logo;
    }

    /**
     * Company logo only, as used by the saved-quote view (no free-quote rule).
     *
     * @param  mixed  $image  The owning user.
     * @param  mixed  $logo   Logo chosen so far.
     * @return mixed
     */
    public static function companyLogo($image, $logo)
    {
        if ($image['company_logo'] != null) {
            $logo = $image['company_logo'];
        }

        return $logo;
    }
}
