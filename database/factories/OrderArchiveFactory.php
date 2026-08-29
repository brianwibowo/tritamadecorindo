<?php

namespace Database\Factories;

use App\Models\OrderArchive;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OrderArchive>
 */
class OrderArchiveFactory extends Factory
{
    protected $model = OrderArchive::class;

    public function definition(): array
    {
        $projectTypes = [
            'Pemasangan Kaca Film',
            'Sandblast Cutting Motif Logo',
            'Wallpaper Dinding Custom 3D',
            'Roller Blind Blackout',
            'Vertical Blind Kantor',
            'Huruf Timbul & Signage Akrilik',
        ];

        $statuses = ['survey', 'in_progress', 'completed', 'cancelled'];

        return [
            'order_number' => OrderArchive::generateOrderNumber().'-'.fake()->unique()->numerify('###'),
            'customer_name' => fake()->name().' ('.fake()->company().')',
            'customer_phone' => fake()->numerify('0812-####-####'),
            'customer_address' => fake()->address(),
            'project_type' => fake()->randomElement($projectTypes),
            'details' => fake()->sentence(8),
            'total_amount' => fake()->numberBetween(500000, 15000000),
            'status' => fake()->randomElement($statuses),
            'installation_date' => fake()->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'notes' => fake()->sentence(5),
        ];
    }
}
