<?php

// app/Http/Controllers/StripeController.php

namespace App\Http\Controllers;

use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\PaymentIntent;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

class StripeController extends Controller
{
    private $stripeKey;

    public function __construct()
    {
        $this->stripeKey = config('services.stripe.secret');
        
        if (empty($this->stripeKey)) {
            throw new \Exception('Stripe secret key is not configured');
        }

        Stripe::setApiKey($this->stripeKey);
    }

    public function index()
    {

    }

    public function createPaymentIntent(Request $request)
    {
        try {
            $validated = $request->validate([
                'amount' => 'required|numeric|min:1'
            ]);

            $amount = round($validated['amount']);
            
            $paymentIntent = PaymentIntent::create([
                'amount' => $amount,
                'currency' => 'mad',
                'payment_method_types' => ['card']
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret
            ]);

        } catch (\Exception $e) {
            Log::error('Stripe Error:', [
                'message' => $e->getMessage()
            ]);
            return response()->json([
                'error' => 'Payment processing error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function checkout(Request $request)
    {
        try {
            $validated = $request->validate([
                'items' => 'required|array',
                'items.*.id' => 'required|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0'
            ]);

            $lineItems = [];
            $totalAmount = 0;

            foreach ($validated['items'] as $item) {
                $amount = round($item['price'] * 100); // Convert to cents
                $totalAmount += $amount * $item['quantity'];
                
                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'mad',
                        'product_data' => [
                            'name' => "Product ID: {$item['id']}", // You might want to fetch the actual product name
                        ],
                        'unit_amount' => $amount,
                    ],
                    'quantity' => $item['quantity'],
                ];
            }

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => url('/api/stripe/success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => url('/api/stripe/cancel'),
            ]);

            return response()->json([
                'id' => $session->id,
                'url' => $session->url
            ]);

        } catch (\Exception $e) {
            Log::error('Stripe Checkout Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'Failed to create checkout session',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function success()
    {
        return response()->json(['message' => 'Payment successful!']);
    }

    public function cancel()
    {
        return response()->json(['message' => 'Payment cancelled.']);
    }
}

