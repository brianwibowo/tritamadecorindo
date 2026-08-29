<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasUuids;

    protected $fillable = [
        'buyer_id',
        'total_amount',
        'payment_method',
        'payment_status',
        'notes',
        'shipping_name',
        'shipping_address',
        'shipping_phone',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'total_amount' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    /**
     * @return HasMany<OrderItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
