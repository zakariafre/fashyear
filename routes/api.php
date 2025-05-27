<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartitemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderitemController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ImageUploadController;

// CSRF token route - available without authentication
Route::get('/csrf-token', function (Request $request) {
    return response()->json(['token' => csrf_token()]);
});


// Public authentication routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);


// Public product routes
Route::get('/products', [ProductController::class, 'listingProducts']);
Route::get('/products/featured', [ProductController::class, 'getFeaturedProducts']);
Route::get('/products/search', [ProductController::class, 'searchProducts']);
Route::get('/products/category/{categoryId}', [ProductController::class, 'getProductsByCategory']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'listingCategories']);
Route::get('/categories/{id}', [CategoryController::class, 'showCategories']);



// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User authentication
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/refresh', [UserController::class, 'refresh']);
    Route::get('/me', [UserController::class, 'me']);

    // Client profile and management
    Route::prefix('client')->group(function () {
        Route::get('/profile', [ClientController::class, 'profile']);
        Route::put('/profile', [ClientController::class, 'updateProfile']);
        Route::get('/orders', [ClientController::class, 'getOrders']);
        Route::get('/orders/{orderId}', [ClientController::class, 'getOrderDetails']);

        // Wishlist
        Route::get('/wishlist', [ClientController::class, 'getWishlist']);
        Route::post('/wishlist', [ClientController::class, 'addToWishlist']);
        Route::delete('/wishlist/{productId}', [ClientController::class, 'removeFromWishlist']);

        // Cart
        Route::get('/cart', [ClientController::class, 'getCart']);
        Route::post('/cart', [ClientController::class, 'addToCart']);
        Route::delete('/cart/{cartItemId}', [ClientController::class, 'removeFromCart']);
        Route::put('/cart/{cartItemId}', [ClientController::class, 'updateCartItem']);
        
        // Invoices
        Route::get('/invoices', [ClientController::class, 'getInvoices']);
        Route::get('/invoices/{invoiceId}', [ClientController::class, 'getInvoiceDetails']);
        Route::get('/invoices/{invoiceId}/download', [ClientController::class, 'downloadInvoice']);
    });

    // Order routes
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('order-items', OrderitemController::class);

    // User management
    Route::get('/users', [UserController::class, 'listing']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::post('/users', [UserController::class, 'store']);

    // Admin routes - protected with admin middleware
    Route::middleware('admin')->prefix('admin')->group(function () {
        // Dashboard statistics
        Route::get('/dashboard/stats', [AdminController::class, 'getDashboardStats']);

        // User management
        Route::get('/users', [AdminController::class, 'listUsers']);
        Route::post('/users', [AdminController::class, 'createUser']);
        Route::put('/users/{id}', [AdminController::class, 'updateUser']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
        Route::patch('/users/{id}/toggle-role', [AdminController::class, 'toggleUserRole']);

        // Order management
        Route::get('/orders/stats', [AdminController::class, 'getOrderStats']);

        // Product management
        Route::get('/products/stats', [AdminController::class, 'getProductStats']);
        Route::get('/products/manage', [AdminController::class, 'listProducts']);
        Route::post('/products', [AdminController::class, 'createProduct']);
        Route::put('/products/{id}', [AdminController::class, 'updateProduct']);
        Route::delete('/products/{id}', [AdminController::class, 'deleteProduct']);

        // Category management - read-only
        Route::get('/categories/stats', [AdminController::class, 'getCategoryStats']);
        Route::get('/categories/manage', [AdminController::class, 'listCategories']);
        
        // Image upload route for products
        Route::post('/upload-image', [ImageUploadController::class, 'upload']);
        
        // Invoice management
        Route::get('/invoices', [AdminController::class, 'getInvoices']);
        Route::get('/invoices/{id}', [AdminController::class, 'getInvoiceDetails']);
        Route::post('/invoices/generate', [AdminController::class, 'generateInvoice']);
    });
});
