import AnnouncementBar from '@/Components/Storefront/AnnouncementBar';
import Footer from '@/Components/Storefront/Footer';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Layers, Menu, Shield, X, XCircle } from 'lucide-react';
import { PropsWithChildren, useEffect, useState } from 'react';
import type { PageProps } from '@/types';

export default function StorefrontLayout({ children }: PropsWithChildren) {
	const { auth, flash } = usePage<PageProps>().props;
	const { url } = usePage();
	const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const isHomePage = url === '/' || url === '';

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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
		{ href: '/', label: 'Beranda' },
		{ href: route('products.index'), label: 'Produk' },
		{ href: route('gallery.index'), label: 'Galeri' },
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
		<div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-[#0284C7] selection:text-white font-sans antialiased">
			{/* Top Announcement Bar */}
			<AnnouncementBar />

			{/* Sticky Header with Smart Page & Scroll Detection */}
			<header
				className={cn(
					'sticky top-0 z-50 transition-all duration-300 w-full',
					isDarkTopHeader
						? 'border-none bg-[#0B0F17] text-white py-1 shadow-none'
						: 'border-b border-border/80 bg-background/95 backdrop-blur-xl shadow-sm text-foreground py-0'
				)}
			>
				<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
					<div className="flex items-center justify-between h-20">
						{/* Left Side: Logo */}
						<Link href="/" className="flex items-center gap-3 group">
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0284C7] text-white shadow-md transition-transform group-hover:scale-105 ring-1 ring-white/20">
								<Layers className="h-6 w-6" />
							</div>
							<div className="flex flex-col">
								<span
									className={cn(
										'font-display text-xl sm:text-2xl font-bold tracking-tight leading-none transition-colors',
										isDarkTopHeader ? 'text-white' : 'text-[#0F172A]'
									)}
								>
									Tritama Decorindo
								</span>
								<span
									className={cn(
										'text-[10px] tracking-[0.2em] font-semibold uppercase mt-0.5 transition-colors',
										isDarkTopHeader ? 'text-[#38BDF8]' : 'text-muted-foreground'
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
										: 'bg-secondary/60 border border-border/60 text-foreground'
								)}
							>
								{navLinks.map((link) => {
									const active = isLinkActive(link.href);
									return (
										<Link
											key={link.label}
											href={link.href}
											className={cn(
												'h-9 px-5 rounded-full flex items-center text-sm font-semibold whitespace-nowrap transition-all',
												active
													? 'bg-[#0284C7] text-white shadow-md'
													: isDarkTopHeader
													? 'text-white/90 hover:text-white hover:bg-white/15'
													: 'text-foreground hover:text-[#0284C7] hover:bg-black/5'
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
										className="h-9 px-4 rounded-full flex items-center gap-1.5 bg-[#0284C7] text-xs font-semibold text-white shadow-sm hover:brightness-110 transition-all ml-1 border border-white/20"
										title="Buka Panel Admin di Tab Baru"
									>
										<Shield className="h-3.5 w-3.5 text-[#38BDF8]" />
										<span>{auth.user.role === 'admin' ? 'Panel Admin' : auth.user.name.split(' ')[0]}</span>
										<ArrowRight className="h-3 w-3" />
									</a>
								) : (
									<a
										href={route('login')}
										target="_blank"
										rel="noopener noreferrer"
										className="h-9 px-4 rounded-full flex items-center gap-1.5 bg-[#0284C7] text-xs font-semibold text-white shadow-sm hover:brightness-110 active:scale-95 transition-all ml-1 border border-white/20"
										title="Buka Login Admin di Tab Baru"
									>
										<Shield className="h-3.5 w-3.5 text-[#38BDF8]" />
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
										'hidden sm:inline-block text-xs underline pl-1 transition-colors',
										isDarkTopHeader ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
									)}
								>
									Keluar
								</Link>
							)}

							{/* Mobile Menu Toggle */}
							<button
								type="button"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className={cn(
									'sm:hidden rounded-full p-2.5 border shadow-sm transition-colors',
									isDarkTopHeader
										? 'bg-white/10 border-white/20 text-white'
										: 'bg-white border-border text-foreground'
								)}
								aria-label="Toggle Menu"
							>
								{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu Sheet */}
				{mobileMenuOpen && (
					<div className="sm:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-2 text-foreground">
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								onClick={() => setMobileMenuOpen(false)}
								className={cn(
									'block rounded-xl px-4 py-2.5 text-sm font-semibold',
									isLinkActive(link.href)
										? 'bg-[#0284C7] text-white'
										: 'text-foreground hover:bg-secondary'
								)}
							>
								{link.label}
							</Link>
						))}

						<div className="pt-3 border-t border-border/40">
							{auth?.user ? (
								<div className="flex items-center justify-between">
									<a
										href={auth.user.role === 'admin' ? route('admin.dashboard') : route('profile.edit')}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1.5 text-xs font-semibold text-[#0284C7]"
									>
										<Shield className="h-3.5 w-3.5 text-[#38BDF8]" />
										<span>{auth.user.role === 'admin' ? 'Panel Admin' : auth.user.name}</span>
										<ArrowRight className="h-3.5 w-3.5" />
									</a>
									<Link
										href={route('logout')}
										method="post"
										as="button"
										className="text-xs text-red-600 font-bold"
									>
										Keluar
									</Link>
								</div>
							) : (
								<a
									href={route('login')}
									target="_blank"
									rel="noopener noreferrer"
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0284C7] py-2.5 text-xs font-semibold text-white shadow-sm"
								>
									<Shield className="h-3.5 w-3.5 text-[#38BDF8]" />
									<span>Login Admin</span>
									<ArrowRight className="h-3.5 w-3.5" />
								</a>
							)}
						</div>
					</div>
				)}
			</header>

			{/* Main Page Content */}
			<main className="flex-1">{children}</main>

			{/* Footer */}
			<Footer />

			{/* Toast Notification */}
			{toast && (
				<div
					className={cn(
						'fixed bottom-6 right-6 z-[100] max-w-sm rounded-2xl px-5 py-3.5 text-sm font-medium text-white shadow-2xl transition-all',
						toast.type === 'success' ? 'bg-[#0F172A] text-[#38BDF8] border border-[#38BDF8]' : 'bg-red-700'
					)}
				>
					<div className="flex items-center gap-2.5">
						{toast.type === 'success' ? (
							<CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
						) : (
							<XCircle className="h-4 w-4 text-white" />
						)}
						<span className="text-white">{toast.message}</span>
						<button onClick={() => setToast(null)} className="ml-auto text-white/70 hover:text-white text-xs pl-2">
							<X className="h-3.5 w-3.5" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
