<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'caption', 'category', 'category_label', 'image', 'images', 'active', 'sort_order'])]
class Gallery extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'images' => 'array',
        'active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'all_images',
    ];

    /**
     * Get all images as a guaranteed array.
     *
     * @return array<int, string>
     */
    public function getAllImagesAttribute(): array
    {
        if (! empty($this->images) && is_array($this->images)) {
            return $this->images;
        }

        return $this->image ? [$this->image] : [];
    }
}
