import { Globe, Mail, Phone, Sprout } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Footer() {
	return (
		<footer className="relative bg-[#1a0203] text-white mt-24 overflow-hidden border-t border-white/10">
			<div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 pb-10">
				{/* Big display word */}
				<p className="yns-display text-white leading-[0.85] tracking-[-0.04em] text-[18vw] sm:text-[14vw] lg:text-[12vw] font-bold">
					<span className="bg-gradient-to-b from-white to-white/35 bg-clip-text text-transparent">
						LFM Global
					</span>
				</p>

				<div className="grid grid-cols-2 md:grid-cols-5 gap-10 mt-16">
					<div className="col-span-2 md:col-span-2 sm:max-w-sm">
						<Link href="/" className="flex items-center gap-2.5">
							<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#80070A] text-[#F8C300]">
								<Sprout className="h-5 w-5" />
							</div>
							<span className="yns-display text-2xl text-white font-bold">
								Tritama Decorindo
							</span>
						</Link>
						<p className="mt-4 text-sm text-white/80 leading-relaxed font-normal">
							PT Tritama Decorindo adalah eksportir dan pemasok rempah-rempah terkemuka di Indonesia. Menghadirkan komoditas rempah asli berstandar internasional ke lebih dari 25 negara di dunia.
						</p>
						<div className="mt-6 flex flex-wrap items-center gap-3">
							<a
								href="mailto:export@lfmjayatama.com"
								className="inline-flex h-10 items-center gap-2 rounded-full ring-1 ring-white/30 text-white hover:bg-white/10 transition-colors px-4 text-xs font-semibold"
							>
								<Mail className="h-3.5 w-3.5 text-[#F8C300]" />
								export@lfmjayatama.com
							</a>
							<a
								href="tel:+6281234567890"
								className="inline-flex h-10 items-center gap-2 rounded-full ring-1 ring-white/30 text-white hover:bg-white/10 transition-colors px-4 text-xs font-semibold"
							>
								<Phone className="h-3.5 w-3.5 text-[#F8C300]" />
								+62 812-3456-7890
							</a>
						</div>
					</div>

					<div>
						<h3 className="text-xs tracking-[0.22em] uppercase text-[#F8C300] font-bold">Interior Komoditas Rempah Wall Panel</h3>
						<ul className="mt-5 space-y-3">
							<li>
								<Link
									href={route('products.index', { category: 'cat-rempah-kering' })}
									className="text-sm text-white/80 hover:text-white transition-colors"
								>
									Cengkeh Maluku & Pala Banda
								</Link>
							</li>
							<li>
								<Link
									href={route('products.index', { category: 'cat-rempah-kering' })}
									className="text-sm text-white/80 hover:text-white transition-colors"
								>
									Kayu Manis & Lada Hitam
								</Link>
							</li>
							<li>
								<Link
									href={route('products.index', { category: 'cat-rimpang' })}
									className="text-sm text-white/80 hover:text-white transition-colors"
								>
									Jahe Gajah & Kapulaga
								</Link>
							</li>
							<li>
								<Link
									href={route('products.index', { category: 'cat-rempah-premium' })}
									className="text-sm text-white/80 hover:text-white transition-colors"
								>
									Vanilla Beans Gourmet
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-xs tracking-[0.22em] uppercase text-[#F8C300] font-bold">
							Navigasi Perusahaan
						</h3>
						<ul className="mt-5 space-y-3">
							<li>
								<Link
									href="/"
									className="text-sm text-white/80 hover:text-white transition-colors"
								>
									Beranda
								</Link>
							</li>
							<li>
								<Link
									href={route('products.index')}
									className="text-sm text-white/80 hover:text-white transition-colors"
								>
									Katalog Produk
								</Link>
							</li>
							<li>
								<Link
									href={route('gallery.index')}
									className="text-sm text-white/80 hover:text-white transition-colors"
								>
									Galeri Fasilitas & Ekspor
								</Link>
							</li>
							<li>
								<a
									href="#story"
									className="text-sm text-white/80 hover:text-white transition-colors"
								>
									Tentang Perusahaan
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-xs tracking-[0.22em] uppercase text-[#F8C300] font-bold">
							Kantor & Gudang Ekspor
						</h3>
						<p className="mt-5 text-xs text-white/80 leading-relaxed">
							Kawasan Industri Candi & Pelabuhan Tanjung Emas, Kota Semarang, Jawa Tengah, Indonesia.
						</p>
						<p className="mt-3 text-xs text-white/80">
							🌐 Jaringan Ekspor: Asia, Eropa, Timur Tengah, Amerika.
						</p>
					</div>
				</div>

				<div className="mt-16 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
					<p className="text-xs text-white/70">&copy; {new Date().getFullYear()} PT Tritama Decorindo. All rights reserved.</p>
					<p className="text-xs text-[#F8C300] tracking-[0.18em] uppercase font-semibold">
						Indonesian Premium Spices Exporter
					</p>
				</div>
			</div>
		</footer>
	);
}
