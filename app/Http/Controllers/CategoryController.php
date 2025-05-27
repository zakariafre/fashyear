<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     *
     * @return \Illuminate\Http\Response
     */
    public function listingCategories()
    {
        // Get static categories instead of from database
        $categories = Category::getStaticCategories();
        
        // For each category, get the actual product count
        foreach ($categories as &$category) {
            $category['productCount'] = Product::where('category_id', $category['id'])->count();
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $categories
        ]);
    }

    /**
     * Get a specific category
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showCategories($id)
    {
        // Get static categories
        $allCategories = Category::getStaticCategories();
        
        // Find the requested category
        $category = null;
        foreach ($allCategories as $cat) {
            if ($cat['id'] == $id) {
                $category = $cat;
                break;
            }
        }
        
        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }
        
        // Get the actual product count
        $category['productCount'] = Product::where('category_id', $category['id'])->count();
        
        return response()->json([
            'status' => 'success',
            'data' => $category
        ]);
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
