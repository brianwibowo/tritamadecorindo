<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceLandingTest extends TestCase
{
    use RefreshDatabase;

    public function test_service_landing_page_is_server_rendered_and_links_to_products(): void
    {
        Category::factory()->create([
            'id' => 'cat-kaca-film',
            'name' => 'Kaca Film',
            'slug' => 'kaca-film',
            'active' => true,
        ]);

        $product = Product::factory()->create([
            'category_id' => 'cat-kaca-film',
            'name' => 'Kaca Film Riben Bekasi',
            'slug' => 'kaca-film-riben-bekasi',
            'active' => true,
        ]);

        $response = $this->get(route('services.show', 'kaca-film-bekasi'));

        $response->assertOk();
        $response->assertSee('Jasa Pasang Kaca Film Bekasi', false);
        $response->assertSee('application/ld+json', false);
        $response->assertSee(route('products.show', $product->slug), false);
        $response->assertSee(route('services.show', 'kaca-film-bekasi'), false);
    }

    public function test_unknown_service_landing_page_returns_not_found(): void
    {
        $this->get('/layanan/tidak-ada')->assertNotFound();
    }
}
