<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'id' => 'prod-kaca-film-riben',
                'name' => 'Kaca Film Riben Anti Panas & Privasi',
                'slug' => 'kaca-film-riben-anti-panas-privasi',
                'category_id' => 'cat-kaca-film',
                'summary' => 'Kaca film warna gelap penolak panas matahari, pereduksi silau, dan penjaga privasi ruang.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Solar Control Polyester Film dengan proteksi UV 99%\n- Dimensi Material: Lebar 152 cm x Panjang 50 cm\n- Pilihan Kegelapan: 40%, 60%, 80%\n- Fungsi: Mengurangi panas matahari, mereduksi silau, menghemat energi AC, dan melindungi interior dari kepudaran sinar UV.\n- Aplikasi: Kaca jendela gedung perkantoran, ruko, perumahan, toko, dan kaca mobil.\n- Melayani penjualan material & jasa pemasangan teknisi berpengalaman wilayah Jabodetabek.",
                'images' => ['/images/products/kaca-film-riben.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Kaca Film Riben 40% (Material Uk. 152x50cm)', 'price' => 45000, 'stock' => 500],
                    ['name' => 'Kaca Film Riben 60% (Material Uk. 152x50cm)', 'price' => 45000, 'stock' => 500],
                    ['name' => 'Kaca Film Riben 80% (Material Uk. 152x50cm)', 'price' => 45000, 'stock' => 500],
                    ['name' => 'Jasa Pemasangan Teknisi Profesional per m²', 'price' => 25000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-kaca-film-sparta',
                'name' => 'Kaca Film Sparta Silver Reflektif',
                'slug' => 'kaca-film-sparta-silver-reflektif',
                'category_id' => 'cat-kaca-film',
                'summary' => 'Kaca film reflektif cermin tolak panas tinggi dengan efek mirror elegan dari luar.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: High Performance Metallized Reflective Film\n- Dimensi Material: Lebar 152 cm x Panjang 50 cm\n- Total Solar Energy Rejected (TSER): Hingga 78%\n- Efek Cermin (Mirror): Siang hari luar terlihat cermin reflektif, dari dalam tetap leluasa melihat keluar.\n- Sangat cocok untuk gedung bertingkat, ruko yang terpapar terik matahari langsung, dan hunian modern.",
                'images' => ['/images/products/kaca-film-sparta.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Sparta Silver 40% (Material Uk. 152x50cm)', 'price' => 65000, 'stock' => 400],
                    ['name' => 'Sparta Silver 60% (Material Uk. 152x50cm)', 'price' => 65000, 'stock' => 400],
                    ['name' => 'Sparta Silver 80% (Material Uk. 152x50cm)', 'price' => 65000, 'stock' => 400],
                    ['name' => 'Jasa Pasang Sparta per m²', 'price' => 25000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-kaca-film-oneway',
                'name' => 'Kaca Film One Way Vision',
                'slug' => 'kaca-film-oneway-vision',
                'category_id' => 'cat-kaca-film',
                'summary' => 'Kaca film privasi satu arah penolak panas untuk partisi gedung dan jendela arsitektural.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Micro-perforated / Dual-Reflective Solar Film\n- Dimensi Material: Lebar 152 cm x Panjang 30 cm\n- Memberikan privasi maksimal dari luar ruangan tanpa menghalangi pencahayaan alami di dalam.\n- Ideal untuk area komersial, perbankan, ruang direksi, dan facade kaca bangunan.",
                'images' => ['/images/products/kaca-film-oneway.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Kaca Film One Way (Material Uk. 152x30cm)', 'price' => 65000, 'stock' => 350],
                    ['name' => 'Jasa Pemasangan One Way per m²', 'price' => 25000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-sandblast-polos',
                'name' => 'Stiker Kaca Sandblast Polos (Frosted Glass)',
                'slug' => 'stiker-kaca-sandblast-polos',
                'category_id' => 'cat-sandblast-cutting',
                'summary' => 'Stiker kaca buram es polos untuk partisi ruangan kantor, pintu kamar mandi, dan sekat ruang.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Vinyl Frosted Sandblast Etched Film\n- Dimensi Material: Lebar 120 cm x Panjang 50 cm\n- Tahan air, mudah dibersihkan, dan memberikan efek buram elegan tanpa menggelapkan ruangan.\n- Aplikasi: Partisi kaca kantor, pintu geser kaca, ruang meeting, klinik, dan hunian.",
                'images' => ['/images/products/sandblast-polos.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Sandblast Polos (Material Uk. 120x50cm)', 'price' => 30000, 'stock' => 600],
                    ['name' => 'Jasa Pasang Sandblast Polos per m²', 'price' => 20000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-sandblast-cutting-logo',
                'name' => 'Sandblast Cutting Logo & Motif Kantor',
                'slug' => 'sandblast-cutting-logo-motif-kantor',
                'category_id' => 'cat-sandblast-cutting',
                'summary' => 'Stiker kaca sandblast potong mesin presisi sesuai logo instansi, garis striping, dan custom pattern.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Sandblast Film Berkualitas Tinggi dipotong Mesin CNC Cutting Plotter Presisi\n- Ukuran Modul Dasar: 100 cm x 50 cm (Bisa custom ukuran berapapun)\n- Bisa memuat logo perusahaan, tulisan nama divisi, garis motif modern, maupun pola arsitektur.\n- Meningkatkan citra profesional kantor dan tempat usaha Anda.",
                'images' => ['/images/products/sandblast-cutting-logo.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Sandblast Cutting Logo (Material Uk. 100x50cm per m²)', 'price' => 125000, 'stock' => 999],
                    ['name' => 'Sandblast Cutting Motif Garis / Striping per m²', 'price' => 115000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-cutting-sticker-kaligrafi',
                'name' => 'Cutting Sticker Kaligrafi & Ornamen Artistik',
                'slug' => 'cutting-sticker-kaligrafi-ornamen-artistik',
                'category_id' => 'cat-sandblast-cutting',
                'summary' => 'Cutting sticker vinyl kaligrafi islami dan ornamen dekoratif presisi untuk kaca masjid, mushola, dan rumah.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Premium Oracal Vinyl / Sandblast Cutting\n- Dimensi: Ukuran modul dasar 100 cm x 50 cm per m²\n- Pilihan Warna: Gold, Putih, Hitam, Chrome, Frosted Sandblast\n- Cocok untuk pintu utama masjid, partisi mushola kantor, kaca ruang tamu residensial, dan ruang ibadah.",
                'images' => ['/images/products/cutting-sticker-kaligrafi.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Cutting Sticker Kaligrafi (Material Uk. 100x50cm per m²)', 'price' => 125000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-wallpaper-pabrikan',
                'name' => 'Wallpaper Dinding Pabrikan Motif Roll',
                'slug' => 'wallpaper-dinding-pabrikan-motif-roll',
                'category_id' => 'cat-wallpaper',
                'summary' => 'Wallpaper dinding bermotif tekstur timbul mewah kemasan roll pabrikan tahan lama.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Kemasan: 1 Roll (Ukuran Standar 0.53 m x 10 m / Coverage ± 5 m²)\n- Material: Vinyl Bertekstur Timbul (Embossed), Anti-Lembap, dan Mudah Dilap\n- Ribuan pilihan motif: Klasik, Modern Minimalis, Marmer, Kayu, Garis Elegan, Floral.\n- Sangat cocok untuk dinding kamar tidur, ruang keluarga, lobby hotel, dan restoran.",
                'images' => ['/images/products/wallpaper-pabrikan.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Wallpaper Pabrikan (Harga per Roll)', 'price' => 250000, 'stock' => 300],
                    ['name' => 'Jasa Pemasangan Wallpaper per Roll', 'price' => 45000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-wallpaper-custom-3d',
                'name' => 'Wallpaper Dinding Custom 3D',
                'slug' => 'wallpaper-dinding-custom-3d',
                'category_id' => 'cat-wallpaper',
                'summary' => 'Wallpaper dinding cetak custom resolusi tinggi efek visual 3D sesuai ukuran ruangan.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Dimensi: Custom per m² (Ukuran 100 cm x 100 cm)\n- Bebas pilih gambar desain: Nuansa Alam, Panorama Kota, Abstrak Mewah, Karakter Anak, Logo Perusahaan.\n- Dicetak menggunakan tinta ramah lingkungan beresolusi tajam dan tidak berbau.",
                'images' => ['/images/products/wallpaper-custom-3d.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Wallpaper Custom 3D per m² (Uk. 100cm x 100cm)', 'price' => 55000, 'stock' => 999],
                    ['name' => 'Jasa Pasang Wallpaper Custom per m²', 'price' => 30000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-huruf-timbul-akrilik',
                'name' => 'Huruf Timbul Laser Akrilik & Signage LED',
                'slug' => 'huruf-timbul-laser-akrilik-signage-led',
                'category_id' => 'cat-branding-signage',
                'summary' => 'Pembuatan huruf timbul akrilik presisi laser cutting dengan opsi pencahayaan LED untuk branding kantor dan toko.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Akrilik Marga Cipta Grade A / Stainless Steel / Galvanis\n- Pemotongan: CNC Laser Cutting High-Precision\n- Pilihan Lighting: LED Backlight (Menyala di belakang huruf) / Frontlit (Menyala depan)\n- Sangat ideal untuk backdrop resepsionis, plang nama toko, signage gedung, dan cafe.",
                'images' => ['/images/products/huruf-timbul-akrilik.webp'],
                'active' => true,
                'show_price' => false,
                'variants' => [
                    ['name' => 'Akrilik Solid Non-LED (per cm tinggi huruf)', 'price' => 9000, 'stock' => 999],
                    ['name' => 'Akrilik LED Menyala Backlight (per cm tinggi huruf)', 'price' => 16000, 'stock' => 999],
                    ['name' => 'Stainless Steel Huruf Timbul (per cm tinggi huruf)', 'price' => 18000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-sticker-printing',
                'name' => 'Digital Sticker Printing & Car Branding',
                'slug' => 'digital-sticker-printing-car-branding',
                'category_id' => 'cat-branding-signage',
                'summary' => 'Cetak stiker digital indoor/outdoor resolusi tinggi untuk branding kaca toko dan wrapping mobil operasional.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Mesin: Eco-Solvent / UV High-Resolution Printing\n- Bahan: Stiker Vinyl Berkualitas Tinggi + Finishing Laminasi Doff / Glossy\n- Tahan air, tahan gores, dan tidak mudah luntur terkena sinar matahari luar ruang.\n- Melayani branding mobil operasional, stiker etalase toko, neon box, dan spanduk visual.",
                'images' => ['/images/products/sticker-printing.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Sticker Vinyl Cetak + Laminasi per m²', 'price' => 85000, 'stock' => 999],
                    ['name' => 'Sticker One Way Vision Cetak per m²', 'price' => 95000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-roller-blinds',
                'name' => 'Roller Blinds Blackout & Standar',
                'slug' => 'roller-blinds-blackout-standar',
                'category_id' => 'cat-window-blinds',
                'summary' => 'Tirai gulung modern minimalis pengatur pencahayaan ruang tamu dan perkantoran.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Pilihan Kain: Blackout 100% (Menolak sinar matahari total) & Standar Dimout/Solar Screen\n- Sistem Pengoperasian: Chain Manual Heavy Duty / Motorized Remote System\n- Tabung Roller: Aluminium Anti-Karat Kokoh\n- Cocok untuk jendela kamar tidur, ruang kerja kantor, gedung bertingkat, dan cafe.",
                'images' => ['/images/products/roller-blinds-blackout.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Roller Blind Blackout (Harga per m²)', 'price' => 450000, 'stock' => 999],
                    ['name' => 'Roller Blind Standar (Harga per m²)', 'price' => 300000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-vertical-blinds',
                'name' => 'Vertical Blinds Blackout & Standar',
                'slug' => 'vertical-blinds-blackout-standar',
                'category_id' => 'cat-window-blinds',
                'summary' => 'Tirai bilah vertikal modern elegan pengatur arah cahaya jendela ruang kantor dan meeting.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Bilah kain polyester berkualitas dengan sistem putar 180 derajat untuk kontrol arah cahaya fleksibel.\n- Pilihan Tipe: Blackout (Kedap Cahaya) dan Standar Dimout.\n- Rel atas aluminium kokoh dengan mekanisme tarikan halus dan awet digunakan bertahun-tahun.",
                'images' => ['/images/products/vertical-blinds.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Vertical Blind Blackout (Harga per m)', 'price' => 350000, 'stock' => 999],
                    ['name' => 'Vertical Blind Standar (Harga per m)', 'price' => 250000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-gorden-premium',
                'name' => 'Gorden Blackout & Standar Premium',
                'slug' => 'gorden-blackout-standar-premium',
                'category_id' => 'cat-gorden',
                'summary' => 'Gorden kain mewah blackout penahan panas dan gorden standar berbagai motif jahitan rapi.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Kain Blackout Tebal Peredam Panas & Cahaya / Kain Standar Semi-Blackout Bertekstur Mewah\n- Jahitan rapi, lipatan jatuh anggun (smokering / hook minimalis)\n- Melayani pengukuran langsung dan pembuatan custom sesuai ukuran jendela hunian, villa, atau kantor Anda.",
                'images' => ['/images/products/gorden-blackout.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Gorden Blackout (Harga per m)', 'price' => 150000, 'stock' => 999],
                    ['name' => 'Gorden Standar (Harga per m)', 'price' => 130000, 'stock' => 999],
                ],
            ],
        ];

        foreach ($products as $productData) {
            $variants = $productData['variants'] ?? [];
            unset($productData['variants']);

            $product = Product::updateOrCreate(
                ['id' => $productData['id']],
                $productData
            );

            // Bersihkan varian lama lalu masukkan yang baru
            Variant::where('product_id', $product->id)->delete();

            foreach ($variants as $variantData) {
                $variantData['id'] = 'var-'.Str::uuid();
                $variantData['product_id'] = $product->id;
                Variant::create($variantData);
            }
        }
    }
}
