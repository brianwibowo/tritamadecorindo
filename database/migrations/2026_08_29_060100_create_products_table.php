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
        Schema::create('products', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->text('summary')->nullable();
            $table->string('category_id', 50);
            $table->json('images')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
