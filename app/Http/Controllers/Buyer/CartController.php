<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Services\CartService;
use App\Services\MoneyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function __construct(
        private CartService $cartService,
    ) {}

    /**
     * Display the cart page.
     */
    public function index(): Response
    {
        $cart = $this->cartService->getOrCreateCart();
        $cart->load(['items.variant.product']);

        $items = $cart->items->map(fn (CartItem $item) => [
            ...$item->toArray(),
            'variant' => $item->variant,
            'product' => $item->variant?->product,
            'price_formatted' => MoneyService::format($item->variant->price ?? 0),
            'subtotal' => ($item->variant->price ?? 0) * $item->quantity,
            'subtotal_formatted' => MoneyService::format(($item->variant->price ?? 0) * $item->quantity),
        ]);

        $totalAmount = $items->sum('subtotal');

        return Inertia::render('Cart/Index', [
            'items' => $items,
            'totalAmount' => $totalAmount,
            'totalAmountFormatted' => MoneyService::format($totalAmount),
        ]);
    }

    /**
     * Add an item to the cart.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'variant_id' => ['required', 'string', 'exists:variants,id'],
            'quantity' => ['nullable', 'integer', 'min:1'],
        ]);

        $this->cartService->addItem(
            $validated['variant_id'],
            $validated['quantity'] ?? 1,
        );

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan ke keranjang.');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, CartItem $item): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:0'],
        ]);

        $this->cartService->updateItem($item->id, $validated['quantity']);

        return redirect()->back()->with('success', 'Jumlah produk diperbarui.');
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy(CartItem $item): RedirectResponse
    {
        $this->cartService->removeItem($item->id);

        return redirect()->back()->with('success', 'Produk dihapus dari keranjang.');
    }
}
