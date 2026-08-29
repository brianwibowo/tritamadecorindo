<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
    ];

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return HasMany<CartItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Calculate the total amount of all items in the cart.
     *
     * @return Attribute<int, never>
     */
    protected function totalAmount(): Attribute
    {
        return Attribute::make(
            get: fn (): int => $this->items->sum(
                fn (CartItem $item): int => $item->variant->price * $item->quantity,
            ),
        );
    }
}
