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
            Log::error('Stripe secret key is not configured');
            throw new \Exception('Stripe secret key is not configured. Please check your .env file.');
        }

        try {
            Stripe::setApiKey($this->stripeKey);
            // Test the Stripe connection with a simple API call
            \Stripe\Balance::retrieve();
        } catch (\Exception $e) {
            Log::error('Stripe initialization error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw new \Exception('Failed to initialize Stripe: ' . $e->getMessage());
        }
    }

    public function index()
    {

    }

    public function createPaymentIntent(Request $request)
    {
        try {
            Log::info('Creating payment intent', ['request' => $request->all()]);
            
            $validated = $request->validate([
                'amount' => 'required|numeric|min:1',
                'currency' => 'required|string|in:mad',
                'email' => 'required|email',
                'payment_method_types' => 'array',
                'shipping' => 'array'
            ]);

            $amount = round($validated['amount'] * 100); // Convert to cents
            
            Log::info('Creating payment intent with data', [
                'amount' => $amount,
                'currency' => $validated['currency'],
                'payment_method_types' => $validated['payment_method_types'] ?? ['card', 'link']
            ]);

            $paymentIntentData = [
                'amount' => $amount,
                'currency' => $validated['currency'],
                'payment_method_types' => $validated['payment_method_types'] ?? ['card', 'link'],
                'metadata' => [
                    'order_id' => $request->input('order_id'),
                    'customer_email' => $request->input('email')
                ]
            ];

            // Add shipping information if provided
            if ($request->has('shipping')) {
                $paymentIntentData['shipping'] = $request->input('shipping');
            }

            $paymentIntent = PaymentIntent::create($paymentIntentData);

            Log::info('Payment intent created successfully', [
                'payment_intent_id' => $paymentIntent->id,
                'client_secret' => $paymentIntent->client_secret
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret
            ]);

        } catch (\Stripe\Exception\ApiErrorException $e) {
            Log::error('Stripe API Error', [
                'error' => $e->getMessage(),
                'type' => get_class($e),
                'code' => $e->getStripeCode()
            ]);
            return response()->json([
                'error' => 'Stripe API Error',
                'message' => $e->getMessage()
            ], 400);
        } catch (\Exception $e) {
            Log::error('Payment Intent Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
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

    public function success(Request $request)
    {
        try {
            $paymentIntentId = $request->input('payment_intent');
            $paymentIntent = PaymentIntent::retrieve($paymentIntentId);

            if ($paymentIntent->status === 'succeeded') {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Payment completed successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Payment has not been completed'
                ], 400);
            }
        } catch (\Exception $e) {
            Log::error('Error in success callback', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to verify payment status'
            ], 500);
        }
    }

    public function cancel()
    {
        return response()->json([
            'status' => 'cancelled',
            'message' => 'Payment was cancelled'
        ]);
    }
}

