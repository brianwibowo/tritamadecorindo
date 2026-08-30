import { Sparkles } from 'lucide-react';

const items = [
	'TRITAMA DECORINDO STIKER — AHLI KACA FILM, SANDBLAST, WALLPAPER & INTERIOR BEKASI & JABODETABEK SEJAK 2009',
	'JASA PASANG KACA FILM GEDUNG & RUMAH BEKASI, CIKARANG, TAMBUN, JAKARTA & SEKITARNYA — SURVEY & KONSULTASI GRATIS',
	'SPESIALIS SANDBLAST CUTTING MOTIF LOGO KANTOR, ROLLER BLINDS, WALLPAPER 3D & HURUF TIMBUL LED BEKASI',
	'PENGERJAAN RAPI, PRESISI & BERGARANSI OLEH TEKNISI BERPENGALAMAN • CHAT WA: 0819-9090-9646',
	'SOLUSI INTERIOR & EKSTERIOR RUMAH, KANTOR, GEDUNG, RUKO, TOKO, RESTORAN & INSTANSI DI BEKASI & JABODETABEK',
];

export default function AnnouncementBar() {
	return (
		<div className="bg-[#111FA2] text-[#FFDE42] text-[11px] sm:text-[12px] tracking-[0.14em] uppercase font-medium border-b border-[#5478FF]/20 m-0 p-0 overflow-hidden select-none">
			<div className="relative w-full overflow-hidden">
				<div className="flex whitespace-nowrap yns-marquee py-2.5">
					{[...items, ...items].map((item, idx) => (
						<span key={idx} className="inline-flex items-center gap-2.5 px-6 shrink-0">
							<Sparkles className="h-3 w-3 text-[#FFDE42] shrink-0" />
							<span className="text-white font-semibold text-xs tracking-wider">{item}</span>
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
