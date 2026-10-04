<?php

namespace App\Http\Middleware;

use App\Services\Authorization\RoutePolicy;
use Closure;

/**
 * Lets a signed-in user work only with their own records (see RoutePolicy).
 * Runs after auth:api. A record that belongs to someone else is answered
 * exactly like one that does not exist.
 */
class EnforceOwnership
{
    public function handle($request, Closure $next)
    {
        $decision = RoutePolicy::decide($request->user(), $request);

        if ($decision['allow']) {
            return $next($request);
        }

        if ($decision['status'] === 404) {
            return response()->json(['message' => 'Not Found.'], 404);
        }

        return response()->json(['message' => 'This action is unauthorized.'], 403);
    }
}
