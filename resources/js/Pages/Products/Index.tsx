import ProductCard from '@/Components/Storefront/ProductCard';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import { Award, ChevronDown, ChevronUp, Flame, Leaf, PackageSearch, RotateCcw, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { Category, PaginatedData, Product } from '@/types';

interface ProductsIndexProps {
	products: PaginatedData<Product & { lowest_price_formatted?: string }>;
	categories: Category[];
	filters: {
		search?: string;
		category?: string;
		sort?: string;
		tag?: string;
		price_range?: string;
	};
}

export default function ProductsIndex({ products, categories, filters }: ProductsIndexProps) {
	const [search, setSearch] = useState(filters.search || '');
	const [categoriesOpen, setCategoriesOpen] = useState(true);
	const [priceOpen, setPriceOpen] = useState(true);

	const updateFilters = (newParams: Record<string, string>) => {
		router.get(
			route('products.index'),
			{
				...filters,
				...newParams,
			},
			{ preserveState: true }
		);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		updateFilters({ search });
	};

	const sortOptions = [
		{ key: 'latest', label: 'Terbaru' },
		{ key: 'price_asc', label: 'Harga: Rendah ke Tinggi' },
		{ key: 'price_desc', label: 'Harga: Tinggi ke Rendah' },
		{ key: 'name_asc', label: 'Nama: A–Z' },
	];

	const tagPills = [
		{ key: 'all', label: 'Semua Komoditas', icon: null },
		{ key: 'ekspor', label: 'Grade Ekspor', icon: Flame },
		{ key: 'terbaru', label: 'Rempah Pilihan', icon: Sparkles },
		{ key: 'organik', label: 'Organik & Simplisia', icon: Leaf },
	];

	const priceRanges = [
		{ key: '', label: 'Semua Harga' },
		{ key: 'under_100k', label: '≤ Rp 100.000 (Sampel)' },
		{ key: '100k_500k', label: 'Rp 100.000 – Rp 500.000' },
		{ key: 'above_500k', label: '> Rp 500.000 (Kemasan Bulk)' },
	];

	const hasActiveFilters = Boolean(
		filters.category || (filters.tag && filters.tag !== 'all') || filters.price_range || filters.search || (filters.sort && filters.sort !== 'latest')
	);

	return (
		<StorefrontLayout>
			<Head>
				<title>Katalog Produk Komoditas Rempah — PT LFM Global Jayatama</title>
				<meta
					name="description"
					content="Katalog lengkap komoditas rempah asli Indonesia kualitas ekspor: Cengkeh Maluku, Biji Pala Banda, Kayu Manis Kerinci, Vanilla Beans Planifolia, Lada Hitam Lampung. Dapatkan penawaran FOB/CIF."
				/>
				<meta
					name="keywords"
					content="katalog rempah ekspor, jual cengkeh ab6, jual biji pala banda abcd, supplier kayu manis kerinci, distributor vanilla beans planifolia, harga lada hitam lampung, pt lfm global jayatama"
				/>
				<meta property="og:title" content="Katalog Produk Komoditas Rempah — PT LFM Global Jayatama" />
				<meta
					property="og:description"
					content="Katalog lengkap komoditas rempah asli Indonesia kualitas ekspor standar internasional."
				/>
				<meta property="og:image" content="/images/products/cengkeh-maluku.webp" />
				<meta name="twitter:title" content="Katalog Produk Komoditas Rempah — PT LFM Global Jayatama" />
				<meta
					name="twitter:description"
					content="Katalog lengkap komoditas rempah asli Indonesia kualitas ekspor standar internasional."
				/>
				<meta name="twitter:image" content="/images/products/cengkeh-maluku.webp" />
			</Head>

			<div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
				{/* 1. Header Area */}
				<div className="border-b border-border/60 pb-6">
					<h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
						Katalog Produk
					</h1>
					<p className="mt-2 text-sm text-muted-foreground max-w-2xl">
						Jelajahi komoditas rempah premium pilihan PT LFM Global Jayatama untuk kebutuhan industri bumbu, farmasi, kosmetik, dan ekspor global.
					</p>
				</div>

				{/* 2. Top Quick Pills & Search */}
				<div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
					{/* Tag Pills with SVG Icons */}
					<div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
						{tagPills.map((pill) => {
							const active = (filters.tag || 'all') === pill.key;
							const Icon = pill.icon;
							return (
								<button
									key={pill.key}
									type="button"
									onClick={() => updateFilters({ tag: pill.key === 'all' ? '' : pill.key })}
									className={cn(
										'inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition-all shadow-sm whitespace-nowrap',
										active
											? 'bg-[#80070A] text-white shadow-md'
											: 'bg-secondary/50 text-foreground border border-border/60 hover:bg-secondary'
									)}
								>
									{Icon && <Icon className="h-3.5 w-3.5" />}
									<span>{pill.label}</span>
								</button>
							);
						})}
					</div>

					{/* Search input */}
					<form onSubmit={handleSearch} className="flex gap-2">
						<div className="relative flex-1 sm:w-64">
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Cari cengkeh, pala, kayu manis..."
								className="w-full h-10 rounded-full border border-border bg-white pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-[#80070A] focus:outline-none focus:ring-1 focus:ring-[#80070A]"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						</div>
						<button
							type="submit"
							className="rounded-full bg-[#80070A] px-5 py-2 text-xs font-bold text-white hover:brightness-110 transition-all shadow-sm"
						>
							Cari
						</button>
					</form>
				</div>

				{/* 3. Horizontal Bar: Filters title on Left, Sort links on Right */}
				<div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
					<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
						<SlidersHorizontal className="h-4 w-4 text-[#80070A]" />
						<span>Filters</span>
						{hasActiveFilters && (
							<button
								onClick={() => router.get(route('products.index'))}
								className="ml-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#80070A] hover:underline lowercase"
							>
								<RotateCcw className="h-3 w-3" />
								reset filter
							</button>
						)}
					</div>

					{/* Sorting options */}
					<div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
						<span className="text-muted-foreground font-medium">Urutkan:</span>
						{sortOptions.map((opt) => {
							const isSelected = (filters.sort || 'latest') === opt.key;
							return (
								<button
									key={opt.key}
									type="button"
									onClick={() => updateFilters({ sort: opt.key })}
									className={cn(
										'transition-colors',
										isSelected
											? 'font-bold text-[#80070A] underline underline-offset-4'
											: 'text-foreground/80 hover:text-foreground'
									)}
								>
									{opt.label}
								</button>
							);
						})}
					</div>
				</div>

				{/* 4. Two-Column Layout: Filter Library Sidebar + Product Grid */}
				<div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					{/* Left Column: Filter Library Sidebar */}
					<aside className="lg:col-span-3 space-y-6">
						{/* Categories Accordion */}
						<div className="rounded-2xl border border-border/60 bg-white/70 backdrop-blur-sm p-5 shadow-sm">
							<button
								type="button"
								onClick={() => setCategoriesOpen(!categoriesOpen)}
								className="flex w-full items-center justify-between font-display text-sm font-bold text-foreground"
							>
								<span>Categories</span>
								{categoriesOpen ? (
									<ChevronUp className="h-4 w-4 text-muted-foreground" />
								) : (
									<ChevronDown className="h-4 w-4 text-muted-foreground" />
								)}
							</button>

							{categoriesOpen && (
								<div className="mt-4 space-y-2.5 pt-2 border-t border-border/40 text-xs">
									<button
										type="button"
										onClick={() => updateFilters({ category: '' })}
										className={cn(
											'flex w-full items-center justify-between text-left transition-colors',
											!filters.category
												? 'font-bold text-[#80070A]'
												: 'text-foreground hover:text-[#80070A]'
										)}
									>
										<span>Semua Komoditas</span>
										<span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
											{products.total}
										</span>
									</button>

									{categories.map((cat) => {
										const isSelected = filters.category === cat.id;
										return (
											<button
												key={cat.id}
												type="button"
												onClick={() => updateFilters({ category: isSelected ? '' : cat.id })}
												className={cn(
													'flex w-full items-center justify-between text-left transition-colors',
													isSelected
														? 'font-bold text-[#80070A]'
														: 'text-foreground hover:text-[#80070A]'
												)}
											>
												<span>{cat.name}</span>
												<span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
													{cat.products_count ?? 0}
												</span>
											</button>
										);
									})}
								</div>
							)}
						</div>

						{/* Price Accordion */}
						<div className="rounded-2xl border border-border/60 bg-white/70 backdrop-blur-sm p-5 shadow-sm">
							<button
								type="button"
								onClick={() => setPriceOpen(!priceOpen)}
								className="flex w-full items-center justify-between font-display text-sm font-bold text-foreground"
							>
								<span>Rentang Harga</span>
								{priceOpen ? (
									<ChevronUp className="h-4 w-4 text-muted-foreground" />
								) : (
									<ChevronDown className="h-4 w-4 text-muted-foreground" />
								)}
							</button>

							{priceOpen && (
								<div className="mt-4 space-y-2 pt-2 border-t border-border/40 text-xs">
									{priceRanges.map((range) => {
										const isSelected = (filters.price_range || '') === range.key;
										return (
											<label
												key={range.key}
												className="flex items-center gap-2.5 cursor-pointer text-foreground hover:text-[#80070A] transition-colors py-1"
											>
												<input
													type="radio"
													name="price_range"
													checked={isSelected}
													onChange={() => updateFilters({ price_range: range.key })}
													className="h-3.5 w-3.5 text-[#80070A] focus:ring-[#80070A]"
												/>
												<span className={cn(isSelected ? 'font-bold text-[#80070A]' : '')}>
													{range.label}
												</span>
											</label>
										);
									})}
								</div>
							)}
						</div>

						{/* Export Standards Trust Card */}
						<div className="rounded-2xl border border-[#80070A]/20 bg-[#80070A]/5 p-5 text-xs space-y-2">
							<div className="flex items-center gap-2 text-[#80070A]">
								<Award className="h-4 w-4" />
								<h4 className="font-bold uppercase tracking-wider text-[11px]">
									Standar Mutu Ekspor
								</h4>
							</div>
							<p className="text-muted-foreground leading-relaxed">
								Seluruh komoditas rempah diuji laboratorium dan bersertifikat Phytosanitary, Bebas Aflatoksin, dan ISO 22000.
							</p>
						</div>
					</aside>

					{/* Right Column: Product Cards Grid */}
					<main className="lg:col-span-9">
						{products.data.length === 0 ? (
							<div className="rounded-3xl border border-dashed border-border bg-white/50 p-16 text-center">
								<PackageSearch className="h-12 w-12 text-muted-foreground mx-auto" />
								<h3 className="font-display text-xl font-bold text-foreground mt-4">
									Komoditas tidak ditemukan
								</h3>
								<p className="mt-1.5 text-xs text-muted-foreground max-w-sm mx-auto">
									Coba ubah kata kunci pencarian, rentang harga, atau reset filter kategori.
								</p>
								<button
									onClick={() => router.get(route('products.index'))}
									className="mt-6 rounded-full bg-[#80070A] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110"
								>
									Reset Semua Filter
								</button>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{products.data.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</div>
						)}

						{/* Pagination */}
						{products.last_page > 1 && (
							<div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6">
								<p className="text-xs text-muted-foreground">
									Menampilkan {products.from}–{products.to} dari {products.total} komoditas rempah
								</p>
								<div className="flex gap-1.5">
									{products.links.map((link, idx) => (
										<Link
											key={idx}
											href={link.url || '#'}
											preserveScroll
											className={cn(
												'rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
												link.active
													? 'bg-[#80070A] text-white shadow-sm'
													: link.url
													? 'bg-white text-foreground border border-border hover:bg-secondary'
													: 'text-muted-foreground/40 cursor-not-allowed'
											)}
											dangerouslySetInnerHTML={{ __html: link.label }}
										/>
									))}
								</div>
							</div>
						)}
					</main>
				</div>
			</div>
		</StorefrontLayout>
	);
}
