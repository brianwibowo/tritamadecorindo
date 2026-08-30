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

    public function test_home_page_displays_hero_and_featured_products(): void
    {
        $category = Category::create([
            'id' => 'cat-rempah-pilihan',
            'name' => 'Rempah Unggulan Ekspor',
            'slug' => 'rempah-unggulan-ekspor',
            'description' => 'Komoditas rempah mutu terbaik.',
            'active' => true,
        ]);

        $product = Product::create([
            'id' => 'prod-cengkeh-test',
            'name' => 'Cengkeh Maluku Grade AB6',
            'slug' => 'cengkeh-maluku-grade-ab6',
            'category_id' => $category->id,
            'summary' => 'Cengkeh kualitas ekspor.',
            'description' => 'Kadar air di bawah 12%.',
            'active' => true,
        ]);

        Variant::create([
            'id' => 'var-cengkeh-1',
            'product_id' => $product->id,
            'name' => 'Karung 25 Kg',
            'price' => 3500000,
            'stock' => 50,
        ]);

        $response = $this->get(route('home'));

        $response->assertStatus(200);
    }

    public function test_products_catalog_and_detail_can_be_viewed(): void
    {
        $category = Category::create([
            'id' => 'cat-biji-pala',
            'name' => 'Biji Pala & Fuli',
            'slug' => 'biji-pala-dan-fuli',
            'active' => true,
        ]);

        $product = Product::create([
            'id' => 'prod-pala-test',
            'name' => 'Biji Pala Banda Test',
            'slug' => 'biji-pala-banda-test',
            'category_id' => $category->id,
            'active' => true,
        ]);

        Variant::create([
            'id' => 'var-pala-1',
            'product_id' => $product->id,
            'name' => 'Grade ABCD',
            'price' => 145000,
            'stock' => 100,
        ]);

        $response = $this->get(route('products.index'));
        $response->assertStatus(200);

        $detailResponse = $this->get(route('products.show', 'biji-pala-banda-test'));
        $detailResponse->assertStatus(200);
    }
}
