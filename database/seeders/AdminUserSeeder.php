<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@tritamadecorindo.com'],
            [
                'name' => 'Administrator Tritama Decorindo',
                'password' => Hash::make('password123'),
                'role' => UserRole::Admin,
                'phone' => '+62 812-8888-9999',
                'status' => 'active',
            ]
        );

        User::updateOrCreate(
            ['email' => 'client@tritamadecorindo.com'],
            [
                'name' => 'Bpk. Hendra Wijaya (Interior Architect)',
                'password' => Hash::make('password123'),
                'role' => UserRole::Buyer,
                'phone' => '+62 811-2233-4455',
                'status' => 'active',
            ]
        );
    }
}
