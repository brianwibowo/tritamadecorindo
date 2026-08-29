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
                'id' => 'prod-acoustic-slatted-oak',
                'name' => 'Acoustic Slatted Wood Panel Natural Oak',
                'slug' => 'acoustic-slatted-wood-panel-natural-oak',
                'category_id' => 'cat-wall-panel',
                'summary' => 'Panel kayu kisi-kisi peredam suara berbahan oak alami dengan backing felt hitam daur ulang premium.',
                'description' => "Spesifikasi Produk:\n- Material: Natural Oak Veneer Grade A\n- Backing: 9mm High-Density Acoustic PET Felt\n- Dimensi Modul: 2400 mm x 600 mm x 21 mm\n- Noise Reduction Coefficient (NRC): 0.85\n- Finishing: Matte UV Polyurethane Protective Coating\n- Aplikasi: Ruang Home Theater, Studio Musik, Living Room Residensial, Ruang Meeting Eksekutif.",
                'images' => ['/images/products/cengkeh-maluku.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Ukuran Standar 240cm x 60cm (1 Modul)', 'price' => 850000, 'stock' => 120],
                    ['name' => 'Ukuran Custom High-Ceiling 300cm x 60cm', 'price' => 1100000, 'stock' => 60],
                    ['name' => 'Paket Sample Swatch Finish (3 Varian Kayu)', 'price' => 75000, 'stock' => 200],
                ],
            ],
            [
                'id' => 'prod-fluted-walnut-panel',
                'name' => 'Luxury Fluted 3D Wall Panel American Walnut',
                'slug' => 'luxury-fluted-3d-wall-panel-american-walnut',
                'category_id' => 'cat-wall-panel',
                'summary' => 'Panel dinding aksen 3D berprofil gelombang elegan berbahan kayu walnut gelap bernuansa warm luxury.',
                'description' => "Spesifikasi Produk:\n- Material: Solid MDF Core with Natural American Walnut Veneer\n- Dimensi: Panjang 290 cm, Lebar 16 cm, Ketebalan 22 mm\n- Interlocking System: Seamless Tongue & Groove\n- Tahan lembap dan anti-rayap dengan treatment khusus\n- Ideal untuk aksen backdrop TV, dinding headboard kamar tidur, dan lobi hotel.",
                'images' => ['/images/products/pala-banda.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Panjang 290cm x Lebar 16cm (Per Batang)', 'price' => 285000, 'stock' => 250],
                    ['name' => 'Paket Box (Isi 10 Batang / Coverage 4.6 m²)', 'price' => 2750000, 'stock' => 40],
                ],
            ],
            [
                'id' => 'prod-motorized-sheer-blinds',
                'name' => 'Motorized Horizon Sheer Smart Blinds',
                'slug' => 'motorized-horizon-sheer-smart-blinds',
                'category_id' => 'cat-custom-blinds',
                'summary' => 'Tirai motorized cerdas dengan bilah horizontal lembut, dapat diatur transparan atau privasi penuh via smartphone & remote.',
                'description' => "Spesifikasi Produk:\n- Motor: Somfy / Tuya Zigbee Smart Tubular Motor (Ultra-Silent < 30dB)\n- Kain: 100% Anti-Static Polyester Sheer Dual Layer\n- Integrasi: Google Home, Apple HomeKit, Alexa, Remote RF 16-Channel\n- Garansi Motor: 5 Tahun Resmi PT Tritama Decorindo\n- Layanan: Free Pengukuran & Pemasangan di Wilayah Jabodetabek.",
                'images' => ['/images/products/kayu-manis-kerinci.webp'],
                'active' => true,
                'show_price' => false,
                'variants' => [
                    ['name' => 'Custom Made per m² (Termasuk Motor Smart Zigbee)', 'price' => 1450000, 'stock' => 999],
                    ['name' => 'Manual Chain Mechanism per m²', 'price' => 650000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-spc-flooring-herringbone',
                'name' => 'SPC Luxury Herringbone Flooring 6mm + IXPE',
                'slug' => 'spc-luxury-herringbone-flooring-6mm-ixpe',
                'category_id' => 'cat-luxury-flooring',
                'summary' => 'Lantai SPC pola herringbone mewah 100% tahan air dengan lapisan underlayment IXPE peredam benturan terintegrasi.',
                'description' => "Spesifikasi Produk:\n- Ketebalan: 5mm Core + 1mm Underlay IXPE (Total 6mm)\n- Wear Layer: 0.5mm Heavy Duty Scratch Resistant (Commercial Grade)\n- Texture: Real Wood Embossed In Register (EIR)\n- Sertifikasi: FloorScore Certified, E0 Zero Formaldehyde, B1 Fire-Resistant\n- Coverage per Box: 1.85 m².",
                'images' => ['/images/products/vanilla-beans.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Box Isi 1.85 m² (Warna Smoked Oak)', 'price' => 540000, 'stock' => 180],
                    ['name' => 'Box Isi 1.85 m² (Warna Scandinavian Ash)', 'price' => 540000, 'stock' => 150],
                    ['name' => 'Paket Jasa Pemasangan Herringbone + Lem per m²', 'price' => 65000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-engineered-french-oak',
                'name' => 'Engineered Hardwood French Oak Plank Flooring',
                'slug' => 'engineered-hardwood-french-oak-plank-flooring',
                'category_id' => 'cat-luxury-flooring',
                'summary' => 'Lantai kayu solid engineered French White Oak bertekstur brushed alami dengan stabilitas dimensi superior.',
                'description' => "Spesifikasi Produk:\n- Top Layer: 3mm Solid French White Oak\n- Base Layer: Multi-Ply Birch Marine Grade Plywood (11mm)\n- Finishing: Live Natural Oil UV Cured (Matte Finish)\n- Dimensi: 1900 mm x 190 mm x 14 mm\n- Cocok untuk villa mewah, penthouse, dan ruang tamu berkonsep modern classic.",
                'images' => ['/images/products/lada-hitam-lampung.webp'],
                'active' => true,
                'show_price' => false,
                'variants' => [
                    ['name' => 'Kemasan Box (Isi 2.166 m² / Plank 1.9m)', 'price' => 1850000, 'stock' => 80],
                ],
            ],
            [
                'id' => 'prod-blackout-roller-blinds',
                'name' => 'Architectural Thermal Blackout Roller Blinds',
                'slug' => 'architectural-thermal-blackout-roller-blinds',
                'category_id' => 'cat-custom-blinds',
                'summary' => 'Roller blinds penolak panas matahari 100% blackout dengan lapisan insulator termal pereduksi suhu ruangan.',
                'description' => "Spesifikasi Produk:\n- Material: 4-Ply Vinyl Laminated Polyester with Thermal Foam Coating\n- UV Block: 100% Total Darkness\n- Ketahanan Api: NFPA 701 Fire Retardant Standard\n- Komponen: Heavy Duty Aluminum Top Tube 38mm & Bottom Rail Matching Color\n- Pilihan Pengoperasian: Heavy Duty Spring Assist Chain / Wireless Motorized.",
                'images' => ['/images/products/jahe-kering.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Ukuran Custom Manual per m² (Warna Graphite Charcoal)', 'price' => 380000, 'stock' => 999],
                    ['name' => 'Ukuran Custom Manual per m² (Warna Pearl Beige)', 'price' => 380000, 'stock' => 999],
                ],
            ],
            [
                'id' => 'prod-acoustic-ceiling-baffle',
                'name' => 'Architectural Felt Acoustic Ceiling Baffles',
                'slug' => 'architectural-felt-acoustic-ceiling-baffles',
                'category_id' => 'cat-architectural-decor',
                'summary' => 'Plafon gantung akustik vertikal berbahan felt daur ulang untuk meredam gema di ruang terbuka berplafon tinggi.',
                'description' => "Spesifikasi Produk:\n- Material: 100% PET Recycled Sound Absorbing Felt\n- Dimensi Modul: Panjang 240 cm x Tinggi 20 cm x Tebal 12 mm\n- Sistem Gantung: Aircraft Cable Gripper System with Aluminum Profile Rail\n- Aplikasi: Open-Plan Office, Co-working Space, Auditorium, Restoran Fine Dining.",
                'images' => ['/images/products/kapulaga-jawa.webp'],
                'active' => true,
                'show_price' => false,
                'variants' => [
                    ['name' => 'Per Batang Panjang 2.4m + Hardware Hanging Kit', 'price' => 450000, 'stock' => 120],
                ],
            ],
            [
                'id' => 'prod-wpc-exterior-interior-cladding',
                'name' => 'Premium WPC Wall Cladding Teak Wood Grain',
                'slug' => 'premium-wpc-wall-cladding-teak-wood-grain',
                'category_id' => 'cat-architectural-decor',
                'summary' => 'Panel komposit kayu plastik (WPC) bertekstur serat kayu jati mewah, tahan cuaca outdoor dan anti-lapuk.',
                'description' => "Spesifikasi Produk:\n- Komposisi: 60% Wood Fiber + 30% HDPE Polymer + 10% Additives\n- Dimensi: Panjang 290 cm x Lebar 22 cm x Tebal 26 mm\n- Fitur: Anti-UV, Tahan Air 100%, Anti Rayap, Tidak Memerlukan Cat/Finishing Tambahan\n- Garansi: 10 Tahun Durabilitas Struktur.",
                'images' => ['/images/products/fuli-pala.webp'],
                'active' => true,
                'show_price' => true,
                'variants' => [
                    ['name' => 'Per Batang Panjang 2.9m (Warna Natural Teak)', 'price' => 310000, 'stock' => 200],
                    ['name' => 'Per Batang Panjang 2.9m (Warna Dark Ebony)', 'price' => 310000, 'stock' => 180],
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

            foreach ($variants as $variantData) {
                $variantData['id'] = 'var-'.Str::uuid();
                $variantData['product_id'] = $product->id;
                Variant::create($variantData);
            }
        }
    }
}
