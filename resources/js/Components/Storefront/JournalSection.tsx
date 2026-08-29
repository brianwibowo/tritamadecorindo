import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';

const stories = [
	{
		title: 'Perbedaan Kaca Film Riben, Sparta, dan One Way untuk Gedung & Rumah',
		excerpt: 'Panduan lengkap memilih tingkat kegelapan (40%, 60%, 80%) dan efek tolak panas matahari sesuai orientasi bangunan Anda.',
		image: '/images/products/kaca-film-riben.webp',
		category: 'Panduan Kaca Film',
		minutes: '4 min read',
	},
	{
		title: 'Kelebihan Sandblast Cutting Logo untuk Privasi & Citra Kantor',
		excerpt: 'Bagaimana stiker kaca es buram dengan potongan logo custom mampu meningkatkan privasi ruang meeting dan estetika kantor.',
		image: '/images/products/sandblast-cutting-logo.webp',
		category: 'Branding Kantor',
		minutes: '3 min read',
	},
	{
		title: 'Tips Memilih Roller Blinds Blackout vs Standar Dimout',
		excerpt: 'Kapan saat tepat menggunakan tirai gulung blackout 100% dan tirai standar untuk kontrol cahaya ruangan maksimal.',
		image: '/images/products/roller-blinds-blackout.webp',
		category: 'Window Blinds',
		minutes: '5 min read',
	},
];

const coverageAreas = [
	'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Utara',
	'Kota Bekasi', 'Kabupaten Bekasi (Babelan, Cikarang)', 'Depok & Cibubur',
	'Kota Tangerang', 'Tangerang Selatan (BSD, Serpong)', 'Bogor & Sekitarnya'
];

export default function JournalSection() {
	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
			{/* Area Layanan Jabodetabek Bar */}
			<div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 mb-16 shadow-lg border border-slate-800">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-2xl bg-[#0284C7] flex items-center justify-center text-white shrink-0">
							<MapPin className="h-5 w-5" />
						</div>
						<div>
							<h3 className="text-lg font-bold text-white">Area Jangkauan Layanan & Survey</h3>
							<p className="text-xs text-slate-300">Siap melayani survey lokasi dan pemasangan tepat waktu di seluruh wilayah:</p>
						</div>
					</div>
					<a
						href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo,%20saya%20ingin%20jadwalkan%20survey%20lokasi%20di%20area%20saya."
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center rounded-full bg-[#0284C7] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0369a1] transition-colors shrink-0 shadow-md"
					>
						Jadwalkan Survey Lokasi
					</a>
				</div>
				<div className="flex flex-wrap gap-2 pt-4">
					{coverageAreas.map((area) => (
						<span
							key={area}
							className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300 border border-slate-700 hover:text-white transition-colors"
						>
							✓ {area}
						</span>
					))}
				</div>
			</div>

			<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
				<div>
					<p className="text-xs font-bold tracking-[0.2em] uppercase text-[#0284C7] mb-2">— Edukasi & Inspirasi Ruang</p>
					<h2 className="text-3xl sm:text-4xl text-foreground font-bold tracking-tight">
						Tips & Panduan Dekorasi
					</h2>
				</div>
				<Link
					href={route('products.index')}
					className="inline-flex items-center gap-2 text-sm font-semibold text-[#0284C7] hover:underline"
				>
					Lihat Semua Produk
					<ArrowUpRight className="h-4 w-4" />
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{stories.map((s) => (
					<div key={s.title} className="group cursor-pointer rounded-3xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all">
						<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
							<img
								src={s.image}
								alt={s.title}
								className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute top-3 left-3">
								<span className="rounded-full bg-[#0F172A]/85 backdrop-blur-md px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-white shadow-sm">
									{s.category}
								</span>
							</div>
						</div>
						<div className="mt-4 px-1">
							<p className="text-[11px] tracking-wider uppercase text-slate-500 font-semibold">{s.minutes}</p>
							<h3 className="text-base sm:text-lg font-bold text-[#0F172A] mt-1 leading-snug group-hover:text-[#0284C7] transition-colors line-clamp-2">
								{s.title}
							</h3>
							<p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2 font-normal">{s.excerpt}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
