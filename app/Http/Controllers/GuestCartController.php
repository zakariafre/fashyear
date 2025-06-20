<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GuestCartController extends Controller
{
    /**
     * Add a product to the guest cart.
     */
    public function addToCart(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'selected_size' => 'required|string'
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

            // Return success response with product data
            return response()->json([
                'status' => 'success',
                'message' => 'Product validated successfully',
                'data' => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'imgURLs' => $product->imgURLs,
                    'selected_size' => $request->selected_size,
                    'quantity' => $request->quantity
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error validating product: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Validate guest cart items.
     */
    public function validateCart(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'items' => 'required|array',
                'items.*.product_id' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.selected_size' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validatedItems = [];
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                if (!$product->stock) {
                    return response()->json([
                        'status' => 'error',
                        'message' => "Product {$product->name} is out of stock"
                    ], 400);
                }

                $validatedItems[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'imgURLs' => $product->imgURLs,
                    'selected_size' => $item['selected_size'],
                    'quantity' => $item['quantity']
                ];
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Cart validated successfully',
                'data' => [
                    'items' => $validatedItems
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error validating cart: ' . $e->getMessage()
            ], 500);
        }
    }
} 