<?php

namespace Database\Seeders;

use App\Models\OrderArchive;
use Illuminate\Database\Seeder;

class OrderArchiveSeeder extends Seeder
{
    public function run(): void
    {
        $samples = [
            [
                'order_number' => 'TRT-202608-0001',
                'customer_name' => 'Bpk. Hendra Wijaya (PT Sinar Sentosa)',
                'customer_phone' => '0812-8899-7711',
                'customer_address' => 'Gedung Wisma 46 Lt. 18, Jl. Jend. Sudirman, Jakarta Pusat',
                'project_type' => 'Pemasangan Kaca Film Gedung / Rumah',
                'details' => 'Kaca Film Sparta Silver 80% Tolak Panas (45 m²) untuk ruang direksi dan koridor timur.',
                'total_amount' => 4500000,
                'status' => 'completed',
                'installation_date' => now()->subDays(5)->format('Y-m-d'),
                'notes' => 'Garansi pemasangan 1 tahun. Pengerjaan selesai rapi & presisi.',
            ],
            [
                'order_number' => 'TRT-202608-0002',
                'customer_name' => 'Ibu Maya Rosalina',
                'customer_phone' => '0813-1122-3344',
                'customer_address' => 'Cluster Botanica Blok B No. 12, Summarecon Bekasi',
                'project_type' => 'Sandblast Cutting Motif Logo & Striping',
                'details' => 'Sandblast cutting motif garis minimalis + logo klinik kecantikan untuk partisi kaca depan.',
                'total_amount' => 2800000,
                'status' => 'in_progress',
                'installation_date' => now()->addDays(2)->format('Y-m-d'),
                'notes' => 'Pemasangan dijadwalkan pukul 10:00 WIB, teknisi Pak Joko.',
            ],
            [
                'order_number' => 'TRT-202608-0003',
                'customer_name' => 'Bpk. Irfan Hakim (Cafe Kopi Senja)',
                'customer_phone' => '0857-9988-2211',
                'customer_address' => 'Ruko Grand Galaxy City Blok RGA No. 8, Bekasi Selatan',
                'project_type' => 'Roller Blind & Vertical Blind',
                'details' => 'Roller Blind Blackout Abu-abu (8 unit) untuk area dining outdoor & jendela lantai 2.',
                'total_amount' => 3600000,
                'status' => 'survey',
                'installation_date' => now()->addDays(4)->format('Y-m-d'),
                'notes' => 'Jadwal survey ukur ulang dan konfirmasi warna kain blind.',
            ],
            [
                'order_number' => 'TRT-202608-0004',
                'customer_name' => 'PT Graha Pratama Medika',
                'customer_phone' => '0819-2233-4455',
                'customer_address' => 'Jl. Boulevard Kelapa Gading Blok M No. 5, Jakarta Utara',
                'project_type' => 'Huruf Timbul & Signage Akrilik',
                'details' => 'Huruf Timbul Akrilik LED Backlit nama lobby rumah sakit ukuran tinggi 30 cm (22 karakter).',
                'total_amount' => 8500000,
                'status' => 'in_progress',
                'installation_date' => now()->addDays(6)->format('Y-m-d'),
                'notes' => 'Material akrilik 3mm + modul LED Samsung waterproof.',
            ],
        ];

        foreach ($samples as $sample) {
            OrderArchive::updateOrCreate(
                ['order_number' => $sample['order_number']],
                $sample
            );
        }
    }
}
