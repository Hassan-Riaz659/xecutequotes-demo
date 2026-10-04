<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
     public function handle($request, Closure $next)
    {
        // ALLOW OPTIONS METHOD
        // (set on the response itself: PHP's header() fails once any output has started, e.g. when testing)
        $headers = [
            'Access-Control-Allow-Origin'=> '*',
            'Access-Control-Allow-Methods'=> 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers'=> 'Content-Type, X-Auth-Token, Origin'
        ];
        if($request->getMethod() == "OPTIONS") {
            // The client-side application can set only headers allowed in Access-Control-Allow-Headers
            return response('OK', 200, $headers);
        }

        $response = $next($request);
        foreach($headers as $key => $value)
            $response->header($key, $value);
        return $response;
    }
}
