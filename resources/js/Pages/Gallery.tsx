import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, MapPin, Phone, X } from 'lucide-react';
import { useState } from 'react';
import type { PaginatedData } from '@/types';

interface GalleryItem {
	id: number;
	title: string;
	category: string;
	category_label: string;
	image: string;
	caption?: string;
	description?: string;
}

interface GalleryProps {
	galleryItems: PaginatedData<GalleryItem>;
	currentCategory?: string;
}

export default function Gallery({ galleryItems, currentCategory = 'all' }: GalleryProps) {
	const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

	const categories = [
		{ key: 'all', label: 'Semua Proyek' },
		{ key: 'kaca_film', label: 'Kaca Film' },
		{ key: 'sandblast', label: 'Sandblast & Stiker' },
		{ key: 'wallpaper', label: 'Wallpaper Dinding' },
		{ key: 'signage', label: 'Signage & Huruf Timbul' },
		{ key: 'blinds', label: 'Blinds & Gorden' },
	];

	const handleCategoryChange = (key: string) => {
		router.get(
			route('gallery.index'),
			{ category: key === 'all' ? '' : key },
			{ preserveState: true }
		);
	};

	return (
		<StorefrontLayout>
			<Head>
				<title>Galeri Proyek & Dokumentasi Pemasangan — Tritama Decorindo Stiker</title>
				<meta
					name="description"
					content="Dokumentasi portofolio pengerjaan pemasangan Kaca Film Gedung & Mobil, Sandblast Cutting Logo Kantor, Wallpaper Dinding 3D, Signage Huruf Timbul, Roller Blinds, dan Gorden oleh teknisi Tritama Decorindo Stiker."
				/>
				<meta
					name="keywords"
					content="portofolio kaca film, hasil pasang sandblast kantor, dokumentasi wallpaper dinding, proyek huruf timbul akrilik, pasang blinds jabodetabek, tritama decorindo stiker"
				/>
				<meta property="og:title" content="Galeri Proyek — Tritama Decorindo Stiker" />
				<meta
					property="og:description"
					content="Dokumentasi visual pengerjaan rapi dan presisi untuk perkantoran, perumahan, toko, ruko, dan gedung di Jabodetabek."
				/>
				<meta property="og:image" content="/images/products/kaca-film-sparta.webp" />
				<meta name="twitter:title" content="Galeri Proyek — Tritama Decorindo Stiker" />
				<meta
					name="twitter:description"
					content="Dokumentasi visual instalasi material interior dan eksterior Tritama Decorindo Stiker."
				/>
				<meta name="twitter:image" content="/images/products/kaca-film-sparta.webp" />
			</Head>

			<div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
				{/* Page Header */}
				<div className="border-b border-border/80 pb-8">
					<span className="text-xs font-bold uppercase tracking-widest text-[#0284C7]">
						Portofolio & Dokumentasi
					</span>
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-1">
						Galeri Hasil Pengerjaan
					</h1>
					<p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
						Dokumentasi pengerjaan nyata pemasangan Kaca Film, Sandblast Cutting, Wallpaper Dinding, Signage Huruf Timbul, Blinds, dan Gorden oleh teknisi berpengalaman Tritama Decorindo Stiker.
					</p>
				</div>

				{/* Category Filter Pills */}
				<div className="mt-8 flex flex-wrap items-center gap-2.5">
					{categories.map((cat) => (
						<button
							key={cat.key}
							type="button"
							onClick={() => handleCategoryChange(cat.key)}
							className={cn(
								'rounded-full px-5 py-2 text-xs font-bold transition-all shadow-sm',
								(currentCategory === cat.key || (!currentCategory && cat.key === 'all'))
									? 'bg-[#0284C7] text-white shadow-md'
									: 'bg-secondary text-foreground hover:bg-slate-200 border border-border'
							)}
						>
							{cat.label}
						</button>
					))}
				</div>

				{/* Gallery Grid */}
				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{galleryItems.data.map((item) => (
						<div
							key={item.id}
							onClick={() => setPreviewItem(item)}
							className="group cursor-pointer rounded-3xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
						>
							<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
								<img
									src={item.image}
									alt={item.title}
									className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute top-3 left-3">
									<span className="rounded-full bg-[#0F172A]/85 backdrop-blur-md px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-white shadow-sm">
										{item.category_label || item.category}
									</span>
								</div>
								<div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
									<span className="h-11 w-11 rounded-full bg-white text-[#0F172A] flex items-center justify-center shadow-lg">
										<Eye className="h-5 w-5" />
									</span>
								</div>
							</div>

							<div className="mt-4 px-1">
								<h3 className="text-base font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors leading-snug line-clamp-2">
									{item.title}
								</h3>
								<p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
									{item.caption || item.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				{galleryItems.links && galleryItems.links.length > 3 && (
					<div className="mt-12 flex items-center justify-center gap-1.5">
						{galleryItems.links.map((link, idx) => (
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

				{/* Lightbox / Preview Modal */}
				{previewItem && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
						<div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
							<button
								type="button"
								onClick={() => setPreviewItem(null)}
								className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
							>
								<X className="h-5 w-5" />
							</button>

							<div className="relative aspect-[16/10] bg-slate-900">
								<img
									src={previewItem.image}
									alt={previewItem.title}
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="p-6 sm:p-8">
								<span className="inline-block rounded-full bg-cyan-100 text-[#0284C7] px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
									{previewItem.category_label || previewItem.category}
								</span>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
									{previewItem.title}
								</h2>
								<p className="mt-3 text-sm text-slate-600 leading-relaxed">
									{previewItem.caption || previewItem.description}
								</p>

								<div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
									<div className="text-xs text-slate-500">
										Ingin memasang seperti proyek ini? Hubungi kami untuk survey gratis.
									</div>
									<a
										href={`https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20tertarik%20dengan%20proyek%20di%20galeri:%20*${encodeURIComponent(previewItem.title)}*.%20Mohon%20info%20estimasi%20biaya.`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded-full bg-[#0284C7] px-6 py-2.5 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#0369a1] transition-colors"
									>
										<Phone className="h-4 w-4" />
										<span>Tanya Biaya via WhatsApp</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</StorefrontLayout>
	);
}
