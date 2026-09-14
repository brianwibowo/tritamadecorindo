import ScrollReveal from '@/Components/UI/ScrollReveal';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterSection() {
	const [contactInfo, setContactInfo] = useState('');
	const [needs, setNeeds] = useState('Kaca Film & Sandblast');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!contactInfo) return;

		const waMessage = `Halo Tritama Decorindo Stiker, saya ingin konsultasi & survey gratis untuk kebutuhan: *${needs}*. Kontak saya: ${contactInfo}. Mohon info estimasi biaya. Terima kasih.`;
		window.open(`https://wa.me/6281990909646?text=${encodeURIComponent(waMessage)}`, '_blank');
		setSubmitted(true);
	};

	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
			<ScrollReveal effect="scale-up" duration={800}>
				<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111FA2] via-[#0D1780] to-[#080E4E] text-white p-8 sm:p-14 shadow-2xl border border-[#5478FF]/20">
					<div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-[#53CBF3]/10 blur-3xl" />
					<div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#FFDE42]/5 blur-3xl" />

					<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
						<div>
							<span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#FFDE42]/40 bg-[#FFDE42]/10 px-3.5 py-1 text-[11px] sm:text-xs font-extrabold tracking-[0.15em] uppercase text-[#FFDE42] mb-3 shadow-xs">
								— Konsultasi & Survey Lokasi
							</span>
							{submitted ? (
								<>
									<div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5478FF] mb-4 text-white shadow-md">
										<Check className="h-6 w-6 text-[#FFDE42]" />
									</div>
									<h2 className="text-3xl sm:text-4xl font-bold">Permintaan Terhubung ke WhatsApp!</h2>
									<p className="mt-3 text-slate-200 max-w-md text-sm leading-relaxed">
										Customer service kami siap membantu penjadwalan survey lokasi, pengukuran, dan estimasi biaya material & jasa.
									</p>
								</>
							) : (
								<>
									<h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
										Konsultasi & Estimasi Biaya
										<br />
										<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFDE42] via-[#53CBF3] to-white font-extrabold">
											Gratis Tanpa Biaya.
										</span>
									</h2>
									<p className="mt-4 text-slate-200 max-w-md leading-relaxed text-sm">
										Dapatkan bantuan pemilihan material, perhitungan kebutuhan luasan kaca/dinding, dan penjadwalan teknisi survey ke lokasi Anda di wilayah Jabodetabek.
									</p>
									<div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-200">
										<span className="flex items-center gap-1.5 text-white font-semibold">
											<Phone className="h-3.5 w-3.5 text-[#FFDE42]" />
											0819-9090-9646 / 0813-8088-1656
										</span>
									</div>
								</>
							)}
						</div>

						{!submitted && (
							<form onSubmit={handleSubmit} className="w-full bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/15 shadow-xl">
								<div className="flex flex-col gap-4">
									<div>
										<label className="text-xs tracking-wider uppercase text-[#FFDE42] font-bold block mb-2">
											Kebutuhan Dekorasi Anda:
										</label>
										<select
											value={needs}
											onChange={(e) => setNeeds(e.target.value)}
											className="h-11 w-full rounded-xl border border-white/20 bg-[#0A1152]/90 px-4 text-white text-sm focus:border-[#53CBF3] focus:ring-2 focus:ring-[#53CBF3]/20 outline-none"
										>
											<option value="Kaca Film Riben / Sparta / One Way">Kaca Film (Riben, Sparta, One Way)</option>
											<option value="Sandblast Polos & Cutting Logo Kantor">Sandblast & Cutting Sticker</option>
											<option value="Wallpaper Dinding Pabrikan & Custom 3D">Wallpaper Dinding & 3D</option>
											<option value="Signage Huruf Timbul LED & Akrilik">Huruf Timbul Laser Akrilik & Signage</option>
											<option value="Roller Blinds & Vertical Blinds">Roller Blinds & Vertical Blinds</option>
											<option value="Gorden Blackout & Standar">Gorden Blackout & Standar</option>
											<option value="Dekorasi Lengkap / Proyek Gedung">Proyek Lengkap (Gedung / Ruko / Rumah)</option>
										</select>
									</div>

									<div>
										<label className="text-xs tracking-wider uppercase text-[#FFDE42] font-bold block mb-2">
											Nomor WhatsApp / Nama Anda:
										</label>
										<div className="flex flex-col sm:flex-row gap-3">
											<input
												type="text"
												value={contactInfo}
												onChange={(e) => setContactInfo(e.target.value)}
												placeholder="Contoh: 0812-xxxx-xxxx (Bpk/Ibu ...)"
												required
												className="h-12 w-full flex-1 rounded-xl border border-white/20 bg-[#0A1152]/90 px-4 text-white placeholder:text-slate-400 focus:border-[#53CBF3] focus:ring-2 focus:ring-[#53CBF3]/20 outline-none text-sm"
											/>
											<button
												type="submit"
												className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FFDE42] hover:bg-[#F2D02B] px-6 font-extrabold text-xs uppercase tracking-wider text-[#111FA2] transition-all active:scale-95 shadow-md"
											>
												<span>Konsultasi WA</span>
												<ArrowRight className="h-4 w-4" />
											</button>
										</div>
									</div>
								</div>
							</form>
						)}
					</div>
				</div>
			</ScrollReveal>
		</section>
	);
}
