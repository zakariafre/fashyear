<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

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
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GuestCartController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StripeController;



// Public routes (no authentication required)
Route::get('/csrf-token', function (Request $request) {
    return response()->json(['token' => csrf_token()]);
});


// Authentication routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);


// Public product routes
Route::get('/products', [ProductController::class, 'listingProducts']);
Route::get('/products/featured', [ProductController::class, 'getFeaturedProducts']);
Route::get('/products/search', [ProductController::class, 'searchProducts']);
Route::get('/products/category/{categoryId}', [ProductController::class, 'getProductsByCategory']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);


// Guest routes
Route::prefix('guest')->group(function () {
    Route::post('/cart', [GuestCartController::class, 'addToCart']);
    Route::post('/cart/validate', [GuestCartController::class, 'validateCart']);
    Route::post('/orders', [OrderController::class, 'guestOrder']);
});


// Stripe Payment routes
Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);
Route::post('/stripe/checkout', [StripeController::class, 'checkout']);
Route::get('/stripe/success', [StripeController::class, 'success']);
Route::get('/stripe/cancel', [StripeController::class, 'cancel']);


// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {

    // User authentication
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/refresh', [UserController::class, 'refresh']);
    Route::get('/me', [UserController::class, 'me']);

    // Client profile and management
    Route::prefix('client')->group(function () {
        Route::get('/profile', [ClientController::class, 'profile']);
        Route::put('/profile', [ClientController::class, 'updateProfile']);
        Route::delete('/profile', [ClientController::class, 'deleteProfile']);
        Route::get('/orders', [ClientController::class, 'getOrders']);
        Route::get('/orders/{orderId}', [ClientController::class, 'getOrderDetails']);

        // Wishlist
        Route::get('/wishlist', [ClientController::class, 'getWishlist']);
        Route::post('/wishlist', [ClientController::class, 'addToWishlist']);
        Route::delete('/wishlist/{productId}', [ClientController::class, 'removeFromWishlist']);

        // Cart
        Route::get('/cart', [ClientController::class, 'getCart']);
        Route::post('/cart', [ClientController::class, 'addToCart']);
        Route::delete('/cart/{productId}', [ClientController::class, 'removeFromCart']);
        Route::put('/cart/{productId}', [ClientController::class, 'updateCartItem']);

        Route::post('/orders', [OrderController::class,'store']);

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
});

// Admin routes
Route::prefix('admin')->middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'getDashboardStats']);
    
    // Products
    Route::get('/products', [AdminController::class, 'getAllProducts']);
    Route::get('/products/stats', [AdminController::class, 'getProductStats']);
    Route::get('/products/search', [AdminController::class, 'searchProducts']);
    Route::post('/products', [AdminController::class, 'createProduct']);
    Route::put('/products/{id}', [AdminController::class, 'updateProduct']);
    Route::delete('/products/{id}', [AdminController::class, 'deleteProduct']);
    
    // Users
    Route::get('/users', [AdminController::class, 'listUsers']);
    Route::post('/users', [AdminController::class, 'createUser']);
    Route::put('/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    Route::patch('/users/{id}/toggle-role', [AdminController::class, 'toggleUserRole']);
    
    // Categories
    Route::get('/categories/stats', [AdminController::class, 'getCategoryStats']);
    Route::get('/categories/manage', [AdminController::class, 'listCategories']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    
    // Orders
    Route::get('/orders/stats', [AdminController::class, 'getOrderStats']);
    Route::get('/orders', [AdminController::class, 'getAllOrders']);
    Route::put('/orders/{id}/status', [AdminController::class, 'updateOrderStatus']);
    
    // Settings
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::put('/settings', [SettingsController::class, 'update']);
    
    // Images
    Route::post('/upload-image', [ImageUploadController::class, 'upload']);
    
    // Invoices
    Route::get('/invoices', [AdminController::class, 'getInvoices']);
    Route::get('/invoices/{id}', [AdminController::class, 'getInvoiceDetails']);
    Route::post('/invoices/generate', [AdminController::class, 'generateInvoice']);
});

// Guest routes (no authentication required)
Route::prefix('guest')->group(function () {
    Route::post('/cart/sync', [GuestController::class, 'syncGuestCart']);
    Route::post('/cart/validate', [GuestController::class, 'validateGuestCartItems']);
    Route::post('/wishlist/sync', [GuestController::class, 'syncGuestWishlist']);
});



// Product image route
Route::get('/product-image/{filename}', function ($filename) {
    \Log::info('Attempting to serve image:', [
        'filename' => $filename,
        'full_path' => 'products/' . $filename
    ]);
    
    $path = 'products/' . $filename;
    
    if (!Storage::disk('public')->exists($path)) {
        \Log::error('Image not found:', [
            'filename' => $filename,
            'path' => $path,
            'storage_path' => Storage::disk('public')->path($path)
        ]);
        return response()->json(['error' => 'Image not found'], 404);
    }

    try {
        $file = Storage::disk('public')->get($path);
        $type = Storage::disk('public')->mimeType($path);

        \Log::info('Successfully serving image:', [
            'filename' => $filename,
            'mime_type' => $type,
            'size' => strlen($file)
        ]);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);
        return $response;
    } catch (\Exception $e) {
        \Log::error('Error serving image:', [
            'filename' => $filename,
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        return response()->json(['error' => 'Failed to serve image'], 500);
    }
});
