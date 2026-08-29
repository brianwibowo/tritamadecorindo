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
            'name' => 'Rempah Kering',
            'slug' => 'rempah-kering-test',
            'active' => true,
        ]);

        $product = Product::create([
            'id' => 'prod-test',
            'name' => 'Cengkeh Maluku Test',
            'slug' => 'cengkeh-maluku-test',
            'category_id' => $category->id,
            'active' => true,
        ]);

        Variant::create([
            'id' => 'var-test',
            'product_id' => $product->id,
            'name' => 'Grade AB6',
            'price' => 145000,
            'stock' => 10,
        ]);

        $response = $this->get(route('home'));
        $response->assertStatus(200);
    }

    public function test_product_catalog_and_filters_work(): void
    {
        $category = Category::create([
            'id' => 'cat-test-2',
            'name' => 'Biji & Buah',
            'slug' => 'biji-buah-test',
            'active' => true,
        ]);

        $product = Product::create([
            'id' => 'prod-test-2',
            'name' => 'Biji Pala Banda Test',
            'slug' => 'biji-pala-banda-test',
            'category_id' => $category->id,
            'active' => true,
        ]);

        Variant::create([
            'id' => 'var-test-2',
            'product_id' => $product->id,
            'name' => 'ABCD Sound',
            'price' => 175000,
            'stock' => 5,
        ]);

        $response = $this->get(route('products.index', ['category' => 'cat-test-2']));
        $response->assertStatus(200);

        $detailResponse = $this->get(route('products.show', 'biji-pala-banda-test'));
        $detailResponse->assertStatus(200);
    }

    public function test_cart_operations_work_for_guest(): void
    {
        $category = Category::create([
            'id' => 'cat-cart-test',
            'name' => 'Rempah Kering',
            'slug' => 'rempah-kering',
            'active' => true,
        ]);

        $product = Product::create([
            'id' => 'prod-cart-test',
            'name' => 'Kayu Manis Kerinci Test',
            'slug' => 'kayu-manis-kerinci-test',
            'category_id' => $category->id,
            'active' => true,
        ]);

        $variant = Variant::create([
            'id' => 'var-cart-test',
            'product_id' => $product->id,
            'name' => 'Stick AA',
            'price' => 95000,
            'stock' => 20,
        ]);

        // Add to cart
        $addResponse = $this->post(route('cart.store'), [
            'variant_id' => $variant->id,
            'quantity' => 2,
        ]);
        $addResponse->assertRedirect();

        // View cart
        $cartResponse = $this->get(route('cart.index'));
        $cartResponse->assertStatus(200);
    }
}
