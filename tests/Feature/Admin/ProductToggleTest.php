<?php

namespace Tests\Feature\Admin;

use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductToggleTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => UserRole::Admin]);
    }

    public function test_admin_can_toggle_product_price_display(): void
    {
        $category = Category::create([
            'id' => 'cat-rempah',
            'name' => 'Rempah Kering',
            'slug' => 'rempah-kering',
            'active' => true,
        ]);

        $product = Product::create([
            'id' => 'prod-test-toggle',
            'name' => 'Cengkeh Maluku',
            'slug' => 'cengkeh-maluku',
            'category_id' => $category->id,
            'active' => true,
            'show_price' => true,
        ]);

        $response = $this->actingAs($this->admin)->patch(route('admin.products.toggle-price', $product->id));

        $response->assertRedirect();
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'show_price' => false,
            'active' => true,
        ]);

        // Toggle back to active (show price)
        $response = $this->actingAs($this->admin)->patch(route('admin.products.toggle-price', $product->id));
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'show_price' => true,
        ]);
    }

    public function test_admin_can_check_slug_availability(): void
    {
        $category = Category::create([
            'id' => 'cat-rempah-2',
            'name' => 'Rempah',
            'slug' => 'rempah',
            'active' => true,
        ]);

        Product::create([
            'id' => 'prod-existing',
            'name' => 'Biji Pala',
            'slug' => 'biji-pala',
            'category_id' => $category->id,
            'active' => true,
        ]);

        // Existing slug
        $response = $this->actingAs($this->admin)->get(route('admin.products.check-slug', ['slug' => 'biji-pala']));
        $response->assertOk();
        $response->assertJson([
            'slug' => 'biji-pala',
            'exists' => true,
            'available' => false,
        ]);

        // New available slug
        $response = $this->actingAs($this->admin)->get(route('admin.products.check-slug', ['slug' => 'kayu-manis-baru']));
        $response->assertOk();
        $response->assertJson([
            'slug' => 'kayu-manis-baru',
            'exists' => false,
            'available' => true,
        ]);
    }

    public function test_admin_can_toggle_category_status(): void
    {
        $category = Category::create([
            'id' => 'cat-test-toggle',
            'name' => 'Kategori Uji',
            'slug' => 'kategori-uji',
            'active' => true,
        ]);

        $response = $this->actingAs($this->admin)->patch(route('admin.categories.toggle', $category->id));

        $response->assertRedirect();
        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'active' => false,
        ]);
    }
}
