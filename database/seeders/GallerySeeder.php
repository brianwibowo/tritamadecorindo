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
                'title' => 'Instalasi Acoustic Slatted Wood Panel di Luxury Penthouse Senopati',
                'caption' => 'Pemasangan kisi-kisi panel kayu oak alami pada area living room & home theater, menghasilkan estetika modern sekaligus meredam gema ruangan.',
                'category' => 'fasilitas',
                'category_label' => 'Proyek Residensial',
                'image' => '/images/products/cengkeh-maluku.webp',
                'active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Custom Motorized Sheer Horizon Blinds di Executive Boardroom SCBD',
                'caption' => 'Integrasi tirai motorized pintar dengan sistem otomasi gedung pintar, memudahkan pengaturan pencahayaan presisi saat presentasi rapat.',
                'category' => 'laboratorium',
                'category_label' => 'Proyek Komersial',
                'image' => '/images/products/pala-banda.webp',
                'active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Pemasangan Lantai SPC Herringbone Smoked Oak di Boutique Villa Bali',
                'caption' => 'Aplikasi lantai SPC tahan air pola herringbone dengan sambungan presisi interlocking dan tekstur kayu timbul realistis.',
                'category' => 'perkebunan',
                'category_label' => 'Proyek Hospitality',
                'image' => '/images/products/kayu-manis-kerinci.webp',
                'active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Fluted Walnut 3D Backdrop di Master Suite Pantai Indah Kapuk',
                'caption' => 'Aksen dinding kamar tidur utama menggunakan profil kayu walnut gelombang seamless dengan hidden LED lighting terintegrasi.',
                'category' => 'ekspor',
                'category_label' => 'Proyek Residensial',
                'image' => '/images/products/vanilla-beans.webp',
                'active' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Acoustic Felt Ceiling Baffles di Open Office Mega Kuningan',
                'caption' => 'Pemasangan plafon gantung vertikal peredam suara di ruang kerja terbuka, menciptakan suasana kerja produktif dan minim kebisingan.',
                'category' => 'fasilitas',
                'category_label' => 'Proyek Komersial',
                'image' => '/images/products/lada-hitam-lampung.webp',
                'active' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'Showroom Material & Workshop Pemotongan Presisi PT Tritama Decorindo',
                'caption' => 'Fasilitas fabrikasi dan display material lengkap untuk arsitek, desainer interior, dan pemilik properti.',
                'category' => 'laboratorium',
                'category_label' => 'Fasilitas & Workshop',
                'image' => '/images/products/jahe-kering.webp',
                'active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($galleries as $item) {
            Gallery::updateOrCreate(['title' => $item['title']], $item);
        }
    }
}
