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
        Schema::table('orders', function (Blueprint $table) {
            // Drop and recreate payment_method enum with correct values
            $table->dropColumn('payment_method');
            $table->enum('payment_method', ['credit_card', 'paypal', 'cash_on_delivery'])->after('shipping_address');
            
            // Add payment_status field
            $table->enum('payment_status', ['pending', 'processing', 'completed', 'cancelled'])->default('pending')->after('payment_method');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Revert payment_method enum
            $table->dropColumn('payment_method');
            $table->enum('payment_method', ['creditCard', 'paypal', 'cashOnDelivery']);
            
            // Remove payment_status field
            $table->dropColumn('payment_status');
        });
    }
}; 