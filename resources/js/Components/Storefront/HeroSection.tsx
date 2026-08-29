import ScrollReveal from '@/Components/UI/ScrollReveal';
import { ArrowUpRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
	return (
		<section className="relative w-full min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-center items-center text-center overflow-hidden rounded-b-[40px] sm:rounded-b-[64px] bg-gradient-to-b from-[#111FA2] via-[#0D1780] to-[#080E4E] shadow-2xl pt-6 sm:pt-10 pb-14 sm:pb-20 border-b border-[#5478FF]/20">
			{/* Fullscreen background image with subtle zoom */}
			<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
				<img
					src="/images/products/kaca-film-sparta.webp"
					alt="Tritama Decorindo Stiker Kaca Film dan Interior"
					className="h-full w-full object-cover object-center opacity-25 scale-105 animate-pulse-glow duration-1000"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[#080E4E] via-[#0D1780]/80 to-[#111FA2]/90" />
			</div>

			{/* Center Hero Copy Block (Elevated Higher) */}
			<div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 my-auto -translate-y-4 sm:-translate-y-8 space-y-5 sm:space-y-7">
				{/* Top Floating Badge */}
				<ScrollReveal effect="fade-down" delay={100}>
					<div className="inline-flex items-center gap-2 rounded-full bg-[#FFDE42]/10 border border-[#FFDE42]/30 px-4 py-1.5 text-xs font-bold text-[#FFDE42] uppercase tracking-wider backdrop-blur-md animate-float-gentle shadow-lg">
						<ShieldCheck className="h-4 w-4 text-[#FFDE42]" />
						<span>Material Berkualitas & Jasa Pemasangan Bergaransi Sejak 2009</span>
					</div>
				</ScrollReveal>

				{/* Headline */}
				<ScrollReveal effect="fade-up" delay={200}>
					<h1 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.12] font-bold tracking-tight text-white">
						Solusi Dekorasi, Kaca Film & <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFDE42] via-[#53CBF3] to-[#5478FF] font-extrabold">
							Branding Visual & Interior
						</span>
					</h1>
				</ScrollReveal>

				{/* Description */}
				<ScrollReveal effect="fade-up" delay={300}>
					<p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto font-sans leading-relaxed font-normal">
						Melayani penjualan material dan jasa pasang Kaca Film Gedung/Rumah, Sandblast Cutting Logo, Wallpaper Dinding, Roller Blinds, Huruf Timbul LED, dan Gorden untuk rumah, kantor, ruko, dan gedung di Jabodetabek.
					</p>
				</ScrollReveal>

				{/* CTA Buttons */}
				<ScrollReveal effect="fade-up" delay={400}>
					<div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
						<Link
							href={route('products.index')}
							className="inline-flex items-center justify-center rounded-full bg-[#FFDE42] hover:bg-[#F2D02B] text-[#111FA2] px-8 py-4 text-xs font-extrabold tracking-[0.14em] uppercase hover:shadow-lg hover:shadow-[#FFDE42]/30 transition-all shadow-xl active:scale-95 group"
						>
							<span>LIHAT PRODUK & HARGA</span>
							<ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</Link>

						<a
							href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo%20Stiker,%20saya%20ingin%20konsultasi%20pemasangan%20material%20dekorasi/kaca%20film."
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-8 py-4 text-xs font-bold tracking-[0.14em] uppercase hover:bg-white/20 transition-all shadow-md active:scale-95"
						>
							<MessageCircle className="mr-2 h-4 w-4 text-[#53CBF3]" />
							<span>KONSULTASI WHATSAPP</span>
						</a>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}
