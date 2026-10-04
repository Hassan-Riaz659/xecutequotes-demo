<?php

namespace App\Services\Quote;

use PDF;

class PlanPdfPrinter
{
    /**
     * Renders the printPlans view for the compared plans and saves it as
     * public/pdf/<client name><suffix>.pdf (A4, landscape).
     *
     * The parameter names are the variable names the view expects. The
     * caller creates the random suffix and builds the returned URL.
     *
     * @param  array   $plans          Plan cards to print.
     * @param  mixed   $logo           Logo file name.
     * @param  string  $client_name    Name of the client.
     * @param  mixed   $employeeRates  Rates sent by the client app.
     * @param  mixed   $str            Random suffix of the file name.
     * @return void
     */
    public static function save($plans, $logo, $client_name, $employeeRates, $str)
    {
        $my_pdf_path_for_example = public_path('pdf/' . self::fileName($client_name, $str) . '.pdf');
        PDF::loadView('printPlans',compact('plans','logo','client_name','employeeRates'))->setPaper('A4', 'landscape')->save($my_pdf_path_for_example);
    }

    /**
     * Link to a saved PDF that is returned to the client app.
     *
     * Production keeps the fixed xecutequotes.com address. In demo mode the
     * file is served by this application, so the link points at it.
     *
     * @param  string  $client_name  Name of the client.
     * @param  mixed   $str          Random suffix of the file name.
     * @return string
     */
    public static function url($client_name, $str)
    {
        if (config('demo.enabled')) {
            return asset('public/pdf/' . rawurlencode(self::fileName($client_name, $str)) . '.pdf');
        }

        return 'https://xecutequotes.com/public/pdf/' . self::fileName($client_name, $str) . '.pdf';
    }

    /**
     * File name (without the extension) of a client's PDF.
     *
     * The client name is typed by the user, so it must not be able to leave the
     * pdf folder or break the link. Letters, digits, spaces and . _ - & ' , ( ) +
     * are kept, which leaves ordinary names exactly as they were; everything else
     * (slashes, colons, control characters, "?" and "#") becomes "_", and ".."
     * and leading dots are removed.
     *
     * @param  string  $client_name  Name of the client.
     * @param  mixed   $str          Random suffix of the file name.
     * @return string
     */
    public static function fileName($client_name, $str)
    {
        $name = preg_replace('/[^\p{L}\p{N} ._\-&\',()+]/u', '_', $client_name . $str);
        if ($name === null) {
            // not valid UTF-8
            $name = preg_replace('/[^A-Za-z0-9 ._\-&\',()+]/', '_', $client_name . $str);
        }
        $name = ltrim(preg_replace('/\.{2,}/', '.', $name), '.');

        return $name === '' ? 'quote' . $str : $name;
    }

    /**
     * Address of an asset for the printPlans view.
     *
     * Normally a URL, which the PDF renderer downloads from the web server.
     * In demo mode it is the file path instead: a single-threaded development
     * server cannot answer a request made by its own request (the PDF would
     * wait for a timeout and come out without images), and demo mode must not
     * make network calls.
     *
     * @param  string  $path  Path as it is given to asset(), for example "public/images/bcbs.png".
     * @return string
     */
    public static function asset($path)
    {
        return config('demo.enabled') ? base_path($path) : asset($path);
    }
}
