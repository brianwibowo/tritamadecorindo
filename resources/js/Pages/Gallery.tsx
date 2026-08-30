import ScrollReveal from '@/Components/UI/ScrollReveal';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Phone, X } from 'lucide-react';
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
		{ key: 'sandblast', label: 'Sandblast & Cutting' },
		{ key: 'wallpaper', label: 'Wallpaper 3D' },
		{ key: 'signage', label: 'Signage & Akrilik' },
		{ key: 'blinds', label: 'Blinds & Gorden' },
	];

	const handleCategoryChange = (catKey: string) => {
		router.get(
			route('gallery.index'),
			catKey === 'all' ? {} : { category: catKey },
			{ preserveState: true }
		);
	};

	return (
		<StorefrontLayout>
			<Head>
				<title>Galeri Proyek Pemasangan Kaca Film & Interior Bekasi & Jabodetabek — Tritama Decorindo</title>
				<meta
					name="description"
					content="Dokumentasi portofolio pengerjaan pemasangan Kaca Film Gedung & Rumah, Sandblast Cutting Logo Kantor, Wallpaper Dinding 3D, Signage Huruf Timbul, Roller Blinds, dan Gorden di Bekasi, Cikarang, Jakarta & seluruh Jabodetabek."
				/>
				<meta
					name="keywords"
					content="portofolio kaca film bekasi, hasil pasang sandblast bekasi, proyek wallpaper dinding bekasi, pemasangan huruf timbul akrilik bekasi, pasang blinds bekasi jakarta, dokumentasi tritama decorindo stiker"
				/>
				<meta property="og:title" content="Galeri Proyek Kaca Film & Interior Bekasi — Tritama Decorindo" />
				<meta
					property="og:description"
					content="Dokumentasi visual pengerjaan rapi dan presisi untuk perkantoran, perumahan, toko, ruko, dan gedung di Bekasi & Jabodetabek."
				/>
				<meta property="og:image" content="/images/products/kaca-film-sparta.webp" />
			</Head>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Page Header */}
				<div className="border-b border-border/80 pb-6 sm:pb-8">
					<span className="text-xs font-bold uppercase tracking-widest text-[#5478FF]">
						Portofolio & Dokumentasi
					</span>
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mt-1.5">
						Galeri Hasil Pengerjaan
					</h1>
					<p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
						Dokumentasi pengerjaan nyata pemasangan Kaca Film, Sandblast Cutting, Wallpaper Dinding, Signage Huruf Timbul, Blinds, dan Gorden oleh teknisi berpengalaman Tritama Decorindo Stiker.
					</p>
				</div>

				{/* Category Filter Pills (Scrollable on Mobile) */}
				<div className="mt-6 sm:mt-8 flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap no-scrollbar">
					{categories.map((cat) => (
						<button
							key={cat.key}
							type="button"
							onClick={() => handleCategoryChange(cat.key)}
							className={cn(
								'whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all shrink-0',
								(currentCategory === cat.key || (!currentCategory && cat.key === 'all'))
									? 'bg-[#5478FF] text-white shadow-md'
									: 'bg-secondary text-foreground hover:bg-slate-200 border border-border'
							)}
						>
							{cat.label}
						</button>
					))}
				</div>

				{/* Gallery Grid */}
				<div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					{galleryItems.data.map((item, idx) => (
						<ScrollReveal key={item.id} effect="fade-up" delay={idx * 60}>
							<div
								onClick={() => setPreviewItem(item)}
								className="group cursor-pointer rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between h-full"
							>
								<div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
									<img
										src={item.image}
										alt={item.title}
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute top-2.5 left-2.5">
										<span className="rounded-full bg-[#111FA2]/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#FFDE42] shadow-sm">
											{item.category_label || item.category}
										</span>
									</div>
									<div className="absolute inset-0 bg-[#111FA2]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
										<span className="h-10 w-10 rounded-full bg-white text-[#111FA2] flex items-center justify-center shadow-lg">
											<Eye className="h-4 w-4 text-[#5478FF]" />
										</span>
									</div>
								</div>

								<div className="mt-3.5 px-0.5">
									<h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#5478FF] transition-colors leading-snug line-clamp-2">
										{item.title}
									</h3>
									<p className="mt-1 text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
										{item.caption || item.description}
									</p>
								</div>
							</div>
						</ScrollReveal>
					))}
				</div>

				{/* Pagination */}
				{galleryItems.links && galleryItems.links.length > 3 && (
					<div className="mt-10 sm:mt-12 flex items-center justify-center gap-1.5 flex-wrap">
						{galleryItems.links.map((link, idx) => (
							<Link
								key={idx}
								href={link.url || '#'}
								className={cn(
									'flex h-8 min-w-[32px] sm:h-9 sm:min-w-[36px] items-center justify-center rounded-full px-3 text-xs font-bold transition-all',
									link.active
										? 'bg-[#5478FF] text-white shadow-sm'
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
					<div
						className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200"
						onClick={(e) => {
							if (e.target === e.currentTarget) setPreviewItem(null);
						}}
					>
						<div className="relative max-w-lg md:max-w-xl w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col my-auto animate-scale-up">
							{/* Floating Close Button */}
							<button
								type="button"
								onClick={() => setPreviewItem(null)}
								className="absolute top-3 right-3 z-30 h-10 w-10 rounded-full bg-black/70 hover:bg-red-600 text-white border border-white/30 flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer"
								title="Tutup Preview (Esc)"
							>
								<X className="h-5 w-5 stroke-[2.5]" />
							</button>

							{/* Image Section */}
							<div className="relative w-full max-h-[38vh] sm:max-h-[42vh] shrink-0 bg-slate-950 overflow-hidden flex items-center justify-center">
								<img
									src={previewItem.image}
									alt={previewItem.title}
									className="max-h-[38vh] sm:max-h-[42vh] w-full object-cover"
								/>
							</div>

							{/* Details & WhatsApp CTA */}
							<div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
								<span className="inline-block rounded-full bg-blue-50 text-[#111FA2] border border-blue-200/60 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
									{previewItem.category_label || previewItem.category}
								</span>
								<h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
									{previewItem.title}
								</h2>
								<p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
									{previewItem.caption || previewItem.description}
								</p>

								<div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
									<div className="text-[11px] text-slate-500 text-center sm:text-left font-medium">
										Tertarik dengan hasil proyek ini?
									</div>
									<a
										href={`https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20tertarik%20dengan%20proyek%20di%20galeri:%20*${encodeURIComponent(previewItem.title)}*.%20Mohon%20info%20estimasi%20biaya.`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5478FF] px-5 py-2.5 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#4064EB] active:scale-95 transition-all shadow-md w-full sm:w-auto shrink-0"
									>
										<Phone className="h-3.5 w-3.5 text-[#FFDE42]" />
										<span>Tanya via WhatsApp</span>
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
