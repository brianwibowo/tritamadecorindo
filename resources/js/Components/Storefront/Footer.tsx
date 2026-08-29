import { Layers, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Footer() {
	return (
		<footer className="sticky bottom-0 z-0 bg-[#111FA2] text-white min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden border-t border-[#5478FF]/20">
			<div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-8 sm:pb-10 flex-1 flex flex-col justify-between">
				{/* Big display word watermark */}
				<p className="font-display text-white leading-[0.85] tracking-[-0.03em] text-[13vw] sm:text-[10vw] lg:text-[7.5vw] font-extrabold select-none opacity-15 hover:opacity-25 transition-opacity">
					<span className="bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent">
						TRITAMA DECORINDO
					</span>
				</p>

				{/* 5-Column Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 my-auto py-6 sm:py-8">
					{/* Col 1 & 2: Profil Singkat & Kontak */}
					<div className="lg:col-span-2 sm:max-w-sm">
						<Link href="/" className="flex items-center gap-2.5">
							<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5478FF] text-white shadow-md">
								<Layers className="h-5 w-5" />
							</div>
							<span className="font-display text-xl text-white font-bold">
								Tritama Decorindo Stiker
							</span>
						</Link>
						<p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
							Perusahaan penjualan material dan jasa pemasangan Kaca Film, Sandblast Cutting, Wallpaper, Roller Blinds, Vertical Blinds, Huruf Timbul, dan Gorden sejak 2009.
						</p>
						
						<div className="mt-4 space-y-2 text-xs text-slate-200">
							<p className="flex items-start gap-2">
								<MapPin className="h-4 w-4 text-[#FFDE42] shrink-0 mt-0.5" />
								<span>Grand Anandara Residence, Jl. Pertamina Blok E10 No.8, Kedungjaya, Kec. Babelan, Kab. Bekasi, Jawa Barat 17610</span>
							</p>
							<p className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-[#53CBF3] shrink-0" />
								<a href="mailto:tritamadecorindostiker@gmail.com" className="hover:text-white underline">
									tritamadecorindostiker@gmail.com
								</a>
							</p>
						</div>

						<div className="mt-4 flex flex-wrap items-center gap-2.5">
							<a
								href="https://wa.me/6281990909646"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 text-white hover:bg-[#5478FF] transition-all px-3.5 text-xs font-semibold ring-1 ring-white/20"
							>
								<Phone className="h-3.5 w-3.5 text-[#53CBF3]" />
								0819-9090-9646
							</a>
							<a
								href="https://wa.me/6281380881656"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 text-white hover:bg-[#5478FF] transition-all px-3.5 text-xs font-semibold ring-1 ring-white/20"
							>
								<Phone className="h-3.5 w-3.5 text-[#53CBF3]" />
								0813-8088-1656
							</a>
						</div>
					</div>

					{/* Col 3: Kategori Produk */}
					<div>
						<h3 className="text-xs tracking-[0.2em] uppercase text-[#FFDE42] font-bold">
							Kategori Produk
						</h3>
						<ul className="mt-3.5 space-y-2 text-xs text-slate-200">
							<li>
								<Link href={route('products.index', { category: 'cat-kaca-film' })} className="hover:text-white transition-colors">
									Kaca Film Riben, Sparta, One Way
								</Link>
							</li>
							<li>
								<Link href={route('products.index', { category: 'cat-sandblast-cutting' })} className="hover:text-white transition-colors">
									Sandblast Polos & Cutting Logo
								</Link>
							</li>
							<li>
								<Link href={route('products.index', { category: 'cat-wallpaper' })} className="hover:text-white transition-colors">
									Wallpaper Pabrikan & Custom 3D
								</Link>
							</li>
							<li>
								<Link href={route('products.index', { category: 'cat-branding-signage' })} className="hover:text-white transition-colors">
									Huruf Timbul Akrilik LED & Stiker
								</Link>
							</li>
							<li>
								<Link href={route('products.index', { category: 'cat-window-blinds' })} className="hover:text-white transition-colors">
									Roller Blinds & Vertical Blinds
								</Link>
							</li>
							<li>
								<Link href={route('products.index', { category: 'cat-gorden' })} className="hover:text-white transition-colors">
									Gorden Blackout & Standar
								</Link>
							</li>
						</ul>
					</div>

					{/* Col 4: Area Jangkauan Layanan */}
					<div>
						<h3 className="text-xs tracking-[0.2em] uppercase text-[#53CBF3] font-bold">
							Area Layanan
						</h3>
						<ul className="mt-3.5 space-y-1.5 text-xs text-slate-200">
							<li>Jakarta Pusat, Barat, Selatan</li>
							<li>Jakarta Timur & Jakarta Utara</li>
							<li>Kota Bekasi & Cikarang</li>
							<li>Depok & Cibubur</li>
							<li>Tangerang & Tangsel (BSD)</li>
							<li>Bogor & Sekitarnya</li>
						</ul>
					</div>

					{/* Col 5: Layanan Konsultasi */}
					<div>
						<h3 className="text-xs tracking-[0.2em] uppercase text-[#FFDE42] font-bold">
							Layanan Konsultasi
						</h3>
						<p className="mt-3.5 text-xs text-slate-200 leading-relaxed font-normal">
							Bebas konsultasi desain, pemilihan material, dan estimasi biaya tanpa dipungut biaya.
						</p>
						<div className="mt-4">
							<a
								href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20ingin%20konsultasi%20pemasangan."
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex w-full items-center justify-center rounded-full bg-[#5478FF] hover:bg-[#4064EB] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
							>
								WhatsApp: 0819-9090-9646
							</a>
						</div>
					</div>
				</div>

				{/* Bottom line */}
				<div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
					<p>© {new Date().getFullYear()} Tritama Decorindo Stiker. All rights reserved.</p>
					<p className="flex items-center gap-4 text-[11px]">
						<span>Spesialis Kaca Film & Dekorasi Interior</span>
						<span>•</span>
						<span>Jabodetabek</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
