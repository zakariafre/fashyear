<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Wishlist;
use App\Models\Invoice;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    /**
     * Display client's profile
     */
    public function profile()
    {
        try {
            $client = Auth::user();
            return response()->json([
                'status' => 'success',
                'data' => [
                    'profile' => $client,
                    'orders_count' => $client->orders()->count(),
                    'wishlist_count' => $client->wishlist()->count(),
                    'cart_items_count' => $client->cart()->count()
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching profile'
            ], 500);
        }
    }

    /**
     * Update client's profile
     */
    public function updateProfile(Request $request)
    {
        try {
            $client = Auth::user();

            $validated = $request->validate([
                'username' => 'sometimes|string|max:255|unique:users,username,' . $client->id,
                'email' => 'sometimes|email|unique:users,email,' . $client->id,
                'phone_number' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:255',
                'current_password' => 'required_with:new_password|current_password',
                'new_password' => 'sometimes|min:8|confirmed',
            ]);

            if (isset($validated['new_password'])) {
                $validated['password'] = Hash::make($validated['new_password']);
                unset($validated['new_password']);
            }
            unset($validated['current_password']);

            $client->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Profile updated successfully',
                'data' => $client
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error updating profile'
            ], 500);
        }
    }

    /**
     * Get client's orders
     */
    public function getOrders()
    {
        try {
            $orders = Auth::user()->orders()
                ->with(['orderItems.product'])
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return response()->json([
                'status' => 'success',
                'data' => $orders
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching orders'
            ], 500);
        }
    }

    /**
     * Get client's wishlist
     */
    public function getWishlist()
    {
        try {
            $wishlist = Auth::user()->wishlist()
                ->with('product')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $wishlist
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching wishlist'
            ], 500);
        }
    }

    /**
     * Add product to wishlist
     */
    public function addToWishlist(Request $request)
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id'
            ]);

            $wishlistItem = Auth::user()->wishlist()
                ->firstOrCreate(['product_id' => $validated['product_id']]);

            return response()->json([
                'status' => 'success',
                'message' => 'Product added to wishlist',
                'data' => $wishlistItem
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error adding to wishlist'
            ], 500);
        }
    }

    /**
     * Remove product from wishlist
     */
    public function removeFromWishlist(string $productId)
    {
        try {
            Auth::user()->wishlist()
                ->where('product_id', $productId)
                ->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Product removed from wishlist'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error removing from wishlist'
            ], 500);
        }
    }

    /**
     * Get client's cart
     */
    public function getCart()
    {
        try {
            $cartItems = CartItem::where('user_id', Auth::id())
                ->with('product')
                ->get();

            $total = $cartItems->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });

            return response()->json([
                'status' => 'success',
                'data' => [
                    'items' => $cartItems,
                    'total' => $total
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching cart'
            ], 500);
        }
    }

    /**
     * Add product to cart
     */
    public function addToCart(Request $request)
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1'
            ]);

            $user = Auth::user();
            $product = Product::findOrFail($validated['product_id']);

            // Check if product exists in cart already
            $cartItem = CartItem::where('user_id', $user->id)
                ->where('product_id', $validated['product_id'])
                ->first();

            if ($cartItem) {
                // Update quantity if product already in cart
                $cartItem->quantity += $validated['quantity'];
                $cartItem->save();
            } else {
                // Create new cart item
                $cartItem = new CartItem([
                    'user_id' => $user->id,
                    'product_id' => $validated['product_id'],
                    'quantity' => $validated['quantity'],
                    'price' => $product->price
                ]);

                $cartItem->save();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Product added to cart',
                'data' => $cartItem
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error adding to cart: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove product from cart
     */
    public function removeFromCart(string $cartItemId)
    {
        try {
            $user = auth()->user();
            
            // Find the cart item and ensure it belongs to this user
            $cartItem = CartItem::where('id', $cartItemId)
                ->where('user_id', $user->id)
                ->first();

            if (!$cartItem) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cart item not found'
                ], 404);
            }

            $cartItem->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Item removed from cart'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error removing item from cart: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update cart item quantity
     */
    public function updateCartItem(Request $request, string $cartItemId)
    {
        try {
            $validated = $request->validate([
                'quantity' => 'required|integer|min:1'
            ]);

            $cartItem = CartItem::where('user_id', Auth::id())
                ->where('id', $cartItemId)
                ->first();

            if (!$cartItem) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Item not found in cart'
                ], 404);
            }

            $cartItem->quantity = $validated['quantity'];
            $cartItem->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Cart item updated',
                'data' => $cartItem
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error updating cart item'
            ], 500);
        }
    }

    /**
     * Get client's order details
     */
    public function getOrderDetails(string $orderId)
    {
        try {
            $order = Auth::user()->orders()
                ->with(['orderItems.product'])
                ->findOrFail($orderId);

            return response()->json([
                'status' => 'success',
                'data' => $order
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }
    }

    /**
     * Get client's invoices with pagination
     */
    public function getInvoices(Request $request)
    {
        try {
            $user = auth()->user();

            $query = Invoice::whereHas('order', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })->with('order');

            // Sort invoices
            $sortField = $request->input('sort_by', 'date');
            $sortDirection = $request->input('sort_direction', 'desc');

            // Validate sort field
            $allowedSortFields = ['id', 'date', 'total_amount'];
            if (in_array($sortField, $allowedSortFields)) {
                $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
            } else {
                $query->orderBy('date', 'desc');
            }

            // Paginate results
            $perPage = $request->input('per_page', 10);
            $invoices = $query->paginate($perPage);

            return response()->json([
                'status' => 'success',
                'data' => $invoices
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching invoices: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get details of a specific invoice
     */
    public function getInvoiceDetails(string $invoiceId)
    {
        try {
            $user = auth()->user();

            $invoice = Invoice::with(['order', 'order.orderItems.product'])
                ->whereHas('order', function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                })
                ->findOrFail($invoiceId);

            return response()->json([
                'status' => 'success',
                'data' => $invoice
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invoice not found or does not belong to you'
            ], 404);
        }
    }

    /**
     * Download invoice as PDF (placeholder - would require PDF generation library)
     */
    public function downloadInvoice(string $invoiceId)
    {
        try {
            $user = auth()->user();

            $invoice = Invoice::with(['order', 'order.orderItems.product', 'order.user'])
                ->whereHas('order', function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                })
                ->findOrFail($invoiceId);

            // This is a placeholder - in a real implementation, you would:
            // 1. Generate a PDF using a library like dompdf or barryvdh/laravel-dompdf
            // 2. Return the PDF as a download

            return response()->json([
                'status' => 'success',
                'message' => 'PDF generation would happen here',
                'data' => $invoice
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invoice not found or does not belong to you'
            ], 404);
        }
    }
}
