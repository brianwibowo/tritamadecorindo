import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { Category } from '@/types';

interface CategoryCardsProps {
	categories?: Category[];
}

const fallbackCategories = [
	{
		id: 'cat-rempah-kering',
		name: 'Rempah Kering & Biji',
		description: 'Cengkeh Maluku Grade AB6, Biji Pala Banda ABCD, Kayu Manis Kerinci, dan Lada Hitam.',
		image: '/scraped-0.jpg',
		tag: 'Komoditas Utama',
	},
	{
		id: 'cat-rimpang',
		name: 'Rimpang & Simplisia',
		description: 'Jahe Gajah, Kunyit Simplisia, Temulawak, dan Kapulaga Jawa higienis bebas zat kimia.',
		image: '/scraped-2.jpg',
		tag: 'Herbal & Industri',
	},
	{
		id: 'cat-rempah-premium',
		name: 'Rempah Premium & Vanilla',
		description: 'Vanilla Beans Planifolia Gourmet, Fuli Pala Merah Super, dan Minyak Atsiri murni.',
		image: '/scraped-3.jpg',
		tag: 'Grade Ekspor Super',
	},
];

export default function CategoryCards({ categories = [] }: CategoryCardsProps) {
	const items = categories.length > 0 ? categories : fallbackCategories;

	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28">
			<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
				<div>
					<p className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-3">— Lini Komoditas</p>
					<h2 className="yns-display text-4xl sm:text-5xl text-foreground leading-[1.02] font-bold">
						Kategori Rempah Ekspor
					</h2>
				</div>
				<p className="text-sm text-muted-foreground max-w-md">
					Koleksi komoditas rempah terpilih dengan spesifikasi standar internasional untuk kebutuhan industri makanan, farmasi, bumbu, dan kosmetik global.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{items.map((cat, idx) => {
					const tag = (cat as { tag?: string }).tag || (idx === 0 ? 'Komoditas Utama' : idx === 1 ? 'Herbal & Industri' : 'Grade Ekspor Super');
					const image = cat.image || (idx === 0 ? '/scraped-0.jpg' : idx === 1 ? '/scraped-2.jpg' : '/scraped-3.jpg');

					return (
						<Link
							key={cat.id}
							href={route('products.index', { category: cat.id })}
							className="group relative overflow-hidden rounded-3xl bg-secondary aspect-[4/5] flex flex-col justify-between p-6 sm:p-8"
						>
							<img
								src={image}
								alt={cat.name}
								className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#1a0203]/90 via-[#1a0203]/40 to-transparent" />

							<div className="relative z-10 flex items-start justify-between">
								<span className="rounded-full bg-background/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-foreground">
									{tag}
								</span>
								<span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-300 group-hover:bg-[#80070A] group-hover:text-white group-hover:rotate-45 shadow-sm">
									<ArrowUpRight className="h-4 w-4" />
								</span>
							</div>

							<div className="relative z-10 text-white">
								<h3 className="yns-display text-2xl font-bold leading-snug group-hover:text-[#F8C300] transition-colors">
									{cat.name}
								</h3>
								<p className="mt-2 text-xs text-white/80 line-clamp-2 leading-relaxed">
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
