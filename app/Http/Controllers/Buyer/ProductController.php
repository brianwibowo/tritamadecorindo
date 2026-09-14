<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Services\MoneyService;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display product catalog with advanced filter library & sorting.
     */
    public function index(): Response
    {
        $query = Product::with(['category', 'variants'])
            ->where('active', true);

        if ($category = request('category')) {
            $query->where('category_id', $category);
        }

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('summary', 'like', "%{$search}%");
            });
        }

        if ($tag = request('tag')) {
            if ($tag === 'terlaris' || $tag === 'ekspor') {
                $query->where('name', 'like', '%Cengkeh%')
                    ->orWhere('name', 'like', '%Pala%')
                    ->orWhere('name', 'like', '%Kayu Manis%');
            } elseif ($tag === 'terbaru') {
                $query->latest();
            } elseif ($tag === 'organik') {
                $query->where('name', 'like', '%Vanilla%')
                    ->orWhere('name', 'like', '%Jahe%')
                    ->orWhere('name', 'like', '%Kapulaga%');
            }
        }

        if ($priceRange = request('price_range')) {
            if ($priceRange === 'under_50k') {
                $query->whereHas('variants', fn ($q) => $q->where('price', '<=', 50000));
            } elseif ($priceRange === '50k_100k') {
                $query->whereHas('variants', fn ($q) => $q->whereBetween('price', [50000, 100000]));
            } elseif ($priceRange === '100k_200k') {
                $query->whereHas('variants', fn ($q) => $q->whereBetween('price', [100000, 200000]));
            } elseif ($priceRange === 'above_200k') {
                $query->whereHas('variants', fn ($q) => $q->where('price', '>', 200000));
            } elseif ($priceRange === 'under_100k') {
                $query->whereHas('variants', fn ($q) => $q->where('price', '<=', 100000));
            } elseif ($priceRange === '100k_500k') {
                $query->whereHas('variants', fn ($q) => $q->whereBetween('price', [100000, 500000]));
            } elseif ($priceRange === 'above_500k') {
                $query->whereHas('variants', fn ($q) => $q->where('price', '>', 500000));
            }
        }

        $sort = request('sort', 'latest');
        match ($sort) {
            'price_asc' => $query->withMin('variants', 'price')->orderBy('variants_min_price', 'asc'),
            'price_desc' => $query->withMin('variants', 'price')->orderBy('variants_min_price', 'desc'),
            'name_asc' => $query->orderBy('name', 'asc'),
            'name_desc' => $query->orderBy('name', 'desc'),
            default => $query->latest(),
        };

        $products = $query->paginate(6)->withQueryString();

        $products->getCollection()->transform(fn (Product $product) => [
            ...$product->toArray(),
            'lowest_price' => $product->variants->min('price'),
            'lowest_price_formatted' => $product->variants->isNotEmpty()
                ? MoneyService::format($product->variants->min('price'))
                : '-',
        ]);

        $categories = Category::where('active', true)
            ->withCount('products')
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => request('search', ''),
                'category' => request('category', ''),
                'sort' => $sort,
                'tag' => request('tag', 'all'),
                'price_range' => request('price_range', ''),
            ],
        ]);
    }

    /**
     * Display a single product by slug.
     */
    public function show(string $slug): Response
    {
        $product = Product::with(['category', 'variants'])
            ->where('slug', $slug)
            ->where('active', true)
            ->firstOrFail();

        $variants = $product->variants->map(fn ($variant) => [
            ...$variant->toArray(),
            'price_formatted' => MoneyService::format($variant->price),
        ]);

        $relatedProducts = Product::with(['variants'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('active', true)
            ->take(4)
            ->get()
            ->map(fn (Product $p) => [
                ...$p->toArray(),
                'lowest_price_formatted' => $p->variants->isNotEmpty()
                    ? MoneyService::format($p->variants->min('price'))
                    : '-',
            ]);

        return Inertia::render('Products/Show', [
            'product' => [
                ...$product->toArray(),
                'variants' => $variants,
            ],
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
