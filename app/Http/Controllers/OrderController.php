<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index()
    {
        try {
            $orders = Auth::user()->orders()
                ->with(['items.product'])
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return response()->json([
                'status' => 'success',
                'data' => $orders
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching orders: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new order from the user's cart.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'shipping_address' => 'required|string',
                'payment_method' => 'required|string|in:creditCard,paypal,cashOnDelivery',
                'email' => 'required|email',
                'total_amount' => 'required|numeric|min:0',
                'items' => 'required|array|min:1',
                'items.*.product_id' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0',
                'items.*.selected_size' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Begin transaction
            DB::beginTransaction();

            try {
                // Create order with appropriate status based on payment method
                $status = match($request->payment_method) {
                    'creditCard' => 'paid',      // Credit card payments are confirmed via Stripe
                    'cashOnDelivery' => 'pending', // COD orders start as pending
                    'paypal' => 'pending',       // PayPal (for future implementation)
                    default => 'pending'
                };

                $order = Order::create([
                    'user_id' => Auth::id(),
                    'email' => $request->email,
                    'total_price' => $request->total_amount,
                    'status' => $status,
                    'shipping_address' => $request->shipping_address,
                    'payment_method' => $request->payment_method,
                    'date' => now()
                ]);

                // Create order items
                foreach ($request->items as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product_id'],
                        'quantity' => $item['quantity'],
                        'price' => $item['price'],
                        'selected_size' => $item['selected_size']
                    ]);
                }

                // Clear cart
                CartItem::where('user_id', Auth::id())->delete();

                // Generate invoice
                $invoice = Invoice::create([
                    'order_id' => $order->id,
                    'date' => now(),
                    'total_amount' => $request->total_amount
                ]);

                DB::commit();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Order created successfully',
                    'data' => [
                        'order' => $order->load('items.product'),
                        'invoice' => $invoice
                    ]
                ], 201);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error creating order: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified order.
     */
    public function show(string $id)
    {
        try {
            $order = Order::with(['items.product', 'invoice'])
                ->where('id', $id)
                ->where('user_id', Auth::id())
                ->firstOrFail();

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
     * Cancel an order if it's still pending.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'status' => 'required|string|in:cancelled',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only cancellation is allowed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $order = Order::where('id', $id)
                ->where('user_id', Auth::id())
                ->where('status', 'pending')
                ->firstOrFail();

            $order->status = 'cancelled';
            $order->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Order cancelled successfully',
                'data' => $order
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error cancelling order: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * This method is not allowed for regular users.
     */
    public function destroy(string $id)
    {
        return response()->json([
            'status' => 'error',
            'message' => 'Deleting orders is not allowed'
        ], 403);
    }

    /**
     * Create a new order for a guest user.
     */
    public function guestOrder(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'fullName' => 'required|string',
                'address' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string',
                'zip' => 'required|string',
                'phone' => 'required|string',
                'country' => 'required|string',
                'payment_method' => 'required|string',
                'items' => 'required|array',
                'items.*.product_id' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.selected_size' => 'required|string',
                'create_account' => 'boolean',
                'password' => 'required_if:create_account,true|string|min:8'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            try {
                // Create user account if requested
                $user = null;
                if ($request->create_account) {
                    // Check if email already exists
                    if (User::where('email', $request->email)->exists()) {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Email already exists. Please log in or use a different email.'
                        ], 400);
                    }

                    $user = User::create([
                        'name' => $request->fullName,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                        'type' => 'client',
                        'address' => $request->address,
                        'city' => $request->city,
                        'state' => $request->state,
                        'zip_code' => $request->zip,
                        'phone_number' => $request->phone,
                        'country' => $request->country
                    ]);
                }

                // Create the order
                $order = new Order([
                    'user_id' => $user ? $user->id : null,
                    'guest_email' => $user ? null : $request->email,
                    'status' => 'pending',
                    'shipping_address' => json_encode([
                        'fullName' => $request->fullName,
                        'address' => $request->address,
                        'city' => $request->city,
                        'state' => $request->state,
                        'zip' => $request->zip,
                        'phone' => $request->phone,
                        'country' => $request->country
                    ]),
                    'payment_method' => $request->payment_method,
                    'payment_status' => 'pending'
                ]);
                $order->save();

                // Add order items
                $total = 0;
                foreach ($request->items as $item) {
                    $product = Product::findOrFail($item['product_id']);
                    
                    // Check stock
                    if (!$product->stock) {
                        throw new \Exception("Product {$product->name} is out of stock");
                    }

                    $orderItem = new OrderItem([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $item['quantity'],
                        'price' => $product->price,
                        'selected_size' => $item['selected_size']
                    ]);
                    $orderItem->save();

                    $total += $product->price * $item['quantity'];
                }

                // Update order total
                $order->total = $total;
                $order->save();

                DB::commit();

                // Return success response with token if account was created
                return response()->json([
                    'status' => 'success',
                    'message' => 'Order placed successfully',
                    'data' => [
                        'order_id' => $order->id,
                        // 'token' => $user ? JWTAuth::fromUser($user) : null
                    ]
                ]);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error creating order: ' . $e->getMessage()
            ], 500);
        }
    }
}
