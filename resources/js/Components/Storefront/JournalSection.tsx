import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

const stories = [
	{
		title: 'Standar Mutu Cengkeh Lalpari Indonesia di Pasar Eropa & Amerika',
		excerpt: 'Memahami parameter kadar air < 12%, keutuhan butir, dan kadar eugenol yang diwajibkan oleh buyer industri global.',
		image: '/scraped-0.jpg',
		category: 'Export Insights',
		minutes: '5 min read',
	},
	{
		title: 'Karakteristik Pala Banda: Mengapa Menjadi Incaran Buyer Global?',
		excerpt: 'Sejarah dan keunggulan aroma pala asli Kepulauan Banda yang memiliki kandungan minyak esensial tertinggi di dunia.',
		image: '/scraped-1.jpg',
		category: 'Komoditas Unggulan',
		minutes: '7 min read',
	},
	{
		title: 'Proses Sortasi & Kontrol Kadar Air Menjamin Kualitas Ekspor Bebas Jamur',
		excerpt: 'Langkah preventif laboratorium LFM Global Jayatama dalam memastikan kargo rempah tahan perjalanan laut berminggu-minggu.',
		image: '/scraped-5.jpg',
		category: 'Quality Control',
		minutes: '4 min read',
	},
];

export default function JournalSection() {
	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28">
			<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
				<div>
					<p className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-3 font-semibold">— Edukasi & Artikel Rempah</p>
					<h2 className="yns-display text-4xl sm:text-5xl text-foreground leading-[1.02] font-bold">
						Wawasan Industri Rempah
					</h2>
				</div>
				<Link
					href={route('products.index')}
					className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[#80070A] transition-colors"
				>
					Semua Artikel & Spesifikasi
					<ArrowUpRight className="h-4 w-4" />
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{stories.map((s) => (
					<div key={s.title} className="group cursor-pointer">
						<div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-secondary shadow-sm">
							<img
								src={s.image}
								alt={s.title}
								className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute top-4 left-4">
								<span className="rounded-full bg-background/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-foreground shadow-sm">
									{s.category}
								</span>
							</div>
						</div>
						<div className="mt-5">
							<p className="text-xs tracking-wider uppercase text-muted-foreground font-medium">{s.minutes}</p>
							<h3 className="yns-display text-xl font-bold text-foreground mt-2 leading-snug group-hover:text-[#80070A] transition-colors">
								{s.title}
							</h3>
							<p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.excerpt}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
