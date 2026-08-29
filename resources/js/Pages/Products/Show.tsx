import ProductCard from '@/Components/Storefront/ProductCard';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn, formatMoney } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, FileText, MessageCircle, Phone, ShieldCheck, Sparkles, Truck, Wrench } from 'lucide-react';
import { useState } from 'react';
import type { Product, Variant } from '@/types';

interface ProductShowProps {
	product: Product & { variants: (Variant & { price_formatted?: string })[] };
	relatedProducts: (Product & { lowest_price_formatted?: string })[];
}

export default function ProductShow({ product, relatedProducts }: ProductShowProps) {
	const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
		product.variants && product.variants.length > 0 ? product.variants[0] : null
	);
	const [quantity, setQuantity] = useState(1);

	const isPriceShown = product.show_price !== false;

	const imageUrl =
		selectedVariant?.images && selectedVariant.images.length > 0
			? selectedVariant.images[0]
			: product.images && product.images.length > 0
			? product.images[0]
			: '/images/products/kaca-film-riben.webp';

	const currentPriceNumber = selectedVariant?.price || product.lowest_price || 0;
	const currentPrice = formatMoney(currentPriceNumber);
	const totalPrice = formatMoney(currentPriceNumber * quantity);
	const currentStock = selectedVariant ? selectedVariant.stock : 0;

	// WhatsApp direct inquiry & ordering message
	const generateWhatsAppUrl = () => {
		const variantName = selectedVariant?.name || 'Standar';
		const message = isPriceShown
			? `Halo Admin Tritama Decorindo Stiker, saya tertarik dengan produk:\n\n*${product.name}*\n- Pilihan Varian: ${variantName}\n- Jumlah / Estimasi Kebutuhan: ${quantity} unit/m²\n- Estimasi Nilai: *${totalPrice}*\n\nMohon info ketersediaan material & jadwal survey/pemasangan ke lokasi saya. Terima kasih!`
			: `Halo Admin Tritama Decorindo Stiker, saya ingin meminta konsultasi & estimasi harga custom untuk:\n\n*${product.name}*\n- Pilihan Varian: ${variantName}\n- Estimasi Kebutuhan: ${quantity} unit/m²\n\nMohon info harga dan jadwal survey ke lokasi saya. Terima kasih!`;
		return `https://wa.me/6281990909646?text=${encodeURIComponent(message)}`;
	};

	// Schema.org Product Structured Data
	const productSchema = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		image: [imageUrl],
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
		(product.description ? product.description.slice(0, 155) + '...' : `Beli material dan jasa pasang ${product.name} rapi dan presisi dari Tritama Decorindo Stiker.`);

	return (
		<StorefrontLayout>
			<Head>
				<title>{`${product.name} — Harga & Spesifikasi | Tritama Decorindo Stiker`}</title>
				<meta name="description" content={seoDescription} />
				<meta name="keywords" content={`${product.name}, harga ${product.name}, pasang ${product.name}, ${product.category?.name || 'kaca film'}, tritama decorindo stiker`} />
				
				{/* OpenGraph */}
				<meta property="og:title" content={`${product.name} — Tritama Decorindo Stiker`} />
				<meta property="og:description" content={seoDescription} />
				<meta property="og:image" content={imageUrl} />
				<meta property="og:type" content="product" />

				{/* Twitter */}
				<meta name="twitter:title" content={`${product.name} — Tritama Decorindo Stiker`} />
				<meta name="twitter:description" content={seoDescription} />
				<meta name="twitter:image" content={imageUrl} />

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
					<Link href="/products" className="hover:text-foreground transition-colors">
						Produk
					</Link>
					<span>/</span>
					{product.category && (
						<>
							<Link
								href={`/products?category=${product.category.id}`}
								className="hover:text-foreground transition-colors"
							>
								{product.category.name}
							</Link>
							<span>/</span>
						</>
					)}
					<span className="text-foreground font-semibold truncate max-w-[200px]">
						{product.name}
					</span>
				</nav>

				{/* Product Hero Section */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					{/* Left: Product Images */}
					<div className="lg:col-span-6 space-y-4">
						<div className="relative aspect-[4/3] sm:aspect-[1/1] rounded-3xl bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
							<img
								src={imageUrl}
								alt={product.name}
								className="h-full w-full object-cover"
							/>
							{product.category && (
								<div className="absolute top-4 left-4">
									<span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white">
										{product.category.name}
									</span>
								</div>
							)}
						</div>

						{/* Thumbnails */}
						{product.images && product.images.length > 1 && (
							<div className="flex items-center gap-3 overflow-x-auto pb-2">
								{product.images.map((img, idx) => (
									<button
										key={idx}
										type="button"
										onClick={() => {
											if (selectedVariant) {
												setSelectedVariant({ ...selectedVariant, images: [img] });
											}
										}}
										className={cn(
											'h-16 w-20 rounded-xl overflow-hidden border-2 transition-all shrink-0',
											imageUrl === img ? 'border-[#0284C7] ring-2 ring-[#0284C7]/20' : 'border-border opacity-70'
										)}
									>
										<img src={img} alt={`${product.name} ${idx}`} className="h-full w-full object-cover" />
									</button>
								))}
							</div>
						)}
					</div>

					{/* Right: Product Info & Order Action */}
					<div className="lg:col-span-6 flex flex-col justify-between">
						<div>
							<div className="flex items-center gap-2 mb-2">
								<span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#0284C7] bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
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
									{isPriceShown ? (
										<span className="text-2xl sm:text-3xl font-extrabold text-[#0284C7]">
											{currentPrice}
										</span>
									) : (
										<span className="text-lg font-bold text-cyan-800">
											Hubungi Kami untuk Penawaran Custom
										</span>
									)}
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
													onClick={() => setSelectedVariant(variant)}
													className={cn(
														'flex flex-col items-start p-3 rounded-xl border text-left transition-all',
														isSelected
															? 'border-[#0284C7] bg-cyan-50/50 ring-1 ring-[#0284C7]'
															: 'border-slate-200 bg-white hover:border-slate-300'
													)}
												>
													<span className="text-xs font-bold text-slate-900">{variant.name}</span>
													{isPriceShown && (
														<span className="text-xs font-bold text-[#0284C7] mt-1">
															{formatMoney(variant.price)}
														</span>
													)}
												</button>
											);
										})}
									</div>
								</div>
							)}

							{/* Quantity selector */}
							{isPriceShown && (
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
							)}

							{/* Direct Contact / Order Action Buttons */}
							<div className="mt-8 flex flex-col sm:flex-row gap-3">
								<a
									href={generateWhatsAppUrl()}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0284C7] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0369a1] transition-all shadow-md active:scale-95"
								>
									<MessageCircle className="h-4 w-4" />
									<span>Pesan via WhatsApp Langsung</span>
								</a>

								<a
									href="tel:081990909646"
									className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 font-bold text-xs uppercase tracking-wider text-slate-800 hover:bg-slate-50 transition-all active:scale-95"
								>
									<Phone className="h-4 w-4 text-[#0284C7]" />
									<span>Hubungi Sales</span>
								</a>
							</div>
						</div>

						{/* Service Guarantees Pill Bar */}
						<div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-3 text-center">
							<div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
								<Wrench className="h-4 w-4 text-[#0284C7] mx-auto mb-1" />
								<p className="text-[11px] font-bold text-slate-800">Teknisi Ahli</p>
								<p className="text-[10px] text-slate-500">Pemasangan Presisi</p>
							</div>
							<div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
								<ShieldCheck className="h-4 w-4 text-[#0284C7] mx-auto mb-1" />
								<p className="text-[11px] font-bold text-slate-800">Bergaransi</p>
								<p className="text-[10px] text-slate-500">Material Berkualitas</p>
							</div>
							<div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
								<Phone className="h-4 w-4 text-[#0284C7] mx-auto mb-1" />
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
		</StorefrontLayout>
	);
}
