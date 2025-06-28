<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update orders table
        Schema::table('orders', function (Blueprint $table) {
            // Add email column (nullable)
            $table->string('email')->nullable()->after('user_id');
            
            // Drop the old payment_method enum and recreate it
            $table->dropColumn('payment_method');
            $table->enum('payment_method', ['creditCard', 'paypal', 'cashOnDelivery'])->after('shipping_address');
            
            // Make date nullable and default to current timestamp
            $table->timestamp('date')->nullable()->default(now())->change();
        });

        // Update order_items table
        Schema::table('order_items', function (Blueprint $table) {
            // Add selected_size column
            $table->string('selected_size')->after('quantity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert orders table changes
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('email');
            
            // Revert payment_method enum
            $table->dropColumn('payment_method');
            $table->enum('payment_method', ['credit_card', 'paypal', 'cash_on_delivery']);
            
            // Revert date column
            $table->timestamp('date')->change();
        });

        // Revert order_items table changes
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropColumn('selected_size');
        });
    }
}; 