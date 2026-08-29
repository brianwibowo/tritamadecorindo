<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'id' => 'prod-'.Str::uuid(),
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'description' => fake()->paragraph(),
            'summary' => fake()->sentence(),
            'category_id' => Category::factory(),
            'images' => [],
            'active' => true,
        ];
    }
}
