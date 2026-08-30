import ScrollReveal from '@/Components/UI/ScrollReveal';
import { ArrowUpRight, Eye, MapPin, Phone, X } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface GalleryItem {
	id: number;
	title: string;
	category: string;
	category_label?: string;
	image: string;
	caption?: string;
	description?: string;
}

interface HomeGallerySectionProps {
	galleries?: GalleryItem[];
}

const coverageAreas = [
	'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Utara',
	'Kota Bekasi', 'Kab. Bekasi (Babelan, Cikarang)', 'Depok & Cibubur',
	'Kota Tangerang', 'Tangerang Selatan (BSD)', 'Bogor & Sekitarnya'
];

export default function HomeGallerySection({ galleries = [] }: HomeGallerySectionProps) {
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

	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
			{/* 1. Area Jangkauan Layanan & Survey Jabodetabek Bar */}
			<ScrollReveal effect="fade-up">
				<div className="rounded-3xl bg-gradient-to-br from-[#111FA2] via-[#0D1780] to-[#080E4E] text-white p-6 sm:p-8 mb-16 shadow-xl border border-[#5478FF]/20">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 rounded-2xl bg-[#5478FF] flex items-center justify-center text-white shrink-0 shadow-md">
								<MapPin className="h-5 w-5" />
							</div>
							<div>
								<h3 className="text-lg font-bold text-white">Area Jangkauan Layanan & Survey</h3>
								<p className="text-xs text-slate-200">Siap melayani survey lokasi dan pemasangan presisi tepat waktu di seluruh wilayah:</p>
							</div>
						</div>
						<a
							href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20ingin%20jadwalkan%20survey%20lokasi%20di%20area%20saya."
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center rounded-full bg-[#FFDE42] hover:bg-[#F2D02B] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#111FA2] active:scale-95 transition-all shrink-0 shadow-md"
						>
							Jadwalkan Survey Lokasi
						</a>
					</div>
					<div className="flex flex-wrap gap-2 pt-4">
						{coverageAreas.map((area) => (
							<span
								key={area}
								className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 border border-white/10 hover:text-[#FFDE42] transition-colors font-medium"
							>
								✓ {area}
							</span>
						))}
					</div>
				</div>
			</ScrollReveal>

			{/* 2. Header: Galeri Hasil Pengerjaan */}
			<ScrollReveal effect="fade-up">
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
					<div>
						<p className="text-xs font-bold tracking-[0.2em] uppercase text-[#5478FF] mb-2">— Portofolio & Dokumentasi Nyata</p>
						<h2 className="text-3xl sm:text-4xl text-foreground font-bold tracking-tight">
							Galeri Hasil Pengerjaan
						</h2>
					</div>
					<Link
						href={route('gallery.index')}
						className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5478FF] hover:text-[#4064EB] hover:underline"
					>
						<span>Lihat Semua Galeri Proyek</span>
						<ArrowUpRight className="h-4 w-4" />
					</Link>
				</div>
			</ScrollReveal>

			{/* 3. Gallery Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{galleries.map((item, idx) => (
					<ScrollReveal key={item.id} effect="fade-up" delay={idx * 80}>
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

			{/* Lightbox / Preview Modal */}
			{previewItem && mounted && createPortal(
				<div
					style={{ zIndex: 999999 }}
					className="fixed inset-0 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200"
					onClick={(e) => {
						if (e.target === e.currentTarget) setPreviewItem(null);
					}}
				>
					<div className="relative max-w-lg md:max-w-xl w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col my-auto">
						{/* Close Button */}
						<button
							type="button"
							style={{ zIndex: 1000000 }}
							onClick={() => setPreviewItem(null)}
							className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/70 hover:bg-red-600 text-white border border-white/30 flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer"
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
									Ingin memasang seperti proyek ini?
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
				</div>,
				document.body
			)}
		</section>
	);
}
