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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cart_id', 100);
            $table->string('variant_id', 50);
            $table->integer('quantity')->default(1);

            $table->foreign('cart_id')
                ->references('id')
                ->on('carts')
                ->cascadeOnDelete();

            $table->foreign('variant_id')
                ->references('id')
                ->on('variants');

            $table->unique(['cart_id', 'variant_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
