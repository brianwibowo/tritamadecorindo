import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
	return (
		<section className="relative w-full min-h-[calc(100vh-36px)] sm:min-h-screen flex flex-col justify-between items-center text-center overflow-hidden rounded-b-[48px] sm:rounded-b-[80px] bg-[#1a0203] shadow-2xl pb-10 sm:pb-14 pt-8 sm:pt-12">
			{/* Fullscreen background image with luxury spice vignette */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<img
					src="/scraped-5.jpg"
					alt="PT LFM Global Jayatama Indonesian Spices"
					className="h-full w-full object-cover object-center opacity-70 mix-blend-luminosity scale-105 transition-transform duration-1000"
				/>
				{/* Dark radial & vertical cinematic overlays */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#1a0203] via-[#1a0203]/65 to-[#1a0203]" />
				<div className="absolute inset-0 bg-radial-at-c from-transparent via-[#1a0203]/40 to-[#1a0203]/90" />
			</div>

			{/* 1. Top Pill Badge */}
			<div className="relative z-10 pt-4 sm:pt-6">
				<div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 px-4 py-1.5 text-xs tracking-[0.22em] uppercase font-semibold text-white/90 shadow-sm">
					<span className="h-2 w-2 rounded-full bg-[#F8C300] animate-pulse" />
					<span>INDONESIAN PREMIUM SPICES EXPORTER</span>
				</div>
			</div>

			{/* 2. Center Hero Copy Block (Spacious, Elegant & True Fullscreen Proportion) */}
			<div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 my-auto py-8 sm:py-12 space-y-6 sm:space-y-8">
				{/* Big Center Headline */}
				<h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.06] font-normal tracking-tight text-white">
					Rempah Nusantara, <br />
					<span className="italic font-normal text-[#F8C300]">Standar Industri Dunia</span>
				</h1>

				{/* Centered Description */}
				<p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto font-sans leading-relaxed font-light">
					PT LFM Global Jayatama menyediakan pasokan Cengkeh Maluku, Biji Pala Banda, Kayu Manis Kerinci, dan Vanilla Beans berkualitas ekspor dengan standar mutu internasional untuk pasar global.
				</p>

				{/* Centered CTA Buttons */}
				<div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
					<Link
						href={route('products.index')}
						className="inline-flex items-center justify-center rounded-full bg-white text-[#1a0203] px-9 py-4 text-xs font-bold tracking-[0.16em] uppercase hover:bg-[#F8C300] hover:text-[#1a0203] transition-all shadow-2xl active:scale-95"
					>
						<span>KATALOG REMPAH</span>
						<ArrowUpRight className="ml-2 h-4 w-4" />
					</Link>

					<a
						href="#story"
						className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-white px-9 py-4 text-xs font-bold tracking-[0.16em] uppercase hover:bg-white/20 transition-all shadow-md active:scale-95"
					>
						<span>PROFIL PERUSAHAAN</span>
						<ArrowRight className="ml-2 h-4 w-4 text-[#F8C300]" />
					</a>
				</div>
			</div>

			{/* 3. Bottom Spices Commodity Badges */}
			<div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-2">
				<div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs tracking-wider uppercase text-white/70">
					<span className="text-[#F8C300] font-bold">Komoditas Utama:</span>
					<span>Cengkeh Lalpari</span>
					<span className="text-white/30">•</span>
					<span>Pala Banda ABCD</span>
					<span className="text-white/30">•</span>
					<span>Kayu Manis Kerinci</span>
					<span className="text-white/30">•</span>
					<span>Vanilla Gourmet</span>
				</div>
			</div>
		</section>
	);
}
