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
                'id' => 'cat-kaca-film',
                'name' => 'Kaca Film',
                'slug' => 'kaca-film',
                'description' => 'Kaca film tolak panas matahari, anti-UV, privasi riben, sparta reflektif, dan one way untuk gedung, kantor, ruko, serta rumah tinggal.',
                'image' => '/images/products/kaca-film-riben.webp',
                'active' => true,
            ],
            [
                'id' => 'cat-sandblast-cutting',
                'name' => 'Sandblast & Cutting Sticker',
                'slug' => 'sandblast-cutting-sticker',
                'description' => 'Stiker kaca buram sandblast polos, cutting logo perusahaan, dan cutting sticker kaligrafi presisi untuk partisi dan pintu kaca.',
                'image' => '/images/products/sandblast-cutting-logo.webp',
                'active' => true,
            ],
            [
                'id' => 'cat-wallpaper',
                'name' => 'Wallpaper Dinding',
                'slug' => 'wallpaper-dinding',
                'description' => 'Wallpaper pabrikan motif roll elegan dan wallpaper custom 3D dinding visual relief untuk rumah tinggal, hotel, dan kantor.',
                'image' => '/images/products/wallpaper-custom-3d.webp',
                'active' => true,
            ],
            [
                'id' => 'cat-branding-signage',
                'name' => 'Branding Visual & Signage',
                'slug' => 'branding-visual-signage',
                'description' => 'Huruf timbul laser cutting akrilik LED, neon box, signage resepsionis, dan digital printing stiker branding toko & kendaraan.',
                'image' => '/images/products/huruf-timbul-akrilik.webp',
                'active' => true,
            ],
            [
                'id' => 'cat-window-blinds',
                'name' => 'Roller & Vertical Blinds',
                'slug' => 'roller-vertical-blinds',
                'description' => 'Tirai modern pengatur cahaya: roller blinds blackout/dimout dan vertical blinds kantor berkualitas tinggi.',
                'image' => '/images/products/roller-blinds-blackout.webp',
                'active' => true,
            ],
            [
                'id' => 'cat-gorden',
                'name' => 'Gorden Premium',
                'slug' => 'gorden-premium',
                'description' => 'Gorden blackout penahan sinar matahari dan gorden standar berbagai corak motif mewah untuk hunian dan komersial.',
                'image' => '/images/products/gorden-blackout.webp',
                'active' => true,
            ],
        ];

        foreach ($categories as $data) {
            Category::updateOrCreate(['id' => $data['id']], $data);
        }
    }
}
