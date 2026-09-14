import ScrollReveal from '@/Components/UI/ScrollReveal';
import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, MessageCircle, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { PaginatedData } from '@/types';

interface GalleryItem {
	id: number;
	title?: string | null;
	category?: string;
	category_label?: string;
	image: string;
	caption?: string | null;
	description?: string | null;
}

interface GalleryProps {
	galleryItems: PaginatedData<GalleryItem>;
	currentCategory?: string;
}

export default function Gallery({ galleryItems, currentCategory = 'all' }: GalleryProps) {
	const [mounted, setMounted] = useState(false);
	const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Lock scroll when preview is open
	useEffect(() => {
		if (previewItem) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && previewItem) {
				setPreviewItem(null);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [previewItem]);

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
						Dokumentasi foto hasil pengerjaan nyata pemasangan Kaca Film, Sandblast Cutting, Wallpaper Dinding, Signage Huruf Timbul, Blinds, dan Gorden oleh tim Tritama Decorindo Stiker.
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
									? 'bg-[#111FA2] text-white shadow-md ring-2 ring-[#5478FF]/30'
									: 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
							)}
						>
							{cat.label}
						</button>
					))}
				</div>

				{/* Large Gallery Grid */}
				<div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					{galleryItems.data.map((item, idx) => (
						<ScrollReveal key={item.id} effect="fade-up" delay={idx * 50}>
							<div
								onClick={() => setPreviewItem(item)}
								className="group cursor-pointer rounded-3xl bg-white border border-slate-200/80 p-3 sm:p-3.5 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between h-full overflow-hidden"
							>
								{/* Large Photo Display */}
								<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950">
									<img
										src={item.image}
										alt={item.caption || item.title || 'Dokumentasi Proyek'}
										className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
										<span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-[#111FA2] shadow-lg">
											<Eye className="h-3.5 w-3.5 text-[#5478FF]" />
											<span>Lihat Foto Penuh</span>
										</span>
									</div>
								</div>

								{/* Clean Caption / Description Only (No Cluttered Titles) */}
								{item.caption || item.description ? (
									<div className="mt-3.5 px-2 pb-1">
										<p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed line-clamp-3">
											{item.caption || item.description}
										</p>
									</div>
								) : (
									<div className="mt-2" />
								)}
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
									'flex h-8 min-w-[32px] sm:h-9 sm:min-w-[36px] items-center justify-center rounded-xl px-3 text-xs font-bold transition-all',
									link.active
										? 'bg-[#111FA2] text-white shadow-sm ring-2 ring-[#5478FF]/30'
										: link.url
										? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
										: 'cursor-not-allowed text-slate-400 opacity-50 bg-slate-50'
								)}
								dangerouslySetInnerHTML={{ __html: link.label }}
							/>
						))}
					</div>
				)}

				{/* Lightbox / Preview Modal (Large Immersive Image) */}
				{previewItem && mounted && createPortal(
					<div
						style={{ zIndex: 999999 }}
						className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
						onClick={(e) => {
							if (e.target === e.currentTarget) setPreviewItem(null);
						}}
					>
						<div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col my-auto animate-scale-up border border-white/20">
							{/* Floating Close Button */}
							<button
								type="button"
								style={{ zIndex: 1000000 }}
								onClick={() => setPreviewItem(null)}
								className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/70 hover:bg-red-600 text-white border border-white/30 flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer"
								title="Tutup (Esc)"
							>
								<X className="h-5 w-5 stroke-[2.5]" />
							</button>

							{/* Large Image Section */}
							<div className="relative w-full max-h-[62vh] shrink-0 bg-slate-950 overflow-hidden flex items-center justify-center">
								<img
									src={previewItem.image}
									alt="Dokumentasi Proyek"
									className="max-h-[62vh] w-full object-contain"
								/>
							</div>

							{/* Description & WhatsApp CTA */}
							<div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-white">
								{previewItem.caption || previewItem.description ? (
									<p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
										{previewItem.caption || previewItem.description}
									</p>
								) : null}

								<div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
									<div className="text-xs text-slate-500 font-medium">
										Tertarik dengan hasil pemasangan serupa?
									</div>
									<a
										href={`https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20tertarik%20dengan%20hasil%20pemasangan%20di%20galeri:%20*${encodeURIComponent(previewItem.caption || 'Dokumentasi Galeri')}*.%20Mohon%20info%20estimasi%20biaya.`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-6 py-2.5 text-xs font-bold text-white uppercase tracking-wider active:scale-95 transition-all shadow-md shrink-0"
									>
										<MessageCircle className="h-4 w-4" />
										<span>Konsultasi via WhatsApp</span>
									</a>
								</div>
							</div>
						</div>
					</div>,
					document.body
				)}
			</div>
		</StorefrontLayout>
	);
}

