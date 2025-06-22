<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, modify the column to be a string to avoid enum constraints
        Schema::table('orders', function (Blueprint $table) {
            $table->string('status')->change();
        });

        // Update any existing statuses to match new format
        DB::table('orders')->where('status', 'completed')->update(['status' => 'delivered']);
        
        // Now add the check constraint for the new valid statuses
        DB::statement("ALTER TABLE orders ADD CONSTRAINT orders_status_check CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove the check constraint
        DB::statement("ALTER TABLE orders DROP CONSTRAINT orders_status_check");

        // Update statuses back to old format
        DB::table('orders')->where('status', 'delivered')->update(['status' => 'completed']);
        
        // Change back to enum
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('status', ['pending', 'processing', 'completed', 'cancelled'])->change();
        });
    }
}; 