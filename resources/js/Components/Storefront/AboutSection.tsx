import ScrollReveal from '@/Components/UI/ScrollReveal';
import { Building2, CheckCircle2, Home, Hotel, School, ShoppingBag, Store, Utensils } from 'lucide-react';

const spaces = [
	{ name: 'Rumah Tinggal', icon: Home },
	{ name: 'Kantor', icon: Building2 },
	{ name: 'Gedung Bertingkat', icon: Building2 },
	{ name: 'Restoran', icon: Utensils },
	{ name: 'Cafe & Coffee Shop', icon: Utensils },
	{ name: 'Ruko', icon: Store },
	{ name: 'Toko & Retail', icon: ShoppingBag },
	{ name: 'Hotel & Villa', icon: Hotel },
	{ name: 'Apartemen', icon: Home },
	{ name: 'Sekolah & Kampus', icon: School },
	{ name: 'Instansi Pemerintah/Swasta', icon: Building2 },
	{ name: 'Area Komersial', icon: Store },
];

export default function AboutSection() {
	return (
		<section id="story" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20 lg:pt-24">
			{/* Section Header: Badge & Headline placed prominently at the top */}
			<div className="max-w-3xl mb-6 sm:mb-10">
				<ScrollReveal effect="fade-up">
					<span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#111FA2]/15 bg-[#111FA2]/5 px-3.5 py-1 text-[11px] sm:text-xs font-extrabold tracking-[0.15em] uppercase text-[#111FA2] mb-3 shadow-xs">
						— Tentang Kami
					</span>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground font-bold tracking-tight leading-tight">
						Mitra Terpercaya Dekorasi, Branding Visual & Interior di Bekasi & Jabodetabek
					</h2>
				</ScrollReveal>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
				{/* Kolom Kiri: Narasi Profil & Sektor Layanan */}
				<div className="lg:col-span-6 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed order-1">
					<ScrollReveal effect="fade-right">
						<p>
							<strong className="text-[#111FA2] font-bold">Tritama Decorindo Stiker</strong> adalah perusahaan spesialis penjualan material dan jasa pemasangan dekorasi kaca, interior, dan signage yang berbasis di <strong className="text-foreground font-semibold">Babelan, Bekasi</strong>. Berdiri sejak tahun 2009, kami telah melayani ribuan kebutuhan pelanggan untuk rumah tinggal, kantor, ruko, gedung perkantoran, dan instansi di seluruh wilayah Bekasi, Cikarang, Jakarta, dan sekitarnya.
						</p>
						<p>
							Kami menyediakan berbagai pilihan produk dan layanan, seperti <em>Kaca Film, Sandblast Cutting, Wallpaper, Roller Blind, Vertical Blind, Cutting Sticker, Digital Printing, Huruf Timbul, Gorden</em>, serta berbagai kebutuhan Signage dan dekorasi visual lainnya.
						</p>

						{/* 3 Gambar Dokumentasi Nyata (Ditampilkan di sini pada mobile agar melekat erat dengan cerita Tentang Kami) */}
						<div className="block lg:hidden my-6">
							<p className="text-[11px] font-bold uppercase tracking-wider text-[#111FA2] mb-3 flex items-center gap-1.5">
								<CheckCircle2 className="h-3.5 w-3.5 text-[#5478FF]" />
								<span>Dokumentasi Portofolio Pemasangan:</span>
							</p>
							<div className="grid grid-cols-2 gap-3">
								<div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
									<img
										src="/images/products/sandblast-cutting-logo.webp"
										alt="Pemasangan Sandblast Cutting Tritama Decorindo Stiker"
										className="h-full w-full object-cover"
									/>
									<div className="absolute bottom-2 left-2 right-2 rounded-xl bg-[#111FA2]/90 backdrop-blur-md p-2 text-white text-[11px] border border-white/10">
										<p className="font-bold text-[#FFDE42] leading-tight">Sandblast Cutting</p>
										<p className="text-[10px] text-slate-200">Partisi Kaca Kantor</p>
									</div>
								</div>
								<div className="flex flex-col gap-3">
									<div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
										<img
											src="/images/products/huruf-timbul-akrilik.webp"
											alt="Signage Huruf Timbul LED"
											className="h-full w-full object-cover"
										/>
										<div className="absolute bottom-2 left-2 right-2 rounded-xl bg-[#111FA2]/90 backdrop-blur-md p-1.5 text-white text-[10px] border border-white/10">
											<p className="font-bold text-[#FFDE42] leading-tight">Huruf Timbul LED</p>
										</div>
									</div>
									<div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
										<img
											src="/images/products/wallpaper-custom-3d.webp"
											alt="Wallpaper Custom 3D"
											className="h-full w-full object-cover"
										/>
										<div className="absolute bottom-2 left-2 right-2 rounded-xl bg-[#111FA2]/90 backdrop-blur-md p-1.5 text-white text-[10px] border border-white/10">
											<p className="font-bold text-[#FFDE42] leading-tight">Wallpaper Custom 3D</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<p>
							Setiap pelanggan memiliki kebutuhan yang berbeda. Oleh karena itu, Tritama Decorindo Stiker tidak hanya menyediakan produk dan jasa pemasangan, tetapi juga membantu memberikan solusi yang sesuai dengan kebutuhan dan karakter setiap ruang. Mulai dari konsultasi, pemilihan material, desain, produksi, hingga pemasangan, setiap proses dilakukan dengan memperhatikan detail dan kualitas hasil akhir.
						</p>
						<p>
							Didukung oleh tenaga yang berpengalaman serta penggunaan material berkualitas, kami berkomitmen untuk memberikan hasil pengerjaan yang rapi, presisi, dan sesuai dengan kebutuhan pelanggan.
						</p>

						<div className="mt-6 pt-6 border-t border-slate-200">
							<p className="text-xs font-bold uppercase tracking-wider text-[#111FA2] mb-3">
								Melayani Berbagai Sektor & Ruang:
							</p>
							<div className="flex flex-wrap gap-2">
								{spaces.map(({ name, icon: Icon }) => (
									<span
										key={name}
										className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-[#111FA2] border border-slate-200/80 hover:bg-[#FFDE42]/15 hover:border-[#FFDE42]/40 transition-all duration-300"
									>
										<Icon className="h-3.5 w-3.5 text-[#FFDE42]" />
										<span>{name}</span>
									</span>
								))}
							</div>
						</div>
					</ScrollReveal>
				</div>

				{/* Kolom Kanan: 3 Gambar Dokumentasi Nyata (Tampil di Desktop lg:block) */}
				<div className="hidden lg:block lg:col-span-6 relative order-2">
					<ScrollReveal effect="fade-left" delay={150}>
						<div className="grid grid-cols-2 gap-4 sticky top-28">
							<div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
								<img
									src="/images/products/sandblast-cutting-logo.webp"
									alt="Pemasangan Sandblast Cutting Tritama Decorindo Stiker"
									className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
								/>
								<div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-[#111FA2]/85 backdrop-blur-md p-3 text-white text-xs border border-white/10 shadow-md">
									<p className="font-bold text-[#FFDE42]">Sandblast Cutting Logo</p>
									<p className="text-[11px] text-slate-200">Presisi Partisi Kaca Kantor</p>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
									<img
										src="/images/products/huruf-timbul-akrilik.webp"
										alt="Signage Huruf Timbul LED"
										className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
									/>
									<div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-[#111FA2]/85 backdrop-blur-md p-2.5 text-white text-xs border border-white/10 shadow-md">
										<p className="font-bold text-[#FFDE42]">Huruf Timbul Akrilik LED</p>
									</div>
								</div>
								<div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
									<img
										src="/images/products/wallpaper-custom-3d.webp"
										alt="Wallpaper Custom 3D"
										className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
									/>
									<div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-[#111FA2]/85 backdrop-blur-md p-2.5 text-white text-xs border border-white/10 shadow-md">
										<p className="font-bold text-[#FFDE42]">Wallpaper Custom 3D</p>
									</div>
								</div>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</div>
		</section>
	);
}
