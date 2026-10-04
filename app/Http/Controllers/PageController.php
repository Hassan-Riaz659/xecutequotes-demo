<?php

namespace App\Http\Controllers;

/**
 * The two pages that routes/web.php used to build with closures (closures cannot
 * be cached, so `php artisan route:cache` failed).
 */
class PageController extends Controller
{
    /** The React single-page application; the router in the browser handles the path. */
    public function app()
    {
        return view('welcome');
    }

    public function comparePlan()
    {
        return view('landing.compare_plan');
    }
}
