<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BuyerStorefrontTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_can_be_rendered(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_products_catalog_page_can_be_rendered(): void
    {
        $category = Category::factory()->create(['active' => true]);
        $product = Product::factory()->create(['category_id' => $category->id, 'active' => true]);
        Variant::factory()->create(['product_id' => $product->id]);

        $response = $this->get('/products');
        $response->assertStatus(200);
    }

    public function test_product_detail_page_can_be_rendered(): void
    {
        $category = Category::factory()->create(['active' => true]);
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'slug' => 'cengkeh-maluku-super',
            'active' => true,
        ]);
        Variant::factory()->create(['product_id' => $product->id]);

        $response = $this->get('/product/cengkeh-maluku-super');
        $response->assertStatus(200);
    }

    public function test_gallery_page_can_be_rendered(): void
    {
        $response = $this->get('/galeri');
        $response->assertStatus(200);
    }
}
