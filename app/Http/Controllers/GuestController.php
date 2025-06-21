<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GuestController extends Controller
{
    /**
     * Validate guest cart/wishlist data
     */
    private function validateGuestData(Request $request)
    {
        return Validator::make($request->all(), [
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.size' => 'required|string',
            'items.*.color' => 'required|string'
        ]);
    }

    /**
     * Sync guest cart with database when user logs in
     */
    public function syncGuestCart(Request $request)
    {
        $validator = $this->validateGuestData($request);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid cart data',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $items = $request->items;
            $products = [];

            foreach ($items as $item) {
                $product = Product::find($item['product_id']);
                if ($product) {
                    $products[] = [
                        'product' => $product,
                        'quantity' => $item['quantity'],
                        'size' => $item['size'],
                        'color' => $item['color']
                    ];
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Cart data validated successfully',
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to process cart data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Sync guest wishlist with database when user logs in
     */
    public function syncGuestWishlist(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_ids' => 'required|array',
            'product_ids.*' => 'required|exists:products,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid wishlist data',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $productIds = $request->product_ids;
            $products = Product::whereIn('id', $productIds)->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Wishlist data validated successfully',
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to process wishlist data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Validate guest cart items
     */
    public function validateGuestCartItems(Request $request)
    {
        $validator = $this->validateGuestData($request);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid cart data',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $items = $request->items;
            $validatedItems = [];

            foreach ($items as $item) {
                $product = Product::find($item['product_id']);
                if ($product) {
                    // Validate size and color availability
                    $validSize = in_array($item['size'], $product->size ?? []);
                    $validColor = in_array($item['color'], array_column($product->colors ?? [], 'name'));

                    $validatedItems[] = [
                        'product_id' => $product->id,
                        'name' => $product->name,
                        'price' => $product->price,
                        'quantity' => $item['quantity'],
                        'size' => $item['size'],
                        'color' => $item['color'],
                        'is_valid' => $product->stock && $validSize && $validColor,
                        'error_message' => !$product->stock ? 'Product out of stock' :
                                         (!$validSize ? 'Selected size not available' :
                                         (!$validColor ? 'Selected color not available' : null))
                    ];
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Cart items validated successfully',
                'data' => $validatedItems
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to validate cart items',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
