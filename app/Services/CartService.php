<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use Illuminate\Support\Str;

class CartService
{
    /**
     * Get or create a cart for the current session/user.
     *
     * Guest users get a session-based cart. Authenticated users
     * get a DB-linked cart tied to their user ID.
     */
    public function getOrCreateCart(): Cart
    {
        /** @var User|null $user */
        $user = auth()->user();

        if ($user) {
            return Cart::firstOrCreate(
                ['user_id' => $user->id],
                ['id' => 'cart-'.Str::uuid()],
            );
        }

        $cartId = session('cart_id');

        if ($cartId) {
            $cart = Cart::find($cartId);

            if ($cart) {
                return $cart;
            }
        }

        $cart = Cart::create([
            'id' => 'cart-'.Str::uuid(),
        ]);

        session(['cart_id' => $cart->id]);

        return $cart;
    }

    /**
     * Add a variant to the cart, incrementing quantity if already present.
     */
    public function addItem(string $variantId, int $quantity = 1): CartItem
    {
        $cart = $this->getOrCreateCart();

        $item = CartItem::where('cart_id', $cart->id)
            ->where('variant_id', $variantId)
            ->first();

        if ($item) {
            $item->update(['quantity' => $item->quantity + $quantity]);

            return $item;
        }

        return CartItem::create([
            'cart_id' => $cart->id,
            'variant_id' => $variantId,
            'quantity' => $quantity,
        ]);
    }

    /**
     * Update the quantity of a cart item.
     */
    public function updateItem(string $itemId, int $quantity): CartItem
    {
        $item = CartItem::findOrFail($itemId);

        if ($quantity <= 0) {
            $item->delete();

            return $item;
        }

        $item->update(['quantity' => $quantity]);

        return $item;
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem(string $itemId): void
    {
        CartItem::findOrFail($itemId)->delete();
    }

    /**
     * Merge a guest session cart into the authenticated user's cart.
     *
     * Called after login to preserve items added while browsing as a guest.
     */
    public function mergeGuestCart(User $user): void
    {
        $guestCartId = session('cart_id');

        if (! $guestCartId) {
            return;
        }

        $guestCart = Cart::with('items')->find($guestCartId);

        if (! $guestCart || $guestCart->items->isEmpty()) {
            session()->forget('cart_id');

            return;
        }

        $userCart = Cart::firstOrCreate(
            ['user_id' => $user->id],
            ['id' => 'cart-'.Str::uuid()],
        );

        foreach ($guestCart->items as $guestItem) {
            $existingItem = CartItem::where('cart_id', $userCart->id)
                ->where('variant_id', $guestItem->variant_id)
                ->first();

            if ($existingItem) {
                $existingItem->update([
                    'quantity' => $existingItem->quantity + $guestItem->quantity,
                ]);
            } else {
                CartItem::create([
                    'cart_id' => $userCart->id,
                    'variant_id' => $guestItem->variant_id,
                    'quantity' => $guestItem->quantity,
                ]);
            }
        }

        $guestCart->delete();
        session()->forget('cart_id');
    }
}
