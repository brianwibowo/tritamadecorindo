import ProductCard from '@/Components/Storefront/ProductCard';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Layers, PackageSearch, RotateCcw, Search, ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react';
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
		{ key: 'all', label: 'Semua Produk', icon: null },
		{ key: 'cat-kaca-film', label: 'Kaca Film', icon: ShieldCheck },
		{ key: 'cat-sandblast-cutting', label: 'Sandblast & Stiker', icon: Layers },
		{ key: 'cat-wallpaper', label: 'Wallpaper', icon: Sparkles },
		{ key: 'cat-window-blinds', label: 'Roller & Vertical Blinds', icon: null },
	];

	const priceRanges = [
		{ key: '', label: 'Semua Harga' },
		{ key: 'under_100k', label: '≤ Rp 100.000 (Per Meter Material)' },
		{ key: '100k_500k', label: 'Rp 100.000 – Rp 500.000 (Roll / m²)' },
		{ key: 'above_500k', label: '> Rp 500.000 (Paket Proyek)' },
	];

	const hasActiveFilters = Boolean(
		filters.category || (filters.tag && filters.tag !== 'all') || filters.price_range || filters.search || (filters.sort && filters.sort !== 'latest')
	);

	return (
		<StorefrontLayout>
			<Head>
				<title>Katalog Produk & Harga Material — Tritama Decorindo Stiker</title>
				<meta
					name="description"
					content="Daftar harga material dan jasa pasang Kaca Film Riben/Sparta/One Way, Sandblast Polos & Cutting Logo, Wallpaper Dinding, Roller Blinds, Huruf Timbul LED, dan Gorden."
				/>
				<meta
					name="keywords"
					content="harga kaca film riben, harga kaca film sparta, harga sandblast polos, harga sandblast cutting logo, harga wallpaper roll, harga roller blinds blackout, tritama decorindo stiker"
				/>
				<meta property="og:title" content="Katalog Produk & Harga — Tritama Decorindo Stiker" />
				<meta
					property="og:description"
					content="Pilihan lengkap material dan jasa pasang dekorasi kaca, dinding, dan penutup jendela bergaransi di Jabodetabek."
				/>
				<meta property="og:image" content="/images/products/kaca-film-sparta.webp" />
				<meta name="twitter:title" content="Katalog Produk — Tritama Decorindo Stiker" />
				<meta
					name="twitter:description"
					content="Daftar produk dan harga material & pemasangan interior eksterior Tritama Decorindo Stiker."
				/>
				<meta name="twitter:image" content="/images/products/kaca-film-sparta.webp" />
			</Head>

			<div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
				{/* 1. Header Area */}
				<div className="border-b border-border/80 pb-6">
					<h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
						Katalog Produk & Estimasi Harga
					</h1>
					<p className="mt-2 text-sm text-muted-foreground max-w-2xl">
						Daftar harga material dan jasa pemasangan Kaca Film, Sandblast, Wallpaper, Blinds, Huruf Timbul, dan Gorden berkualitas oleh Tritama Decorindo Stiker.
					</p>
				</div>

				{/* 2. Top Quick Pills & Search */}
				<div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
					{/* Tag Pills */}
					<div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
						{tagPills.map((pill) => {
							const active = (filters.category || 'all') === pill.key || (filters.tag || 'all') === pill.key;
							const Icon = pill.icon;
							return (
								<button
									key={pill.key}
									type="button"
									onClick={() => {
										if (pill.key === 'all') {
											updateFilters({ category: '', tag: '' });
										} else {
											updateFilters({ category: pill.key, tag: '' });
										}
									}}
									className={cn(
										'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm whitespace-nowrap',
										active
											? 'bg-[#0284C7] text-white shadow-md'
											: 'bg-secondary text-foreground border border-border hover:bg-slate-200/60'
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
						<div className="relative flex-1 sm:w-72">
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Cari kaca film, sandblast, blinds..."
								className="w-full h-10 rounded-full border border-border bg-white pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-[#0284C7] focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						</div>
						<button
							type="submit"
							className="rounded-full bg-[#0F172A] px-5 py-2 text-xs font-bold text-white hover:bg-[#0284C7] transition-all shadow-sm"
						>
							Cari
						</button>
					</form>
				</div>

				{/* 3. Horizontal Filter Bar */}
				<div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
					<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
						<SlidersHorizontal className="h-4 w-4 text-[#0284C7]" />
						<span>Filter Produk</span>
						{hasActiveFilters && (
							<button
								onClick={() => router.get(route('products.index'))}
								className="ml-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0284C7] hover:underline lowercase"
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
											? 'font-bold text-[#0284C7] underline underline-offset-4'
											: 'text-foreground/80 hover:text-foreground'
									)}
								>
									{opt.label}
								</button>
							);
						})}
					</div>
				</div>

				{/* 4. Two-Column Layout: Sidebar + Product Grid */}
				<div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					{/* Left Column: Filter Sidebar */}
					<aside className="lg:col-span-3 space-y-6">
						{/* Categories Accordion */}
						<div className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm">
							<button
								type="button"
								onClick={() => setCategoriesOpen(!categoriesOpen)}
								className="flex w-full items-center justify-between text-sm font-bold text-foreground"
							>
								<span>Kategori Produk</span>
								{categoriesOpen ? (
									<ChevronUp className="h-4 w-4 text-muted-foreground" />
								) : (
									<ChevronDown className="h-4 w-4 text-muted-foreground" />
								)}
							</button>

							{categoriesOpen && (
								<div className="mt-4 space-y-2.5 pt-2 border-t border-border/60 text-xs">
									<button
										type="button"
										onClick={() => updateFilters({ category: '' })}
										className={cn(
											'flex w-full items-center justify-between text-left transition-colors',
											!filters.category
												? 'font-bold text-[#0284C7]'
												: 'text-foreground hover:text-[#0284C7]'
										)}
									>
										<span>Semua Kategori</span>
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
														? 'font-bold text-[#0284C7]'
														: 'text-foreground hover:text-[#0284C7]'
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

						{/* Price Filter Box */}
						<div className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm">
							<button
								type="button"
								onClick={() => setPriceOpen(!priceOpen)}
								className="flex w-full items-center justify-between text-sm font-bold text-foreground"
							>
								<span>Rentang Harga</span>
								{priceOpen ? (
									<ChevronUp className="h-4 w-4 text-muted-foreground" />
								) : (
									<ChevronDown className="h-4 w-4 text-muted-foreground" />
								)}
							</button>

							{priceOpen && (
								<div className="mt-4 space-y-2.5 pt-2 border-t border-border/60 text-xs">
									{priceRanges.map((range) => {
										const isSelected = (filters.price_range || '') === range.key;
										return (
											<button
												key={range.key}
												type="button"
												onClick={() => updateFilters({ price_range: isSelected ? '' : range.key })}
												className={cn(
													'flex w-full items-center justify-between text-left transition-colors',
													isSelected
														? 'font-bold text-[#0284C7]'
														: 'text-foreground hover:text-[#0284C7]'
												)}
											>
												<span>{range.label}</span>
												{isSelected && <span className="text-[#0284C7] font-bold">✓</span>}
											</button>
										);
									})}
								</div>
							)}
						</div>

						{/* Direct WhatsApp Callout Banner */}
						<div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-5 shadow-md">
							<p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">Butuh Custom Ukuran?</p>
							<p className="mt-2 text-xs text-slate-300 leading-relaxed">
								Konsultasikan kebutuhan partisi kaca, bidang dinding, atau jendela gedung Anda dengan tim teknisi kami.
							</p>
							<a
								href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20ingin%20tanya%20custom%20ukuran%20dan%20harga%20pemasangan."
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#0284C7] py-2.5 text-xs font-bold text-white hover:bg-[#0369a1] transition-all shadow-sm"
							>
								Chat WhatsApp: 0819-9090-9646
							</a>
						</div>
					</aside>

					{/* Right Column: Product Cards Grid */}
					<div className="lg:col-span-9">
						{products.data.length === 0 ? (
							<div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-16 text-center">
								<PackageSearch className="h-12 w-12 text-muted-foreground" />
								<h3 className="mt-4 text-base font-bold text-foreground">Tidak ada produk yang cocok</h3>
								<p className="mt-1 text-xs text-muted-foreground max-w-sm">
									Coba ubah kata kunci pencarian atau reset filter untuk melihat katalog lainnya.
								</p>
								<button
									onClick={() => router.get(route('products.index'))}
									className="mt-6 rounded-full bg-[#0284C7] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0369a1]"
								>
									Lihat Semua Produk
								</button>
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
									{products.data.map((product) => (
										<ProductCard key={product.id} product={product} />
									))}
								</div>

								{/* Pagination */}
								{products.links && products.links.length > 3 && (
									<div className="mt-12 flex items-center justify-center gap-1.5">
										{products.links.map((link, idx) => (
											<Link
												key={idx}
												href={link.url || '#'}
												className={cn(
													'flex h-9 min-w-[36px] items-center justify-center rounded-full px-3 text-xs font-bold transition-all',
													link.active
														? 'bg-[#0284C7] text-white shadow-sm'
														: link.url
														? 'bg-secondary text-foreground hover:bg-slate-200'
														: 'cursor-not-allowed text-muted-foreground opacity-50'
												)}
												dangerouslySetInnerHTML={{ __html: link.label }}
											/>
										))}
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</StorefrontLayout>
	);
}
