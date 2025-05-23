<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderitemController extends Controller
{
    /**
     * Display a listing of order items for a specific order.
     */
    public function viewItemsOnPreviousOrder(Request $request)
    {
        try {
            // Validate that order_id is provided
            $request->validate([
                'order_id' => 'required|exists:orders,id'
            ]);
            
            // Check if the order belongs to the authenticated user
            $order = Order::where('id', $request->order_id)
                ->where('user_id', Auth::id())
                ->firstOrFail();
            
            // Get order items
            $orderItems = OrderItem::where('order_id', $request->order_id)
                ->with('product')
                ->get();
            
            return response()->json([
                'status' => 'success',
                'data' => $orderItems
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching order items: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified order item.
     */
    public function showProductDetails(string $id)
    {
        try {
            // Find the order item
            $orderItem = OrderItem::with('product')
                ->findOrFail($id);
            
            // Check if the order belongs to the authenticated user
            $order = Order::where('id', $orderItem->order_id)
                ->where('user_id', Auth::id())
                ->firstOrFail();
            
            return response()->json([
                'status' => 'success',
                'data' => $orderItem
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order item not found'
            ], 404);
        }
    }

    /**
     * These methods are not allowed for regular users as order items
     * should only be created, updated, or deleted as part of order processing.
     */
    public function store(Request $request)
    {
        return response()->json([
            'status' => 'error',
            'message' => 'Creating individual order items is not allowed'
        ], 403);
    }

    public function update(Request $request, string $id)
    {
        return response()->json([
            'status' => 'error',
            'message' => 'Updating order items is not allowed'
        ], 403);
    }

    public function destroy(string $id)
    {
        return response()->json([
            'status' => 'error',
            'message' => 'Deleting order items is not allowed'
        ], 403);
    }
}
