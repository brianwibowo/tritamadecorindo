import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { formatMoney } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import type { CartItem, Product, Variant } from '@/types';

interface CartItemDetail extends CartItem {
    variant?: Variant;
    product?: Product;
    price_formatted: string;
    subtotal: number;
    subtotal_formatted: string;
}

interface CartIndexProps {
    items: CartItemDetail[];
    totalAmount: number;
    totalAmountFormatted: string;
}

export default function CartIndex({ items, totalAmount, totalAmountFormatted }: CartIndexProps) {
    const handleUpdateQuantity = (itemId: string, currentQty: number, change: number) => {
        const newQty = currentQty + change;
        if (newQty <= 0) {
            handleRemoveItem(itemId);
            return;
        }

        router.patch(
            route('cart.update', itemId),
            { quantity: newQty },
            { preserveScroll: true }
        );
    };

    const handleRemoveItem = (itemId: string) => {
        router.delete(route('cart.destroy', itemId), { preserveScroll: true });
    };

    // Generate WhatsApp checkout link with formatted order details
    const generateWhatsAppLink = () => {
        const orderSummary = items
            .map(
                (item, idx) =>
                    `${idx + 1}. ${item.product?.name || 'Produk'} (${item.variant?.name || 'Standar'}) x${item.quantity} = ${item.subtotal_formatted}`
            )
            .join('%0A');

        const message = `Halo Admin LFM Global Jayatama, saya ingin melakukan pemesanan komoditas rempah:%0A%0A${orderSummary}%0A%0ATotal: *${totalAmountFormatted}*%0A%0AMohon info ketersediaan stok, spesifikasi ekspor, dan pengiriman ke alamat saya. Terima kasih!`;
        return `https://wa.me/6281234567890?text=${message}`;
    };

    return (
        <StorefrontLayout>
            <Head title="Keranjang Belanja — PT LFM Global Jayatama" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
                <div className="border-b border-border/60 pb-6 mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#80070A]">
                        Pemesanan
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
                        Daftar Pesanan Rempah
                    </h1>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-[32px] border border-dashed border-border bg-white/60 p-16 text-center max-w-2xl mx-auto">
                        <span className="text-6xl">🌿</span>
                        <h2 className="font-display text-2xl font-bold text-foreground mt-4">
                            Daftar Pesanan Masih Kosong
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                            Anda belum menambahkan produk komoditas rempah pilihan ke dalam daftar pesanan.
                        </p>
                        <Link
                            href={route('products.index')}
                            className="mt-6 inline-flex rounded-full bg-[#80070A] px-8 py-3.5 text-sm font-bold text-white hover:brightness-110 transition-all shadow-md"
                        >
                            Jelajahi Katalog Rempah →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-4">
                            <div className="rounded-3xl border border-yns-border bg-white/80 overflow-hidden">
                                <div className="divide-y divide-yns-border/60">
                                    {items.map((item) => {
                                        const imageUrl =
                                            item.product?.images && item.product.images.length > 0
                                                ? item.product.images[0]
                                                : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';

                                        return (
                                            <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                                {/* Product Image */}
                                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-yns-mist border border-yns-border">
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.product?.name || 'Produk'}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 min-w-0">
                                                    <Link
                                                        href={item.product ? route('products.show', item.product.slug) : '#'}
                                                        className="font-display text-base font-bold text-yns-fg hover:text-yns-clay transition-colors line-clamp-1"
                                                    >
                                                        {item.product?.name || 'Produk Ivet Mart'}
                                                    </Link>

                                                    <p className="text-xs text-yns-clay mt-0.5">
                                                        Varian: <strong className="text-yns-fg">{item.variant?.name || 'Standar'}</strong>
                                                    </p>

                                                    <p className="text-xs font-semibold text-yns-fg mt-1">
                                                        {item.price_formatted}
                                                    </p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                    <div className="flex items-center rounded-xl border border-yns-border bg-yns-bg/60">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                                            className="flex h-8 w-8 items-center justify-center text-sm font-bold text-yns-fg hover:bg-white rounded-l-xl"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-8 text-center text-xs font-bold text-yns-fg">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                                            className="flex h-8 w-8 items-center justify-center text-sm font-bold text-yns-fg hover:bg-white rounded-r-xl"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="text-right min-w-[90px]">
                                                        <p className="font-display text-sm font-bold text-yns-fg">
                                                            {item.subtotal_formatted}
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                                                        title="Hapus dari keranjang"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <Link
                                    href={route('products.index')}
                                    className="text-xs font-semibold text-yns-clay hover:text-yns-fg inline-flex items-center gap-1"
                                >
                                    ← Lanjut Belanja Produk Lain
                                </Link>
                            </div>
                        </div>

                        {/* Order Summary & Checkout Card */}
                        <div className="lg:col-span-4">
                            <div className="rounded-3xl border border-yns-border bg-white/90 p-6 shadow-md space-y-5">
                                <h3 className="font-display text-lg font-bold text-yns-fg border-b border-yns-border pb-4">
                                    Ringkasan Pesanan
                                </h3>

                                <dl className="space-y-3 text-xs">
                                    <div className="flex justify-between text-yns-fg/80">
                                        <dt>Total Item</dt>
                                        <dd className="font-bold text-yns-fg">
                                            {items.reduce((sum, i) => sum + i.quantity, 0)} pcs
                                        </dd>
                                    </div>
                                    <div className="flex justify-between text-yns-fg/80">
                                        <dt>Subtotal Produk</dt>
                                        <dd className="font-bold text-yns-fg">{totalAmountFormatted}</dd>
                                    </div>
                                    <div className="flex justify-between text-yns-fg/80">
                                        <dt>Pengemasan Higienis / Vakum</dt>
                                        <dd className="font-bold text-emerald-700">GRATIS</dd>
                                    </div>
                                    <div className="flex justify-between text-yns-fg/80">
                                        <dt>Ongkir (Area Kampus / Luar Kota)</dt>
                                        <dd className="text-yns-clay italic">Dihitung saat konfirmasi</dd>
                                    </div>
                                    <div className="border-t border-yns-border pt-3 flex justify-between items-baseline">
                                        <dt className="font-display text-sm font-bold text-yns-fg">Total Belanja</dt>
                                        <dd className="font-display text-xl font-bold text-yns-fg">
                                            {totalAmountFormatted}
                                        </dd>
                                    </div>
                                </dl>

                                {/* Direct Checkout via WhatsApp */}
                                <a
                                    href={generateWhatsAppLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all text-center"
                                >
                                    <span>💬</span>
                                    <span>Checkout via WhatsApp Admin</span>
                                </a>

                                <p className="text-[11px] text-center text-yns-clay leading-relaxed">
                                    Pesanan akan langsung diteruskan ke Admin WhatsApp Ivet Mart untuk konfirmasi stok, ongkos kirim, dan metode pembayaran (Transfer / QRIS).
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StorefrontLayout>
    );
}
