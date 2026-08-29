<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\OrderArchiveFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $order_number
 * @property string $customer_name
 * @property string $customer_phone
 * @property string|null $customer_address
 * @property string $project_type
 * @property string $details
 * @property int $total_amount
 * @property string $status
 * @property Carbon|null $installation_date
 * @property string|null $notes
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
#[Fillable([
    'order_number',
    'customer_name',
    'customer_phone',
    'customer_address',
    'project_type',
    'details',
    'total_amount',
    'status',
    'installation_date',
    'notes',
])]
class OrderArchive extends Model
{
    /** @use HasFactory<OrderArchiveFactory> */
    use HasFactory, HasUuids;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'total_amount' => 'integer',
            'installation_date' => 'date',
        ];
    }

    /**
     * Auto-generate a sequential human-readable invoice / archive code.
     */
    public static function generateOrderNumber(): string
    {
        $prefix = 'TRT-'.date('Ym');
        $latest = static::where('order_number', 'like', "{$prefix}-%")->latest('created_at')->first();

        if ($latest && preg_match('/-(\d+)$/', $latest->order_number, $matches)) {
            $number = intval($matches[1]) + 1;
        } else {
            $number = 1;
        }

        return sprintf('%s-%04d', $prefix, $number);
    }
}
