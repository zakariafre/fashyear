<?php

use Illuminate\Support\Facades\Route;

// API routes are handled in api.php
Route::get('/api/{any}', function () {
    return response()->json(['message' => 'Unauthorized'], 401);
})->where('any', '.*');

// SPA catch-all route for non-API routes
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '^(?!api).*$');

// Include auth routes for web authentication (not used by our API)
require __DIR__.'/auth.php';


