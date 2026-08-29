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
        Schema::create('variants', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('product_id', 50);
            $table->string('name')->nullable();
            $table->bigInteger('price');
            $table->integer('stock')->default(0);
            $table->json('images')->nullable();
            $table->json('attributes')->nullable();

            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variants');
    }
};
