<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CartitemController extends Controller
{
    /**
     * Display a listing of the user's cart items.
     */
    public function index()
    {
        try {
            $cartItems = CartItem::where('user_id', Auth::id())
                ->with('product')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $cartItems
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching cart items: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created cart item.
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
            $existingItem = CartItem::where('user_id', Auth::id())
                ->where('product_id', $request->product_id)
                ->first();

            if ($existingItem) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product already in cart. Use update to change quantity.',
                    'data' => $existingItem
                ], 409);
            }

            // Create new cart item
            $cartItem = new CartItem([
                'user_id' => Auth::id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $product->price
            ]);
            
            $cartItem->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Product added to cart',
                'data' => $cartItem->load('product')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error adding to cart: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified cart item.
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
     * Update the specified cart item.
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
                'data' => $cartItem->load('product')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error updating cart item: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified cart item.
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
