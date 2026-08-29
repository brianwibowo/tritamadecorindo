<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StorefrontTest extends TestCase
{
    use RefreshDatabase;

    public function test_storefront_homepage_loads_successfully(): void
    {
        $category = Category::create([
            'id' => 'cat-test',
            'name' => 'Kaca Film Gedung',
            'slug' => 'kaca-film-gedung',
            'active' => true,
        ]);

        $product = Product::create([
            'id' => 'prod-test',
            'name' => 'Kaca Film Riben 80%',
            'slug' => 'kaca-film-riben-80',
            'category_id' => $category->id,
            'active' => true,
        ]);

        Variant::create([
            'id' => 'var-test',
            'product_id' => $product->id,
            'name' => 'Per Meter Persegi (m²)',
            'price' => 75000,
            'stock' => 100,
        ]);

        $response = $this->get(route('home'));
        $response->assertStatus(200);
    }

    public function test_product_catalog_and_detail_work(): void
    {
        $category = Category::create([
            'id' => 'cat-test-2',
            'name' => 'Sandblast Sticker',
            'slug' => 'sandblast-sticker',
            'active' => true,
        ]);

        $product = Product::create([
            'id' => 'prod-test-2',
            'name' => 'Sandblast Cutting Motif Logo',
            'slug' => 'sandblast-cutting-motif-logo',
            'category_id' => $category->id,
            'active' => true,
        ]);

        Variant::create([
            'id' => 'var-test-2',
            'product_id' => $product->id,
            'name' => 'Ukuran Standar',
            'price' => 120000,
            'stock' => 50,
        ]);

        $response = $this->get(route('products.index', ['category' => 'cat-test-2']));
        $response->assertStatus(200);

        $detailResponse = $this->get(route('products.show', 'sandblast-cutting-motif-logo'));
        $detailResponse->assertStatus(200);
    }

    public function test_gallery_page_loads_successfully(): void
    {
        $response = $this->get(route('gallery.index'));
        $response->assertStatus(200);
    }

    public function test_cart_route_redirects_to_products_catalog(): void
    {
        $response = $this->get('/cart');
        $response->assertRedirect(route('products.index'));
    }
}
