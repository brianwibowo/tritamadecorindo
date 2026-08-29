<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'slug',
        'description',
        'summary',
        'category_id',
        'images',
        'active',
        'show_price',
    ];

    /** @var array<string, mixed> */
    protected $attributes = [
        'images' => '[]',
        'show_price' => true,
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'images' => 'array',
            'active' => 'boolean',
            'show_price' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return HasMany<Variant, $this>
     */
    public function variants(): HasMany
    {
        return $this->hasMany(Variant::class);
    }

    /**
     * Get the lowest variant price for this product.
     *
     * @return Attribute<int|null, never>
     */
    protected function lowestPrice(): Attribute
    {
        return Attribute::make(
            get: fn (): ?int => $this->variants->min('price'),
        );
    }
}
