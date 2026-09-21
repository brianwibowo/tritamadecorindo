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
                'title' => 'Pemasangan Kaca Film Balkon & Hunian Tinggal Penolak Panas',
                'caption' => 'Aplikasi kaca film tolak panas matahari dengan proteksi sinar UV 99% pada jendela dan pintu kaca balkon lantai dua hunian modern.',
                'category' => 'kaca_film',
                'category_label' => 'Kaca Film',
                'image' => '/images/products/hero-banner.webp',
                'images' => [
                    '/images/products/hero-banner.webp',
                    '/images/products/kaca-film-riben.webp',
                    '/images/products/kaca-film-sparta.webp',
                ],
                'active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Pemasangan Kaca Film Sparta & One Way Vision Gedung',
                'caption' => 'Instalasi kaca film sparta efek mirror reflektif dan one way vision pada facade kaca gedung, memberikan privasi siang hari dan suasana ruangan lebih sejuk.',
                'category' => 'kaca_film',
                'category_label' => 'Kaca Film',
                'image' => '/images/products/kaca-film-sparta.webp',
                'images' => [
                    '/images/products/kaca-film-sparta.webp',
                    '/images/products/kaca-film-oneway.webp',
                    '/images/products/kaca-film-rainbow.webp',
                ],
                'active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Sandblast Cutting Logo Perusahaan ADR Pintu Kaca Kantor',
                'caption' => 'Pengerjaan cutting stiker sandblast motif logo bulat perusahaan presisi tinggi pada pintu kaca dan sekat partisi koridor kantor direksi.',
                'category' => 'sandblast',
                'category_label' => 'Sandblast & Sticker',
                'image' => '/images/products/sandblast-cutting-logo.webp',
                'images' => [
                    '/images/products/sandblast-cutting-logo.webp',
                    '/images/products/sticker-gradasi-frosted.webp',
                ],
                'active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Sandblast Cutting Motif Garis Modern Ruang Rapat Kantor',
                'caption' => 'Pemasangan sandblast cutting striping garis horisontal elegan untuk partisi kaca ruang meeting guna memberikan privasi visual tanpa menggelapkan ruangan.',
                'category' => 'sandblast',
                'category_label' => 'Sandblast & Sticker',
                'image' => '/images/products/sticker-gradasi-frosted.webp',
                'images' => [
                    '/images/products/sticker-gradasi-frosted.webp',
                    '/images/products/sandblast-polos.webp',
                ],
                'active' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Stiker Kaca Buram Sandblast Polos Sekat Partisi Ruangan',
                'caption' => 'Pemasangan sandblast buram es polos untuk menjaga privasi kerja antar ruangan dengan pencahayaan alami tetap tersebar merata.',
                'category' => 'sandblast',
                'category_label' => 'Sandblast & Sticker',
                'image' => '/images/products/sandblast-polos.webp',
                'images' => [
                    '/images/products/sandblast-polos.webp',
                    '/images/products/sticker-gradasi-frosted.webp',
                ],
                'active' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'Cutting Sticker Ornamen Kaligrafi Kaca Mushola & Hunian',
                'caption' => 'Pemasangan cutting sticker ornamen kaligrafi dan pola geometris islami berkualitas tinggi pada pintu kaca dan jendela mushola.',
                'category' => 'sandblast',
                'category_label' => 'Sandblast & Sticker',
                'image' => '/images/products/cutting-sticker-kaligrafi.webp',
                'images' => [
                    '/images/products/cutting-sticker-kaligrafi.webp',
                ],
                'active' => true,
                'sort_order' => 6,
            ],
            [
                'title' => 'Instalasi Wallpaper Dinding Custom 3D Kamar Tidur Anak',
                'caption' => 'Pemasangan wallpaper custom 3D dinding visual karakter animasi pada kamar tidur anak dengan sambungan presisi dan bahan aman tidak berbau.',
                'category' => 'wallpaper',
                'category_label' => 'Wallpaper',
                'image' => '/images/products/wallpaper-custom-3d.webp',
                'images' => [
                    '/images/products/wallpaper-custom-3d.webp',
                    '/images/products/wallpaper-3d-roll.webp',
                ],
                'active' => true,
                'sort_order' => 7,
            ],
            [
                'title' => 'Wallpaper Pabrikan Roll Motif Tekstur Timbul Elegan',
                'caption' => 'Pemasangan wallpaper roll impor bermotif timbul klasik modern dengan kerapian tinggi untuk ruang tamu dan lounge hotel.',
                'category' => 'wallpaper',
                'category_label' => 'Wallpaper',
                'image' => '/images/products/wallpaper-pabrikan.webp',
                'images' => [
                    '/images/products/wallpaper-pabrikan.webp',
                    '/images/products/wallpaper-3d-roll.webp',
                ],
                'active' => true,
                'sort_order' => 8,
            ],
            [
                'title' => 'Signage Huruf Timbul Backlit LED GoWork Interior Kayu',
                'caption' => 'Pembuatan dan pemasangan signage huruf timbul akrilik dengan pencahayaan LED backlight pada panel kisi-kisi kayu area coworking space GoWork.',
                'category' => 'signage',
                'category_label' => 'Signage & Branding',
                'image' => '/images/products/branding-signage-gowork.webp',
                'images' => [
                    '/images/products/branding-signage-gowork.webp',
                    '/images/products/huruf-timbul-akrilik.webp',
                ],
                'active' => true,
                'sort_order' => 9,
            ],
            [
                'title' => 'Signage Huruf Timbul Akrilik LED Panca Cafe',
                'caption' => 'Pengerjaan laser cutting akrilik huruf timbul menyala dengan modul LED berkualitas tinggi untuk fasad cafe & restoran.',
                'category' => 'signage',
                'category_label' => 'Signage & Branding',
                'image' => '/images/products/huruf-timbul-akrilik.webp',
                'images' => [
                    '/images/products/huruf-timbul-akrilik.webp',
                    '/images/products/acrylic-signage.webp',
                ],
                'active' => true,
                'sort_order' => 10,
            ],
            [
                'title' => 'Plakat Acrylic Signage Mandarin Oriental Pool Area',
                'caption' => 'Pemasangan plakat akrilik informasi regulasi kolam renang dengan baut stainless pen holder presisi untuk hotel bintang lima.',
                'category' => 'signage',
                'category_label' => 'Signage & Branding',
                'image' => '/images/products/acrylic-signage.webp',
                'images' => [
                    '/images/products/acrylic-signage.webp',
                    '/images/products/branding-signage-gowork.webp',
                ],
                'active' => true,
                'sort_order' => 11,
            ],
            [
                'title' => 'Digital Sticker Printing & Branding Dinding Tedia Coffee',
                'caption' => 'Cetak stiker vinyl resolusi tinggi dan laminasi pelindung untuk branding ilustrasi barista pada dinding interior kedai kopi Tedia Coffee.',
                'category' => 'signage',
                'category_label' => 'Signage & Branding',
                'image' => '/images/products/sticker-printing.webp',
                'images' => [
                    '/images/products/sticker-printing.webp',
                    '/images/products/sticker-reflektif-3m.webp',
                ],
                'active' => true,
                'sort_order' => 12,
            ],
            [
                'title' => 'Instalasi Roller Blinds Blackout Modern Ruang Kerja & Hunian',
                'caption' => 'Pemasangan tirai gulung roller blind blackout 100% sistem rantai heavy duty untuk perlindungan privasi dan penahan sinar silau.',
                'category' => 'blinds',
                'category_label' => 'Blinds & Gorden',
                'image' => '/images/products/roller-blinds-blackout.webp',
                'images' => [
                    '/images/products/roller-blinds-blackout.webp',
                    '/images/products/roller-blinds-standar.webp',
                ],
                'active' => true,
                'sort_order' => 13,
            ],
            [
                'title' => 'Pemasangan Vertical Blinds Multi-Warna Kantor',
                'caption' => 'Tirai bilah vertikal fleksibel pengatur arah pencahayaan ruangan kantor dengan beragam pilihan warna kain elegan.',
                'category' => 'blinds',
                'category_label' => 'Blinds & Gorden',
                'image' => '/images/products/vertical-blinds.webp',
                'images' => [
                    '/images/products/vertical-blinds.webp',
                    '/images/products/vertical-blinds-standar.webp',
                ],
                'active' => true,
                'sort_order' => 14,
            ],
        ];

        Gallery::truncate();

        foreach ($galleries as $item) {
            Gallery::create($item);
        }
    }
}
