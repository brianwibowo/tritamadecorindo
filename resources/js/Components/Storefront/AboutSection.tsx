export default function AboutSection() {
	return (
		<section id="story" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
				<div className="lg:col-span-5 order-2 lg:order-1">
					<p className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-3 font-semibold">— Profil Perusahaan</p>
					<h2 className="yns-display text-4xl sm:text-5xl text-foreground leading-[1.02] font-bold">
						Menghubungkan Rempah Nusantara
						<span className="italic font-normal"> dengan Pasar Dunia.</span>
					</h2>
					<p className="mt-5 text-muted-foreground text-sm sm:text-base leading-relaxed">
						PT LFM Global Jayatama (LFM) adalah eksportir dan pemasok rempah-rempah terpercaya di Indonesia. Kami bermitra langsung dengan ribuan petani lokal di kepulauan rempah Indonesia untuk menghadirkan komoditas berkualitas tinggi yang memenuhi standar industri makanan, farmasi, bumbu, dan ekstraksi minyak atsiri di seluruh dunia.
					</p>
					<div className="mt-8 grid grid-cols-2 gap-6 max-w-md">
						<div className="border-t border-foreground/20 pt-4">
							<p className="yns-display text-3xl font-bold text-foreground">25+</p>
							<p className="text-xs text-muted-foreground tracking-wider uppercase mt-1 font-semibold">
								Negara Tujuan Ekspor
							</p>
						</div>
						<div className="border-t border-foreground/20 pt-4">
							<p className="yns-display text-3xl font-bold text-foreground">5.000+</p>
							<p className="text-xs text-muted-foreground tracking-wider uppercase mt-1 font-semibold">
								Ton Pasokan per Tahun
							</p>
						</div>
						<div className="border-t border-foreground/20 pt-4">
							<p className="yns-display text-3xl font-bold text-foreground">500+</p>
							<p className="text-xs text-muted-foreground tracking-wider uppercase mt-1 font-semibold">
								Petani Mitra Binaan
							</p>
						</div>
						<div className="border-t border-foreground/20 pt-4">
							<p className="yns-display text-3xl font-bold text-foreground">100%</p>
							<p className="text-xs text-muted-foreground tracking-wider uppercase mt-1 font-semibold">
								Sertifikasi Mutu Internasional
							</p>
						</div>
					</div>
				</div>

				<div className="lg:col-span-7 order-1 lg:order-2 relative">
					<div className="grid grid-cols-5 gap-3">
						<div className="col-span-3 relative aspect-[3/4] rounded-3xl overflow-hidden bg-secondary shadow-md">
							<img
								src="/scraped-5.jpg"
								alt="Perkebunan Rempah LFM Global"
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="col-span-2 flex flex-col gap-3">
							<div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary shadow-md">
								<img
									src="/scraped-0.jpg"
									alt="Sortasi Cengkeh"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-secondary shadow-md">
								<img
									src="/scraped-3.jpg"
									alt="Kayu Manis Kerinci"
									className="h-full w-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
