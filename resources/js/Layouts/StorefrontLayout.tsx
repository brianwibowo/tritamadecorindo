import AnnouncementBar from '@/Components/Storefront/AnnouncementBar';
import FloatingWhatsApp from '@/Components/Storefront/FloatingWhatsApp';
import Footer from '@/Components/Storefront/Footer';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import {
	ArrowRight,
	ArrowUp,
	CheckCircle2,
	ChevronRight,
	Home,
	Images,
	Layers,
	MapPin,
	Menu,
	MessageCircle,
	Package,
	Phone,
	Shield,
	Sparkles,
	X,
	XCircle
} from 'lucide-react';
import { PropsWithChildren, useEffect, useState } from 'react';
import type { PageProps } from '@/types';

export default function StorefrontLayout({ children }: PropsWithChildren) {
	const { auth, flash } = usePage<PageProps>().props;
	const { url } = usePage();
	const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [isNavigating, setIsNavigating] = useState(false);

	const isHomePage = url === '/' || url === '';

	// Inertia Navigation loading bar
	useEffect(() => {
		const unregisterStart = router.on('start', () => setIsNavigating(true));
		const unregisterFinish = router.on('finish', () => setIsNavigating(false));
		return () => {
			unregisterStart();
			unregisterFinish();
		};
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
			setShowScrollTop(window.scrollY > 400);
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		try {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		} catch {
			window.scrollTo(0, 0);
		}
	};

	// Lock scroll when mobile side menu is open
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && mobileMenuOpen) {
				setMobileMenuOpen(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [mobileMenuOpen]);

	useEffect(() => {
		if (flash?.success) {
			setToast({ type: 'success', message: flash.success });
		} else if (flash?.error) {
			setToast({ type: 'error', message: flash.error });
		}
	}, [flash?.success, flash?.error]);

	useEffect(() => {
		if (toast) {
			const timer = setTimeout(() => setToast(null), 4000);
			return () => clearTimeout(timer);
		}
	}, [toast]);

	const navLinks = [
		{ href: '/', label: 'Beranda', icon: Home },
		{ href: route('products.index'), label: 'Produk & Harga', icon: Package },
		{ href: route('gallery.index'), label: 'Galeri Proyek', icon: Images },
	];

	const isLinkActive = (href: string) => {
		try {
			let targetPath = href;
			if (href.startsWith('http://') || href.startsWith('https://')) {
				targetPath = new URL(href).pathname;
			}
			const currentPath = url.split('?')[0];
			if (targetPath === '/') return currentPath === '/' || currentPath === '';
			return currentPath.startsWith(targetPath);
		} catch {
			return false;
		}
	};

	// Determine whether to use dark overlay header on top of homepage vs solid theme header
	const isDarkTopHeader = isHomePage && !isScrolled;

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-[#5478FF] selection:text-white font-sans antialiased">
			{/* Top Inertia Page Navigation Progress Bar */}
			{isNavigating && (
				<div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent overflow-hidden">
					<div className="h-full bg-gradient-to-r from-[#FFDE42] via-[#53CBF3] to-[#5478FF] animate-pulse w-full shadow-[0_0_12px_#5478FF]" />
				</div>
			)}

			{/* Top Announcement Bar */}
			<AnnouncementBar />

			{/* Sticky Header with Smart Page & Scroll Detection */}
			<header
				className={cn(
					'sticky top-0 z-50 transition-all duration-300 w-full',
					isDarkTopHeader
						? 'border-none bg-[#111FA2] text-white py-1 shadow-none'
						: 'border-b border-border/80 bg-background/95 backdrop-blur-xl shadow-sm text-foreground py-0'
				)}
			>
				<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
					<div className="flex items-center justify-between h-20">
						{/* Left Side: Logo */}
						<Link href="/" className="flex items-center gap-3 group">
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5478FF] text-white shadow-md transition-transform group-hover:scale-105 ring-1 ring-white/20">
								<Layers className="h-6 w-6" />
							</div>
							<div className="flex flex-col">
								<span
									className={cn(
										'font-display text-xl sm:text-2xl font-bold tracking-tight leading-none transition-colors',
										isDarkTopHeader ? 'text-white' : 'text-[#111FA2]'
									)}
								>
									Tritama Decorindo
								</span>
								<span
									className={cn(
										'text-[10px] tracking-[0.2em] font-bold uppercase mt-0.5 transition-colors',
										isDarkTopHeader ? 'text-[#FFDE42]' : 'text-slate-500'
									)}
								>
									Stiker & Interior • Sejak 2009
								</span>
							</div>
						</Link>

						{/* Right Side: Main Navigation Pill Capsule: Beranda, Produk, Galeri, Login Admin */}
						<div className="flex items-center gap-3">
							<nav
								className={cn(
									'hidden sm:flex items-center gap-1.5 p-1.5 rounded-full shadow-sm transition-all duration-300',
									isDarkTopHeader
										? 'bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl'
										: 'bg-secondary/80 border border-border/60 text-foreground'
								)}
							>
								{navLinks.map((link) => {
									const active = isLinkActive(link.href);
									return (
										<Link
											key={link.label}
											href={link.href}
											className={cn(
												'h-9 px-5 rounded-full flex items-center text-sm font-bold whitespace-nowrap transition-all',
												active
													? 'bg-[#5478FF] text-white shadow-md'
													: isDarkTopHeader
													? 'text-white/90 hover:text-white hover:bg-white/15'
													: 'text-[#111FA2] hover:text-[#5478FF] hover:bg-black/5'
											)}
										>
											{link.label}
										</Link>
									);
								})}

								{/* Login Admin Button */}
								{auth?.user ? (
									<a
										href={auth.user.role === 'admin' ? route('admin.dashboard') : route('profile.edit')}
										target="_blank"
										rel="noopener noreferrer"
										className="h-9 px-4 rounded-full flex items-center gap-1.5 bg-[#5478FF] text-xs font-bold text-white shadow-sm hover:brightness-110 transition-all ml-1 border border-white/20"
										title="Buka Panel Admin di Tab Baru"
									>
										<Shield className="h-3.5 w-3.5 text-[#FFDE42]" />
										<span>{auth.user.role === 'admin' ? 'Panel Admin' : auth.user.name.split(' ')[0]}</span>
										<ArrowRight className="h-3 w-3" />
									</a>
								) : (
									<a
										href={route('login')}
										target="_blank"
										rel="noopener noreferrer"
										className="h-9 px-4 rounded-full flex items-center gap-1.5 bg-[#5478FF] text-xs font-bold text-white shadow-sm hover:brightness-110 active:scale-95 transition-all ml-1 border border-white/20"
										title="Buka Login Admin di Tab Baru"
									>
										<Shield className="h-3.5 w-3.5 text-[#FFDE42]" />
										<span>Login Admin</span>
										<ArrowRight className="h-3 w-3" />
									</a>
								)}
							</nav>

							{/* Logout button if authenticated */}
							{auth?.user && (
								<Link
									href={route('logout')}
									method="post"
									as="button"
									className={cn(
										'hidden sm:inline-block text-xs underline pl-1 transition-colors font-medium',
										isDarkTopHeader ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-[#111FA2]'
									)}
								>
									Keluar
								</Link>
							)}

							{/* Mobile Menu Toggle Button */}
							<button
								type="button"
								onClick={() => setMobileMenuOpen(true)}
								className={cn(
									'sm:hidden rounded-full p-2.5 border shadow-sm transition-colors cursor-pointer',
									isDarkTopHeader
										? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
										: 'bg-white border-border text-[#111FA2] hover:bg-slate-100'
								)}
								aria-label="Buka Menu Navigasi Samping"
							>
								<Menu className="h-6 w-6" />
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* ========================================================================= */}
			{/* MOBILE SLIDE-OVER SIDEBAR / DRAWER MENU */}
			{/* ========================================================================= */}
			{mobileMenuOpen && (
				<div className="fixed inset-0 z-[100] sm:hidden">
					{/* Backdrop Blur Overlay */}
					<div
						className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in transition-opacity"
						onClick={() => setMobileMenuOpen(false)}
					/>

					{/* Side Drawer Panel */}
					<div className="fixed top-0 bottom-0 right-0 w-[300px] max-w-[85vw] bg-white shadow-2xl z-10 flex flex-col justify-between p-6 animate-in slide-in-from-right duration-300 ease-out border-l border-slate-200">
						{/* Top Header inside Drawer */}
						<div className="space-y-6">
							<div className="flex items-center justify-between border-b border-slate-100 pb-4">
								<div className="flex items-center gap-2.5">
									<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111FA2] text-white shadow-sm">
										<Layers className="h-5 w-5 text-[#FFDE42]" />
									</div>
									<div>
										<h4 className="font-bold text-sm text-[#111FA2] leading-tight">Tritama Decorindo</h4>
										<p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Stiker & Interior</p>
									</div>
								</div>
								<button
									type="button"
									onClick={() => setMobileMenuOpen(false)}
									className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
									aria-label="Tutup Menu"
								>
									<X className="h-5 w-5" />
								</button>
							</div>

							{/* Navigation Links List */}
							<div className="space-y-2">
								<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3">
									Menu Navigasi
								</p>
								{navLinks.map((link) => {
									const active = isLinkActive(link.href);
									const Icon = link.icon;
									return (
										<Link
											key={link.label}
											href={link.href}
											onClick={() => setMobileMenuOpen(false)}
											className={cn(
												'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all',
												active
													? 'bg-[#111FA2] text-[#FFDE42] shadow-md'
													: 'text-slate-800 hover:bg-slate-100'
											)}
										>
											<div className="flex items-center gap-3">
												<Icon className={cn('h-4 w-4', active ? 'text-[#FFDE42]' : 'text-[#5478FF]')} />
												<span>{link.label}</span>
											</div>
											<ChevronRight className={cn('h-4 w-4', active ? 'text-[#FFDE42]' : 'text-slate-400')} />
										</Link>
									);
								})}
							</div>

							{/* Quick Info & Consultation Box */}
							<div className="rounded-2xl bg-gradient-to-br from-[#111FA2] to-[#080E4E] p-4 text-white shadow-md border border-[#5478FF]/20 space-y-2.5">
								<div className="flex items-center gap-1.5 text-[11px] font-bold text-[#FFDE42]">
									<Sparkles className="h-3.5 w-3.5" />
									<span>Layanan Area Jabodetabek</span>
								</div>
								<p className="text-[11px] text-slate-300 leading-relaxed">
									Konsultasi material & jadwal survey lokasi langsung dengan teknisi kami.
								</p>
								<a
									href="https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo%20Stiker,%20saya%20ingin%20konsultasi%20pemasangan%20material%20dekorasi/kaca%20film."
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFDE42] py-2.5 text-xs font-extrabold text-[#111FA2] hover:bg-[#F2D02B] active:scale-95 transition-all shadow-sm"
								>
									<MessageCircle className="h-4 w-4" />
									<span>Chat WhatsApp Admin</span>
								</a>
							</div>
						</div>

						{/* Bottom Footer & Auth inside Drawer */}
						<div className="pt-4 border-t border-slate-100 space-y-3">
							{auth?.user ? (
								<div className="space-y-2">
									<a
										href={auth.user.role === 'admin' ? route('admin.dashboard') : route('profile.edit')}
										target="_blank"
										rel="noopener noreferrer"
										className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5478FF] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#4064EB]"
									>
										<Shield className="h-4 w-4 text-[#FFDE42]" />
										<span>{auth.user.role === 'admin' ? 'Masuk Panel Admin' : auth.user.name}</span>
										<ArrowRight className="h-3.5 w-3.5" />
									</a>
									<Link
										href={route('logout')}
										method="post"
										as="button"
										className="block w-full text-center text-xs text-red-600 font-bold py-1 hover:underline"
									>
										Keluar dari Akun
									</Link>
								</div>
							) : (
								<a
									href={route('login')}
									target="_blank"
									rel="noopener noreferrer"
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 py-2.5 text-xs font-bold text-[#111FA2] transition-colors"
								>
									<Shield className="h-4 w-4 text-[#5478FF]" />
									<span>Login Admin</span>
									<ArrowRight className="h-3.5 w-3.5" />
								</a>
							)}

							<p className="text-center text-[10px] text-slate-400">
								© {new Date().getFullYear()} Tritama Decorindo Stiker
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Flash / Toast Notifications */}
			{toast && (
				<div className="fixed bottom-6 left-6 z-50 animate-fade-in">
					<div
						className={cn(
							'flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl border backdrop-blur-md text-xs font-bold transition-all',
							toast.type === 'success'
								? 'bg-[#111FA2] text-white border-[#5478FF]/40'
								: 'bg-red-950/90 text-white border-red-500/40'
						)}
					>
						{toast.type === 'success' ? (
							<CheckCircle2 className="h-5 w-5 text-[#FFDE42]" />
						) : (
							<XCircle className="h-5 w-5 text-red-400" />
						)}
						<span>{toast.message}</span>
						<button
							onClick={() => setToast(null)}
							className="ml-2 rounded-full p-1 hover:bg-white/10"
						>
							<X className="h-3.5 w-3.5" />
						</button>
					</div>
				</div>
			)}

			{/* 2. Main Content Curtain (Tirai yang menutupi footer dan terangkat saat di-scroll ke bawah) */}
			<main className="relative z-10 flex-1 bg-background shadow-[0_35px_70px_-15px_rgba(0,0,0,0.5)]">
				{children}
			</main>

			{/* 3. Sticky Curtain Reveal Footer (Menempel di dasar layar di belakang main content) */}
			<Footer />

			{/* Floating WhatsApp Consultation */}
			<FloatingWhatsApp />

			{/* Scroll To Top Button (Permanently on bottom-left corner) */}
			<button
				type="button"
				onClick={scrollToTop}
				aria-label="Scroll ke atas"
				className={cn(
					'fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#111FA2] shadow-2xl border border-slate-200/80 transition-all duration-300 hover:bg-[#FFDE42] hover:text-[#111FA2] hover:scale-110 active:scale-95 cursor-pointer touch-manipulation',
					showScrollTop
						? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
						: 'translate-y-8 opacity-0 scale-75 pointer-events-none'
				)}
				title="Kembali ke Atas"
			>
				<ArrowUp className="h-5 w-5 stroke-[2.5]" />
			</button>
		</div>
	);
}
