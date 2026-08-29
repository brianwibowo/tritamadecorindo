import { formatMoney } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import type { Product } from '@/types';

export function ProductCard({
	product,
	priority = false,
}: {
	product: Product & { lowest_price_formatted?: string };
	priority?: boolean;
}) {
	const variants = product.variants;
	const firstVariant = variants && variants.length > 0 ? variants[0] : null;

	const allImages = [
		...(product.images ?? []),
		...(variants?.flatMap((v) => v.images ?? []).filter((img) => !(product.images ?? []).includes(img)) ?? []),
	];

	// Fallback image if empty
	const primaryImage = allImages[0] || '/images/products/kaca-film-riben.webp';
	const secondaryImage = allImages[1] || null;

	const isPriceShown = product.show_price !== false;
	const priceDisplay =
		product.lowest_price_formatted || (firstVariant ? formatMoney(firstVariant.price) : 'Rp 0');

	return (
		<Link href={`/product/${product.slug}`} className="group block">
			<div className="relative aspect-[4/3] sm:aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
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
			<div className="mt-3 flex items-start justify-between gap-3">
				<div className="min-w-0">
					<h3 className="text-sm sm:text-base font-bold text-foreground leading-tight truncate group-hover:text-[#0284C7] transition-colors">
						{product.name}
					</h3>
					<p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider font-semibold">
						{product.category?.name || 'Material & Jasa'}
					</p>
				</div>
				<div className="shrink-0 text-right">
					{isPriceShown ? (
						<p className="text-xs sm:text-sm font-bold text-[#0284C7] whitespace-nowrap">
							{priceDisplay}
						</p>
					) : (
						<span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-800 whitespace-nowrap">
							Custom Desain
						</span>
					)}
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
