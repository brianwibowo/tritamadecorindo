<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(2, true);

        return [
            'id' => 'cat-'.Str::uuid(),
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'description' => fake()->sentence(),
            'active' => true,
            'created_at' => now(),
        ];
    }
}
