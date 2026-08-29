<?php

namespace App\Services;

class MoneyService
{
    /**
     * Format an amount in IDR zero-decimal currency.
     *
     * IDR is a zero-decimal currency, so 45000 means Rp 45.000
     * (no division by 100 needed).
     */
    public static function format(int $amount): string
    {
        return 'Rp '.number_format($amount, 0, ',', '.');
    }
}
