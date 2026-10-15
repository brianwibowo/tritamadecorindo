<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Services\MoneyService;
use Illuminate\Support\Str;
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

        $catalogTitle = 'Katalog Produk & Estimasi Harga Kaca Film, Sandblast, Wallpaper & Blinds Bekasi — Tritama Decorindo';
        $catalogDescription = 'Daftar material dan jasa pemasangan Kaca Film, Sandblast, Wallpaper, Roller Blinds, Huruf Timbul, dan Gorden di Bekasi, Cikarang, Tambun, serta Jabodetabek.';
        $catalogItems = [];

        foreach ($products->items() as $index => $catalogProduct) {
            $catalogItems[] = [
                '@type' => 'ListItem',
                'position' => $index + 1,
                'name' => $catalogProduct['name'],
                'url' => route('products.show', $catalogProduct['slug']),
            ];
        }

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
            'seo' => [
                'title' => $catalogTitle,
                'description' => $catalogDescription,
                'keywords' => 'harga kaca film bekasi, harga sandblast bekasi, harga wallpaper bekasi, harga roller blinds bekasi, huruf timbul bekasi, gorden bekasi',
                'canonical' => route('products.index'),
                'image' => asset('images/products/kaca-film-sparta.webp'),
                'type' => 'website',
                'schema' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'CollectionPage',
                    'name' => $catalogTitle,
                    'description' => $catalogDescription,
                    'url' => route('products.index'),
                    'isPartOf' => ['@id' => url('/').'/#website'],
                    'mainEntity' => [
                        '@type' => 'ItemList',
                        'numberOfItems' => $products->total(),
                        'itemListElement' => $catalogItems,
                    ],
                ],
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
            'seo' => $this->productSeo($product),
        ]);
    }

    /**
     * Build metadata and structured data for the initial product document.
     *
     * @return array<string, mixed>
     */
    private function productSeo(Product $product): array
    {
        $canonical = route('products.show', $product->slug);
        $images = collect([
            ...($product->images ?? []),
            ...$product->variants->flatMap(fn ($variant): array => $variant->images ?? [])->all(),
        ])->filter()->map(fn (string $image): string => Str::startsWith($image, ['http://', 'https://'])
            ? $image
            : asset(ltrim($image, '/')))->unique()->values()->all();

        if ($images === []) {
            $images[] = asset('images/products/kaca-film-riben.webp');
        }

        $description = Str::of(strip_tags((string) ($product->summary ?: $product->description ?: '')))
            ->squish()
            ->whenEmpty(fn ($value) => $value->append("Produk {$product->name} dari Tritama Decorindo Stiker."))
            ->limit(155, '...')
            ->toString();
        $prices = $product->variants
            ->pluck('price')
            ->map(fn ($price): int => (int) $price)
            ->filter(fn (int $price): bool => $price > 0)
            ->values();
        $hasStock = $product->variants->contains(fn ($variant): bool => (int) $variant->stock > 0);

        $productSchema = [
            '@type' => 'Product',
            '@id' => $canonical.'#product',
            'name' => $product->name,
            'url' => $canonical,
            'image' => $images,
            'description' => $description,
            'sku' => $product->id ?: $product->slug,
            'category' => $product->category?->name ?: 'Dekorasi dan Kaca Film',
            'brand' => [
                '@type' => 'Brand',
                'name' => 'Tritama Decorindo Stiker',
            ],
        ];

        if ($prices->isNotEmpty()) {
            $productSchema['offers'] = [
                '@type' => 'AggregateOffer',
                'priceCurrency' => 'IDR',
                'lowPrice' => $prices->min(),
                'highPrice' => $prices->max(),
                'offerCount' => $product->variants->count(),
                'itemCondition' => 'https://schema.org/NewCondition',
                'availability' => $hasStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
                'seller' => [
                    '@type' => 'Organization',
                    'name' => 'Tritama Decorindo Stiker',
                    'url' => url('/'),
                ],
            ];
        }

        return [
            'title' => "{$product->name} — Harga & Jasa Pasang di Bekasi & Jabodetabek | Tritama Decorindo",
            'description' => $description,
            'keywords' => "{$product->name} bekasi, harga {$product->name} bekasi, jasa pasang {$product->name} bekasi, {$product->category?->name} bekasi, tritama decorindo stiker",
            'canonical' => $canonical,
            'image' => $images[0],
            'type' => 'product',
            'schema' => [
                '@context' => 'https://schema.org',
                '@graph' => [
                    $productSchema,
                    [
                        '@type' => 'BreadcrumbList',
                        'itemListElement' => [
                            ['@type' => 'ListItem', 'position' => 1, 'name' => 'Beranda', 'item' => url('/')],
                            ['@type' => 'ListItem', 'position' => 2, 'name' => 'Katalog Produk', 'item' => route('products.index')],
                            ['@type' => 'ListItem', 'position' => 3, 'name' => $product->name, 'item' => $canonical],
                        ],
                    ],
                ],
            ],
        ];
    }
}
