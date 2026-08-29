<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Variant>
 */
class VariantFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => 'var-'.Str::uuid(),
            'product_id' => Product::factory(),
            'name' => fake()->word(),
            'price' => fake()->numberBetween(10000, 500000),
            'stock' => fake()->numberBetween(0, 100),
            'images' => [],
            'attributes' => [],
        ];
    }
}
