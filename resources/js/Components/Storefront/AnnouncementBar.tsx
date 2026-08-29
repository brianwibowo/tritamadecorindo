import { Globe } from 'lucide-react';

const items = [
	'PT LFM Global Jayatama (LFM) — Eksportir Rempah Nusantara ke Pasar Global',
	'Kualitas Ekspor Standar Internasional (HACCP, ISO & Phytosanitary)',
	'Melayani Pengadaan Industri Nasional & Kontrak Ekspor Global',
	'Cengkeh Maluku, Biji Pala Banda, Kayu Manis Kerinci & Vanilla Beans',
];

export default function AnnouncementBar() {
	return (
		<div className="bg-[#1a0203] text-[#F8C300] text-[12px] tracking-[0.18em] uppercase font-medium border-b border-white/10 m-0 p-0">
			<div className="relative overflow-hidden">
				<div className="flex whitespace-nowrap yns-marquee py-2.5">
					{[...items, ...items, ...items].map((item, idx) => (
						<span key={idx} className="flex items-center gap-3 px-8 shrink-0">
							<Globe className="h-3.5 w-3.5 text-[#F8C300]" />
							{item}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
