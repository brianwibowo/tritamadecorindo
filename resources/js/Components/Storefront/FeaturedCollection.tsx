import { ArrowUpRight, CheckCircle2, Shield, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { Product } from '@/types';

interface FeaturedCollectionProps {
	products?: (Product & { lowest_price_formatted?: string })[];
}

export default function FeaturedCollection({ products }: FeaturedCollectionProps) {
	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* Left Large Showcase Card */}
				<div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-secondary aspect-[5/4] lg:aspect-auto">
					<img
						src="/scraped-5.jpg"
						alt="Sentra Sortasi Rempah LFM Global"
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-tr from-[#1a0203]/90 via-[#1a0203]/40 to-transparent" />
					<div className="absolute top-5 left-5 flex items-center gap-2">
						<span className="rounded-full bg-background px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-foreground">
							Export Quality
						</span>
						<span className="rounded-full bg-yns-sun px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-foreground">
							Grade A+
						</span>
					</div>
					<div className="absolute bottom-8 left-6 right-6 sm:right-auto sm:max-w-md text-white">
						<p className="text-[11px] tracking-[0.22em] uppercase text-[#F8C300] font-semibold mb-2">
							Komoditas Unggulan 2026
						</p>
						<h3 className="yns-display text-3xl sm:text-4xl leading-[1.08] font-bold">
							Cengkeh Lalpari & Biji Pala Banda.
						</h3>
						<p className="mt-3 text-sm text-white/85 leading-relaxed font-sans">
							Dipanen pada tingkat kematangan optimal dan dikeringkan higienis dengan kadar air terstandar laboratorium ekspor (&lt; 12%). Siap kirim kontainer FCL / LCL.
						</p>
						<Link
							href={route('products.index')}
							className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-[#1a0203] px-6 py-3 text-sm font-bold hover:bg-white/90 transition-colors shadow-md"
						>
							Lihat Semua Komoditas
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					</div>
				</div>

				{/* Right Column: 2 Feature Cards */}
				<div className="lg:col-span-5 flex flex-col gap-6">
					{/* Top Certification Card */}
					<div className="relative overflow-hidden rounded-3xl bg-yns-sun p-7 flex flex-col justify-between min-h-[260px]">
						<div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-foreground/10" />
						<div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-foreground/5" />
						<div className="relative flex items-start justify-between">
							<span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-foreground">
								<Shield className="h-3.5 w-3.5" />
								Certified Spices
							</span>
							<span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
								<ArrowUpRight className="h-4 w-4" />
							</span>
						</div>
						<div className="relative">
							<h3 className="yns-display text-3xl font-bold leading-[1.05] text-foreground">
								Standar Mutu & Uji Lab Bersertifikasi.
							</h3>
							<p className="mt-2 text-sm text-foreground/80 leading-relaxed">
								Setiap lot pengiriman melewati uji fitosanitari, kadar abu, benda asing &lt; 0.5%, dan sertifikat bebas pestisida sesuai regulasi negara importir.
							</p>
						</div>
					</div>

					{/* Bottom Review Card */}
					<div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-7 flex flex-col gap-4 min-h-[200px]">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-1.5 text-yns-sun">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star key={i} className="h-4 w-4 fill-current" />
								))}
							</div>
							<span className="text-[11px] tracking-wider uppercase text-background/60 font-semibold">
								B2B Export Partner
							</span>
						</div>
						<blockquote className="yns-display text-lg sm:text-xl leading-snug text-background italic">
							&ldquo;Pasokan cengkeh dan pala dari LFM Global Jayatama selalu konsisten dalam aroma, keutuhan butir, dan kadar air sesuai spesifikasi kontrak ekspor kami di Eropa.&rdquo;
						</blockquote>
						<div className="flex items-center gap-3 pt-2 border-t border-background/15">
							<div className="h-9 w-9 rounded-full bg-yns-rose flex items-center justify-center text-foreground text-xs font-bold">
								EU
							</div>
							<div>
								<p className="text-xs font-bold text-background">Global Spices Trading BV</p>
								<p className="text-[10px] text-background/60">Rotterdam, Netherlands · Kontrak Rutin FCL</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
