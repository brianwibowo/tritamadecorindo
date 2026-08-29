import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
	ArrowRight,
	Calendar,
	ClipboardList,
	ExternalLink,
	Globe,
	Image as ImageIcon,
	Package,
	Plus,
	Receipt,
	Sparkles,
	Tag,
	Users,
	Wrench
} from 'lucide-react';

interface DashboardStats {
	totalProducts: number;
	totalCategories: number;
	totalGalleries: number;
	totalOrderArchives: number;
	totalUsers: number;
}

interface LatestProduct {
	id: string;
	name: string;
	slug: string;
	category_name: string;
	price_formatted: string;
	active: boolean;
	created_at: string;
}

interface LatestGallery {
	id: number;
	title: string;
	category: string;
	image: string;
	active: boolean;
	created_at: string;
}

interface LatestArchive {
	id: string;
	order_number: string;
	customer_name: string;
	project_type: string;
	total_amount_formatted: string;
	status: string;
	created_at: string;
}

interface Props {
	stats: DashboardStats;
	latestProducts: LatestProduct[];
	latestGalleries: LatestGallery[];
	latestArchives?: LatestArchive[];
}

export default function Dashboard({ stats, latestProducts, latestGalleries, latestArchives = [] }: Props) {
	return (
		<AdminLayout header="Ringkasan Panel Administrator">
			<Head title="Dashboard Ringkasan — Panel Admin Tritama Decorindo" />

			{/* Welcome Banner */}
			<div className="relative overflow-hidden rounded-3xl bg-[#0F172A] p-6 sm:p-8 text-white shadow-lg border border-slate-800 mb-8">
				<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div className="space-y-2">
						<div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3.5 py-1 text-xs font-bold text-[#38BDF8] border border-cyan-500/30">
							<Sparkles className="h-3.5 w-3.5" />
							<span>Tritama Decorindo Stiker — Sistem Pengelolaan Website</span>
						</div>
						<h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
							Selamat Datang di Panel Kontrol
						</h1>
						<p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
							Kelola katalog material, kategori produk, arsip pemesanan proyek, dokumentasi galeri pemasangan, serta akun administrator.
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-3 shrink-0">
						<a
							href="/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-sm active:scale-95"
						>
							<Globe className="h-4 w-4 text-[#38BDF8]" />
							<span>Buka Website Publik ↗</span>
						</a>
						<Link
							href="/admin/order-archives"
							className="inline-flex items-center gap-2 rounded-full bg-[#0284C7] hover:bg-[#0369a1] px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md active:scale-95"
						>
							<Plus className="h-4 w-4" />
							<span>Catat Arsip Proyek</span>
						</Link>
					</div>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
				{/* 1. Total Produk */}
				<Link
					href="/admin/products"
					className="group rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-[#0284C7]/40"
				>
					<div className="flex items-center gap-3.5">
						<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-[#0284C7] ring-1 ring-cyan-500/20 group-hover:scale-105 transition-transform">
							<Package className="h-5 w-5" />
						</div>
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
								Katalog Produk
							</p>
							<p className="text-xl font-bold text-foreground mt-0.5">
								{stats.totalProducts}
							</p>
						</div>
					</div>
				</Link>

				{/* 2. Total Kategori */}
				<Link
					href="/admin/categories"
					className="group rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-purple-500/40"
				>
					<div className="flex items-center gap-3.5">
						<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-700 ring-1 ring-purple-500/20 group-hover:scale-105 transition-transform">
							<Tag className="h-5 w-5" />
						</div>
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
								Kategori
							</p>
							<p className="text-xl font-bold text-foreground mt-0.5">
								{stats.totalCategories}
							</p>
						</div>
					</div>
				</Link>

				{/* 3. Portofolio Galeri */}
				<Link
					href="/admin/galleries"
					className="group rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-emerald-500/40"
				>
					<div className="flex items-center gap-3.5">
						<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 group-hover:scale-105 transition-transform">
							<ImageIcon className="h-5 w-5" />
						</div>
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
								Dokumentasi
							</p>
							<p className="text-xl font-bold text-foreground mt-0.5">
								{stats.totalGalleries}
							</p>
						</div>
					</div>
				</Link>

				{/* 4. Arsip Pemesanan */}
				<Link
					href="/admin/order-archives"
					className="group rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-500/40"
				>
					<div className="flex items-center gap-3.5">
						<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-[#0284C7] ring-1 ring-blue-500/20 group-hover:scale-105 transition-transform">
							<ClipboardList className="h-5 w-5" />
						</div>
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
								Arsip Pemesanan
							</p>
							<p className="text-xl font-bold text-foreground mt-0.5">
								{stats.totalOrderArchives}
							</p>
						</div>
					</div>
				</Link>

				{/* 5. Total User / Admin */}
				<Link
					href="/admin/users"
					className="group rounded-3xl border border-border/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-amber-500/40"
				>
					<div className="flex items-center gap-3.5">
						<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 group-hover:scale-105 transition-transform">
							<Users className="h-5 w-5" />
						</div>
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
								Pengguna
							</p>
							<p className="text-xl font-bold text-foreground mt-0.5">
								{stats.totalUsers}
							</p>
						</div>
					</div>
				</Link>
			</div>

			{/* Main Content: Latest Products & Latest Archives & Latest Gallery */}
			<div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left: Latest Order Archives & Products Table */}
				<div className="lg:col-span-7 space-y-8">
					{/* 1. Latest Order Archives */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-lg font-bold text-foreground">
									Arsip Pemesanan Terbaru
								</h2>
								<p className="text-xs text-muted-foreground">
									Pesanan proyek dan survey yang baru saja dicatat.
								</p>
							</div>
							<Link
								href="/admin/order-archives"
								className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-foreground hover:bg-border transition-colors shadow-sm"
							>
								<span>Semua Arsip</span>
								<ArrowRight className="h-3 w-3" />
							</Link>
						</div>

						<div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
							{latestArchives.length === 0 ? (
								<div className="p-8 text-center text-xs text-muted-foreground">
									Belum ada arsip pemesanan yang dicatat.{' '}
									<Link href="/admin/order-archives" className="text-[#0284C7] font-bold hover:underline">
										Catat arsip sekarang
									</Link>
								</div>
							) : (
								<div className="overflow-x-auto">
									<table className="w-full text-left text-xs">
										<thead className="bg-[#F8FAFC] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
											<tr>
												<th className="px-5 py-3.5">No. Arsip</th>
												<th className="px-5 py-3.5">Klien</th>
												<th className="px-5 py-3.5">Jenis Proyek</th>
												<th className="px-5 py-3.5">Nilai Proyek</th>
												<th className="px-5 py-3.5 text-right">Tanggal</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border/40">
											{latestArchives.map((arc) => (
												<tr key={arc.id} className="hover:bg-secondary/30 transition-colors">
													<td className="px-5 py-3.5 font-mono font-bold text-foreground">
														{arc.order_number}
													</td>
													<td className="px-5 py-3.5 font-semibold text-foreground">
														{arc.customer_name}
													</td>
													<td className="px-5 py-3.5 text-muted-foreground">
														{arc.project_type}
													</td>
													<td className="px-5 py-3.5 font-bold text-[#0284C7]">
														{arc.total_amount_formatted}
													</td>
													<td className="px-5 py-3.5 text-right text-muted-foreground">
														{arc.created_at}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>

					{/* 2. Latest Products */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-lg font-bold text-foreground">
									Katalog Produk Terbaru
								</h2>
								<p className="text-xs text-muted-foreground">
									Material dan jasa yang baru ditambahkan ke katalog.
								</p>
							</div>
							<Link
								href="/admin/products"
								className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-foreground hover:bg-border transition-colors shadow-sm"
							>
								<span>Semua Produk</span>
								<ArrowRight className="h-3 w-3" />
							</Link>
						</div>

						<div className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-sm">
							{latestProducts.length === 0 ? (
								<div className="p-8 text-center text-xs text-muted-foreground">
									Belum ada produk yang ditambahkan.
								</div>
							) : (
								<div className="overflow-x-auto">
									<table className="w-full text-left text-xs">
										<thead className="bg-[#F8FAFC] border-b border-border/60 text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
											<tr>
												<th className="px-5 py-3.5">Nama Produk</th>
												<th className="px-5 py-3.5">Kategori</th>
												<th className="px-5 py-3.5">Harga</th>
												<th className="px-5 py-3.5 text-right">Tanggal</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border/40">
											{latestProducts.map((prod) => (
												<tr key={prod.id} className="hover:bg-secondary/30 transition-colors">
													<td className="px-5 py-3.5 font-bold text-foreground max-w-xs truncate">
														<Link
															href={`/product/${prod.slug}`}
															target="_blank"
															className="hover:text-[#0284C7] inline-flex items-center gap-1.5"
														>
															<span>{prod.name}</span>
															<ExternalLink className="h-3 w-3 text-muted-foreground opacity-60" />
														</Link>
													</td>
													<td className="px-5 py-3.5 text-muted-foreground font-medium">
														{prod.category_name}
													</td>
													<td className="px-5 py-3.5 font-bold text-[#0284C7]">
														{prod.price_formatted}
													</td>
													<td className="px-5 py-3.5 text-right text-muted-foreground">
														{prod.created_at}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Right: Latest Gallery Showcase */}
				<div className="lg:col-span-5 space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-lg font-bold text-foreground">
								Galeri Proyek Terbaru
							</h2>
							<p className="text-xs text-muted-foreground">
								Foto dokumentasi pengerjaan pemasangan.
							</p>
						</div>
						<Link
							href="/admin/galleries"
							className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-foreground hover:bg-border transition-colors shadow-sm"
						>
							<span>Semua Galeri</span>
							<ArrowRight className="h-3 w-3" />
						</Link>
					</div>

					<div className="rounded-3xl border border-border/60 bg-white p-5 shadow-sm">
						{latestGalleries.length === 0 ? (
							<div className="p-8 text-center text-xs text-muted-foreground">
								Belum ada foto galeri yang diunggah.
							</div>
						) : (
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
								{latestGalleries.map((item) => (
									<div
										key={item.id}
										className="group relative aspect-square rounded-2xl overflow-hidden bg-secondary border border-border/60 shadow-sm"
									>
										<img
											src={item.image}
											alt={item.title}
											className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
											<p className="text-[11px] font-bold text-white line-clamp-1 leading-tight">
												{item.title}
											</p>
											<span className="text-[9px] text-cyan-300 font-semibold uppercase mt-0.5">
												{item.category}
											</span>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
