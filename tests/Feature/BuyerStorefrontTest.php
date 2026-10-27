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
        $response->assertSee('Katalog Produk &amp; Estimasi Harga', false);
        $response->assertSee('"@type":"CollectionPage"', false);
    }

    public function test_product_detail_page_can_be_rendered(): void
    {
        $category = Category::factory()->create(['active' => true]);
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'slug' => 'cengkeh-maluku-super',
            'name' => 'Kaca Film Riben Bekasi',
            'summary' => 'Kaca film riben untuk rumah dan kantor di Bekasi.',
            'active' => true,
        ]);
        Variant::factory()->create(['product_id' => $product->id]);

        $response = $this->get('/product/cengkeh-maluku-super');
        $response->assertStatus(200);
        $response->assertSee('Kaca Film Riben Bekasi — Harga &amp; Jasa Pasang di Bekasi', false);
        $response->assertSee('"@type":"Product"', false);
        $response->assertSee('"@type":"BreadcrumbList"', false);
        $response->assertDontSee('AggregateRating', false);
    }

    public function test_product_without_variants_still_generates_valid_offers_schema(): void
    {
        $category = Category::factory()->create(['active' => true]);
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'slug' => 'huruf-timbul-laser-acrilik',
            'name' => 'Huruf Timbul Laser Acrilik',
            'summary' => 'Huruf Timbul Laser Acrylic untuk identitas brand.',
            'active' => true,
        ]);

        $response = $this->get('/product/huruf-timbul-laser-acrilik');
        $response->assertStatus(200);
        $response->assertSee('"@type":"Product"', false);
        $response->assertSee('"offers":', false);
        $response->assertSee('"priceCurrency":"IDR"', false);
    }

    public function test_gallery_page_can_be_rendered(): void
    {
        $response = $this->get('/galeri');
        $response->assertStatus(200);
    }
}
