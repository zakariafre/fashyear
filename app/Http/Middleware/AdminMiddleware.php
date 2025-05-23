<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     * 
     * Ensure that the authenticated user has admin privileges.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized - Not authenticated'
            ], 401);
        }
        
        // Check if authenticated user is an admin
        if (Auth::user()->type !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Forbidden - Admin privileges required'
            ], 403);
        }
        
        return $next($request);
    }
} 