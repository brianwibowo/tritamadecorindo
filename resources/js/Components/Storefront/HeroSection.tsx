import ScrollReveal from '@/Components/UI/ScrollReveal';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
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
		<section className="relative w-full min-h-[calc(100vh-37px)] flex flex-col justify-end items-start overflow-hidden rounded-b-[40px] sm:rounded-b-[56px] bg-slate-950 shadow-2xl pb-12 sm:pb-16 lg:pb-20 pt-28 sm:pt-36 px-4 sm:px-8 lg:px-14 border-b border-[#5478FF]/25">
			{/* 1. Rotating Tritama Gallery Background Images */}
			<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
				{gallerySlides.map((slide, idx) => (
					<div
						key={slide.image}
						className={cn(
							'absolute inset-0 transition-all duration-1000 ease-in-out',
							idx === activeIndex
								? 'opacity-100 scale-100'
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

				{/* 2. Photo-Highlighting Spotlight & Framing Gradients */}
				{/* Ambient spotlight highlight over the photo subject */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

				{/* Radial vignette keeping center 100% crisp & bright while framing the edges */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,transparent_45%,rgba(8,14,78,0.5)_100%)]" />

				{/* Subtle bottom gradient to make the H1 copy pop */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#080E4E]/90 via-[#080E4E]/35 to-transparent" />

				{/* Soft left shade behind text */}
				<div className="absolute inset-0 bg-gradient-to-r from-[#080E4E]/75 via-transparent to-transparent max-w-3xl" />
			</div>

			{/* 2. Bottom-Left Hero Copy Block (Following Gambar 2) */}
			<div className="relative z-10 w-full max-w-4xl">
				{/* Top Subtitle with Star Icon */}
				<ScrollReveal effect="fade-up" delay={100}>
					<div className="flex items-start gap-2.5 max-w-2xl mb-4 sm:mb-5">
						<Star className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFDE42] fill-[#FFDE42] shrink-0 mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
						<p className="text-xs sm:text-sm lg:text-base text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
							Material Berkualitas & Jasa Pemasangan <strong className="text-[#FFDE42] font-bold">Kaca Film Gedung, Sandblast Cutting Logo, Wallpaper, Roller Blinds & Signage</strong> bergaransi sejak 2009 di Jabodetabek.
						</p>
					</div>
				</ScrollReveal>

				{/* Giant H1 */}
				<ScrollReveal effect="fade-up" delay={200}>
					<div className="max-w-4xl">
						<h1 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.06] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
							Solusi Dekorasi, Kaca Film &{' '}
							<span className="text-[#FFDE42] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
								Stiker Interior.
							</span>
						</h1>
					</div>
				</ScrollReveal>
			</div>

			{/* 3. Subtle Gallery Slides Indicator on Bottom Right */}
			<div className="absolute right-6 sm:right-10 lg:right-14 bottom-12 sm:bottom-16 hidden sm:flex flex-col items-end gap-2 text-right z-10">
				<span className="text-xs font-semibold text-[#FFDE42] max-w-xs truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
					{gallerySlides[activeIndex].title}
				</span>
				<div className="flex items-center gap-1.5 pt-1">
					{gallerySlides.map((_, i) => (
						<button
							key={i}
							onClick={() => setActiveIndex(i)}
							className={cn(
								'h-1.5 rounded-full transition-all duration-300 cursor-pointer shadow-md',
								i === activeIndex ? 'w-7 bg-[#FFDE42]' : 'w-2 bg-white/60 hover:bg-white'
							)}
							aria-label={`Slide ${i + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
