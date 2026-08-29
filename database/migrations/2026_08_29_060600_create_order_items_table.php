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
        Schema::create('order_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('order_id');
            $table->string('variant_id', 50)->nullable();
            $table->string('product_name');
            $table->string('variant_name');
            $table->integer('quantity');
            $table->bigInteger('price');
            $table->timestamp('created_at')->nullable();

            $table->foreign('order_id')
                ->references('id')
                ->on('orders')
                ->cascadeOnDelete();

            $table->foreign('variant_id')
                ->references('id')
                ->on('variants')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
