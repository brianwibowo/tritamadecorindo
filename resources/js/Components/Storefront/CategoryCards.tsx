import ScrollReveal from '@/Components/UI/ScrollReveal';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { Category } from '@/types';

interface CategoryCardsProps {
	categories?: Category[];
}

export default function CategoryCards({ categories = [] }: CategoryCardsProps) {
	// Sisakan 3 kategori: Kaca Film, Branding Visual & Signage, Sandblast
	const sortedCategories = [
		categories.find((c) => c.name.toLowerCase().includes('kaca film')),
		categories.find((c) => c.name.toLowerCase().includes('branding')),
		categories.find((c) => c.name.toLowerCase().includes('sandblast')),
	].filter(Boolean) as Category[];

	const displayCategories = sortedCategories.length === 3 ? sortedCategories : categories.slice(0, 3);

	return (
		<section id="kategori-produk" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 scroll-mt-24">
			<ScrollReveal effect="fade-up">
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
					<div>
						<span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#111FA2]/15 bg-[#111FA2]/5 px-3.5 py-1 text-[11px] sm:text-xs font-extrabold tracking-[0.15em] uppercase text-[#111FA2] mb-3 shadow-xs">
							— Kategori Material & Jasa
						</span>
						<h2 className="text-3xl sm:text-4xl text-foreground font-bold tracking-tight">
							Solusi Interior, Eksterior & Branding
						</h2>
					</div>
					<p className="text-sm text-slate-600 max-w-md">
						Pilihan lengkap material berkualitas untuk kaca film, dekorasi dinding, branding signage, dan penutup jendela dengan pengerjaan rapi & presisi.
					</p>
				</div>
			</ScrollReveal>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{displayCategories.map((cat, idx) => {
					const image = cat.image || '/images/products/kaca-film-riben.webp';

					return (
						<ScrollReveal
							key={cat.id}
							effect="fade-up"
							delay={idx * 80}
						>
							<Link
								href={route('products.index', { category: cat.id })}
								className="group relative overflow-hidden rounded-3xl bg-[#111FA2] aspect-[4/3] sm:aspect-[4/5] flex flex-col justify-between p-6 sm:p-7 border-2 border-slate-200/90 hover:border-[#111FA2] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 block"
							>
								<img
									src={image}
									alt={cat.name}
									className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#111FA2]/95 via-[#111FA2]/40 to-transparent" />

								<div className="relative z-10 flex items-start justify-between">
									<span className="rounded-full bg-[#FFDE42] backdrop-blur-md px-3.5 py-1 text-[11px] font-extrabold tracking-wider uppercase text-[#111FA2] shadow-sm border border-amber-400/40">
										{cat.products_count ? `${cat.products_count} Varian Produk` : 'Katalog Pilihan'}
									</span>
									<span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111FA2] transition-all duration-300 group-hover:bg-[#FFDE42] group-hover:text-[#111FA2] group-hover:rotate-45 shadow-md">
										<ArrowUpRight className="h-4 w-4" />
									</span>
								</div>

								<div className="relative z-10 text-white">
									<h3 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-[#FFDE42] transition-colors">
										{cat.name}
									</h3>
									<p className="mt-1.5 text-xs text-slate-200 line-clamp-2 leading-relaxed font-normal">
										{cat.description}
									</p>
								</div>
							</Link>
						</ScrollReveal>
					);
				})}
			</div>

			{/* Tombol Lihat Lainnya ke /products */}
			<div className="mt-10 sm:mt-12 flex justify-center">
				<Link
					href={route('products.index')}
					className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#111FA2] bg-white hover:bg-[#111FA2] px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111FA2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 group"
				>
					<span>Lihat Lainnya</span>
					<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</div>
		</section>
	);
}
