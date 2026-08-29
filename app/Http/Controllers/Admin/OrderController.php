<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateOrderRequest;
use App\Models\Order;
use App\Services\MoneyService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a paginated list of orders.
     */
    public function index(): Response
    {
        $orders = Order::with(['buyer', 'items.variant'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $orders->getCollection()->transform(fn (Order $order) => [
            ...$order->toArray(),
            'total_amount_formatted' => MoneyService::format($order->total_amount),
            'items' => $order->items->map(fn ($item) => [
                ...$item->toArray(),
                'price_formatted' => MoneyService::format($item->price),
                'subtotal_formatted' => MoneyService::format($item->price * $item->quantity),
            ]),
        ]);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order): Response
    {
        $order->load(['buyer', 'items.variant']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => [
                ...$order->toArray(),
                'total_amount_formatted' => MoneyService::format($order->total_amount),
                'items' => $order->items->map(fn ($item) => [
                    ...$item->toArray(),
                    'price_formatted' => MoneyService::format($item->price),
                    'subtotal_formatted' => MoneyService::format($item->price * $item->quantity),
                ]),
            ],
        ]);
    }

    /**
     * Update the specified order status.
     */
    public function update(UpdateOrderRequest $request, Order $order): RedirectResponse
    {
        $order->update([
            'payment_status' => $request->validated('payment_status'),
        ]);

        return redirect()
            ->route('admin.orders.index')
            ->with('success', 'Status pesanan berhasil diperbarui.');
    }
}
