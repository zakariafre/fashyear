<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a public listing of all categories.
     * This is used for the customer-facing category navigation.
     */
    public function listingCategories()
    {
        try {
            $categories = Category::withCount('products')
                ->whereHas('products', function($query) {
                    $query->where('stock', true);
                })
                ->get();
            
            return response()->json([
                'status' => 'success',
                'data' => $categories
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching categories'
            ], 500);
        }
    }

    /**
     * Display the specified category with its products.
     */
    public function showCategories(string $id)
    {
        try {
            $category = Category::findOrFail($id);
            $products = Product::where('category_id', $id)
                ->paginate(12);
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'category' => $category,
                    'products' => $products
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }
    }

    /**
     * Store a newly created category (admin only).
     * This method is not implemented here as it's handled by AdminController.
     */
    public function store(Request $request)
    {
        return response()->json([
            'status' => 'error',
            'message' => 'This endpoint is only available through the admin API'
        ], 403);
    }

    /**
     * Update an existing category (admin only).
     * This method is not implemented here as it's handled by AdminController.
     */
    public function update(Request $request, string $id)
    {
        return response()->json([
            'status' => 'error',
            'message' => 'This endpoint is only available through the admin API'
        ], 403);
    }

    /**
     * Delete a category (admin only).
     * This method is not implemented here as it's handled by AdminController.
     */
    public function destroy(string $id)
    {
        return response()->json([
            'status' => 'error',
            'message' => 'This endpoint is only available through the admin API'
        ], 403);
    }
   
}
