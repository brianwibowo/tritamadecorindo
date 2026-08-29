<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Services\MoneyService;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService,
    ) {}

    /**
     * Display a paginated list of products with search and category filters.
     */
    public function index(): Response
    {
        $query = Product::with(['category', 'variants']);

        if ($search = request('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($category = request('category')) {
            $query->where('category_id', $category);
        }

        $products = $query->latest()->paginate(10)->withQueryString();

        $products->getCollection()->transform(fn (Product $product) => [
            ...$product->toArray(),
            'lowest_price_formatted' => $product->variants->isNotEmpty()
                ? MoneyService::format($product->variants->min('price'))
                : '-',
            'total_stock' => $product->variants->sum('stock'),
        ]);

        $categories = Category::where('active', true)->get(['id', 'name']);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => request('search', ''),
                'category' => request('category', ''),
            ],
        ]);
    }

    /**
     * Check if a slug is already taken in the database.
     */
    public function checkSlug(Request $request): JsonResponse
    {
        $slug = $request->query('slug', '');
        $id = $request->query('id');

        if (empty($slug)) {
            return response()->json([
                'slug' => '',
                'exists' => false,
                'available' => true,
            ]);
        }

        $query = Product::where('slug', $slug);
        if ($id) {
            $query->where('id', '!=', $id);
        }

        $exists = $query->exists();

        return response()->json([
            'slug' => $slug,
            'exists' => $exists,
            'available' => ! $exists,
        ]);
    }

    /**
     * Quick toggle price display status of a product (Slide Switch).
     * When show_price is true: Price is shown.
     * When show_price is false: Price is hidden / negotiation mode (product remains active).
     */
    public function togglePrice(Product $product): RedirectResponse
    {
        $product->update([
            'show_price' => ! $product->show_price,
        ]);

        $statusText = $product->show_price ? 'Tampil (Aktif)' : 'Sembunyi / Nego (Nonaktif)';

        return redirect()
            ->back()
            ->with('success', "Tampilan harga komoditas '{$product->name}' berhasil diubah menjadi: {$statusText}.");
    }

    /**
     * Alias for togglePrice for backward compatibility.
     */
    public function toggleStatus(Product $product): RedirectResponse
    {
        return $this->togglePrice($product);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create(): Response
    {
        $categories = Category::where('active', true)->get(['id', 'name']);

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $images = $validated['images'] ?? [];
        if ($request->hasFile('image_files')) {
            foreach ($request->file('image_files') as $file) {
                if ($file && $file->isValid()) {
                    $path = $file->store('products', 'public');
                    $images[] = '/storage/'.$path;
                }
            }
        }

        $validated['images'] = array_values(array_filter($images));

        $this->productService->createWithVariants($validated);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Produk berhasil ditambahkan.');
    }

    /**
     * Show the form for editing a product.
     */
    public function edit(Product $product): Response
    {
        $product->load('variants');
        $categories = Category::where('active', true)->get(['id', 'name']);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $validated = $request->validated();

        $images = $validated['images'] ?? [];
        if ($request->hasFile('image_files')) {
            foreach ($request->file('image_files') as $file) {
                if ($file && $file->isValid()) {
                    $path = $file->store('products', 'public');
                    $images[] = '/storage/'.$path;
                }
            }
        }

        $validated['images'] = array_values(array_filter($images));

        $this->productService->updateWithVariants($product, $validated);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Produk berhasil diperbarui.');
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Produk berhasil dihapus.');
    }
}
