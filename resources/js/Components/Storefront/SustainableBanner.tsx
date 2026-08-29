import ScrollReveal from '@/Components/UI/ScrollReveal';
import { Award, Clock, DollarSign, Headset, MessageSquare, ShieldCheck, Sparkles, Wrench } from 'lucide-react';

const advantages = [
	{
		icon: Award,
		title: 'Produk Berkualitas',
		body: 'Material pilihan berdaya tahan tinggi, tolak panas optimal, dan warna tidak mudah pudar.',
	},
	{
		icon: Wrench,
		title: 'Teknisi Berpengalaman',
		body: 'Dikerjakan oleh tenaga ahli spesialis kaca film dan interior dengan jam terbang tinggi.',
	},
	{
		icon: ShieldCheck,
		title: 'Pemasangan Rapi & Presisi',
		body: 'Hasil cutting rapi tanpa gelembung udara, presisi di setiap sudut dan lekukan kaca.',
	},
	{
		icon: DollarSign,
		title: 'Harga Kompetitif',
		body: 'Penawaran harga terbaik langsung dari tangan pertama untuk material maupun jasa pemasangan.',
	},
	{
		icon: Clock,
		title: 'Pengerjaan Tepat Waktu',
		body: 'Jadwal instalasi disiplin dan selesai sesuai target kesepakatan tanpa mengganggu aktivitas Anda.',
	},
	{
		icon: MessageSquare,
		title: 'Konsultasi Gratis',
		body: 'Bebas konsultasi desain, pemilihan jenis bahan, dan estimasi biaya tanpa dipungut biaya.',
	},
	{
		icon: Headset,
		title: 'Respon Cepat',
		body: 'Layanan customer care sigap dan siap membantu kebutuhan survey lokasi di Jabodetabek.',
	},
];

export default function SustainableBanner() {
	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mt-16 sm:mt-24">
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111FA2] via-[#0D1780] to-[#080E4E] text-white p-8 sm:p-12 shadow-2xl border border-[#5478FF]/20">
				<div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#53CBF3]/10" />
				<div className="absolute -left-20 -bottom-32 h-72 w-72 rounded-full bg-[#FFDE42]/5" />

				<ScrollReveal effect="fade-up">
					<div className="relative mb-10 text-center max-w-2xl mx-auto">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFDE42]/10 px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-[#FFDE42] ring-1 ring-[#FFDE42]/20">
							<Sparkles className="h-3.5 w-3.5 text-[#FFDE42]" />
							Mengapa Memilih Kami
						</span>
						<h2 className="text-3xl sm:text-4xl text-white mt-4 font-bold tracking-tight">
							Keunggulan Tritama Decorindo Stiker
						</h2>
						<p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
							Komitmen kami memberikan layanan dekorasi, branding visual, serta interior & eksterior terbaik untuk setiap ruang dan kebutuhan Anda sejak 2009.
						</p>
					</div>
				</ScrollReveal>

				<div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{advantages.slice(0, 4).map(({ icon: Icon, title, body }, idx) => (
						<ScrollReveal key={title} effect="fade-up" delay={idx * 75}>
							<div className="rounded-2xl bg-white/5 backdrop-blur-sm p-5 border border-white/10 hover:border-[#FFDE42]/40 transition-all hover:bg-white/10 group h-full">
								<div className="h-10 w-10 rounded-xl bg-[#FFDE42] text-[#111FA2] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
									<Icon className="h-5 w-5" />
								</div>
								<h3 className="text-base font-bold text-white mt-4 group-hover:text-[#FFDE42] transition-colors">{title}</h3>
								<p className="text-xs text-slate-200 mt-1.5 leading-relaxed font-normal">{body}</p>
							</div>
						</ScrollReveal>
					))}
				</div>

				<div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
					{advantages.slice(4, 7).map(({ icon: Icon, title, body }, idx) => (
						<ScrollReveal key={title} effect="fade-up" delay={300 + idx * 75}>
							<div className="rounded-2xl bg-white/5 backdrop-blur-sm p-5 border border-white/10 hover:border-[#FFDE42]/40 transition-all hover:bg-white/10 group h-full">
								<div className="h-10 w-10 rounded-xl bg-[#FFDE42] text-[#111FA2] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
									<Icon className="h-5 w-5" />
								</div>
								<h3 className="text-base font-bold text-white mt-4 group-hover:text-[#FFDE42] transition-colors">{title}</h3>
								<p className="text-xs text-slate-200 mt-1.5 leading-relaxed font-normal">{body}</p>
							</div>
						</ScrollReveal>
					))}
				</div>
			</div>
		</section>
	);
}
