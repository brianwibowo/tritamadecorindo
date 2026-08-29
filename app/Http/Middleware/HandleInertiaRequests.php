<?php

namespace App\Http\Middleware;

use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'cart_count' => fn () => $this->getCartCount($request),
        ];
    }

    private function getCartCount(Request $request): int
    {
        try {
            $user = $request->user();
            if ($user) {
                $cart = Cart::where('user_id', $user->id)->first();
            } else {
                $cartId = $request->session()->get('cart_id');
                $cart = $cartId ? Cart::find($cartId) : null;
            }

            return $cart ? (int) $cart->items()->sum('quantity') : 0;
        } catch (\Throwable) {
            return 0;
        }
    }
}
