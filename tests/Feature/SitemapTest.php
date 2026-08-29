<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SitemapTest extends TestCase
{
    use RefreshDatabase;

    public function test_sitemap_xml_can_be_retrieved(): void
    {
        $category = Category::create([
            'id' => 'cat-rempah-seo',
            'name' => 'Rempah Unggulan',
            'slug' => 'rempah-unggulan',
            'active' => true,
        ]);

        Product::create([
            'id' => 'prod-sitemap-1',
            'name' => 'Cengkeh Maluku Super',
            'slug' => 'cengkeh-maluku-super',
            'category_id' => $category->id,
            'active' => true,
            'images' => ['/images/products/cengkeh-maluku.webp'],
        ]);

        $response = $this->get('/sitemap.xml');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/xml; charset=utf-8');

        $content = $response->getContent();
        $this->assertStringContainsString('<loc>', $content);
        $this->assertStringContainsString('/products</loc>', $content);
        $this->assertStringContainsString('/galeri</loc>', $content);
        $this->assertStringContainsString('/product/cengkeh-maluku-super</loc>', $content);
        $this->assertStringContainsString('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"', $content);
    }
}
