<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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
                'payment_method' => 'required|string|in:credit_card,paypal,cash_on_delivery',
                'payment_details' => 'required_unless:payment_method,cash_on_delivery',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get user's cart items
            $cartItems = CartItem::where('user_id', Auth::id())
                ->with('product')
                ->get();

            if ($cartItems->isEmpty()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cart is empty'
                ], 400);
            }

            // Check if all products are in stock
            foreach ($cartItems as $item) {
                if (!$item->product->stock) {
                    return response()->json([
                        'status' => 'error',
                        'message' => "Product '{$item->product->name}' is out of stock"
                    ], 400);
                }
            }

            // Calculate total price
            $totalPrice = $cartItems->sum(function ($item) {
                return $item->quantity * $item->price;
            });

            // Begin transaction
            DB::beginTransaction();

            try {
                // Create order
                $order = Order::create([
                    'user_id' => Auth::id(),
                    'total_price' => $totalPrice,
                    'status' => 'pending',
                    'date' => now(),
                    'shipping_address' => $request->shipping_address,
                    'payment_method' => $request->payment_method,
                    'payment_details' => $request->payment_method === 'cash_on_delivery' ? null : $request->payment_details
                ]);

                // Create order items
                foreach ($cartItems as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->price
                    ]);
                }

                // Clear cart
                CartItem::where('user_id', Auth::id())->delete();

                DB::commit();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Order created successfully',
                    'data' => $order->load('items.product')
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
}
