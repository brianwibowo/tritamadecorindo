import { Layers, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Footer() {
	return (
		<footer className="relative bg-[#0B0F17] text-white mt-24 overflow-hidden border-t border-slate-800">
			<div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-10">
				{/* Big display word */}
				<p className="font-display text-white leading-[0.85] tracking-[-0.03em] text-[13vw] sm:text-[10vw] lg:text-[8vw] font-extrabold select-none opacity-20 hover:opacity-30 transition-opacity">
					<span className="bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent">
						TRITAMA DECORINDO
					</span>
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mt-12">
					{/* Col 1 & 2: Profil Singkat & Kontak */}
					<div className="lg:col-span-2 sm:max-w-sm">
						<Link href="/" className="flex items-center gap-2.5">
							<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0284C7] text-white">
								<Layers className="h-5 w-5" />
							</div>
							<span className="font-display text-xl text-white font-bold">
								Tritama Decorindo Stiker
							</span>
						</Link>
						<p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
							Perusahaan penjualan material dan jasa pemasangan Kaca Film, Sandblast Cutting, Wallpaper, Roller Blinds, Vertical Blinds, Huruf Timbul, dan Gorden sejak 2009.
						</p>
						
						<div className="mt-5 space-y-2 text-xs text-slate-300">
							<p className="flex items-start gap-2">
								<MapPin className="h-4 w-4 text-[#38BDF8] shrink-0 mt-0.5" />
								<span>Grand Anandara Residence, Jl. Pertamina Blok E10 No.8, Kedungjaya, Kec. Babelan, Kab. Bekasi, Jawa Barat 17610</span>
							</p>
							<p className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-[#38BDF8] shrink-0" />
								<a href="mailto:tritamadecorindostiker@gmail.com" className="hover:text-white underline">
									tritamadecorindostiker@gmail.com
								</a>
							</p>
						</div>

						<div className="mt-5 flex flex-wrap items-center gap-2.5">
							<a
								href="https://wa.me/6281990909646"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 text-white hover:bg-[#0284C7] transition-all px-3.5 text-xs font-semibold ring-1 ring-white/20"
							>
								<Phone className="h-3.5 w-3.5 text-[#38BDF8]" />
								0819-9090-9646
							</a>
							<a
								href="https://wa.me/6281380881656"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/10 text-white hover:bg-[#0284C7] transition-all px-3.5 text-xs font-semibold ring-1 ring-white/20"
							>
								<Phone className="h-3.5 w-3.5 text-[#38BDF8]" />
								0813-8088-1656
							</a>
						</div>
					</div>

					{/* Col 3: Produk Unggulan */}
					<div>
						<h3 className="text-xs tracking-[0.2em] uppercase text-[#38BDF8] font-bold">
							Kategori Produk
						</h3>
						<ul className="mt-4 space-y-2.5 text-xs text-slate-300">
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

					{/* Col 4: Navigasi Cepat */}
					<div>
						<h3 className="text-xs tracking-[0.2em] uppercase text-[#38BDF8] font-bold">
							Menu Navigasi
						</h3>
						<ul className="mt-4 space-y-2.5 text-xs text-slate-300">
							<li>
								<Link href="/" className="hover:text-white transition-colors">
									Beranda
								</Link>
							</li>
							<li>
								<Link href={route('products.index')} className="hover:text-white transition-colors">
									Katalog Produk & Harga
								</Link>
							</li>
							<li>
								<Link href={route('gallery.index')} className="hover:text-white transition-colors">
									Galeri Proyek Pemasangan
								</Link>
							</li>
							<li>
								<a
									href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20ingin%20konsultasi%20dan%20tanya%20estimasi%20biaya%20pemasangan."
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white transition-colors"
								>
									Konsultasi & Estimasi Gratis
								</a>
							</li>
							<li>
								<a href="#story" className="hover:text-white transition-colors">
									Tentang Perusahaan
								</a>
							</li>
						</ul>
					</div>

					{/* Col 5: Media Sosial & Area Layanan */}
					<div>
						<h3 className="text-xs tracking-[0.2em] uppercase text-[#38BDF8] font-bold">
							Media Sosial & Wilayah
						</h3>
						<p className="mt-4 text-xs text-slate-300 leading-relaxed">
							📍 <strong>Wilayah Layanan:</strong> Jakarta, Bogor, Depok, Tangerang, Bekasi, Cibubur, dan sekitarnya.
						</p>
						<div className="mt-4 flex flex-col gap-2 text-xs text-slate-300">
							<a
								href="https://instagram.com/tritamadecorindostiker_"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 hover:text-[#38BDF8] transition-colors"
							>
								<svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
								</svg>
								<span>@tritamadecorindostiker_</span>
							</a>
							<span className="inline-flex items-center gap-2 text-slate-300">
								<span>Fb: Tritama Decorindo Stiker</span>
							</span>
						</div>
					</div>
				</div>

				<div className="mt-14 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
					<p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} Tritama Decorindo Stiker. All rights reserved.</p>
					<p className="text-xs text-[#38BDF8] tracking-[0.14em] uppercase font-semibold">
						Dekorasi • Branding Visual • Interior & Eksterior
					</p>
				</div>
			</div>
		</footer>
	);
}
