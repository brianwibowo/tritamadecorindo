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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('buyer_id')->constrained('users');
            $table->bigInteger('total_amount');
            $table->string('payment_method', 50)->nullable();
            $table->string('payment_status', 50)->default('unpaid');
            $table->text('notes')->nullable();
            $table->string('shipping_name')->nullable();
            $table->text('shipping_address')->nullable();
            $table->string('shipping_phone')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
