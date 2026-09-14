import ProductCard from '@/Components/Storefront/ProductCard';
import ScrollReveal from '@/Components/UI/ScrollReveal';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import {
	ArrowRight,
	Check,
	ChevronDown,
	ChevronUp,
	Filter,
	Layers,
	MessageCircle,
	PackageSearch,
	RotateCcw,
	Search,
	SlidersHorizontal,
	Sparkles,
	Tag,
	X,
} from 'lucide-react';
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
	const activePriceRange = priceRanges.find((p) => p.key === filters.price_range);
	const hasActiveFilters = Boolean(
		filters.search || filters.category || (filters.sort && filters.sort !== 'latest') || filters.tag || filters.price_range
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

			<div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
				{/* 1. Header Area */}
				<div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0D1780] to-[#111FA2] p-6 sm:p-10 text-white shadow-xl overflow-hidden">
					<div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#5478FF]/20 blur-3xl" />
					<div className="absolute right-1/4 -bottom-12 h-48 w-48 rounded-full bg-[#FFDE42]/10 blur-2xl" />

					<div className="relative z-10 max-w-3xl">
						<div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-[#FFDE42] border border-white/10">
							<Sparkles className="h-3.5 w-3.5" />
							<span>Katalog Resmi & Estimasi Biaya 2026</span>
						</div>
						<h1 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
							Katalog Produk & Estimasi Harga
						</h1>
						<p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
							Pilihan lengkap material interior, kaca film tolak panas, sandblast motif & logo, wallpaper custom 3D, serta blinds kantor di Bekasi & Jabodetabek dengan kualitas material standar internasional.
						</p>
					</div>
				</div>

				{/* 2. Top Quick Pills & Search */}
				<div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
					{/* Tag Pills */}
					<div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
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
										'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all whitespace-nowrap shadow-xs',
										active
											? 'bg-[#111FA2] text-white shadow-md ring-2 ring-[#5478FF]/40'
											: 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
									)}
								>
									<span>{pill.label}</span>
								</button>
							);
						})}
					</div>

					{/* Search input */}
					<form onSubmit={handleSearch} className="flex gap-2 shrink-0">
						<div className="relative flex-1 sm:w-80">
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Cari kaca film, sandblast, blinds..."
								className="w-full h-10 rounded-full border border-slate-200 bg-white pl-9 pr-4 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-[#5478FF] focus:outline-none focus:ring-2 focus:ring-[#5478FF]/20 shadow-xs transition-all"
							/>
							<Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
							{search && (
								<button
									type="button"
									onClick={() => {
										setSearch('');
										updateFilters({ search: '' });
									}}
									className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
								>
									<X className="h-4 w-4" />
								</button>
							)}
						</div>
						<button
							type="submit"
							className="rounded-full bg-[#111FA2] hover:bg-[#0D1780] px-5 py-2 text-xs font-bold text-white transition-all shadow-sm active:scale-95"
						>
							Cari
						</button>
					</form>
				</div>

				{/* 3. Horizontal Filter Status & Sort Bar */}
				<div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 p-3 sm:px-5">
					<div className="flex flex-wrap items-center gap-2">
						<div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
							<SlidersHorizontal className="h-3.5 w-3.5 text-[#5478FF]" />
							<span>Menampilkan:</span>
						</div>
						<span className="rounded-full bg-[#111FA2] text-white px-3 py-1 text-xs font-bold shadow-xs">
							{products.total} Hasil
						</span>

						{/* Active filter chips */}
						{activeCategory && (
							<span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 text-xs font-bold text-[#111FA2]">
								<span>Kategori: {activeCategory.name}</span>
								<button
									type="button"
									onClick={() => updateFilters({ category: '' })}
									className="text-blue-500 hover:text-blue-700 ml-0.5"
								>
									<X className="h-3 w-3" />
								</button>
							</span>
						)}

						{activePriceRange && (
							<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-bold text-emerald-800">
								<span>Harga: {activePriceRange.label}</span>
								<button
									type="button"
									onClick={() => updateFilters({ price_range: '' })}
									className="text-emerald-600 hover:text-emerald-800 ml-0.5"
								>
									<X className="h-3 w-3" />
								</button>
							</span>
						)}

						{filters.search && (
							<span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1 text-xs font-bold text-amber-900">
								<span>Pencarian: "{filters.search}"</span>
								<button
									type="button"
									onClick={() => {
										setSearch('');
										updateFilters({ search: '' });
									}}
									className="text-amber-600 hover:text-amber-800 ml-0.5"
								>
									<X className="h-3 w-3" />
								</button>
							</span>
						)}
					</div>

					{/* Sort Dropdown & Reset */}
					<div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
						{hasActiveFilters && (
							<button
								type="button"
								onClick={resetFilters}
								className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 px-2.5 py-1 rounded-lg transition-colors"
							>
								<RotateCcw className="h-3 w-3" />
								<span>Reset Semua</span>
							</button>
						)}

						<div className="flex items-center gap-2">
							<span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Urutkan:</span>
							<select
								value={filters.sort || 'latest'}
								onChange={(e) => updateFilters({ sort: e.target.value })}
								className="h-8.5 rounded-xl border border-slate-200 bg-white px-3 pr-8 text-xs font-bold text-slate-800 focus:border-[#5478FF] focus:outline-none focus:ring-1 focus:ring-[#5478FF] shadow-xs cursor-pointer"
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
				<div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					{/* Left Sidebar Filter */}
					<aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-24">
						{/* Category Box */}
						<div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all hover:border-slate-300">
							<button
								type="button"
								onClick={() => setCategoriesOpen(!categoriesOpen)}
								className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50/60"
							>
								<div className="flex items-center gap-2.5">
									<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#5478FF]">
										<Layers className="h-4 w-4" />
									</div>
									<div>
										<span className="text-sm font-bold text-slate-900 block leading-tight">Kategori Produk</span>
										<span className="text-[11px] text-slate-400 font-normal">Pilih jenis material</span>
									</div>
								</div>
								<div className="flex items-center gap-2">
									{filters.category && (
										<span className="h-2 w-2 rounded-full bg-[#5478FF] ring-4 ring-blue-100" />
									)}
									<div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100/80 text-slate-500">
										{categoriesOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
									</div>
								</div>
							</button>

							{categoriesOpen && (
								<div className="p-3 pt-1 border-t border-slate-100 space-y-1">
									{/* Semua Kategori */}
									<button
										type="button"
										onClick={() => updateFilters({ category: '', tag: '' })}
										className={cn(
											'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all group text-left',
											!filters.category
												? 'bg-[#5478FF]/10 text-[#111FA2] font-bold shadow-xs'
												: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
										)}
									>
										<div className="flex items-center gap-2.5">
											<div
												className={cn(
													'h-2 w-2 rounded-full transition-all shrink-0',
													!filters.category
														? 'bg-[#5478FF] ring-4 ring-[#5478FF]/20'
														: 'bg-slate-300 group-hover:bg-slate-400'
												)}
											/>
											<span>Semua Kategori</span>
										</div>
										<span
											className={cn(
												'rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors',
												!filters.category
													? 'bg-[#111FA2] text-white shadow-xs'
													: 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
											)}
										>
											{products.total}
										</span>
									</button>

									{/* Categories List */}
									{categories.map((cat) => {
										const isSelected = filters.category === cat.id;
										return (
											<button
												key={cat.id}
												type="button"
												onClick={() => updateFilters({ category: isSelected ? '' : cat.id, tag: '' })}
												className={cn(
													'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all group text-left',
													isSelected
														? 'bg-[#5478FF]/10 text-[#111FA2] font-bold shadow-xs'
														: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
												)}
											>
												<div className="flex items-center gap-2.5 truncate pr-2">
													<div
														className={cn(
															'h-2 w-2 rounded-full transition-all shrink-0',
															isSelected
																? 'bg-[#5478FF] ring-4 ring-[#5478FF]/20'
																: 'bg-slate-300 group-hover:bg-slate-400'
														)}
													/>
													<span className="truncate">{cat.name}</span>
												</div>
												<span
													className={cn(
														'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors',
														isSelected
															? 'bg-[#111FA2] text-white shadow-xs'
															: 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
													)}
												>
													{cat.products_count ?? 0}
												</span>
											</button>
										);
									})}
								</div>
							)}
						</div>

						{/* Price Filter Box */}
						<div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all hover:border-slate-300">
							<button
								type="button"
								onClick={() => setPriceOpen(!priceOpen)}
								className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50/60"
							>
								<div className="flex items-center gap-2.5">
									<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
										<Tag className="h-4 w-4" />
									</div>
									<div>
										<span className="text-sm font-bold text-slate-900 block leading-tight">Rentang Harga</span>
										<span className="text-[11px] text-slate-400 font-normal">Saring perkiraan budget</span>
									</div>
								</div>
								<div className="flex items-center gap-2">
									{filters.price_range && (
										<span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
									)}
									<div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100/80 text-slate-500">
										{priceOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
									</div>
								</div>
							</button>

							{priceOpen && (
								<div className="p-3 pt-1 border-t border-slate-100 space-y-1">
									{/* Semua Rentang */}
									<button
										type="button"
										onClick={() => updateFilters({ price_range: '' })}
										className={cn(
											'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all group text-left',
											!filters.price_range
												? 'bg-emerald-50 text-emerald-950 font-bold shadow-xs'
												: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
										)}
									>
										<div
											className={cn(
												'h-4 w-4 rounded-full border flex items-center justify-center transition-all shrink-0',
												!filters.price_range
													? 'border-emerald-600 bg-emerald-600 ring-2 ring-emerald-200'
													: 'border-slate-300 group-hover:border-slate-400 bg-white'
											)}
										>
											{!filters.price_range && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
										</div>
										<span>Semua Rentang Harga</span>
									</button>

									{priceRanges.map((range) => {
										const isSelected = (filters.price_range || '') === range.key;
										return (
											<button
												key={range.key}
												type="button"
												onClick={() => updateFilters({ price_range: isSelected ? '' : range.key })}
												className={cn(
													'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all group text-left',
													isSelected
														? 'bg-emerald-50 text-emerald-950 font-bold shadow-xs'
														: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
												)}
											>
												<div
													className={cn(
														'h-4 w-4 rounded-full border flex items-center justify-center transition-all shrink-0',
														isSelected
															? 'border-emerald-600 bg-emerald-600 ring-2 ring-emerald-200'
															: 'border-slate-300 group-hover:border-slate-400 bg-white'
													)}
												>
													{isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
												</div>
												<span>{range.label}</span>
											</button>
										);
									})}
								</div>
							)}
						</div>

						{/* Direct WhatsApp Callout Banner */}
						<div className="relative rounded-2xl bg-gradient-to-br from-[#111FA2] via-[#0D1780] to-[#080E4E] text-white p-5 shadow-lg border border-[#5478FF]/30 overflow-hidden group">
							<div className="absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-[#FFDE42]/10 blur-xl group-hover:bg-[#FFDE42]/20 transition-all" />

							<div className="flex items-center gap-2 text-[#FFDE42] text-[11px] font-extrabold uppercase tracking-wider">
								<MessageCircle className="h-4 w-4" />
								<span>Konsultasi & Survei Gratis</span>
							</div>
							<h4 className="mt-2 text-sm font-bold leading-snug">
								Punya Ukuran atau Desain Khusus?
							</h4>
							<p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
								Kirim ukuran bidang kaca / dinding via WhatsApp untuk dapat estimasi biaya instan & jadwal survei lokasi.
							</p>
							<a
								href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20ingin%20tanya%20estimasi%20ukuran%20dan%20harga%20pemasangan."
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] py-2.5 text-xs font-extrabold text-white transition-all shadow-md active:scale-95"
							>
								<span>Chat Teknisi via WhatsApp</span>
								<ArrowRight className="h-3.5 w-3.5" />
							</a>
						</div>
					</aside>

					{/* Right Column: Product Cards Grid */}
					<div className="lg:col-span-9">
						{products.data.length === 0 ? (
							<div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-20 px-6 text-center shadow-xs">
								<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
									<PackageSearch className="h-8 w-8" />
								</div>
								<h3 className="mt-4 text-base font-bold text-slate-900">Tidak ada produk yang cocok</h3>
								<p className="mt-1.5 text-xs text-slate-500 max-w-md leading-relaxed">
									Kriteria filter atau pencarian Anda saat ini tidak membuahkan hasil. Coba ubah kata kunci atau hapus filter.
								</p>
								<button
									onClick={resetFilters}
									className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#111FA2] hover:bg-[#0D1780] px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95"
								>
									<RotateCcw className="h-3.5 w-3.5" />
									<span>Lihat Semua Produk</span>
								</button>
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
									{products.data.map((product, idx) => (
										<ScrollReveal key={product.id} effect="fade-up" delay={idx * 50}>
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
													'flex h-9 min-w-[36px] items-center justify-center rounded-xl px-3 text-xs font-bold transition-all',
													link.active
														? 'bg-[#111FA2] text-white shadow-sm font-extrabold ring-2 ring-[#5478FF]/30'
														: link.url
														? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
														: 'cursor-not-allowed text-slate-400 opacity-50 bg-slate-50'
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

