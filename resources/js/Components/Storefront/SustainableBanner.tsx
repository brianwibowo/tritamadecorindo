import { ArrowRight, Globe, Layers, ShieldCheck } from 'lucide-react';
import { Link } from '@inertiajs/react';

const pillars = [
	{
		icon: Layers,
		title: 'Kemitraan Petani',
		body: 'Direct sourcing dari 500+ petani mitra binaan di Maluku, Kerinci, Lampung, dan Jawa Tengah dengan prinsip fair trade.',
	},
	{
		icon: ShieldCheck,
		title: 'Laboratorium & QC',
		body: 'Uji kadar air, densitas, bebas aflatoksin, dan sertifikasi fitosanitari sebelum setiap kontainer dimuat.',
	},
	{
		icon: Globe,
		title: 'Logistik Ekspor FCL/LCL',
		body: 'Pengemasan berstandar ekspor (vacuum pack, jute bag liner) dengan dokumen kepabeanan lengkap ke seluruh dunia.',
	},
];

export default function SustainableBanner() {
	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mt-20 sm:mt-28">
			<div className="relative overflow-hidden rounded-3xl bg-yns-sun">
				<div className="absolute inset-0 yns-sun-stripes opacity-[0.08]" />
				<div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-foreground/10" />
				<div className="absolute -left-20 -bottom-32 h-72 w-72 rounded-full bg-foreground/5" />

				<div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 sm:p-12">
					<div className="lg:col-span-5">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-foreground">
							<ShieldCheck className="h-3.5 w-3.5" />
							Komitmen Mutu Ekspor
						</span>
						<h2 className="yns-display text-4xl sm:text-5xl text-foreground mt-5 leading-[1.02] font-bold">
							Integritas Rempah &<br />
							<span className="italic font-normal">Kepercayaan Global.</span>
						</h2>
						<p className="mt-4 text-foreground/85 text-sm sm:text-base max-w-md leading-relaxed">
							PT LFM Global Jayatama berdedikasi menjaga reputasi rempah Indonesia di kancah internasional melalui rantai pasok yang transparan, berkelanjutan, dan berstandar industri tinggi.
						</p>
						<a
							href="#story"
							className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-bold hover:bg-foreground/90 transition-colors shadow-md"
						>
							Tentang LFM Global
							<ArrowRight className="h-4 w-4" />
						</a>
					</div>
					<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 self-end">
						{pillars.map(({ icon: Icon, title, body }) => (
							<div
								key={title}
								className="rounded-2xl bg-background/90 backdrop-blur-sm p-5 ring-1 ring-foreground/10 shadow-sm"
							>
								<div className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center">
									<Icon className="h-4 w-4" />
								</div>
								<h3 className="yns-display text-lg font-bold text-foreground mt-4">{title}</h3>
								<p className="text-xs text-muted-foreground mt-2 leading-relaxed">{body}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
