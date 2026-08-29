import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { Product } from '@/types';

interface FeaturedCollectionProps {
	products?: (Product & { lowest_price_formatted?: string })[];
}

export default function FeaturedCollection({ products }: FeaturedCollectionProps) {
	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* Left Large Showcase Card */}
				<div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-slate-900 aspect-[5/4] lg:aspect-auto min-h-[420px] shadow-lg border border-slate-200">
					<img
						src="/images/products/kaca-film-sparta.webp"
						alt="Pemasangan Kaca Film Sparta Gedung"
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-tr from-[#0B0F17]/95 via-[#0B0F17]/50 to-transparent" />
					<div className="absolute top-5 left-5 flex items-center gap-2">
						<span className="rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-[#0F172A] shadow-sm">
							Best Seller
						</span>
						<span className="rounded-full bg-[#0284C7] px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-white shadow-sm">
							Tolak Panas 99% UV
						</span>
					</div>
					<div className="absolute bottom-8 left-6 right-6 sm:right-auto sm:max-w-md text-white">
						<p className="text-[11px] tracking-[0.2em] uppercase text-[#38BDF8] font-bold mb-1.5">
							Kaca Film Gedung & Mobil
						</p>
						<h3 className="text-2xl sm:text-3xl leading-[1.1] font-bold">
							Riben & Sparta Tolak Panas Matahari
						</h3>
						<p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
							Reduksi suhu ruangan hingga 70%, hemat listrik AC, dan lindungi interior dari bahaya sinar UV. Tersedia pilihan tingkat kegelapan 40%, 60%, hingga 80%.
						</p>
						<Link
							href={route('products.index')}
							className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0284C7] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#0369a1] transition-all shadow-md active:scale-95"
						>
							Lihat Daftar Harga
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					</div>
				</div>

				{/* Right Column: 2 Feature Cards */}
				<div className="lg:col-span-5 flex flex-col gap-6">
					{/* Top Feature Card */}
					<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-7 flex flex-col justify-between min-h-[220px] shadow-lg border border-slate-800">
						<div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-cyan-500/10" />
						<div className="relative flex items-start justify-between">
							<span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-[#38BDF8] ring-1 ring-white/10">
								<ShieldCheck className="h-3.5 w-3.5" />
								Garansi Kualitas
							</span>
							<span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0284C7] text-white shadow-md">
								<Sparkles className="h-4 w-4" />
							</span>
						</div>
						<div className="relative mt-4">
							<h3 className="text-2xl font-bold leading-tight text-white">
								Teknisi Berpengalaman & Survey Gratis
							</h3>
							<p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
								Melayani konsultasi desain, pemilihan material sampel, estimasi biaya akurat, hingga pemasangan presisi tanpa gelembung di seluruh Jabodetabek.
							</p>
						</div>
					</div>

					{/* Bottom Review Card */}
					<div className="relative overflow-hidden rounded-3xl bg-white text-[#0F172A] p-7 flex flex-col gap-3.5 min-h-[190px] shadow-md border border-slate-200">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-1 text-amber-500">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star key={i} className="h-4 w-4 fill-current" />
								))}
							</div>
							<span className="text-[11px] tracking-wider uppercase text-slate-500 font-bold">
								Kepuasan Pelanggan
							</span>
						</div>
						<blockquote className="text-sm sm:text-base leading-snug text-slate-700 italic font-medium">
							&ldquo;Pemasangan sandblast cutting logo dan kaca film gedung kantor kami sangat rapi, cepat, dan presisi. Teknisi komunikatif dan hasil pengerjaan memuaskan.&rdquo;
						</blockquote>
						<div className="flex items-center gap-3 pt-2 border-t border-slate-100">
							<div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0284C7] text-xs font-bold">
								JKT
							</div>
							<div>
								<p className="text-xs font-bold text-slate-900">Perkantoran & Residensial</p>
								<p className="text-[10px] text-slate-500">Jakarta & Bekasi • Proyek Partisi Kaca & Kaca Film</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
