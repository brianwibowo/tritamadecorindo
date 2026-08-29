<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $galleries = [
            [
                'title' => 'Pemasangan Kaca Film Gedung & Rumah Penolak Panas',
                'caption' => 'Aplikasi kaca film Riben & Sparta dengan penolakan sinar UV 99% dan peredam panas terik matahari pada jendela gedung perkantoran, ruko, dan rumah tinggal.',
                'category' => 'kaca_film',
                'category_label' => 'Kaca Film',
                'image' => '/images/products/kaca-film-riben.webp',
                'active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Pemasangan Kaca Film Sparta Silver Reflektif Facade Kantor',
                'caption' => 'Instalasi kaca film sparta efek mirror reflektif pada facade kaca luar gedung bertingkat, memberikan privasi siang hari dan suasana ruangan lebih sejuk.',
                'category' => 'kaca_film',
                'category_label' => 'Kaca Film',
                'image' => '/images/products/kaca-film-sparta.webp',
                'active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Sandblast Cutting Logo & Garis Partisi Ruang Rapat',
                'caption' => 'Pengerjaan cutting stiker sandblast motif logo perusahaan presisi tinggi pada pintu dan sekat kaca partisi ruang direksi.',
                'category' => 'sandblast',
                'category_label' => 'Sandblast & Sticker',
                'image' => '/images/products/sandblast-cutting-logo.webp',
                'active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Stiker Kaca Buram Sandblast Polos Sekat Kantor',
                'caption' => 'Pemasangan sandblast buram es polos untuk menjaga privasi kerja antar ruangan dengan pencahayaan alami tetap terjaga maksimal.',
                'category' => 'sandblast',
                'category_label' => 'Sandblast & Sticker',
                'image' => '/images/products/sandblast-polos.webp',
                'active' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Cutting Sticker Kaligrafi Artistik Kaca Masjid & Hunian',
                'caption' => 'Pemasangan cutting sticker ornamen kaligrafi gold vinyl berkualitas tinggi pada pintu kaca dan dinding mushola/hunian.',
                'category' => 'sandblast',
                'category_label' => 'Sandblast & Sticker',
                'image' => '/images/products/cutting-sticker-kaligrafi.webp',
                'active' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'Instalasi Wallpaper Dinding Custom 3D Living Room',
                'caption' => 'Pemasangan wallpaper 3D berdimensi relief tajam pada dinding aksen ruang keluarga, memberikan nuansa mewah dan megah.',
                'category' => 'wallpaper',
                'category_label' => 'Wallpaper',
                'image' => '/images/products/wallpaper-custom-3d.webp',
                'active' => true,
                'sort_order' => 6,
            ],
            [
                'title' => 'Wallpaper Pabrikan Roll Motif Tekstur Elegan',
                'caption' => 'Pemasangan wallpaper roll bermotif timbul klasik modern dengan sambungan presisi dan rapi tanpa celah.',
                'category' => 'wallpaper',
                'category_label' => 'Wallpaper',
                'image' => '/images/products/wallpaper-pabrikan.webp',
                'active' => true,
                'sort_order' => 7,
            ],
            [
                'title' => 'Huruf Timbul Laser Akrilik LED Backlight Lobby Kantor',
                'caption' => 'Pembuatan dan pemasangan signage huruf timbul akrilik dengan pencahayaan LED backlight hangat pada area resepsionis perusahaan.',
                'category' => 'signage',
                'category_label' => 'Signage & Branding',
                'image' => '/images/products/huruf-timbul-akrilik.webp',
                'active' => true,
                'sort_order' => 8,
            ],
            [
                'title' => 'Digital Sticker Printing & Branding Kaca Toko',
                'caption' => 'Cetak stiker vinyl resolusi tinggi dan laminasi pelindung untuk branding kaca ruko, etalase toko, dan partisi kantor.',
                'category' => 'signage',
                'category_label' => 'Signage & Branding',
                'image' => '/images/products/sticker-printing.webp',
                'active' => true,
                'sort_order' => 9,
            ],
            [
                'title' => 'Instalasi Roller Blinds Blackout di Kamar Tidur & Ruang Kerja',
                'caption' => 'Pemasangan tirai gulung roller blind blackout 100% penahan sinar matahari terik, praktis dan berpenampilan minimalis modern.',
                'category' => 'blinds',
                'category_label' => 'Blinds & Gorden',
                'image' => '/images/products/roller-blinds-blackout.webp',
                'active' => true,
                'sort_order' => 10,
            ],
            [
                'title' => 'Pemasangan Vertical Blinds Ruang Meeting & Kantor',
                'caption' => 'Tirai bilah vertikal fleksibel pengatur arah cahaya untuk jendela lebar ruang konferensi dan perkantoran.',
                'category' => 'blinds',
                'category_label' => 'Blinds & Gorden',
                'image' => '/images/products/vertical-blinds.webp',
                'active' => true,
                'sort_order' => 11,
            ],
        ];

        Gallery::truncate();

        foreach ($galleries as $item) {
            Gallery::create($item);
        }
    }
}
