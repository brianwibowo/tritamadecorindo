<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\View\View;

class ServiceLandingController extends Controller
{
    /**
     * Render a search-focused service page with crawlable content and internal links.
     */
    public function show(string $slug): View
    {
        $services = $this->services();

        abort_unless(isset($services[$slug]), 404);

        $service = $services[$slug];
        $products = Product::query()
            ->where('active', true)
            ->where('category_id', $service['category_id'])
            ->latest()
            ->take(6)
            ->get(['id', 'name', 'slug', 'summary', 'images']);

        return view('seo.service', [
            'service' => $service,
            'slug' => $slug,
            'products' => $products,
            'canonical' => route('services.show', $slug),
        ]);
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    private function services(): array
    {
        $common = [
            'benefits' => [
                'Konsultasi kebutuhan dan pengukuran lokasi sebelum pekerjaan.',
                'Material dapat dipilih sesuai fungsi, privasi, dan konsep interior.',
                'Pemasangan rapi oleh teknisi berpengalaman.',
                'Melayani rumah, kantor, ruko, gedung, dan area komersial.',
            ],
            'areas' => ['Bekasi', 'Cikarang', 'Tambun', 'Babelan', 'Jakarta Timur', 'Jabodetabek'],
            'faqs' => [
                ['question' => 'Apakah bisa survei lokasi di Bekasi?', 'answer' => 'Bisa. Hubungi Tritama Decorindo melalui WhatsApp untuk menjadwalkan konsultasi dan pengukuran lokasi di Bekasi serta area Jabodetabek.'],
                ['question' => 'Bagaimana cara mendapatkan estimasi harga?', 'answer' => 'Kirimkan jenis layanan, ukuran perkiraan, dan lokasi. Tim akan membantu menyiapkan estimasi berdasarkan kebutuhan proyek.'],
            ],
        ];

        return [
            'kaca-film-bekasi' => [
                ...$common,
                'category_id' => 'cat-kaca-film',
                'name' => 'Kaca Film Bekasi',
                'title' => 'Jasa Pasang Kaca Film Bekasi untuk Rumah, Kantor & Gedung',
                'description' => 'Jasa pasang kaca film Bekasi untuk rumah, kantor, ruko, dan gedung. Pilihan kaca film riben, sparta reflektif, one way, dan solar control dengan survei serta pemasangan rapi.',
                'intro' => 'Tritama Decorindo melayani konsultasi, pengukuran, penjualan material, dan pemasangan kaca film di Kota Bekasi, Kabupaten Bekasi, Cikarang, Tambun, dan Jabodetabek. Tim membantu memilih tingkat privasi dan penolak panas sesuai arah jendela serta kebutuhan ruangan.',
                'image' => '/images/products/kaca-film-utama.webp',
            ],
            'sandblast-bekasi' => [
                ...$common,
                'category_id' => 'cat-sandblast-cutting',
                'name' => 'Sandblast Bekasi',
                'title' => 'Jasa Pasang Sandblast Kaca Bekasi & Sandblast Cutting Logo',
                'description' => 'Jasa pasang stiker sandblast kaca Bekasi untuk pintu, partisi kantor, ruang meeting, rumah, dan toko. Tersedia sandblast polos, gradasi, motif, dan cutting logo custom.',
                'intro' => 'Sandblast film membuat kaca lebih privat tanpa menghilangkan cahaya alami. Tritama Decorindo membantu dari desain motif atau logo, produksi cutting, sampai pemasangan rapi pada pintu dan partisi kaca.',
                'image' => '/images/products/sandblast-cutting-logo.webp',
            ],
            'roller-blinds-bekasi' => [
                ...$common,
                'category_id' => 'cat-window-blinds',
                'name' => 'Roller Blinds Bekasi',
                'title' => 'Roller Blinds Bekasi untuk Rumah, Kantor & Ruang Komersial',
                'description' => 'Pesan roller blinds Bekasi dengan pilihan blackout, dimout, dan solar screen. Konsultasi ukuran jendela, pilihan bahan, dan pemasangan untuk rumah maupun kantor.',
                'intro' => 'Roller blinds membantu mengatur cahaya, menjaga privasi, dan membuat tampilan jendela lebih rapi. Kami menyediakan pilihan kain dan mekanisme yang dapat disesuaikan dengan ukuran serta fungsi ruangan.',
                'image' => '/images/products/roller-blinds-blackout.webp',
            ],
            'vertical-blinds-bekasi' => [
                ...$common,
                'category_id' => 'cat-window-blinds',
                'name' => 'Vertical Blinds Bekasi',
                'title' => 'Vertical Blinds Bekasi untuk Kantor, Rumah & Gedung',
                'description' => 'Jasa vertical blinds Bekasi untuk jendela lebar kantor, rumah, dan gedung. Pilihan warna serta tingkat cahaya dapat disesuaikan dengan interior.',
                'intro' => 'Vertical blinds cocok untuk bukaan kaca lebar karena bilahnya dapat diputar untuk mengatur arah cahaya. Tritama Decorindo melayani konsultasi, pengukuran, dan pemasangan vertical blinds di Bekasi dan sekitarnya.',
                'image' => '/images/products/vertical-blinds-standar.webp',
            ],
            'wallpaper-bekasi' => [
                ...$common,
                'category_id' => 'cat-wallpaper',
                'name' => 'Wallpaper Bekasi',
                'title' => 'Jasa Pasang Wallpaper Bekasi untuk Rumah & Kantor',
                'description' => 'Jasa pasang wallpaper Bekasi untuk kamar, ruang keluarga, kantor, hotel, dan area komersial. Tersedia wallpaper motif roll dan wallpaper custom 3D.',
                'intro' => 'Pilih motif wallpaper pabrikan atau cetak custom sesuai konsep interior. Tim Tritama Decorindo membantu menghitung kebutuhan material dan memasang wallpaper dengan sambungan rapi.',
                'image' => '/images/products/wallpaper-custom-3d.webp',
            ],
            'huruf-timbul-bekasi' => [
                ...$common,
                'category_id' => 'cat-branding-signage',
                'name' => 'Huruf Timbul Bekasi',
                'title' => 'Jasa Huruf Timbul Akrilik, Stainless & LED Bekasi',
                'description' => 'Pembuatan dan pemasangan huruf timbul Bekasi dari akrilik, stainless, galvanis, dan LED untuk toko, kantor, gedung, lobi, dan area komersial.',
                'intro' => 'Signage huruf timbul membantu bisnis terlihat profesional sejak pelanggan melihat fasad atau lobi. Kami mengerjakan produksi sesuai logo, ukuran, bahan, dan kebutuhan pencahayaan.',
                'image' => '/images/products/branding-signage-gowork.webp',
            ],
            'gorden-bekasi' => [
                ...$common,
                'category_id' => 'cat-gorden',
                'name' => 'Gorden Bekasi',
                'title' => 'Jasa Gorden Bekasi untuk Rumah, Kantor & Ruang Komersial',
                'description' => 'Pesan gorden Bekasi untuk rumah, kantor, hotel, dan ruang komersial. Pilihan gorden blackout dan gorden dekoratif dengan pengukuran serta pemasangan.',
                'intro' => 'Gorden membantu mengatur cahaya dan melengkapi tampilan interior. Tritama Decorindo melayani konsultasi bahan, pengukuran, dan pemasangan gorden sesuai karakter ruangan.',
                'image' => '/images/products/gorden-blackout.webp',
            ],
        ];
    }
}
