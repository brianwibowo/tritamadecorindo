/**
 * Merge class names with conditional support.
 * Simple utility for combining Tailwind classes.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Format an amount in IDR zero-decimal currency.
 * 45000 → "Rp 45.000"
 */
export function formatMoney(amount: number): string {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

/**
 * Generate a URL-safe slug from text.
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .trim();
}
