import { formatMoney } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useState } from 'react';
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

	const allImages = Array.from(
		new Set([
			...(product.images ?? []),
			...(variants?.flatMap((v) => v.images ?? []) ?? []),
		])
	).filter(Boolean);

	if (allImages.length === 0) {
		allImages.push('/images/products/kaca-film-riben.webp');
	}

	const [currentImgIndex, setCurrentImgIndex] = useState(0);

	const handlePrev = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
	};

	const handleNext = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
	};

	const handleDotClick = (e: React.MouseEvent, idx: number) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImgIndex(idx);
	};

	const priceDisplay =
		product.lowest_price_formatted && product.lowest_price_formatted !== '-'
			? product.lowest_price_formatted
			: firstVariant
			? formatMoney(firstVariant.price)
			: 'Mulai Rp 45.000';

	return (
		<Link href={`/product/${product.slug}`} className="group block">
			<div className="relative aspect-[4/3] sm:aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
				<img
					src={allImages[currentImgIndex]}
					alt={`${product.name} - ${currentImgIndex + 1}`}
					className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
				/>

				{/* Category badge on image */}
				{product.category && (
					<div className="absolute top-3 left-3 z-10">
						<span className="rounded-full bg-[#111FA2]/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FFDE42] shadow-sm">
							{product.category.name}
						</span>
					</div>
				)}

				{/* Multi-image photo count badge */}
				{allImages.length > 1 && (
					<div className="absolute top-3 right-3 z-10">
						<span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
							<Images className="h-3 w-3 text-[#FFDE42]" />
							<span>{allImages.length} Foto</span>
						</span>
					</div>
				)}

				{/* Prev / Next Mini Controls (visible on hover if >1 image) */}
				{allImages.length > 1 && (
					<div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
						<button
							type="button"
							onClick={handlePrev}
							className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all"
							aria-label="Foto Sebelumnya"
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
						<button
							type="button"
							onClick={handleNext}
							className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all"
							aria-label="Foto Berikutnya"
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>
				)}

				{/* Dots Indicator if >1 image */}
				{allImages.length > 1 && (
					<div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10">
						{allImages.map((_, idx) => (
							<button
								key={idx}
								type="button"
								onClick={(e) => handleDotClick(e, idx)}
								className={`h-1.5 rounded-full transition-all ${
									idx === currentImgIndex
										? 'w-5 bg-[#FFDE42] shadow-sm'
										: 'w-1.5 bg-white/70 hover:bg-white'
								}`}
								aria-label={`Slide ${idx + 1}`}
							/>
						))}
					</div>
				)}
			</div>

			<div className="mt-3 flex items-start justify-between gap-3">
				<div className="min-w-0">
					<h3 className="text-sm sm:text-base font-bold text-foreground leading-tight truncate group-hover:text-[#FFDE42] transition-colors">
						{product.name}
					</h3>
					<p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider font-semibold">
						{product.category?.name || 'Material & Jasa'}
					</p>
				</div>
				<div className="shrink-0 text-right">
					<p className="text-xs sm:text-sm font-extrabold text-[#5478FF] whitespace-nowrap">
						{priceDisplay}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
