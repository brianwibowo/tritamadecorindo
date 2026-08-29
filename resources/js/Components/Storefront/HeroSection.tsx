import { ArrowUpRight, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
	return (
		<section className="relative w-full min-h-[calc(100vh-36px)] sm:min-h-screen flex flex-col justify-between items-center text-center overflow-hidden rounded-b-[40px] sm:rounded-b-[64px] bg-[#0B0F17] shadow-2xl pb-10 sm:pb-14 pt-8 sm:pt-12 border-b border-slate-800">
			{/* Fullscreen background image */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<img
					src="/images/products/kaca-film-sparta.webp"
					alt="Tritama Decorindo Stiker Kaca Film dan Interior"
					className="h-full w-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/80 to-[#0B0F17]/90" />
			</div>

			{/* Center Hero Copy Block */}
			<div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 my-auto py-8 sm:py-12 space-y-6 sm:space-y-8">
				{/* Badge */}
				<div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold text-[#38BDF8] uppercase tracking-wider backdrop-blur-md">
					<ShieldCheck className="h-4 w-4" />
					<span>Material Berkualitas & Jasa Pemasangan Bergaransi Sejak 2009</span>
				</div>

				{/* Headline */}
				<h1 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.12] font-bold tracking-tight text-white">
					Solusi Dekorasi, Kaca Film & <br />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#0284C7] to-cyan-300 font-extrabold">
						Branding Visual Ruang
					</span>
				</h1>

				{/* Description */}
				<p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed font-normal">
					Melayani penjualan material dan jasa pasang Kaca Film, Sandblast Cutting Logo, Wallpaper Dinding, Roller Blinds, Huruf Timbul LED, dan Gorden untuk rumah, kantor, ruko, dan gedung di Jabodetabek.
				</p>

				{/* CTA Buttons */}
				<div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
					<Link
						href={route('products.index')}
						className="inline-flex items-center justify-center rounded-full bg-[#0284C7] text-white px-8 py-4 text-xs font-bold tracking-[0.14em] uppercase hover:bg-[#0369a1] hover:shadow-lg hover:shadow-cyan-500/25 transition-all shadow-xl active:scale-95"
					>
						<span>LIHAT PRODUK & HARGA</span>
						<ArrowUpRight className="ml-2 h-4 w-4" />
					</Link>

					<a
						href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo%20Stiker,%20saya%20ingin%20konsultasi%20pemasangan%20material%20dekorasi/kaca%20film."
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white px-8 py-4 text-xs font-bold tracking-[0.14em] uppercase hover:bg-white/20 transition-all shadow-md active:scale-95"
					>
						<MessageCircle className="mr-2 h-4 w-4 text-[#38BDF8]" />
						<span>KONSULTASI WHATSAPP</span>
					</a>
				</div>
			</div>

			{/* Bottom Badges */}
			<div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-2">
				<div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs tracking-wider uppercase text-slate-300">
					<span className="text-[#38BDF8] font-bold">Layanan Kami:</span>
					<span className="hover:text-white transition-colors">Kaca Film Tolak Panas</span>
					<span className="text-white/20">•</span>
					<span className="hover:text-white transition-colors">Sandblast Cutting Logo</span>
					<span className="text-white/20">•</span>
					<span className="hover:text-white transition-colors">Wallpaper 3D & Roll</span>
					<span className="text-white/20">•</span>
					<span className="hover:text-white transition-colors">Huruf Timbul LED</span>
					<span className="text-white/20">•</span>
					<span className="hover:text-white transition-colors">Roller Blinds & Gorden</span>
				</div>
			</div>
		</section>
	);
}
