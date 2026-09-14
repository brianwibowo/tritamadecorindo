import ScrollReveal from '@/Components/UI/ScrollReveal';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, MessageCircle, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const gallerySlides = [
	{
		image: '/images/products/kaca-film-sparta.webp',
		title: 'Pemasangan Kaca Film Sparta Facade Kantor',
		tag: 'Kaca Film Tolak Panas 99%',
	},
	{
		image: '/images/products/sandblast-cutting-logo.webp',
		title: 'Sandblast Cutting Logo Partisi Kaca Kantor',
		tag: 'Branding & Privasi Ruang Kerja',
	},
	{
		image: '/images/products/huruf-timbul-akrilik.webp',
		title: 'Huruf Timbul Laser Akrilik LED Backlight Lobby',
		tag: 'Signage & Facade Modern',
	},
	{
		image: '/images/products/kaca-film-oneway.webp',
		title: 'Kaca Film One Way Vision Reflektif Gedung',
		tag: 'Privasi Siang Hari & Tolak Panas',
	},
	{
		image: '/images/products/wallpaper-custom-3d.webp',
		title: 'Instalasi Wallpaper Dinding Custom 3D',
		tag: 'Dekorasi Interior Modern',
	},
];

export default function HeroSection() {
	const [activeIndex, setActiveIndex] = useState(0);

	// Automatic gentle slide transition every 5.5s
	useEffect(() => {
		const timer = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % gallerySlides.length);
		}, 5500);
		return () => clearInterval(timer);
	}, []);

	return (
		<section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-end items-start overflow-hidden rounded-b-[40px] sm:rounded-b-[60px] bg-[#080E4E] shadow-2xl pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-14 border-b border-[#5478FF]/20">
			{/* 1. Rotating Tritama Gallery Background Images */}
			<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
				{gallerySlides.map((slide, idx) => (
					<div
						key={slide.image}
						className={cn(
							'absolute inset-0 transition-all duration-1000 ease-in-out',
							idx === activeIndex
								? 'opacity-65 scale-100'
								: 'opacity-0 scale-105 pointer-events-none'
						)}
					>
						<img
							src={slide.image}
							alt={slide.title}
							className="h-full w-full object-cover object-center"
						/>
					</div>
				))}

				{/* Deep navy and dark gradients for 100% crystal-clear readability */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#080E4E] via-[#0D1780]/70 to-[#111FA2]/80" />
				<div className="absolute inset-0 bg-gradient-to-t from-[#080E4E] via-[#080E4E]/85 to-transparent" />
				<div className="absolute inset-0 bg-gradient-to-r from-[#080E4E]/95 via-[#080E4E]/60 to-transparent" />
			</div>

			{/* 2. Bottom-Left Hero Copy Block (Following Gambar 2) */}
			<div className="relative z-10 w-full max-w-4xl">
				{/* Top Subtitle with Star Icon */}
				<ScrollReveal effect="fade-up" delay={100}>
					<div className="flex items-start gap-2.5 max-w-2xl mb-4 sm:mb-5">
						<Star className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFDE42] fill-[#FFDE42] shrink-0 mt-0.5" />
						<p className="text-xs sm:text-sm lg:text-base text-slate-200 font-medium leading-relaxed">
							Material Berkualitas & Jasa Pemasangan <strong className="text-[#FFDE42] font-bold">Kaca Film Gedung, Sandblast Cutting Logo, Wallpaper, Roller Blinds & Signage</strong> bergaransi sejak 2009 di Jabodetabek.
						</p>
					</div>
				</ScrollReveal>

				{/* Giant H1 with Circular Arrow Button */}
				<ScrollReveal effect="fade-up" delay={200}>
					<div className="flex flex-wrap items-end gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-4xl">
						<h1 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.06]">
							Solusi Dekorasi, Kaca Film &{' '}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFDE42] via-[#53CBF3] to-white">
								Branding Visual.
							</span>
						</h1>
						<Link
							href={route('products.index')}
							className="inline-flex h-11 w-11 sm:h-13 sm:w-13 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-[#FFDE42] text-[#111FA2] hover:bg-[#F2D02B] hover:scale-110 active:scale-95 transition-all shadow-xl shadow-[#FFDE42]/25 shrink-0 mb-1"
							title="Lihat Semua Produk & Harga"
						>
							<ArrowUpRight className="h-5 w-5 sm:h-7 sm:w-7 stroke-[2.5]" />
						</Link>
					</div>
				</ScrollReveal>

				{/* Action Buttons (Following Gambar 2) */}
				<ScrollReveal effect="fade-up" delay={300}>
					<div className="flex flex-wrap items-center gap-3 sm:gap-4">
						<Link
							href={route('products.index')}
							className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFDE42] hover:bg-[#F2D02B] text-[#111FA2] px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider hover:shadow-lg hover:shadow-[#FFDE42]/30 transition-all shadow-md active:scale-95 group"
						>
							<span>Lihat Produk & Harga</span>
							<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</Link>

						<a
							href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo%20Stiker,%20saya%20ingin%20konsultasi%20pemasangan%20material%20dekorasi/kaca%20film."
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-white px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
						>
							<MessageCircle className="h-4 w-4 text-[#53CBF3]" />
							<span>Konsultasi WhatsApp</span>
							<ArrowRight className="h-4 w-4" />
						</a>
					</div>
				</ScrollReveal>
			</div>

			{/* 3. Subtle Gallery Slides Indicator on Bottom Right (No "Nomor Alat") */}
			<div className="absolute right-6 sm:right-10 lg:right-14 bottom-12 sm:bottom-16 hidden sm:flex flex-col items-end gap-2 text-right">
				<span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
					Dokumentasi Galeri Real
				</span>
				<span className="text-xs font-semibold text-[#FFDE42] max-w-xs truncate">
					{gallerySlides[activeIndex].title}
				</span>
				<div className="flex items-center gap-1.5 pt-1">
					{gallerySlides.map((_, i) => (
						<button
							key={i}
							onClick={() => setActiveIndex(i)}
							className={cn(
								'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
								i === activeIndex ? 'w-7 bg-[#FFDE42]' : 'w-2 bg-white/30 hover:bg-white/60'
							)}
							aria-label={`Slide ${i + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
