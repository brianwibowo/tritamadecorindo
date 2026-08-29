<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'id' => 'cat-wall-panel',
                'name' => 'Acoustic & Fluted Wall Panel',
                'slug' => 'acoustic-fluted-wall-panel',
                'description' => 'Panel dinding kayu beraksen 3D dan peredam akustik modern kualitas arsitektural.',
                'image' => '/images/products/cengkeh-maluku.webp',
                'active' => true,
            ],
            [
                'id' => 'cat-custom-blinds',
                'name' => 'Custom Blinds & Motorized Drapery',
                'slug' => 'custom-blinds-motorized-drapery',
                'description' => 'Tirai jendela custom, motorized roller blinds, motorized sheer, dan blackout premium.',
                'image' => '/images/products/pala-banda.webp',
                'active' => true,
            ],
            [
                'id' => 'cat-luxury-flooring',
                'name' => 'Luxury SPC & Engineered Wood Flooring',
                'slug' => 'luxury-spc-engineered-wood-flooring',
                'description' => 'Lantai SPC herringbone anti-air dan engineered hardwood oak standar hunian mewah.',
                'image' => '/images/products/kayu-manis-kerinci.webp',
                'active' => true,
            ],
            [
                'id' => 'cat-architectural-decor',
                'name' => 'Architectural Moldings & Ceiling Baffles',
                'slug' => 'architectural-moldings-ceiling-baffles',
                'description' => 'Profil lis dinding wainscoting, ceiling baffle akustik, dan WPC wall cladding interior.',
                'image' => '/images/products/vanilla-beans.webp',
                'active' => true,
            ],
        ];

        foreach ($categories as $data) {
            Category::updateOrCreate(['id' => $data['id']], $data);
        }
    }
}
