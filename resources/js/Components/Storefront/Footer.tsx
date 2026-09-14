import { ArrowRight, CheckCircle2, Clock, Download, ExternalLink, Mail, MapPin, MessageCircle, Phone, Shield, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Footer() {
	return (
		<footer className="relative sm:sticky sm:bottom-0 sm:z-0 bg-gradient-to-b from-[#0C1678] via-[#0E1B8A] to-[#080E4E] text-white min-h-0 sm:min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden">
			<div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-28 sm:pb-8 flex-1 flex flex-col justify-between">

				{/* Main Content Grid: 1 Col on Mobile -> 2 Col on Tablet -> 12 Col on Desktop */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-4 sm:py-6">
					{/* Col 1: Profil Perusahaan, Workshop, & Jam Buka (lg: 4 cols) */}
					<div className="lg:col-span-4 space-y-4">
						<Link href="/" className="inline-flex items-center gap-3 group">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md p-1 shrink-0 group-hover:scale-105 transition-transform">
								<img src="/images/logo.png" alt="Tritama Decorindo" className="h-full w-full object-contain" />
							</div>
							<div>
								<span className="font-display text-lg sm:text-xl text-white font-bold tracking-tight block leading-tight">
									Tritama Decorindo
								</span>
								<span className="text-[11px] font-semibold text-[#FFDE42] uppercase tracking-wider block">
									Spesialis Kaca Film & Dekorasi Interior
								</span>
							</div>
						</Link>

						<p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed">
							Kontraktor aplikator dan penyedia material Kaca Film Gedung, Sandblast Cutting Logo, Wallpaper Custom 3D, Roller Blinds, dan Huruf Timbul Signage terpercaya di Jabodetabek sejak 2009.
						</p>

						{/* Quick trust badges */}
						<div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-200">
							<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
								<CheckCircle2 className="h-3.5 w-3.5 text-[#FFDE42]" />
								<span>Free Survey Lokasi</span>
							</span>
							<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
								<CheckCircle2 className="h-3.5 w-3.5 text-[#53CBF3]" />
								<span>Garansi Material Asli</span>
							</span>
						</div>

						{/* Address & Operational Hours */}
						<div className="pt-2 space-y-2.5 text-xs text-slate-300">
							<div className="flex items-start gap-2.5">
								<MapPin className="h-4 w-4 text-[#FFDE42] shrink-0 mt-0.5" />
								<span className="leading-snug">
									Grand Anandara Residence, Jl. Pertamina Blok E10 No.8, Kedungjaya, Kec. Babelan, Kab. Bekasi, Jawa Barat 17610
								</span>
							</div>
							<div className="flex items-center gap-2.5">
								<Clock className="h-4 w-4 text-[#53CBF3] shrink-0" />
								<span>Senin – Sabtu: 08.00 – 18.00 WIB (Online 24 Jam)</span>
							</div>
							<div className="flex items-center gap-2.5">
								<Mail className="h-4 w-4 text-[#53CBF3] shrink-0" />
								<a href="mailto:tritamadecorindostiker@gmail.com" className="hover:text-white underline transition-colors">
									tritamadecorindostiker@gmail.com
								</a>
							</div>
						</div>
					</div>

					{/* Middle Section on Mobile: 2 Columns side-by-side for compact readability & SEO (lg: 5 cols) */}
					<div className="lg:col-span-5 grid grid-cols-2 gap-5 sm:gap-8">
						{/* Kategori Produk (SEO Keywords) */}
						<div>
							<div className="flex items-center gap-2 pb-1 border-b border-white/10">
								<div className="h-2 w-2 rounded-full bg-[#FFDE42]" />
								<h3 className="text-xs font-bold uppercase tracking-wider text-[#FFDE42]">
									Kategori Produk
								</h3>
							</div>
							<ul className="mt-3 space-y-2 text-xs text-slate-200">
								<li>
									<Link
										href={route('products.index', { category: 'cat-kaca-film' })}
										className="hover:text-[#FFDE42] transition-colors block py-0.5"
									>
										Kaca Film Gedung & Rumah
									</Link>
								</li>
								<li>
									<Link
										href={route('products.index', { category: 'cat-sandblast-cutting' })}
										className="hover:text-[#FFDE42] transition-colors block py-0.5"
									>
										Sandblast Cutting Logo
									</Link>
								</li>
								<li>
									<Link
										href={route('products.index', { category: 'cat-wallpaper' })}
										className="hover:text-[#FFDE42] transition-colors block py-0.5"
									>
										Wallpaper Custom 3D
									</Link>
								</li>
								<li>
									<Link
										href={route('products.index', { category: 'cat-branding-signage' })}
										className="hover:text-[#FFDE42] transition-colors block py-0.5"
									>
										Huruf Timbul Akrilik LED
									</Link>
								</li>
								<li>
									<Link
										href={route('products.index', { category: 'cat-window-blinds' })}
										className="hover:text-[#FFDE42] transition-colors block py-0.5"
									>
										Roller & Vertical Blinds
									</Link>
								</li>
								<li>
									<Link
										href={route('products.index', { category: 'cat-gorden' })}
										className="hover:text-[#FFDE42] transition-colors block py-0.5"
									>
										Gorden Blackout & Rel
									</Link>
								</li>
							</ul>
						</div>

						{/* Area Layanan (Local SEO) & Tautan Cepat */}
						<div>
							<div className="flex items-center gap-2 pb-1 border-b border-white/10">
								<div className="h-2 w-2 rounded-full bg-[#53CBF3]" />
								<h3 className="text-xs font-bold uppercase tracking-wider text-[#53CBF3]">
									Area Layanan
								</h3>
							</div>
							<ul className="mt-3 space-y-1.5 text-xs text-slate-300">
								<li className="flex items-center gap-1.5">
									<span className="h-1 w-1 rounded-full bg-slate-400" />
									<span>Jakarta (Pusat, Selatan, Barat)</span>
								</li>
								<li className="flex items-center gap-1.5">
									<span className="h-1 w-1 rounded-full bg-slate-400" />
									<span>Jakarta Timur & Utara</span>
								</li>
								<li className="flex items-center gap-1.5">
									<span className="h-1 w-1 rounded-full bg-slate-400" />
									<span>Bekasi, Cikarang & Babelan</span>
								</li>
								<li className="flex items-center gap-1.5">
									<span className="h-1 w-1 rounded-full bg-slate-400" />
									<span>Tangerang & BSD City</span>
								</li>
								<li className="flex items-center gap-1.5">
									<span className="h-1 w-1 rounded-full bg-slate-400" />
									<span>Depok, Cibubur & Bogor</span>
								</li>
							</ul>

							{/* Quick Links */}
							<div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
								<p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
									Navigasi Cepat
								</p>
								<div className="flex flex-col gap-1 text-xs">
									<Link href={route('gallery.index')} className="text-slate-200 hover:text-white transition-colors">
										• Portofolio & Galeri Proyek
									</Link>
									<a
										href="/docs/Panduan_Penggunaan_Web_dan_Admin_Tritama_Decorindo.pdf"
										target="_blank"
										rel="noopener noreferrer"
										className="text-[#FFDE42] hover:underline inline-flex items-center gap-1"
									>
										<Download className="h-3 w-3" />
										<span>Unduh Katalog PDF</span>
									</a>
								</div>
							</div>
						</div>
					</div>

					{/* Col 3: Card Konsultasi, Chat WhatsApp & Kontak Cepat (lg: 3 cols) */}
					<div className="lg:col-span-3">
						<div className="rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/15 p-4 sm:p-5 shadow-xl space-y-3.5">
							<div className="flex items-center gap-2">
								<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFDE42] text-[#111FA2]">
									<Sparkles className="h-4 w-4" />
								</div>
								<div>
									<h4 className="text-xs font-bold uppercase tracking-wider text-white">
										Konsultasi & Estimasi
									</h4>
									<p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
										<span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
										Respon Cepat via WhatsApp
									</p>
								</div>
							</div>

							<p className="text-xs text-slate-200 leading-relaxed">
								Kirimkan ukuran jendela, bidang dinding, atau desain logo kantor Anda untuk estimasi harga transparan & survey lokasi gratis.
							</p>

							{/* WhatsApp CTA Button */}
							<a
								href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo%20Stiker,%20saya%20ingin%20konsultasi%20pemasangan%20material%20dekorasi/kaca%20film."
								target="_blank"
								rel="noopener noreferrer"
								className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6d] text-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all shadow-md active:scale-95 touch-manipulation min-h-[44px]"
							>
								<MessageCircle className="h-4 w-4 fill-white" />
								<span>WA: 0819-9090-9646</span>
							</a>

							{/* Secondary Contact Link */}
							<div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
								<span>Nomor Alternatif:</span>
								<a
									href="https://wa.me/6281380881656"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white font-medium underline inline-flex items-center gap-1"
								>
									<Phone className="h-3 w-3 text-[#53CBF3]" />
									0813-8088-1656
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* SEO Keyword Snippets Ribbon (Helps Google index regional long-tail keywords cleanly) */}
				<div className="mt-4 sm:mt-6 pt-3 pb-3 border-t border-white/10 text-[11px] text-slate-400/90 leading-relaxed">
					<p>
						<strong className="text-slate-300 font-semibold">Layanan Unggulan Tritama Decorindo: </strong>
						Jasa Pasang Kaca Film Gedung Jakarta • Stiker Kaca Sandblast Kantor Bekasi • Cutting Sandblast Logo Custom • Wallpaper Dinding 3D • Roller Blinds & Vertical Blinds Tarikan Otomatis • Huruf Timbul Akrilik LED Signage Toko • Gorden Blackout Rumah Sakit • Aplikator Kaca Film Mobil & Gedung Jabodetabek.
					</p>
				</div>

				{/* Bottom Copyright & Security */}
				<div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
					<p className="text-center sm:text-left text-[11px] sm:text-xs">
						© {new Date().getFullYear()} <strong className="text-white font-medium">Tritama Decorindo Stiker</strong>. Hak Cipta Dilindungi.
					</p>
					
					<div className="flex items-center gap-4 text-[11px] text-slate-400">
						<span className="hidden sm:inline">Jabodetabek & Seluruh Indonesia</span>
						<span className="hidden sm:inline">•</span>
						<Link
							href={route('login')}
							className="inline-flex items-center gap-1 hover:text-white transition-colors"
						>
							<Shield className="h-3 w-3 text-[#FFDE42]" />
							<span>Portal Admin</span>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
