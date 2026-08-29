<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generate dynamic XML sitemap for search engines.
     */
    public function index(): Response
    {
        $baseUrl = config('app.url', url('/'));
        $products = Product::where('active', true)->latest()->get(['slug', 'updated_at', 'images', 'name']);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

        // 1. Home
        $xml .= '<url>';
        $xml .= '<loc>'.$baseUrl.'</loc>';
        $xml .= '<lastmod>'.now()->toAtomString().'</lastmod>';
        $xml .= '<changefreq>daily</changefreq>';
        $xml .= '<priority>1.0</priority>';
        $xml .= '</url>';

        // 2. Products Catalog
        $xml .= '<url>';
        $xml .= '<loc>'.$baseUrl.'/products</loc>';
        $xml .= '<lastmod>'.now()->toAtomString().'</lastmod>';
        $xml .= '<changefreq>daily</changefreq>';
        $xml .= '<priority>0.9</priority>';
        $xml .= '</url>';

        // 3. Gallery
        $xml .= '<url>';
        $xml .= '<loc>'.$baseUrl.'/galeri</loc>';
        $xml .= '<lastmod>'.now()->toAtomString().'</lastmod>';
        $xml .= '<changefreq>weekly</changefreq>';
        $xml .= '<priority>0.8</priority>';
        $xml .= '</url>';

        // 4. Each Individual Product
        foreach ($products as $product) {
            $productUrl = $baseUrl.'/product/'.$product->slug;
            $imageUrl = ! empty($product->images) && isset($product->images[0])
                ? (str_starts_with($product->images[0], 'http') ? $product->images[0] : $baseUrl.$product->images[0])
                : $baseUrl.'/images/products/kaca-film-riben.webp';

            $xml .= '<url>';
            $xml .= '<loc>'.$productUrl.'</loc>';
            $xml .= '<lastmod>'.$product->updated_at->toAtomString().'</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.85</priority>';
            $xml .= '<image:image>';
            $xml .= '<image:loc>'.htmlspecialchars($imageUrl).'</image:loc>';
            $xml .= '<image:title>'.htmlspecialchars($product->name).' - Tritama Decorindo Stiker</image:title>';
            $xml .= '</image:image>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
        ]);
    }
}
