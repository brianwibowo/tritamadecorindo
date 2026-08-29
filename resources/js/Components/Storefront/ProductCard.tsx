import { formatMoney } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { MessageSquare, Plus } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';

export function ProductCard({
	product,
	priority = false,
}: {
	product: Product & { lowest_price_formatted?: string };
	priority?: boolean;
}) {
	const [adding, setAdding] = useState(false);
	const variants = product.variants;
	const firstVariant = variants && variants.length > 0 ? variants[0] : null;

	const allImages = [
		...(product.images ?? []),
		...(variants?.flatMap((v) => v.images ?? []).filter((img) => !(product.images ?? []).includes(img)) ?? []),
	];

	// Fallback image if empty
	const primaryImage = allImages[0] || '/images/products/cengkeh-maluku.webp';
	const secondaryImage = allImages[1] || null;

	const isPriceShown = product.show_price !== false;
	const priceDisplay =
		product.lowest_price_formatted || (firstVariant ? formatMoney(firstVariant.price) : 'Rp 0');

	const handleQuickAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!firstVariant) return;

		setAdding(true);
		router.post(
			route('cart.store'),
			{ variant_id: firstVariant.id, quantity: 1 },
			{
				preserveScroll: true,
				onFinish: () => setAdding(false),
			}
		);
	};

	return (
		<Link href={`/product/${product.slug}`} className="group block">
			<div className="relative aspect-[4/5] bg-secondary/50 rounded-2xl overflow-hidden border border-border/50 shadow-sm">
				{firstVariant && isPriceShown && (
					<button
						type="button"
						onClick={handleQuickAdd}
						disabled={adding}
						className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#80070A] text-[#F8C300] shadow-md transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:brightness-110 hover:scale-110 active:scale-95"
						title="Tambah ke Keranjang"
					>
						<Plus className="h-4 w-4" />
					</button>
				)}

				<img
					src={primaryImage}
					alt={product.name}
					className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
						secondaryImage ? 'group-hover:opacity-0' : ''
					}`}
				/>

				{secondaryImage && (
					<img
						src={secondaryImage}
						alt={`${product.name} alternate view`}
						className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
					/>
				)}
			</div>
			<div className="mt-4 flex items-start justify-between gap-3">
				<div className="min-w-0">
					<h3 className="font-display text-base sm:text-lg font-bold text-foreground leading-tight truncate">
						{product.name}
					</h3>
					<p className="text-xs text-muted-foreground mt-1 uppercase tracking-[0.14em] font-semibold">
						{product.category?.name || 'Komoditas Rempah'}
					</p>
				</div>
				<div className="shrink-0">
					{isPriceShown ? (
						<p className="text-sm font-bold text-[#80070A] whitespace-nowrap">
							{priceDisplay}
						</p>
					) : (
						<span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 whitespace-nowrap">
							Hubungi Kami (Nego)
						</span>
					)}
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
