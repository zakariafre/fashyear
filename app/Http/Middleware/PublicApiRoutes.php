<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PublicApiRoutes
{
    protected $publicRoutes = [
        '/api/csrf-token',
        '/api/login',
        '/api/signup',
        '/api/products',
        '/api/products/featured',
        '/api/products/search',
        '/api/products/category/*',
        '/api/products/*',
        '/api/categories',
        '/api/categories/*'
    ];

    public function handle(Request $request, Closure $next)
    {
        $requestPath = $request->path();

        // If this is an admin route, skip public route check and continue to auth middleware
        if (str_starts_with($requestPath, 'api/admin')) {
            return $next($request);
        }

        // Check if the current route is in the public routes list
        foreach ($this->publicRoutes as $route) {
            if (
                $route === $requestPath ||
                (str_ends_with($route, '*') &&
                    str_starts_with($requestPath, substr($route, 0, -1)))
            ) {
                return $next($request);
            }
        }

        return $next($request);
    }
}