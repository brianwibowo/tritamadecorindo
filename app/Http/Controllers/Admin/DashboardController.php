<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Services\MoneyService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with overview stats.
     */
    public function index(): Response
    {
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalOrders = Order::count();
        $totalRevenue = Order::where('payment_status', '!=', 'unpaid')->sum('total_amount');

        $recentOrders = Order::with('buyer')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (Order $order) => [
                ...$order->toArray(),
                'total_amount_formatted' => MoneyService::format($order->total_amount),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalCategories' => $totalCategories,
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'totalRevenueFormatted' => MoneyService::format($totalRevenue),
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}
