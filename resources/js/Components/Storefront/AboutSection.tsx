import ScrollReveal from '@/Components/UI/ScrollReveal';
import { Building2, Home, Hotel, School, ShoppingBag, Store, Utensils } from 'lucide-react';

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
		<section id="story" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<div className="lg:col-span-6 order-2 lg:order-1">
					<ScrollReveal effect="fade-right">
						<span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#111FA2]/15 bg-[#111FA2]/5 px-3.5 py-1 text-[11px] sm:text-xs font-extrabold tracking-[0.15em] uppercase text-[#111FA2] mb-3 shadow-xs">
							— Tentang Kami
						</span>
						<h2 className="text-3xl sm:text-4xl text-foreground font-bold tracking-tight leading-tight">
							Mitra Terpercaya Dekorasi, Branding Visual & Interior Sejak 2009
						</h2>
						
						<div className="mt-4 space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
							<p>
								<strong className="text-[#111FA2] font-bold">Tritama Decorindo Stiker</strong> adalah perusahaan yang bergerak di bidang penjualan material dan jasa pemasangan untuk berbagai kebutuhan dekorasi, branding visual, interior, dan eksterior. Berdiri sejak tahun 2009, kami telah melayani berbagai kebutuhan pelanggan untuk rumah tinggal, kantor, toko, ruko, gedung, sekolah, hingga berbagai ruang usaha dan instansi.
							</p>
							<p>
								Kami menyediakan berbagai pilihan produk dan layanan, seperti <em>Kaca Film, Sandblast Cutting, Wallpaper, Roller Blind, Vertical Blind, Cutting Sticker, Digital Printing, Huruf Timbul, Gorden</em>, serta berbagai kebutuhan Signage dan dekorasi visual lainnya.
							</p>
							<p>
								Setiap pelanggan memiliki kebutuhan yang berbeda. Oleh karena itu, Tritama Decorindo Stiker tidak hanya menyediakan produk dan jasa pemasangan, tetapi juga membantu memberikan solusi yang sesuai dengan kebutuhan dan karakter setiap ruang. Mulai dari konsultasi, pemilihan material, desain, produksi, hingga pemasangan, setiap proses dilakukan dengan memperhatikan detail dan kualitas hasil akhir.
							</p>
							<p>
								Didukung oleh tenaga yang berpengalaman serta penggunaan material berkualitas, kami berkomitmen untuk memberikan hasil pengerjaan yang rapi, presisi, dan sesuai dengan kebutuhan pelanggan.
							</p>
						</div>

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

				<div className="lg:col-span-6 order-1 lg:order-2 relative">
					<ScrollReveal effect="fade-left" delay={150}>
						<div className="grid grid-cols-2 gap-4">
							<div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
								<img
									src="/images/products/sandblast-cutting-logo.webp"
									alt="Pemasangan Sandblast Cutting Tritama Decorindo Stiker"
									className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
								/>
								<div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-[#111FA2]/80 backdrop-blur-md p-3 text-white text-xs border border-white/10">
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
									<div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-[#111FA2]/80 backdrop-blur-md p-2.5 text-white text-xs border border-white/10">
										<p className="font-bold text-[#FFDE42]">Huruf Timbul Akrilik LED</p>
									</div>
								</div>
								<div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
									<img
										src="/images/products/wallpaper-custom-3d.webp"
										alt="Wallpaper Custom 3D"
										className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
									/>
									<div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-[#111FA2]/80 backdrop-blur-md p-2.5 text-white text-xs border border-white/10">
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
