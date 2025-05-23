<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a public listing of products with optional filtering and pagination.
     * This is used for the customer-facing product catalog.
     */
    public function listingProducts(Request $request)
    {
        try {
            $query = Product::with('category');

            // Filter by category if provided
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            // Filter by price range if provided
            if ($request->has('min_price')) {
                $query->where('price', '>=', $request->min_price);
            }
            if ($request->has('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            // Filter by stock availability
            if ($request->has('in_stock')) {
                $inStock = filter_var($request->in_stock, FILTER_VALIDATE_BOOLEAN);
                $query->where('stock', $inStock);
            }

            // Search by name or description
            if ($request->has('search')) {
                $searchTerm = $request->search;
                $query->where(function($q) use ($searchTerm) {
                    $q->where('name', 'like', "%{$searchTerm}%")
                      ->orWhere('description', 'like', "%{$searchTerm}%");
                });
            }

            // Sort products
            $sortField = $request->input('sort_by', 'created_at');
            $sortDirection = $request->input('sort_direction', 'desc');
            
            // Validate sort field to prevent SQL injection
            $allowedSortFields = ['name', 'price', 'created_at'];
            if (in_array($sortField, $allowedSortFields)) {
                $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
            } else {
                $query->orderBy('created_at', 'desc');
            }

            // Only show products in stock for public catalog
            $query->where('stock', true);

            // Paginate results
            $perPage = $request->input('per_page', 12);
            $products = $query->paginate($perPage);

            return response()->json([
                'status' => 'success',
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching products: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified product with its category.
     */
    public function show(string $id)
    {
        try {
            $product = Product::with('category')->findOrFail($id);
            
            // Get related products from the same category
            $relatedProducts = Product::where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->take(4)
                ->get();
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'product' => $product,
                    'related_products' => $relatedProducts
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }
    }

    /**
     * Get featured products for homepage
     */
    public function getFeaturedProducts()
    {
        try {
            // Get newest products
            $newArrivals = Product::where('stock', true)
                ->orderBy('created_at', 'desc')
                ->take(8)
                ->get();
            
            // Get popular products (could be based on order count in a real app)
            $popular = Product::where('stock', true)
                ->inRandomOrder()
                ->take(8)
                ->get();
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'new_arrivals' => $newArrivals,
                    'popular' => $popular
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching featured products'
            ], 500);
        }
    }

    /**
     * Search products by name or description
     */
    public function searchProducts(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'query' => 'required|string|min:2',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $searchTerm = $request->query('query');
            
            $products = Product::where('name', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%")
                ->with('category')
                ->paginate(12);
            
            return response()->json([
                'status' => 'success',
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error searching products'
            ], 500);
        }
    }

    /**
     * Get products by category
     */
    public function getProductsByCategory(string $categoryId)
    {
        try {
            $category = Category::findOrFail($categoryId);
            
            $products = Product::where('category_id', $categoryId)
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
}
