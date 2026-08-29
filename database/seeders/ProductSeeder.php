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
                'summary' => 'Memberikan privasi lebih baik sekaligus membantu mengurangi panas dan silau matahari, cocok untuk rumah, kantor, dan area komersial.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Solar Control Polyester Film dengan proteksi UV 99%\n- Dimensi Material: Lebar 152 cm x Panjang 50 cm\n- Pilihan Kegelapan: 40%, 60%, 80%\n- Fungsi: Mengurangi panas matahari, mereduksi silau, menghemat energi AC, dan melindungi interior dari kepudaran sinar UV.\n- Aplikasi: Kaca jendela gedung perkantoran, ruko, perumahan, toko, dan partisi kaca ruangan.\n- Melayani penjualan material & jasa pemasangan teknisi berpengalaman wilayah Jabodetabek.",
                'images' => [
                    '/images/products/kaca-film-riben.webp',
                    '/images/products/kaca-film-sparta.webp',
                    '/images/products/kaca-film-oneway.webp',
                ],
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
                'summary' => 'Kaca film reflektif efek cermin tolak panas tinggi untuk tampilan eksterior modern dan ruangan yang sejuk.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: High Performance Metallized Reflective Film\n- Dimensi Material: Lebar 152 cm x Panjang 50 cm\n- Total Solar Energy Rejected (TSER): Hingga 78%\n- Efek Cermin (Mirror): Siang hari luar terlihat cermin reflektif, dari dalam tetap leluasa melihat keluar.\n- Sangat cocok untuk gedung bertingkat, ruko yang terpapar terik matahari langsung, dan hunian modern.",
                'images' => [
                    '/images/products/kaca-film-sparta.webp',
                    '/images/products/kaca-film-oneway.webp',
                    '/images/products/kaca-film-riben.webp',
                ],
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
                'name' => 'Kaca Film One Way Vision Privasi Siang',
                'slug' => 'kaca-film-oneway-vision-privasi-siang',
                'category_id' => 'cat-kaca-film',
                'summary' => 'One Way Vision memberikan media promosi yang efektif sekaligus menjaga privasi dari luar. Cocok untuk etalase toko, kantor, dan area komersial dengan hasil cetak tajam dan pemasangan rapi.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Micro-perforated / Dual-Reflective Solar Film\n- Dimensi Material: Lebar 152 cm x Panjang 30 cm\n- Memberikan privasi maksimal dari luar ruangan tanpa menghalangi pencahayaan alami di dalam.\n- Ideal untuk area komersial, perbankan, ruang direksi, dan facade kaca bangunan.",
                'images' => [
                    '/images/products/kaca-film-oneway.webp',
                    '/images/products/kaca-film-sparta.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Kaca Film One Way (Material Uk. 152x30cm)', 'price' => 65000, 'stock' => 350],
                    ['name' => 'Jasa Pemasangan One Way per m²', 'price' => 25000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-sticker-blackout',
                'name' => 'Sticker Kaca Film Black Out (100% Privacy)',
                'slug' => 'sticker-kaca-film-black-out-100-privacy',
                'category_id' => 'cat-kaca-film',
                'summary' => 'Sticker Black Out, solusi privasi maksimal 100% kedap cahaya dengan tampilan rapi dan elegan untuk berbagai kebutuhan kaca.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Tingkat Kegelapan: 100% Opaque Total Blackout (Kedap Cahaya Penuh)\n- Fungsi: Privasi mutlak, menutup pandangan total 2 arah, cocok untuk ruang server, laboratorium, studio, kamar tidur, atau sekat kaca gudang.\n- Daya rekat kuat, tahan panas, dan tidak tembus bayangan siluet.\n- Melayani penjualan bahan per meter maupun paket pemasangan rapi.",
                'images' => [
                    '/images/products/sticker-kaca-blackout.webp',
                    '/images/products/kaca-film-riben.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Sticker Black Out Opaque (Uk. 152cm x 1m)', 'price' => 60000, 'stock' => 500],
                    ['name' => 'Sticker Black Out + Jasa Pasang per m²', 'price' => 95000, 'stock' => 500],
                ],
            ],
            [
                'id' => 'prod-sandblast-polos',
                'name' => 'Sandblast Polos (Frosted Glass)',
                'slug' => 'sandblast-polos-frosted-glass',
                'category_id' => 'cat-sandblast-cutting',
                'summary' => 'Sandblast polos memberikan privasi tanpa mengurangi cahaya alami, cocok untuk kantor, ruang meeting, pintu kaca, dan partisi.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Vinyl Frosted Sandblast Etched Film\n- Dimensi Material: Lebar 120 cm x Panjang 50 cm\n- Tahan air, mudah dibersihkan, dan memberikan efek buram elegan tanpa menggelapkan ruangan.\n- Aplikasi: Partisi kaca kantor, pintu geser kaca, ruang meeting, klinik, dan hunian.",
                'images' => [
                    '/images/products/sandblast-polos.webp',
                    '/images/products/sticker-gradasi-frosted.webp',
                    '/images/products/sandblast-cutting-logo.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Sandblast Polos (Material Uk. 120x50cm)', 'price' => 30000, 'stock' => 600],
                    ['name' => 'Jasa Pasang Sandblast Polos per m²', 'price' => 20000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-sandblast-cutting-logo',
                'name' => 'Sandblast Cutting Motif & Logo Custom',
                'slug' => 'sandblast-cutting-motif-logo-custom',
                'category_id' => 'cat-sandblast-cutting',
                'summary' => 'Sandblast motif custom untuk kaca rumah, kantor, partisi, dan pintu kaca dengan hasil rapi dan elegan.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Sandblast Film Berkualitas Tinggi dipotong Mesin CNC Cutting Plotter Presisi\n- Ukuran Modul Dasar: 100 cm x 50 cm (Bisa custom ukuran berapapun)\n- Bisa memuat logo perusahaan, tulisan nama divisi, garis motif modern, maupun pola arsitektur.\n- Meningkatkan citra profesional kantor dan tempat usaha Anda.",
                'images' => [
                    '/images/products/sandblast-cutting-logo.webp',
                    '/images/products/cutting-sticker-kaligrafi.webp',
                    '/images/products/sandblast-polos.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Sandblast Cutting Logo (Material Uk. 100x50cm per m²)', 'price' => 125000, 'stock' => 999],
                    ['name' => 'Sandblast Cutting Motif Garis / Striping per m²', 'price' => 115000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-sticker-gradasi',
                'name' => 'Sticker Gradasi (Frosted Gradient)',
                'slug' => 'sticker-gradasi-frosted-gradient',
                'category_id' => 'cat-sandblast-cutting',
                'summary' => 'Sticker gradasi (frosted gradient) untuk meningkatkan privasi sekaligus memberikan tampilan modern pada ruang kerja dan perkantoran.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Efek: Gradasi Halus Buram ke Bening (Frosted Fade Gradient)\n- Desain: Memberikan transisi privasi elegan setinggi pandangan mata tanpa menutup seluruh bidang kaca.\n- Memberikan kesan luas, terang, dan sangat modern pada sekat kaca ruangan kantor masa kini.\n- Pemasangan presisi tanpa gelembung bergaransi oleh teknisi Tritama Decorindo.",
                'images' => [
                    '/images/products/sticker-gradasi-frosted.webp',
                    '/images/products/sandblast-polos.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Sticker Gradasi Frosted (Uk. 120cm x 1m)', 'price' => 120000, 'stock' => 450],
                    ['name' => 'Sticker Gradasi + Jasa Pasang Presisi per m²', 'price' => 165000, 'stock' => 450],
                ],
            ],
            [
                'id' => 'prod-cutting-sticker-kaligrafi',
                'name' => 'Cutting Sticker Kaligrafi & Ornamen Artistik',
                'slug' => 'cutting-sticker-kaligrafi-ornamen-artistik',
                'category_id' => 'cat-sandblast-cutting',
                'summary' => 'Cutting sticker vinyl kaligrafi islami dan ornamen dekoratif presisi untuk kaca masjid, mushola, dan rumah.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Premium Oracal Vinyl / Sandblast Cutting\n- Dimensi: Ukuran modul dasar 100 cm x 50 cm per m²\n- Pilihan Warna: Gold, Putih, Hitam, Chrome, Frosted Sandblast\n- Cocok untuk pintu utama masjid, partisi mushola kantor, kaca ruang tamu residensial, dan ruang ibadah.",
                'images' => [
                    '/images/products/cutting-sticker-kaligrafi.webp',
                    '/images/products/sandblast-cutting-logo.webp',
                ],
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
                'summary' => 'Pilihan ratusan motif wallpaper roll impor & lokal dengan tekstur timbul mewah untuk interior rumah dan kantor.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Kemasan: 1 Roll (Ukuran Standar 0.53 m x 10 m / Coverage ± 5 m²)\n- Material: Vinyl Bertekstur Timbul (Embossed), Anti-Lembap, dan Mudah Dilap\n- Ribuan pilihan motif: Klasik, Modern Minimalis, Marmer, Kayu, Garis Elegan, Floral.\n- Sangat cocok untuk dinding kamar tidur, ruang keluarga, lobby hotel, dan restoran.",
                'images' => [
                    '/images/products/wallpaper-pabrikan.webp',
                    '/images/products/wallpaper-custom-3d.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Wallpaper Pabrikan (Harga per Roll)', 'price' => 250000, 'stock' => 300],
                    ['name' => 'Jasa Pemasangan Wallpaper per Roll', 'price' => 45000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-wallpaper-custom-3d',
                'name' => 'Wallpaper 3D Custom Visual Relief',
                'slug' => 'wallpaper-3d-custom-visual-relief',
                'category_id' => 'cat-wallpaper',
                'summary' => 'Wallpaper 3D berkualitas dengan berbagai pilihan motif dan tekstur untuk mempercantik interior rumah, kantor, hotel, maupun ruang komersial.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Bahan: Korean Wallpaper Fabric / Canvas Texture Seamless\n- Hasil cetak foto tajam, tidak berbau, dan aman untuk kamar tidur anak.\n- Ukuran dibuat presisi mengikuti luas dinding Anda (Custom Size).",
                'images' => [
                    '/images/products/wallpaper-custom-3d.webp',
                    '/images/products/wallpaper-pabrikan.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Wallpaper Custom 3D Bahan Canvas per m²', 'price' => 135000, 'stock' => 999],
                    ['name' => 'Wallpaper Custom 3D Bahan Korea per m²', 'price' => 165000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-huruf-timbul-akrilik',
                'name' => 'Signage Huruf Timbul Akrilik, Stainless & LED',
                'slug' => 'signage-huruf-timbul-akrilik-stainless-led',
                'category_id' => 'cat-branding-signage',
                'summary' => 'Pembuatan dan pemasangan huruf timbul akrilik, stainless, galvanis, dan LED untuk kantor, toko, gedung, serta area komersial.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Pilihan Bahan: Akrilik Solid, Stainless Steel Mirror / Hairline, Galvanis, Kuningan.\n- Lampu: Modul LED Samsung Waterproof Hemat Listrik.\n- Memberikan citra profesional dan prestisius pada fasad gedung atau lobi kantor.",
                'images' => [
                    '/images/products/huruf-timbul-akrilik.webp',
                    '/images/products/sticker-printing.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Akrilik Solid Non-LED (per cm tinggi huruf)', 'price' => 9000, 'stock' => 999],
                    ['name' => 'Akrilik LED Menyala Backlight (per cm tinggi huruf)', 'price' => 16000, 'stock' => 999],
                    ['name' => 'Stainless Steel Huruf Timbul (per cm tinggi huruf)', 'price' => 18000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-sticker-printing',
                'name' => 'Visual Branding & Digital Sticker Printing',
                'slug' => 'visual-branding-digital-sticker-printing',
                'category_id' => 'cat-branding-signage',
                'summary' => 'Mewujudkan tampilan bisnis yang lebih menarik melalui berbagai solusi visual branding yang sesuai dengan kebutuhan Anda.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Mesin: Eco-Solvent / UV High-Resolution Printing\n- Bahan: Stiker Vinyl Berkualitas Tinggi + Finishing Laminasi Doff / Glossy\n- Tahan air, tahan gores, dan tidak mudah luntur terkena sinar matahari luar ruang.\n- Melayani stiker branding etalase toko, partisi kantor, neon box, dan signage visual.",
                'images' => [
                    '/images/products/sticker-printing.webp',
                    '/images/products/huruf-timbul-akrilik.webp',
                    '/images/products/kaca-film-oneway.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Sticker Vinyl Cetak + Laminasi per m²', 'price' => 85000, 'stock' => 999],
                    ['name' => 'Sticker One Way Vision Cetak per m²', 'price' => 95000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-roller-blinds',
                'name' => 'Roller Blind Modern & Blackout',
                'slug' => 'roller-blind-modern-blackout',
                'category_id' => 'cat-window-blinds',
                'summary' => 'Roller blind modern dengan desain minimalis, ideal untuk mengurangi intensitas cahaya dan memberikan kenyamanan pada berbagai jenis ruangan.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Pilihan Kain: Blackout 100% (Menolak sinar matahari total) & Standar Dimout/Solar Screen\n- Sistem Pengoperasian: Chain Manual Heavy Duty / Motorized Remote System\n- Tabung Roller: Aluminium Anti-Karat Kokoh\n- Cocok untuk jendela kamar tidur, ruang kerja kantor, gedung bertingkat, dan cafe.",
                'images' => [
                    '/images/products/roller-blinds-blackout.webp',
                    '/images/products/roller-blinds-standar.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Roller Blind Blackout (Harga per m²)', 'price' => 450000, 'stock' => 999],
                    ['name' => 'Roller Blind Standar (Harga per m²)', 'price' => 300000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-vertical-blinds',
                'name' => 'Vertical Blind Kantor & Komersial',
                'slug' => 'vertical-blind-kantor-komersial',
                'category_id' => 'cat-window-blinds',
                'summary' => 'Tirai vertical blind yang elegan dan fungsional untuk mengatur cahaya serta menjaga privasi pada kantor, ruang meeting, dan bangunan komersial.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Bilah kain polyester berkualitas dengan sistem putar 180 derajat untuk kontrol arah cahaya fleksibel.\n- Pilihan Tipe: Blackout (Kedap Cahaya) dan Standar Dimout.\n- Rel atas aluminium kokoh dengan mekanisme tarikan halus dan awet digunakan bertahun-tahun.",
                'images' => [
                    '/images/products/vertical-blinds.webp',
                    '/images/products/vertical-blinds-standar.webp',
                ],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Vertical Blind Blackout (Harga per m)', 'price' => 350000, 'stock' => 999],
                    ['name' => 'Vertical Blind Standar (Harga per m)', 'price' => 250000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-gorden-premium',
                'name' => 'Gorden Custom Residensial & Komersial',
                'slug' => 'gorden-custom-residensial-komersial',
                'category_id' => 'cat-gorden',
                'summary' => 'Menyediakan berbagai pilihan gorden yang fungsional dan elegan untuk rumah, kantor, maupun ruang usaha.',
                'description' => "Spesifikasi & Keunggulan Produk:\n- Material: Kain Blackout Tebal Peredam Panas & Cahaya / Kain Standar Semi-Blackout Bertekstur Mewah\n- Jahitan rapi, lipatan jatuh anggun (smokering / hook minimalis)\n- Melayani pengukuran langsung dan pembuatan custom sesuai ukuran jendela hunian, villa, atau kantor Anda.",
                'images' => [
                    '/images/products/gorden-blackout.webp',
                    '/images/products/gorden-standar.webp',
                ],
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
                Variant::create([
                    'id' => (string) Str::uuid(),
                    'product_id' => $product->id,
                    'name' => $variantData['name'],
                    'price' => $variantData['price'],
                    'stock' => $variantData['stock'] ?? 999,
                    'images' => $product->images,
                ]);
            }
        }
    }
}
