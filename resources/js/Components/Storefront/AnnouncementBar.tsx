import { CheckCircle2, Phone, ShieldCheck, Sparkles } from 'lucide-react';

const items = [
	'Tritama Decorindo Stiker — Ahli Kaca Film, Sandblast, Wallpaper & Interior Sejak 2009',
	'Melayani Wilayah Jakarta, Bogor, Depok, Tangerang, Bekasi, Cibubur & Sekitarnya',
	'Pemasangan Rapi & Presisi oleh Teknisi Berpengalaman • Konsultasi Gratis: 0819-9090-9646',
	'Solusi Lengkap Dekorasi Rumah, Kantor, Gedung, Ruko, Toko, Hotel & Instansi',
	'Kaca Film Riben, Sparta, One Way • Sandblast Cutting Logo • Huruf Timbul LED • Blinds',
];

export default function AnnouncementBar() {
	return (
		<div className="bg-[#0B0F17] text-[#38BDF8] text-[11px] sm:text-[12px] tracking-[0.16em] uppercase font-medium border-b border-white/10 m-0 p-0">
			<div className="relative overflow-hidden">
				<div className="flex whitespace-nowrap yns-marquee py-2">
					{[...items, ...items].map((item, idx) => (
						<span key={idx} className="flex items-center gap-2.5 px-6 shrink-0">
							<Sparkles className="h-3 w-3 text-[#38BDF8]" />
							<span className="text-slate-200">{item}</span>
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
