<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\OrderArchive;
use App\Models\Product;
use App\Models\User;
use App\Services\MoneyService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with overview stats and latest content.
     */
    public function index(): Response
    {
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalGalleries = Gallery::count();
        $totalOrderArchives = OrderArchive::count();
        $totalUsers = User::count();

        $latestProducts = Product::with(['category', 'variants'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'category_name' => $product->category?->name ?? 'Material',
                'price_formatted' => $product->variants->first() ? MoneyService::format($product->variants->first()->price) : 'Custom',
                'active' => $product->active,
                'created_at' => $product->created_at->format('d M Y'),
            ]);

        $latestGalleries = Gallery::latest()
            ->take(6)
            ->get()
            ->map(fn (Gallery $gallery) => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'category' => $gallery->category,
                'image' => $gallery->image,
                'active' => $gallery->active,
                'created_at' => $gallery->created_at->format('d M Y'),
            ]);

        $latestArchives = OrderArchive::latest()
            ->take(5)
            ->get()
            ->map(fn (OrderArchive $archive) => [
                'id' => $archive->id,
                'order_number' => $archive->order_number,
                'customer_name' => $archive->customer_name,
                'project_type' => $archive->project_type,
                'total_amount_formatted' => MoneyService::format($archive->total_amount),
                'status' => $archive->status,
                'created_at' => $archive->created_at->format('d M Y'),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalCategories' => $totalCategories,
                'totalGalleries' => $totalGalleries,
                'totalOrderArchives' => $totalOrderArchives,
                'totalUsers' => $totalUsers,
            ],
            'latestProducts' => $latestProducts,
            'latestGalleries' => $latestGalleries,
            'latestArchives' => $latestArchives,
        ]);
    }
}
