<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Product;
use App\Services\MoneyService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the storefront homepage.
     */
    public function index(): Response
    {
        $categories = Category::where('active', true)
            ->withCount('products')
            ->get();

        $featuredProducts = Product::with(['category', 'variants'])
            ->where('active', true)
            ->latest()
            ->take(8)
            ->get()
            ->map(fn (Product $product) => [
                ...$product->toArray(),
                'lowest_price' => $product->variants->min('price'),
                'lowest_price_formatted' => $product->variants->isNotEmpty()
                    ? MoneyService::format($product->variants->min('price'))
                    : '-',
            ]);

        $featuredGalleries = Gallery::where('active', true)
            ->orderBy('sort_order')
            ->latest('id')
            ->take(6)
            ->get();

        return Inertia::render('Home', [
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
            'featuredGalleries' => $featuredGalleries,
        ]);
    }
}
