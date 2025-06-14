<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $categories = Category::getAllCategories();
            
            // Update product count for each category
            $categories = $categories->map(function ($category) {
                $category->productCount = $category->products()->count();
                return $category;
            });

            return response()->json($categories);
        } catch (\Exception $e) {
            Log::error('Error fetching categories: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch categories'], 500);
        }
    }

    /**
     * Get a specific category
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        try {
            $category->productCount = $category->products()->count();
            return response()->json($category);
        } catch (\Exception $e) {
            Log::error('Error fetching category: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch category'], 500);
        }
    }

    /**
     * Store a newly created category (admin only).
     * This method is not implemented here as it's handled by AdminController.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'imageUrl' => 'required|string'
            ]);

            $category = Category::create($validatedData);
            return response()->json($category, 201);
        } catch (\Exception $e) {
            Log::error('Error creating category: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create category'], 500);
        }
    }

    /**
     * Update an existing category (admin only).
     * This method is not implemented here as it's handled by AdminController.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'string|max:255',
                'description' => 'string',
                'imageUrl' => 'string'
            ]);

            $category->update($validatedData);
            return response()->json($category);
        } catch (\Exception $e) {
            Log::error('Error updating category: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update category'], 500);
        }
    }

    /**
     * Delete a category (admin only).
     * This method is not implemented here as it's handled by AdminController.
     */
    public function destroy(Category $category)
    {
        try {
            $category->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting category: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete category'], 500);
        }
    }
}
