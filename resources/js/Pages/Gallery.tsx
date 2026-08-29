import StorefrontLayout from '@/Layouts/StorefrontLayout';
import { cn } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, X } from 'lucide-react';
import { useState } from 'react';
import type { PaginatedData } from '@/types';

interface GalleryItem {
	id: number;
	title: string;
	category: string;
	category_label: string;
	image: string;
	description: string;
}

interface GalleryProps {
	galleryItems: PaginatedData<GalleryItem>;
	currentCategory?: string;
}

export default function Gallery({ galleryItems, currentCategory = 'all' }: GalleryProps) {
	const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

	const categories = [
		{ key: 'all', label: 'Semua Dokumentasi' },
		{ key: 'perkebunan', label: 'Sentra Perkebunan' },
		{ key: 'fasilitas', label: 'Fasilitas & QC' },
		{ key: 'laboratorium', label: 'Uji Laboratorium' },
		{ key: 'ekspor', label: 'Logistik & Ekspor' },
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
				<title>Galeri Dokumentasi & Fasilitas Ekspor — PT LFM Global Jayatama</title>
				<meta
					name="description"
					content="Dokumentasi visual perkebunan rempah Nusantara, fasilitas sortasi modern, uji laboratorium berkala, dan pengapalan kontainer ekspor PT LFM Global Jayatama."
				/>
				<meta
					name="keywords"
					content="galeri fasilitas rempah, pabrik cengkeh, pengolahan biji pala, perkebunan kayu manis, pengujian laboratorium rempah, ekspor rempah indonesia, pt lfm global jayatama"
				/>
				<meta property="og:title" content="Galeri Dokumentasi & Fasilitas Ekspor — PT LFM Global Jayatama" />
				<meta
					property="og:description"
					content="Dokumentasi visual perkebunan rempah Nusantara, fasilitas sortasi modern, dan pengapalan ekspor PT LFM Global Jayatama."
				/>
				<meta property="og:image" content="/images/products/cengkeh-maluku.webp" />
				<meta name="twitter:title" content="Galeri Fasilitas Ekspor — PT LFM Global Jayatama" />
				<meta
					name="twitter:description"
					content="Dokumentasi visual perkebunan rempah Nusantara dan fasilitas ekspor PT LFM Global Jayatama."
				/>
				<meta name="twitter:image" content="/images/products/cengkeh-maluku.webp" />
			</Head>

			<div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
				{/* Page Header */}
				<div className="border-b border-border/60 pb-8">
					<span className="text-xs font-bold uppercase tracking-widest text-[#80070A]">
						Dokumentasi Visual
					</span>
					<h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground mt-1">
						Galeri Perkebunan & Fasilitas Ekspor
					</h1>
					<p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
						Dokumentasi visual proses pemanenan di sentra perkebunan rempah nusantara, fasilitas sortasi mekanik, pengujian mutu laboratorium, hingga pengemasan kontainer ekspor PT LFM Global Jayatama.
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
									? 'bg-[#80070A] text-white shadow-md'
									: 'bg-secondary/50 text-foreground hover:bg-secondary border border-border/60'
							)}
						>
							{cat.label}
						</button>
					))}
				</div>

				{/* Clean Minimalist Photo Grid: Badge di atas gambar -> Judul h4 reguler di bawah */}
				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
					{galleryItems.data.map((item) => (
						<div
							key={item.id}
							onClick={() => setPreviewItem(item)}
							className="group cursor-pointer flex flex-col"
						>
							{/* Image Container with Floating Category Badge */}
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary shadow-sm">
								{/* 1. Category Badge floating on top of the image */}
								<div className="absolute top-3.5 left-3.5 z-10">
									<span className="rounded-full bg-[#80070A]/90 text-white backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-md ring-1 ring-white/20">
										{item.category_label}
									</span>
								</div>

								{/* Photo */}
								<img
									src={item.image}
									alt={item.title}
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>

								{/* Hover Zoom Overlay */}
								<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
									<span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#1a0203] shadow-lg">
										<Eye className="h-3.5 w-3.5" />
										Perbesar Foto
									</span>
								</div>
							</div>

							{/* Title h4 non-bold (regular/medium) */}
							<div className="mt-3.5">
								<h4 className="font-display text-sm sm:text-base font-medium text-foreground group-hover:text-[#80070A] transition-colors leading-snug">
									{item.title}
								</h4>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				{galleryItems.last_page > 1 && (
					<div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6">
						<p className="text-xs text-muted-foreground">
							Menampilkan {galleryItems.from}–{galleryItems.to} dari {galleryItems.total} dokumentasi foto
						</p>
						<div className="flex gap-1.5">
							{galleryItems.links.map((link, idx) => (
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

				{/* Lightbox Modal */}
				{previewItem && (
					<div
						onClick={() => setPreviewItem(null)}
						className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in"
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className="relative max-w-3xl w-full overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-up"
						>
							<button
								onClick={() => setPreviewItem(null)}
								className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
							>
								<X className="h-5 w-5" />
							</button>

							<div className="aspect-[16/10] w-full bg-black">
								<img
									src={previewItem.image}
									alt={previewItem.title}
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="p-6 sm:p-8 space-y-2">
								<span className="rounded-full bg-[#80070A] px-3.5 py-1 text-xs font-bold text-white inline-block">
									{previewItem.category_label}
								</span>
								<h3 className="font-display text-2xl font-bold text-foreground">
									{previewItem.title}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{previewItem.description}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</StorefrontLayout>
	);
}
