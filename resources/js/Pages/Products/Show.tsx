import ProductCard from '@/Components/Storefront/ProductCard';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn, formatMoney } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import {
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	FileText,
	Images,
	Maximize2,
	MessageCircle,
	ShieldCheck,
	Sparkles,
	Truck,
	Wrench,
	X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Product, Variant } from '@/types';

interface ProductShowProps {
	product: Product & { variants: (Variant & { price_formatted?: string })[] };
	relatedProducts: (Product & { lowest_price_formatted?: string })[];
}

export default function ProductShow({ product, relatedProducts }: ProductShowProps) {
	const [mounted, setMounted] = useState(false);
	const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
		product.variants && product.variants.length > 0 ? product.variants[0] : null
	);
	const [quantity, setQuantity] = useState(1);
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Lock scroll when lightbox is open
	useEffect(() => {
		if (isLightboxOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isLightboxOpen]);

	const allImages = Array.from(
		new Set([
			...(product.images ?? []),
			...(product.variants?.flatMap((v) => v.images ?? []) ?? []),
		])
	).filter(Boolean);

	if (allImages.length === 0) {
		allImages.push('/images/products/kaca-film-riben.webp');
	}

	const activeImage = allImages[activeImageIndex] || allImages[0];

	const currentPriceNumber = selectedVariant?.price || product.lowest_price || 0;
	const currentPrice = formatMoney(currentPriceNumber);
	const totalPrice = formatMoney(currentPriceNumber * quantity);
	const currentStock = selectedVariant ? selectedVariant.stock : 0;

	// Keyboard navigation for carousel and lightbox
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
			} else if (e.key === 'ArrowRight') {
				setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
			} else if (e.key === 'Escape' && isLightboxOpen) {
				setIsLightboxOpen(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [allImages.length, isLightboxOpen]);

	// WhatsApp direct inquiry & ordering message
	const generateWhatsAppUrl = () => {
		const variantName = selectedVariant?.name || 'Standar';
		const message = `Halo Admin Tritama Decorindo Stiker, saya tertarik dengan produk:\n\n*${product.name}*\n- Pilihan Varian: ${variantName}\n- Jumlah / Estimasi Kebutuhan: ${quantity} unit/m²\n- Estimasi Nilai: *${totalPrice}*\n\nMohon info ketersediaan material & jadwal survey/pemasangan ke lokasi saya. Terima kasih!`;
		return `https://wa.me/6281990909646?text=${encodeURIComponent(message)}`;
	};

	// Schema.org Product Structured Data
	const productSchema = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		image: allImages,
		description: product.summary || product.description || `Produk ${product.name} berkualitas dari Tritama Decorindo Stiker.`,
		category: product.category?.name || 'Dekorasi & Kaca Film',
		brand: {
			'@type': 'Brand',
			name: 'Tritama Decorindo Stiker',
		},
		offers: {
			'@type': 'AggregateOffer',
			priceCurrency: 'IDR',
			lowPrice: product.lowest_price || (product.variants?.[0]?.price ?? 45000),
			offerCount: product.variants?.length || 1,
			availability: currentStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
			seller: {
				'@type': 'Organization',
				name: 'Tritama Decorindo Stiker',
			},
		},
	};

	const seoDescription =
		product.summary ||
		(product.description ? product.description.slice(0, 155) + '...' : `Beli material & jasa pasang ${product.name} rapi, presisi & bergaransi di Bekasi dan Jabodetabek dari Tritama Decorindo Stiker.`);

	return (
		<StorefrontLayout>
			<Head>
				<title>{`${product.name} — Harga & Jasa Pasang di Bekasi & Jabodetabek | Tritama Decorindo`}</title>
				<meta name="description" content={seoDescription} />
				<meta name="keywords" content={`${product.name} bekasi, harga ${product.name} bekasi, jasa pasang ${product.name} bekasi, ${product.name} jakarta, ${product.category?.name || 'kaca film'} bekasi, toko kaca film bekasi, tritama decorindo stiker`} />
				
				{/* OpenGraph */}
				<meta property="og:title" content={`${product.name} — Tritama Decorindo Stiker Bekasi`} />
				<meta property="og:description" content={seoDescription} />
				<meta property="og:image" content={activeImage} />
				<meta property="og:type" content="product" />

				{/* Twitter */}
				<meta name="twitter:title" content={`${product.name} — Tritama Decorindo Stiker Bekasi`} />
				<meta name="twitter:description" content={seoDescription} />
				<meta name="twitter:image" content={activeImage} />

				{/* Structured Data (JSON-LD) */}
				<script type="application/ld+json">
					{JSON.stringify(productSchema)}
				</script>
			</Head>

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
				{/* Breadcrumbs */}
				<nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
					<Link href="/" className="hover:text-foreground transition-colors">
						Beranda
					</Link>
					<span>/</span>
					<Link href={route('products.index')} className="hover:text-foreground transition-colors">
						Katalog Produk
					</Link>
					<span>/</span>
					<span className="text-foreground font-semibold truncate max-w-xs">{product.name}</span>
				</nav>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
					{/* Left: Product Images Gallery / Carousel */}
					<div className="lg:col-span-6 space-y-4">
						{/* Main Large Image Display */}
						<div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md group">
							<img
								src={activeImage}
								alt={`${product.name} - Foto ${activeImageIndex + 1}`}
								className="h-full w-full object-cover transition-all duration-500"
							/>

							{/* Category Tag */}
							{product.category && (
								<div className="absolute top-4 left-4 z-10">
									<span className="rounded-full bg-[#111FA2]/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-[#FFDE42] shadow-sm">
										{product.category.name}
									</span>
								</div>
							)}

							{/* Photo count indicator badge */}
							{allImages.length > 1 && (
								<div className="absolute top-4 right-4 z-10 flex items-center gap-2">
									<span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-sm">
										<Images className="h-3.5 w-3.5 text-[#FFDE42]" />
										<span>{activeImageIndex + 1} / {allImages.length}</span>
									</span>
								</div>
							)}

							{/* Maximize / Fullscreen Lightbox Button */}
							<button
								type="button"
								onClick={() => setIsLightboxOpen(true)}
								className="absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 hover:scale-110 active:scale-95 transition-all shadow-md"
								title="Perbesar Foto (Galeri Penuh)"
							>
								<Maximize2 className="h-4 w-4 text-[#FFDE42]" />
							</button>

							{/* Next & Prev Carousel Chevrons */}
							{allImages.length > 1 && (
								<div className="absolute inset-y-0 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
									<button
										type="button"
										onClick={() =>
											setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
										}
										className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all"
										aria-label="Foto Sebelumnya"
									>
										<ChevronLeft className="h-5 w-5" />
									</button>

									<button
										type="button"
										onClick={() =>
											setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
										}
										className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all"
										aria-label="Foto Berikutnya"
									>
										<ChevronRight className="h-5 w-5" />
									</button>
								</div>
							)}
						</div>

						{/* Thumbnails Strip */}
						{allImages.length > 1 && (
							<div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
								{allImages.map((img, idx) => {
									const isActive = activeImageIndex === idx;
									return (
										<button
											key={idx}
											type="button"
											onClick={() => setActiveImageIndex(idx)}
											className={cn(
												'relative h-18 w-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer',
												isActive
													? 'border-[#5478FF] ring-2 ring-[#5478FF]/30 scale-105 shadow-md'
													: 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
											)}
										>
											<img
												src={img}
												alt={`${product.name} thumbnail ${idx + 1}`}
												className="h-full w-full object-cover"
											/>
											{isActive && (
												<div className="absolute inset-0 bg-[#5478FF]/10" />
											)}
										</button>
									);
								})}
							</div>
						)}
					</div>

					{/* Right: Product Info & Order Action */}
					<div className="lg:col-span-6 flex flex-col justify-between">
						<div>
							<div className="flex items-center gap-2 mb-2">
								<span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#FFDE42] bg-[#111FA2] px-2.5 py-0.5 rounded-full border border-[#FFDE42]/30">
									<ShieldCheck className="h-3.5 w-3.5" />
									Material Bergaransi & Rapi
								</span>
							</div>

							<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
								{product.name}
							</h1>

							{product.summary && (
								<p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
									{product.summary}
								</p>
							)}

							{/* Price Display */}
							<div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
								<p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Harga Material / Jasa</p>
								<div className="flex items-baseline gap-3 mt-1">
									<span className="text-2xl sm:text-3xl font-extrabold text-[#5478FF]">
										{currentPrice}
									</span>
								</div>
							</div>

							{/* Variants Selection */}
							{product.variants && product.variants.length > 0 && (
								<div className="mt-6">
									<label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
										Pilih Varian Ukuran / Tipe:
									</label>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
										{product.variants.map((variant) => {
											const isSelected = selectedVariant?.id === variant.id;
											return (
												<button
													key={variant.id}
													type="button"
													onClick={() => {
														setSelectedVariant(variant);
														// If variant has images, jump to it
														if (variant.images && variant.images.length > 0) {
															const idx = allImages.indexOf(variant.images[0]);
															if (idx !== -1) setActiveImageIndex(idx);
														}
													}}
													className={cn(
														'flex flex-col items-start p-3 rounded-xl border text-left transition-all',
														isSelected
															? 'border-[#5478FF] bg-blue-50/60 ring-1 ring-[#5478FF]'
															: 'border-slate-200 bg-white hover:border-slate-300'
													)}
												>
													<span className="text-xs font-bold text-slate-900">{variant.name}</span>
													<span className="text-xs font-bold text-[#5478FF] mt-1">
														{formatMoney(variant.price)}
													</span>
												</button>
											);
										})}
									</div>
								</div>
							)}

							{/* Quantity selector */}
							<div className="mt-6 flex items-center gap-4">
								<label className="text-xs font-bold uppercase tracking-wider text-slate-700">
									Jumlah (m² / Unit / Roll):
								</label>
								<div className="flex items-center rounded-xl border border-slate-300 bg-white">
									<button
										type="button"
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										className="h-9 w-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
									>
										-
									</button>
									<span className="h-9 px-4 flex items-center justify-center text-sm font-bold text-slate-900">
										{quantity}
									</span>
									<button
										type="button"
										onClick={() => setQuantity(quantity + 1)}
										className="h-9 w-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
									>
										+
									</button>
								</div>
								<span className="text-xs text-slate-500">
									Estimasi: <strong className="text-slate-900">{totalPrice}</strong>
								</span>
							</div>

							{/* Direct Contact / Order Action */}
							<div className="mt-8">
								<a
									href={generateWhatsAppUrl()}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-[#FFDE42] text-[#111FA2] font-extrabold text-xs uppercase tracking-wider hover:bg-[#F2D02B] transition-all shadow-md active:scale-95"
								>
									<MessageCircle className="h-4 w-4" />
									<span>Pesan via WhatsApp Langsung</span>
								</a>
							</div>
						</div>

						{/* Service Guarantees Pill Bar */}
						<div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-3 text-center">
							<div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
								<Wrench className="h-4 w-4 text-[#5478FF] mx-auto mb-1" />
								<p className="text-[11px] font-bold text-slate-800">Teknisi Ahli</p>
								<p className="text-[10px] text-slate-500">Pemasangan Presisi</p>
							</div>
							<div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
								<ShieldCheck className="h-4 w-4 text-[#5478FF] mx-auto mb-1" />
								<p className="text-[11px] font-bold text-slate-800">Bergaransi</p>
								<p className="text-[10px] text-slate-500">Material Berkualitas</p>
							</div>
							<div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
								<Truck className="h-4 w-4 text-[#5478FF] mx-auto mb-1" />
								<p className="text-[11px] font-bold text-slate-800">Survey Gratis</p>
								<p className="text-[10px] text-slate-500">Area Jabodetabek</p>
							</div>
						</div>
					</div>
				</div>

				{/* Detailed Description */}
				<div className="mt-16 rounded-3xl border border-border bg-white p-6 sm:p-10 shadow-sm">
					<h2 className="text-xl font-bold text-foreground mb-4">
						Deskripsi & Spesifikasi Lengkap
					</h2>
					<div className="prose prose-sm max-w-none text-slate-600 whitespace-pre-line leading-relaxed font-normal">
						{product.description || product.summary}
					</div>
				</div>

				{/* Related Products */}
				{relatedProducts && relatedProducts.length > 0 && (
					<div className="mt-16">
						<h2 className="text-2xl font-bold text-foreground mb-6">
							Produk Terkait Lainnya
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{relatedProducts.map((rel) => (
								<ProductCard key={rel.id} product={rel} />
							))}
						</div>
					</div>
				)}
			</div>

			{/* Fullscreen Lightbox Modal */}
			{isLightboxOpen && mounted && createPortal(
				<div
					className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200 select-none"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsLightboxOpen(false);
					}}
				>
					{/* Close Button */}
					<button
						type="button"
						onClick={() => setIsLightboxOpen(false)}
						className="absolute top-5 right-5 z-[100000] flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/90 text-white border-2 border-white/50 shadow-2xl hover:bg-red-600 hover:border-red-500 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
						aria-label="Tutup Galeri"
						title="Tutup (Esc)"
					>
						<X className="h-6 w-6 text-white stroke-[2.5] group-hover:rotate-90 transition-transform duration-200" />
					</button>

					{/* Counter */}
					<div className="absolute top-5 left-5 z-[100000]">
						<span className="rounded-full bg-black/70 px-4 py-1.5 text-xs font-bold text-white border border-white/30 backdrop-blur-md shadow-lg">
							{activeImageIndex + 1} / {allImages.length} Foto
						</span>
					</div>

					{/* Main Lightbox Image */}
					<div className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center">
						<img
							src={activeImage}
							alt={`${product.name} - Fullscreen`}
							className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
						/>
					</div>

					{/* Navigation Arrows */}
					{allImages.length > 1 && (
						<>
							<button
								type="button"
								onClick={() =>
									setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
								}
								className="absolute left-4 top-1/2 -translate-y-1/2 z-[100000] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 active:scale-95 transition-all"
								aria-label="Foto Sebelumnya"
							>
								<ChevronLeft className="h-7 w-7" />
							</button>

							<button
								type="button"
								onClick={() =>
									setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
								}
								className="absolute right-4 top-1/2 -translate-y-1/2 z-[100000] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 active:scale-95 transition-all"
								aria-label="Foto Berikutnya"
							>
								<ChevronRight className="h-7 w-7" />
							</button>
						</>
					)}

					{/* Bottom Thumbnail Strip inside Lightbox */}
					{allImages.length > 1 && (
						<div className="absolute bottom-6 inset-x-0 z-[100000] flex items-center justify-center gap-2 overflow-x-auto px-4">
							{allImages.map((img, idx) => (
								<button
									key={idx}
									type="button"
									onClick={() => setActiveImageIndex(idx)}
									className={cn(
										'h-14 w-18 rounded-xl overflow-hidden border-2 transition-all shrink-0',
										activeImageIndex === idx
											? 'border-[#FFDE42] scale-110 shadow-lg'
											: 'border-white/30 opacity-60 hover:opacity-100'
									)}
								>
									<img src={img} alt="thumb" className="h-full w-full object-cover" />
								</button>
							))}
						</div>
					)}
				</div>,
				document.body
			)}
		</StorefrontLayout>
	);
}
