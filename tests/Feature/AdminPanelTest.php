<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_admin_dashboard(): void
    {
        $response = $this->get(route('admin.dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_buyer_cannot_access_admin_dashboard(): void
    {
        $buyer = User::factory()->create([
            'role' => UserRole::Buyer,
        ]);

        $response = $this->actingAs($buyer)->get(route('admin.dashboard'));
        $response->assertStatus(403);
    }

    public function test_admin_can_access_admin_dashboard(): void
    {
        $admin = User::factory()->create([
            'role' => UserRole::Admin,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.dashboard'));
        $response->assertStatus(200);
    }

    public function test_admin_can_create_category_and_product(): void
    {
        $admin = User::factory()->create([
            'role' => UserRole::Admin,
        ]);

        $catResponse = $this->actingAs($admin)->post(route('admin.categories.store'), [
            'name' => 'Kategori Baru',
            'slug' => 'kategori-baru',
            'description' => 'Deskripsi Kategori',
            'active' => true,
        ]);
        $catResponse->assertRedirect(route('admin.categories.index'));

        $category = Category::where('slug', 'kategori-baru')->first();
        $this->assertNotNull($category);

        $prodResponse = $this->actingAs($admin)->post(route('admin.products.store'), [
            'name' => 'Produk Baru',
            'slug' => 'produk-baru',
            'category_id' => $category->id,
            'description' => 'Deskripsi Produk',
            'summary' => 'Ringkasan',
            'active' => true,
            'variants' => [
                [
                    'name' => 'Varian Standar',
                    'price' => 25000,
                    'stock' => 50,
                ],
            ],
        ]);
        $prodResponse->assertRedirect(route('admin.products.index'));

        $this->assertDatabaseHas('products', [
            'slug' => 'produk-baru',
        ]);
        $this->assertDatabaseHas('variants', [
            'name' => 'Varian Standar',
            'price' => 25000,
        ]);
    }
}
