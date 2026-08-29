import ProductCard from '@/Components/Storefront/ProductCard';
import ScrollReveal from '@/Components/UI/ScrollReveal';
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
			{
				preserveState: true,
				preserveScroll: true,
			}
		);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		updateFilters({ search });
	};

	const resetFilters = () => {
		setSearch('');
		router.get(route('products.index'), {}, { preserveState: true });
	};

	const sortOptions = [
		{ label: 'Terbaru', value: 'latest' },
		{ label: 'Harga Terendah', value: 'price_asc' },
		{ label: 'Harga Tertinggi', value: 'price_desc' },
		{ label: 'Nama A-Z', value: 'name_asc' },
	];

	const tagPills = [
		{ key: 'all', label: 'Semua Produk' },
		{ key: 'cat-kaca-film', label: 'Kaca Film' },
		{ key: 'cat-sandblast-cutting', label: 'Sandblast' },
		{ key: 'cat-wallpaper', label: 'Wallpaper 3D' },
		{ key: 'cat-branding-signage', label: 'Signage & Akrilik' },
		{ key: 'cat-window-blinds', label: 'Blinds' },
		{ key: 'cat-gorden', label: 'Gorden' },
	];

	const priceRanges = [
		{ key: 'under_50k', label: 'Di bawah Rp 50.000' },
		{ key: '50k_100k', label: 'Rp 50.000 - Rp 100.000' },
		{ key: '100k_200k', label: 'Rp 100.000 - Rp 200.000' },
		{ key: 'above_200k', label: 'Di atas Rp 200.000' },
	];

	const activeCategory = categories.find((c) => c.id === filters.category);
	const hasActiveFilters = Boolean(
		filters.search || filters.category || filters.sort || filters.tag || filters.price_range
	);

	return (
		<StorefrontLayout>
			<Head>
				<title>Katalog Produk & Estimasi Harga Kaca Film, Sandblast, Wallpaper & Blinds Bekasi — Tritama Decorindo</title>
				<meta
					name="description"
					content="Daftar produk material & estimasi biaya pemasangan Kaca Film Riben, Sparta, One Way, Sandblast Polos & Cutting Logo, Wallpaper 3D, Roller Blinds, Huruf Timbul LED, dan Gorden di Bekasi, Cikarang, Tambun & Jabodetabek oleh Tritama Decorindo Stiker."
				/>
				<meta
					name="keywords"
					content="harga kaca film bekasi, harga kaca film per meter, biaya pasang sandblast bekasi, harga sandblast cutting logo kantor, wallpaper 3d dinding bekasi, harga roller blinds bekasi, biaya huruf timbul led bekasi, pasang gorden kantor bekasi, kaca film jabodetabek"
				/>
				<meta property="og:title" content="Katalog Produk & Harga Kaca Film & Interior Bekasi — Tritama Decorindo" />
				<meta
					property="og:description"
					content="Pilihan material berkualitas tinggi dan estimasi biaya transparan untuk kebutuhan rumah, ruko, gedung, dan kantor di area Bekasi & Jabodetabek."
				/>
				<meta name="twitter:image" content="/images/products/kaca-film-sparta.webp" />
			</Head>

			<div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
				{/* 1. Header Area */}
				<div className="border-b border-border/80 pb-6">
					<h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
						Katalog Produk & Estimasi Harga
					</h1>
					<p className="mt-2 text-sm text-slate-600 max-w-2xl">
						Daftar harga material dan jasa pemasangan Kaca Film, Sandblast, Wallpaper, Blinds, Huruf Timbul, dan Gorden berkualitas oleh Tritama Decorindo Stiker.
					</p>
				</div>

				{/* 2. Top Quick Pills & Search */}
				<div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
					{/* Tag Pills */}
					<div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
						{tagPills.map((pill) => {
							const active = (filters.category || 'all') === pill.key || (filters.tag || 'all') === pill.key;
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
											? 'bg-[#FFDE42] text-[#111FA2] shadow-md font-extrabold'
											: 'bg-secondary text-foreground border border-border hover:bg-[#FFDE42]/10 hover:border-[#FFDE42]/30'
									)}
								>
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
								className="w-full h-10 rounded-full border border-border bg-white pl-9 pr-4 text-xs text-foreground placeholder:text-slate-400 focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF]"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						</div>
						<button
							type="submit"
							className="rounded-full bg-[#FFDE42] px-5 py-2 text-xs font-extrabold text-[#111FA2] hover:bg-[#F2D02B] transition-all shadow-sm"
						>
							Cari
						</button>
					</form>
				</div>

				{/* 3. Horizontal Filter Bar */}
				<div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
					<div className="flex items-center gap-3">
						<div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
							<SlidersHorizontal className="h-3.5 w-3.5" />
							<span>Menampilkan:</span>
						</div>
						<span className="rounded-full bg-[#FFDE42]/15 px-3 py-1 text-xs font-bold text-[#111FA2] ring-1 ring-[#FFDE42]/30">
							{products.total} Hasil Ditemukan
						</span>
						{activeCategory && (
							<span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-[#5478FF]">
								Kategori: {activeCategory.name}
							</span>
						)}
					</div>

					{/* Sort Dropdown & Reset */}
					<div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
						{hasActiveFilters && (
							<button
								type="button"
								onClick={resetFilters}
								className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline"
							>
								<RotateCcw className="h-3 w-3" />
								<span>Reset Filter</span>
							</button>
						)}

						<div className="flex items-center gap-2">
							<span className="text-xs text-slate-500 font-medium">Urutkan:</span>
							<select
								value={filters.sort || 'latest'}
								onChange={(e) => updateFilters({ sort: e.target.value })}
								className="h-9 rounded-xl border border-border bg-white px-3 text-xs font-bold text-foreground focus:border-[#5478FF] focus:outline-none"
							>
								{sortOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* 4. Main Body: Sidebar + Grid */}
				<div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Left Sidebar Filter */}
					<aside className="lg:col-span-3 space-y-6">
						{/* Category Box */}
						<div className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm">
							<button
								type="button"
								onClick={() => setCategoriesOpen(!categoriesOpen)}
								className="flex w-full items-center justify-between text-sm font-bold text-foreground"
							>
								<span>Semua Kategori</span>
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
												? 'font-bold text-[#5478FF]'
												: 'text-foreground hover:text-[#5478FF]'
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
														? 'font-bold text-[#5478FF]'
														: 'text-foreground hover:text-[#5478FF]'
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
														? 'font-bold text-[#5478FF]'
														: 'text-foreground hover:text-[#5478FF]'
												)}
											>
												<span>{range.label}</span>
												{isSelected && <span className="text-[#5478FF] font-bold">✓</span>}
											</button>
										);
									})}
								</div>
							)}
						</div>

						{/* Direct WhatsApp Callout Banner */}
						<div className="rounded-2xl bg-gradient-to-br from-[#111FA2] via-[#0D1780] to-[#080E4E] text-white p-5 shadow-md border border-[#5478FF]/20">
							<p className="text-xs font-bold uppercase tracking-wider text-[#FFDE42]">Konsultasi Ukuran Khusus</p>
							<p className="mt-2 text-xs text-slate-200 leading-relaxed">
								Konsultasikan kebutuhan partisi kaca, bidang dinding, atau jendela gedung Anda dengan tim teknisi kami.
							</p>
							<a
								href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20ingin%20tanya%20estimasi%20ukuran%20dan%20harga%20pemasangan."
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#5478FF] hover:bg-[#4064EB] py-2.5 text-xs font-bold text-white transition-all shadow-sm active:scale-95"
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
									className="mt-6 rounded-full bg-[#FFDE42] hover:bg-[#F2D02B] px-6 py-2.5 text-xs font-extrabold text-[#111FA2] shadow-md transition-all"
								>
									Lihat Semua Produk
								</button>
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
									{products.data.map((product, idx) => (
										<ScrollReveal key={product.id} effect="fade-up" delay={idx * 60}>
											<ProductCard product={product} />
										</ScrollReveal>
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
														? 'bg-[#FFDE42] text-[#111FA2] shadow-sm font-extrabold'
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
