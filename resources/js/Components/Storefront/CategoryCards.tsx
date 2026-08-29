import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { Category } from '@/types';

interface CategoryCardsProps {
	categories?: Category[];
}

export default function CategoryCards({ categories = [] }: CategoryCardsProps) {
	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
			<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
				<div>
					<p className="text-xs font-bold tracking-[0.2em] uppercase text-[#0284C7] mb-2">— Kategori Material & Jasa</p>
					<h2 className="text-3xl sm:text-4xl text-foreground font-bold tracking-tight">
						Solusi Interior, Eksterior & Branding
					</h2>
				</div>
				<p className="text-sm text-muted-foreground max-w-md">
					Pilihan lengkap material berkualitas untuk kaca film, dekorasi dinding, branding signage, dan penutup jendela dengan pengerjaan rapi & presisi.
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories.map((cat) => {
					const image = cat.image || '/images/products/kaca-film-riben.webp';

					return (
						<Link
							key={cat.id}
							href={route('products.index', { category: cat.id })}
							className="group relative overflow-hidden rounded-3xl bg-slate-900 aspect-[4/3] sm:aspect-[4/5] flex flex-col justify-between p-6 sm:p-7 border border-slate-200/80 shadow-md hover:shadow-xl transition-all"
						>
							<img
								src={image}
								alt={cat.name}
								className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/95 via-[#0B0F17]/40 to-transparent" />

							<div className="relative z-10 flex items-start justify-between">
								<span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-[#0F172A] shadow-sm">
									{cat.products_count ? `${cat.products_count} Varian Produk` : 'Katalog Pilihan'}
								</span>
								<span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0F172A] transition-all duration-300 group-hover:bg-[#0284C7] group-hover:text-white group-hover:rotate-45 shadow-md">
									<ArrowUpRight className="h-4 w-4" />
								</span>
							</div>

							<div className="relative z-10 text-white">
								<h3 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-[#38BDF8] transition-colors">
									{cat.name}
								</h3>
								<p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
									{cat.description}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
