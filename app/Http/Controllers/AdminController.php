<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{



    // Get dashboard statistics for admin
    // Returns counts of users, orders, products, and revenue statistics
    public function getDashboardStats()
    {
        // Count total users (clients only)
        $userCount = User::where('type', 'client')->count();

        // Count total orders
        $orderCount = Order::count();

        // Count total products
        $productCount = Product::count();

        // Calculate total revenue
        $totalRevenue = Order::sum('total_amount');

        // Get recent orders (last 5)
        $recentOrders = Order::with(['user', 'orderItems'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Get monthly revenue for the current year
        $monthlyRevenue = Order::selectRaw('MONTH(created_at) as month, SUM(total_amount) as revenue')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('revenue', 'month')
            ->toArray();

        // Fill in missing months with zero
        $formattedMonthlyRevenue = [];
        for ($i = 1; $i <= 12; $i++) {
            $formattedMonthlyRevenue[$i] = $monthlyRevenue[$i] ?? 0;
        }

        return response()->json([
            'stats' => [
                'userCount' => $userCount,
                'orderCount' => $orderCount,
                'productCount' => $productCount,
                'totalRevenue' => $totalRevenue,
            ],
            'recentOrders' => $recentOrders,
            'monthlyRevenue' => $formattedMonthlyRevenue,
        ]);
    }

    /* List all users with optional filtering and pagination
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function listUsers(Request $request)
    {
        $query = User::query();

        // Apply type filter if provided
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Apply search if provided
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Get paginated results
        $perPage = $request->input('per_page', 10);
        $users = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json($users);
    }

    /**
     * Create a new user (admin or client)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'type' => 'required|in:admin,client',
            'address' => 'nullable|string',
            'phone_number' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => $request->type,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    /**
     * Update a user's information
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'username' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            'type' => 'sometimes|required|in:admin,client',
            'address' => 'nullable|string',
            'phone_number' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Update password if provided
        if ($request->has('password') && !empty($request->password)) {
            $user->password = Hash::make($request->password);
        }

        // Update other fields
        if ($request->has('username'))
            $user->username = $request->username;
        if ($request->has('email'))
            $user->email = $request->email;
        if ($request->has('type'))
            $user->type = $request->type;
        if ($request->has('address'))
            $user->address = $request->address;
        if ($request->has('phone_number'))
            $user->phone_number = $request->phone_number;

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    /**
     * Delete a user
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        // Prevent deleting the authenticated user
        if (Auth::id() == $id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You cannot delete your own account'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Toggle user role between admin and client
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleUserRole($id)
    {
        $user = User::findOrFail($id);

        // Prevent changing the authenticated user's role
        if (Auth::id() == $id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You cannot change your own role'
            ], 403);
        }

        // Toggle the role
        $user->type = ($user->type === 'admin') ? 'client' : 'admin';
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User role updated successfully',
            'user' => $user
        ]);
    }

    /**
     * Get order statistics
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOrderStats()
    {
        // Total orders
        $totalOrders = Order::count();

        // Orders by status
        $ordersByStatus = Order::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status')
            ->toArray();

        // Recent orders
        $recentOrders = Order::with(['user'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        // Revenue by day (last 7 days)
        $revenueByDay = Order::selectRaw('DATE(created_at) as date, SUM(total_amount) as revenue')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->pluck('revenue', 'date')
            ->toArray();

        return response()->json([
            'totalOrders' => $totalOrders,
            'ordersByStatus' => $ordersByStatus,
            'recentOrders' => $recentOrders,
            'revenueByDay' => $revenueByDay
        ]);
    }

    /**
     * Get product statistics
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProductStats()
    {
        // Total products
        $totalProducts = Product::count();

        // Products by category
        $productsByCategory = Product::select('category_id', DB::raw('count(*) as count'))
            ->groupBy('category_id')
            ->with('category')
            ->get()
            ->map(function ($item): array {
                return [
                    'category' => $item->category->name,
                    'count' => $item->count
                ];
            });

        // Low stock products (less than 10 items)
        $lowStockProducts = Product::where('stock', '<', 10)
            ->orderBy('stock')
            ->get();

        // Top selling products
        $topSellingProducts = Product::withCount([
            'orderItems as sales_count' => function ($query) {
                $query->select(DB::raw('SUM(quantity)'));
            }
        ])
            ->orderByDesc('sales_count')
            ->take(5)
            ->get();

        return response()->json([
            'totalProducts' => $totalProducts,
            'productsByCategory' => $productsByCategory,
            'lowStockProducts' => $lowStockProducts,
            'topSellingProducts' => $topSellingProducts
        ]);
    }



    // get all the product , and by filters 
    /**
     * List products for admin management with filters
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function listProducts(Request $request)
    {
        $query = Product::query();

        // search by name and category
        if ($request->has('search')) {

            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($Qr) use ($search) {
                        $Qr->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Get paginated results
        $perPage = $request->input('per_page', 10);
        $products = $query->orderBy('created_at', 'Desc')->paginate($perPage);

        return response()->json(
            $products
        );
    }


    /**
     * Create a new product
     */
    public function createProduct(Request $request)
    {
        \Log::info('Creating product with data:', $request->all());
        
        // Validate the data
        $ValidatePr = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|boolean',
            'imgURLs' => 'nullable|array',
            'imgURLs.*' => 'nullable|string|url',
            'category_id' => 'required|integer|exists:categories,id',
        ]);

        // if validation Fails
        if ($ValidatePr->fails()) {
            \Log::error('Product validation failed:', $ValidatePr->errors()->toArray());
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $ValidatePr->errors()
            ], 422);
        }

        try {
            // Ensure imgURLs is an array
            $imgURLs = $request->imgURLs ?? [];
            if (!is_array($imgURLs)) {
                $imgURLs = [$imgURLs];
            }

            // Filter out any null or empty URLs
            $imgURLs = array_filter($imgURLs, function($url) {
                return !empty($url) && is_string($url);
            });

            // Create the product
            $productData = [
                'name' => trim($request->name),
                'description' => trim($request->description),
                'price' => (float) $request->price,
                'stock' => (bool) $request->stock,
                'imgURLs' => array_values($imgURLs), // Reindex array
                'category_id' => (int) $request->category_id,
            ];

            \Log::info('Creating product with processed data:', $productData);

            $Product = Product::create($productData);

            // Load the category relationship
            $Product->load('category');

            \Log::info('Product created successfully:', $Product->toArray());

            // Success message
            return response()->json([
                'status' => 'success',
                'message' => 'Product created successfully',
                'product' => $Product
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Failed to create product:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], 500);
        }
    }




    /**
     * Update an existing product
     */
    public function updateProduct(Request $request, $id)
    {
        try {
            // find the product by Id
            $Product = Product::findOrFail($id);

            // Valide the data
            $ValidatePr = Validator::make($request->all(), [
                'name' => 'sometimes|required|string',
                'description' => 'sometimes|required|string|max:1000',
                'price' => 'sometimes|required|numeric|min:0',
                'stock' => 'sometimes|required|boolean',
                'imgURLs' => 'sometimes|nullable|array',
                'imgURLs.*' => 'sometimes|nullable|string',
                'category_id' => 'sometimes|required|exists:categories,id',
            ]);

            // if validation Fails
            if ($ValidatePr->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'validation failed',
                    'error' => $ValidatePr->errors()
                ], 422);
            }

            // Update fields if provided 
            if ($request->has('name'))
                $Product->name = $request->name;
            if ($request->has('description'))
                $Product->description = $request->description;
            if ($request->has('price'))
                $Product->price = $request->price;
            if ($request->has('stock'))
                $Product->stock = $request->stock;
            if ($request->has('imgURLs'))
                $Product->imgURLs = $request->imgURLs;
            if ($request->has('category_id'))
                $Product->category_id = $request->category_id;

            // save the changes
            $Product->save();

            // return Success response
            return response()->json([
                'status' => 'Success',
                'message' => 'Product updated successfully',
                'product' => $Product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    /**
     * Delete a product
     */
    public function deleteProduct($id)
    {

        try {
            // find the product by Id
            $Product = Product::findOrFail($id);
            $Product->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * List all categories for admin management
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function listCategories(Request $request)
    {
        try {
            // Get static categories instead of from database
            $categories = Category::getStaticCategories();
            
            // Apply search filter if provided
            if ($request->has('search') && !empty($request->search)) {
                $search = strtolower($request->search);
                $categories = array_filter($categories, function($category) use ($search) {
                    return strpos(strtolower($category['name']), $search) !== false ||
                           strpos(strtolower($category['description']), $search) !== false;
                });
            }
            
            // For each category, get the actual product count
            foreach ($categories as &$category) {
                $category['productCount'] = Product::where('category_id', $category['id'])->count();
            }
            
            return response()->json([
                'status' => 'success',
                'data' => array_values($categories),
                'pagination' => [
                    'total' => count($categories),
                    'per_page' => count($categories),
                    'current_page' => 1,
                    'last_page' => 1
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching categories: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get statistics about categories
     */
    public function getCategoryStats()
    {
        try {
            // Get static categories
            $categories = Category::getStaticCategories();
            $totalCategories = count($categories);
            
            // Get product counts for each category
            $categoriesWithProductCounts = [];
            $categoriesWithProducts = 0;
            
            foreach ($categories as $category) {
                $productCount = Product::where('category_id', $category['id'])->count();
                
                if ($productCount > 0) {
                    $categoriesWithProducts++;
                }
                
                $categoriesWithProductCounts[] = [
                    'id' => $category['id'],
                    'name' => $category['name'],
                    'products_count' => $productCount
                ];
            }
            
            // Sort by product count descending
            usort($categoriesWithProductCounts, function($a, $b) {
                return $b['products_count'] - $a['products_count'];
            });
            
            // Take top 5
            $popularCategories = array_slice($categoriesWithProductCounts, 0, 5);
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'total' => $totalCategories,
                    'with_products' => $categoriesWithProducts,
                    'empty' => $totalCategories - $categoriesWithProducts,
                    'popular' => $popularCategories
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching category statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all invoices with filtering and pagination
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getInvoices(Request $request)
    {
        try {
            $query = \App\Models\Invoice::with(['order', 'order.user']);

            // Filter by date range
            if ($request->has('start_date')) {
                $query->where('date', '>=', $request->start_date);
            }
            if ($request->has('end_date')) {
                $query->where('date', '<=', $request->end_date);
            }

            // Filter by user/client
            if ($request->has('user_id')) {
                $query->whereHas('order', function ($q) use ($request) {
                    $q->where('user_id', $request->user_id);
                });
            }

            // Filter by amount range
            if ($request->has('min_amount')) {
                $query->where('total_amount', '>=', $request->min_amount);
            }
            if ($request->has('max_amount')) {
                $query->where('total_amount', '<=', $request->max_amount);
            }

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
     * 
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getInvoiceDetails(string $id)
    {
        try {
            $invoice = \App\Models\Invoice::with([
                'order', 
                'order.user', 
                'order.orderItems.product'
            ])->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => $invoice
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invoice not found'
            ], 404);
        }
    }

    /**
     * Generate a new invoice for an order
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function generateInvoice(Request $request)
    {
        try {
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                'order_id' => 'required|exists:orders,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check if invoice already exists for this order
            $existingInvoice = \App\Models\Invoice::where('order_id', $request->order_id)->first();
            if ($existingInvoice) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invoice already exists for this order',
                    'invoice_id' => $existingInvoice->id
                ], 422);
            }

            // Get the order
            $order = \App\Models\Order::with('orderItems.product')->findOrFail($request->order_id);
            
            // Calculate total amount from order items
            $totalAmount = $order->orderItems->sum(function ($item) {
                return $item->quantity * $item->price;
            });

            // Create the invoice
            $invoice = \App\Models\Invoice::create([
                'order_id' => $order->id,
                'date' => now(),
                'total_amount' => $totalAmount
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Invoice generated successfully',
                'data' => $invoice
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error generating invoice: ' . $e->getMessage()
            ], 500);
        }
    }
}




