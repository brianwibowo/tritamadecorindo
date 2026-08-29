import ProductCard from '@/Components/Storefront/ProductCard';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn, formatMoney } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { FileText, MessageCircle, ShieldCheck, Sparkles, Truck, Zap } from 'lucide-react';
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
			: '/images/products/cengkeh-maluku.webp';

	const currentPriceNumber = selectedVariant?.price || product.lowest_price || 0;
	const currentPrice = formatMoney(currentPriceNumber);
	const totalPrice = formatMoney(currentPriceNumber * quantity);
	const currentStock = selectedVariant ? selectedVariant.stock : 0;

	// WhatsApp direct inquiry & RFQ message
	const generateWhatsAppUrl = () => {
		const variantName = selectedVariant?.name || 'Standar';
		const message = isPriceShown
			? `Halo Tim Ekspor PT LFM Global Jayatama, saya tertarik dengan komoditas rempah:%0A%0A*${product.name}*%0A- Spesifikasi/Kemasan: ${variantName}%0A- Estimasi Kebutuhan: ${quantity} unit/ton%0A- Estimasi Nilai: *${totalPrice}*%0A%0AMohon kirimkan Lembar Spesifikasi (CoA) & Penawaran Resmi (FOB/CIF). Terima kasih!`
			: `Halo Tim Ekspor PT LFM Global Jayatama, saya ingin meminta Penawaran Harga Resmi (RFQ) untuk komoditas rempah:%0A%0A*${product.name}*%0A- Spesifikasi/Kemasan: ${variantName}%0A- Estimasi Kebutuhan: ${quantity} unit/ton%0A%0AMohon kirimkan penawaran harga FOB/CIF terbaru beserta CoA. Terima kasih!`;
		return `https://wa.me/6281234567890?text=${message}`;
	};

	// Schema.org Product Structured Data (JSON-LD)
	const productSchema = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		image: [imageUrl],
		description: product.summary || product.description || `Komoditas rempah ${product.name} kualitas ekspor standar internasional PT LFM Global Jayatama.`,
		category: product.category?.name || 'Rempah Indonesia',
		brand: {
			'@type': 'Brand',
			name: 'PT LFM Global Jayatama',
		},
		offers: {
			'@type': 'AggregateOffer',
			priceCurrency: 'IDR',
			lowPrice: product.lowest_price || (product.variants?.[0]?.price ?? 100000),
			offerCount: product.variants?.length || 1,
			availability: currentStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
			seller: {
				'@type': 'Organization',
				name: 'PT LFM Global Jayatama',
			},
		},
	};

	const seoDescription =
		product.summary ||
		(product.description ? product.description.slice(0, 155) + '...' : `Beli komoditas rempah ekspor ${product.name} asli Indonesia kualitas terbaik dari PT LFM Global Jayatama.`);

	return (
		<StorefrontLayout>
			<Head>
				<title>{`${product.name} — Standar Ekspor | PT LFM Global Jayatama`}</title>
				<meta name="description" content={seoDescription} />
				<meta name="keywords" content={`${product.name}, ekspor ${product.name}, harga ${product.name}, rempah ${product.category?.name || 'indonesia'}, pt lfm global jayatama`} />
				
				{/* OpenGraph */}
				<meta property="og:title" content={`${product.name} — PT LFM Global Jayatama`} />
				<meta property="og:description" content={seoDescription} />
				<meta property="og:image" content={imageUrl} />
				<meta property="og:type" content="product" />

				{/* Twitter */}
				<meta name="twitter:title" content={`${product.name} — PT LFM Global Jayatama`} />
				<meta name="twitter:description" content={seoDescription} />
				<meta name="twitter:image" content={imageUrl} />

				{/* JSON-LD Product Schema */}
				<script type="application/ld+json">
					{JSON.stringify(productSchema)}
				</script>
			</Head>

			<div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
				{/* Breadcrumbs */}
				<nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
					<Link href="/" className="hover:text-foreground">
						Beranda
					</Link>
					<span>/</span>
					<Link href={route('products.index')} className="hover:text-foreground">
						Katalog Rempah
					</Link>
					{product.category && (
						<>
							<span>/</span>
							<Link
								href={route('products.index', { category: product.category_id })}
								className="hover:text-foreground"
							>
								{product.category.name}
							</Link>
						</>
					)}
					<span>/</span>
					<span className="text-foreground font-semibold truncate max-w-xs">
						{product.name}
					</span>
				</nav>

				{/* Main Product Details */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
					{/* Left Column: Image Preview */}
					<div className="lg:col-span-6">
						<div className="overflow-hidden rounded-3xl border border-border bg-white p-4 shadow-sm">
							<div className="aspect-square w-full overflow-hidden rounded-2xl bg-secondary relative">
								<img
									src={imageUrl}
									alt={`${product.name} - Komoditas Ekspor PT LFM Global Jayatama`}
									className="h-full w-full object-cover transition-all duration-300"
								/>
								{product.category && (
									<span className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-foreground shadow-sm">
										{product.category.name}
									</span>
								)}
							</div>
						</div>

						{/* Trust Reassurance Badges */}
						<div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-white border border-border p-4 text-center">
							<div className="flex flex-col items-center">
								<ShieldCheck className="h-5 w-5 text-[#80070A]" />
								<p className="text-[11px] font-bold text-foreground mt-1">Export Grade</p>
								<p className="text-[10px] text-muted-foreground">Kadar Air &lt; 12%</p>
							</div>
							<div className="flex flex-col items-center">
								<Truck className="h-5 w-5 text-[#80070A]" />
								<p className="text-[11px] font-bold text-foreground mt-1">FCL / LCL Siap</p>
								<p className="text-[10px] text-muted-foreground">Pengiriman Global</p>
							</div>
							<div className="flex flex-col items-center">
								<FileText className="h-5 w-5 text-[#80070A]" />
								<p className="text-[11px] font-bold text-foreground mt-1">CoA & Fitosanitari</p>
								<p className="text-[10px] text-muted-foreground">Dokumen Lengkap</p>
							</div>
						</div>
					</div>

					{/* Right Column: Information & WhatsApp Order */}
					<div className="lg:col-span-6 space-y-6">
						<div>
							<span className="text-xs font-bold uppercase tracking-widest text-[#80070A]">
								Komoditas Asli Indonesia
							</span>
							<h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
								{product.name}
							</h1>
							{product.summary && (
								<p className="mt-3 text-sm text-muted-foreground leading-relaxed">
									{product.summary}
								</p>
							)}
						</div>

						{/* Price Display */}
						<div className="rounded-2xl bg-white border border-border p-6 shadow-sm">
							<span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">
								{isPriceShown ? 'Harga Indikatif / Satuan' : 'Skema Penawaran Harga'}
							</span>
							<div className="flex items-baseline gap-3 mt-1">
								{isPriceShown ? (
									<>
										<span className="font-display text-3xl sm:text-4xl font-bold text-[#80070A]">
											{currentPrice}
										</span>
										{currentStock > 0 ? (
											<span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800">
												Stok Tersedia ({currentStock} Lot)
											</span>
										) : (
											<span className="rounded-full bg-red-100 px-3 py-0.5 text-xs font-semibold text-red-800">
												Pre-Order Kontrak
											</span>
										)}
									</>
								) : (
									<div className="space-y-1">
										<span className="inline-block font-display text-2xl sm:text-3xl font-bold text-[#80070A]">
											Harga Hubungi Kami (Nego FOB)
										</span>
										<p className="text-xs text-muted-foreground">
											Harga berfluktuasi mengikuti bursa komoditas global. Silakan kontak tim ekspor kami untuk penawaran kontrak langsung.
										</p>
									</div>
								)}
							</div>
						</div>

						{/* Variant Selector */}
						{product.variants && product.variants.length > 0 && (
							<div className="space-y-3">
								<label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
									Pilih Kemasan / Ukuran Lot:
								</label>
								<div className="flex flex-wrap gap-2.5">
									{product.variants.map((variant) => (
										<button
											key={variant.id}
											type="button"
											onClick={() => setSelectedVariant(variant)}
											className={cn(
												'rounded-2xl px-4 py-2.5 text-xs font-bold transition-all border text-left',
												selectedVariant?.id === variant.id
													? 'bg-[#80070A] text-white border-[#80070A] shadow-md'
													: 'bg-white text-foreground border-border hover:bg-secondary'
											)}
										>
											<span className="block">{variant.name || 'Standar'}</span>
											{isPriceShown && (
												<span className="text-[11px] opacity-80">{formatMoney(variant.price)}</span>
											)}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Quantity Selector */}
						<div className="space-y-2">
							<label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
								Jumlah Kebutuhan (Quantity):
							</label>
							<div className="flex items-center gap-4">
								<div className="flex items-center rounded-2xl border border-border bg-white shadow-sm">
									<button
										type="button"
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										className="flex h-11 w-11 items-center justify-center text-lg font-bold text-foreground hover:bg-secondary rounded-l-2xl"
									>
										−
									</button>
									<span className="w-12 text-center text-sm font-bold text-foreground">
										{quantity}
									</span>
									<button
										type="button"
										onClick={() => setQuantity(quantity + 1)}
										className="flex h-11 w-11 items-center justify-center text-lg font-bold text-foreground hover:bg-secondary rounded-r-2xl"
									>
										+
									</button>
								</div>
								{isPriceShown && (
									<div className="text-xs text-muted-foreground">
										Estimasi Total: <strong className="text-base text-foreground font-bold">{totalPrice}</strong>
									</div>
								)}
							</div>
						</div>

						{/* WhatsApp Direct Inquiry CTA */}
						<div className="pt-2">
							<a
								href={generateWhatsAppUrl()}
								target="_blank"
								rel="noopener noreferrer"
								className="flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-emerald-700 active:scale-[0.99] transition-all"
							>
								<MessageCircle className="h-5 w-5" />
								<span>{isPriceShown ? 'Hubungi Tim Ekspor via WhatsApp' : 'Minta Penawaran Harga Resmi (RFQ)'}</span>
							</a>
							<p className="text-[11px] text-center text-muted-foreground mt-2">
								Dapatkan penawaran harga FOB / CIF, lembar CoA, dan ketersediaan jadwal pengapalan.
							</p>
						</div>

						{/* Product Description */}
						{product.description && (
							<div className="rounded-3xl border border-border bg-white p-6 space-y-3 shadow-sm">
								<h3 className="font-display text-base font-bold text-foreground">
									Spesifikasi & Informasi Komoditas
								</h3>
								<div className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
									{product.description}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Related Products */}
				{relatedProducts.length > 0 && (
					<div className="mt-20 border-t border-border/60 pt-12">
						<h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-8">
							Komoditas Rempah Terkait Lainnya
						</h2>
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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
