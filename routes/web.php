<?php

use Illuminate\Support\Facades\Route;

// This is a catch-all route for the SPA frontend
Route::get('/{any?}', function () {
    return ['Laravel' => app()->version()];
})->where('any', '^(?!api).*$')->name('spa');

// Include auth routes for web authentication (not used by our API)
require __DIR__.'/auth.php';
