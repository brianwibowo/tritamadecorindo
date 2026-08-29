<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Variant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductService
{
    /**
     * Create a product with its variants inside a transaction.
     *
     * @param  array{name: string, slug: string, description?: string, summary?: string, category_id: string, images?: array<string>, active?: bool, variants: array<array{name?: string, price: int, stock?: int, images?: array<string>, attributes?: array<string, mixed>}>}  $data
     */
    public function createWithVariants(array $data): Product
    {
        return DB::transaction(function () use ($data): Product {
            $variants = $data['variants'] ?? [];
            unset($data['variants']);

            $data['id'] = $data['id'] ?? 'prod-'.Str::uuid();

            $product = Product::create($data);

            foreach ($variants as $variantData) {
                $variantData['id'] = $variantData['id'] ?? 'var-'.Str::uuid();
                $variantData['product_id'] = $product->id;
                Variant::create($variantData);
            }

            return $product->load('variants');
        });
    }

    /**
     * Update a product and sync its variants inside a transaction.
     *
     * @param  array{name?: string, slug?: string, description?: string, summary?: string, category_id?: string, images?: array<string>, active?: bool, variants?: array<array{id?: string, name?: string, price: int, stock?: int, images?: array<string>, attributes?: array<string, mixed>}>}  $data
     */
    public function updateWithVariants(Product $product, array $data): Product
    {
        return DB::transaction(function () use ($product, $data): Product {
            $variants = $data['variants'] ?? null;
            unset($data['variants']);

            $product->update($data);

            if ($variants !== null) {
                $existingIds = $product->variants->pluck('id')->toArray();
                $incomingIds = [];

                foreach ($variants as $variantData) {
                    if (isset($variantData['id']) && in_array($variantData['id'], $existingIds)) {
                        $variant = Variant::find($variantData['id']);
                        $variant?->update($variantData);
                        $incomingIds[] = $variantData['id'];
                    } else {
                        $variantData['id'] = $variantData['id'] ?? 'var-'.Str::uuid();
                        $variantData['product_id'] = $product->id;
                        Variant::create($variantData);
                        $incomingIds[] = $variantData['id'];
                    }
                }

                // Remove variants not in the incoming list
                Variant::where('product_id', $product->id)
                    ->whereNotIn('id', $incomingIds)
                    ->delete();
            }

            return $product->load('variants');
        });
    }
}
