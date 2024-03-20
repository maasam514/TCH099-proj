<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GestionnaireLigueMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if($request->user()){
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        if ($request->routeIs('gestionnaire.*')) {
            // Check if user is a gestionnaire
            if ($request->user()->role_utilisateur !== 'gestionnaire') {
                return response()->json(['message' => 'Access denied'], 403);
            }
        }
        return $next($request);
    }
}
