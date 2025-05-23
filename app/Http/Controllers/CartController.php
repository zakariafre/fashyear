<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    /**
     * Get the user's cart with all items and total price.
     */
    public function index()
    {
        try {
            $cartItems = CartItem::where('user_id', Auth::id())
                ->with('product')
                ->get();

            $total = $cartItems->sum(function ($item) {
                return $item->quantity * $item->price;
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
                'message' => 'Error fetching cart: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add a product to the cart.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $product = Product::findOrFail($request->product_id);
            
            // Check if product is in stock
            if (!$product->stock) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product is out of stock'
                ], 400);
            }

            // Check if product already exists in cart
            $cartItem = CartItem::where('user_id', Auth::id())
                ->where('product_id', $request->product_id)
                ->first();

            if ($cartItem) {
                // Update quantity if product already in cart
                $cartItem->quantity += $request->quantity;
                $cartItem->save();
            } else {
                // Create new cart item
                $cartItem = new CartItem([
                    'user_id' => Auth::id(),
                    'product_id' => $request->product_id,
                    'quantity' => $request->quantity,
                    'price' => $product->price
                ]);
                $cartItem->save();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Product added to cart',
                'data' => $cartItem
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error adding to cart: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a specific cart item.
     */
    public function show(string $id)
    {
        try {
            $cartItem = CartItem::with('product')
                ->where('id', $id)
                ->where('user_id', Auth::id())
                ->firstOrFail();

            return response()->json([
                'status' => 'success',
                'data' => $cartItem
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart item not found'
            ], 404);
        }
    }

    /**
     * Update the quantity of a cart item.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'quantity' => 'required|integer|min:1'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $cartItem = CartItem::where('id', $id)
                ->where('user_id', Auth::id())
                ->firstOrFail();

            $cartItem->quantity = $request->quantity;
            $cartItem->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Cart item updated',
                'data' => $cartItem
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error updating cart item: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove a cart item.
     */
    public function destroy(string $id)
    {
        try {
            $deleted = CartItem::where('id', $id)
                ->where('user_id', Auth::id())
                ->delete();

            if (!$deleted) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cart item not found'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Cart item removed'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error removing cart item: ' . $e->getMessage()
            ], 500);
        }
    }
}
