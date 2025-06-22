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
        Schema::table('users', function (Blueprint $table) {
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            // Rename username to name if it hasn't been done already
            if (Schema::hasColumn('users', 'username')) {
                $table->renameColumn('username', 'name');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['city', 'country']);
            // Reverse the rename if it was done
            if (Schema::hasColumn('users', 'name')) {
                $table->renameColumn('name', 'username');
            }
        });
    }
}; 