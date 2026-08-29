import useModalGuard from '@/hooks/useModalGuard';
import { cn } from '@/lib/utils';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
	BarChart3,
	Camera,
	CheckCircle2,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ClipboardList,
	Globe,
	Image as ImageIcon,
	Info,
	Layers,
	LogOut,
	Menu,
	Package,
	Shield,
	ShoppingBag,
	Tag,
	User as UserIcon,
	Users,
	X,
	XCircle
} from 'lucide-react';
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import type { PageProps, User } from '@/types';

interface AdminLayoutProps {
	header?: ReactNode;
	children: ReactNode;
}

const navItems = [
	{ label: 'Dashboard', href: '/admin', icon: BarChart3, routeName: 'admin.dashboard' },
	{ label: 'Produk', href: '/admin/products', icon: Package, routeName: 'admin.products.*' },
	{ label: 'Kategori', href: '/admin/categories', icon: Tag, routeName: 'admin.categories.*' },
	{ label: 'Galeri', href: '/admin/galleries', icon: ImageIcon, routeName: 'admin.galleries.*' },
	{ label: 'Arsip Pemesanan', href: '/admin/order-archives', icon: ClipboardList, routeName: 'admin.order-archives.*' },
	{ label: 'Manajemen User', href: '/admin/users', icon: Users, routeName: 'admin.users.*' },
];

export default function AdminLayout({ header, children }: PropsWithChildren<AdminLayoutProps>) {
	const { auth, flash } = usePage<PageProps>().props;
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isNavigating, setIsNavigating] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
		try {
			return localStorage.getItem('tritama_admin_collapsed') === 'true';
		} catch {
			return false;
		}
	});

	// Inertia Navigation loading bar listeners
	useEffect(() => {
		const unregisterStart = router.on('start', () => setIsNavigating(true));
		const unregisterFinish = router.on('finish', () => setIsNavigating(false));
		return () => {
			unregisterStart();
			unregisterFinish();
		};
	}, []);

	// Modals State
	const [logoutModalOpen, setLogoutModalOpen] = useState(false);
	const [profileModalOpen, setProfileModalOpen] = useState(false);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(auth.user.image || null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Toast State
	const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

	// Profile Form
	const {
		data: profileData,
		setData: setProfileData,
		post: postProfile,
		processing: profileProcessing,
		errors: profileErrors,
	} = useForm<{
		name: string;
		email: string;
		phone: string;
		image: File | null;
		_method: string;
	}>({
		name: auth.user.name || '',
		email: auth.user.email || '',
		phone: auth.user.phone || '',
		image: null,
		_method: 'PATCH',
	});

	const isProfileDirty = Boolean(
		profileData.name !== (auth.user.name || '') ||
		profileData.email !== (auth.user.email || '') ||
		profileData.phone !== (auth.user.phone || '') ||
		profileData.image !== null
	);

	const profileGuard = useModalGuard({
		isDirty: isProfileDirty,
		onClose: () => {
			setProfileModalOpen(false);
		},
	});

	const toggleCollapse = () => {
		const nextState = !isCollapsed;
		setIsCollapsed(nextState);
		try {
			localStorage.setItem('tritama_admin_collapsed', String(nextState));
		} catch {}
	};

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

	const isActive = (routeName: string) => {
		try {
			if (routeName.endsWith('.*')) {
				const prefix = routeName.replace('.*', '');
				return route().current()?.startsWith(prefix) ?? false;
			}
			return route().current(routeName);
		} catch {
			return false;
		}
	};

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setProfileData('image', file);
			const reader = new FileReader();
			reader.onload = () => setAvatarPreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleProfileSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		postProfile(route('profile.update'), {
			onSuccess: () => {
				setProfileModalOpen(false);
				setToast({ type: 'success', message: 'Profil dan foto avatar berhasil diperbarui.' });
			},
		});
	};

	return (
		<div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-foreground selection:bg-[#38BDF8]/30">
			{/* Top Inertia Page Loading Progress Bar */}
			{isNavigating && (
				<div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent overflow-hidden">
					<div className="h-full bg-gradient-to-r from-[#FFDE42] via-[#53CBF3] to-[#5478FF] animate-pulse w-full shadow-[0_0_12px_#5478FF]" />
				</div>
			)}

			{/* Mobile sidebar backdrop */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar (Collapsible: w-64 vs w-20) */}
			<aside
				className={cn(
					'fixed inset-y-0 left-0 z-50 transform bg-[#0F172A] text-white transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col justify-between border-r border-white/10 shadow-2xl',
					sidebarOpen ? 'translate-x-0' : '-translate-x-full',
					isCollapsed ? 'lg:w-20' : 'lg:w-64'
				)}
			>
				{/* Top Logo Brand & Toggle */}
				<div>
					<div
						className={cn(
							'flex h-20 items-center border-b border-white/10 px-4 transition-all',
							isCollapsed ? 'justify-center flex-col gap-1.5 py-3 h-auto' : 'justify-between px-5'
						)}
					>
						<Link href="/admin" className="flex items-center gap-3 group">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#5478FF] text-white shadow-md ring-1 ring-white/20 transition-transform group-hover:scale-105">
								<Layers className="h-5 w-5" />
							</div>
							{!isCollapsed && (
								<div className="flex flex-col overflow-hidden">
									<span className="font-display text-base font-bold tracking-tight text-white leading-none">
										Tritama Decorindo
									</span>
									<span className="text-[9px] tracking-[0.16em] font-semibold uppercase text-[#38BDF8] mt-1">
										Admin Panel
									</span>
								</div>
							)}
						</Link>

						{/* Collapse / Expand Toggle Button (Desktop): Shows < when expanded, > when collapsed */}
						<button
							type="button"
							onClick={toggleCollapse}
							className="hidden lg:flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all"
							title={isCollapsed ? 'Perlebar Sidebar (>)' : 'Lipat Sidebar (<)'}
						>
							{isCollapsed ? (
								<ChevronRight className="h-4 w-4 text-[#38BDF8]" />
							) : (
								<ChevronLeft className="h-4 w-4" />
							)}
						</button>
					</div>

					{/* Navigation List */}
					<nav className="mt-6 space-y-1.5 px-3">
						{navItems.map((item) => {
							const Icon = item.icon;
							const active = isActive(item.routeName);
							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										'flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-xs font-semibold transition-all group relative',
										active
											? 'bg-[#5478FF] text-white shadow-lg shadow-cyan-950/40'
											: 'text-white/70 hover:bg-white/10 hover:text-white',
										isCollapsed && 'justify-center px-0'
									)}
									title={isCollapsed ? item.label : undefined}
								>
									<Icon className={cn('h-5 w-5 shrink-0 transition-transform group-hover:scale-110', active && 'text-white')} />
									{!isCollapsed && <span>{item.label}</span>}
									{active && !isCollapsed && (
										<span className="ml-auto h-2 w-2 rounded-full bg-[#38BDF8]" />
									)}
								</Link>
							);
						})}
					</nav>
				</div>

				{/* Bottom Sidebar: Red Logout Button with Confirmation Dialog */}
				<div className="border-t border-white/10 p-3 space-y-2">
					<button
						type="button"
						onClick={() => setLogoutModalOpen(true)}
						className={cn(
							'flex w-full items-center gap-3 rounded-xl bg-red-950/40 border border-red-800/40 px-3.5 py-3 text-xs font-bold text-red-400 hover:bg-red-900/60 hover:text-red-200 transition-all shadow-sm active:scale-95',
							isCollapsed && 'justify-center px-0'
						)}
						title="Keluar dari Panel Admin"
					>
						<LogOut className="h-4 w-4 shrink-0 text-red-400" />
						{!isCollapsed && <span>Logout</span>}
					</button>
				</div>
			</aside>

			{/* Main Content Area */}
			<div className={cn('transition-all duration-300', isCollapsed ? 'lg:pl-20' : 'lg:pl-64')}>
				{/* Top Navigation Bar */}
				<header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border/60 bg-white/90 backdrop-blur-xl px-4 sm:px-8 shadow-sm">
					{/* Left: Mobile Menu Toggle & Title */}
					<div className="flex items-center gap-3">
						<button
							onClick={() => setSidebarOpen(true)}
							className="rounded-xl p-2.5 border border-border text-foreground hover:bg-secondary lg:hidden"
						>
							<Menu className="h-5 w-5" />
						</button>

						{header && <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{header}</div>}
					</div>

					{/* Right: Quick View Storefront & Pill-shaped Profile Badge */}
					<div className="flex items-center gap-3 sm:gap-4">
						{/* Quick View Storefront link */}
						<a
							href="/"
							target="_blank"
							rel="noopener noreferrer"
							className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/60 px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary transition-all shadow-sm"
						>
							<Globe className="h-3.5 w-3.5 text-[#5478FF]" />
							<span>Lihat Toko Publik ↗</span>
						</a>

						{/* Pill-Shaped Admin Profile Badge */}
						<button
							type="button"
							onClick={() => setProfileModalOpen(true)}
							className="inline-flex items-center gap-3 rounded-full border border-border bg-white hover:bg-secondary/60 p-1.5 pr-4 shadow-sm hover:shadow transition-all group"
							title="Klik untuk Kelola Profil & Foto"
						>
							{/* Avatar Thumbnail */}
							<div className="relative h-9 w-9 overflow-hidden rounded-full bg-[#5478FF] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#5478FF]/20">
								{avatarPreview ? (
									<img src={avatarPreview} alt={auth.user.name} className="h-full w-full object-cover" />
								) : (
									<span>{auth.user.name.charAt(0).toUpperCase()}</span>
								)}
							</div>

							{/* Name & Email in Pill */}
							<div className="text-left hidden md:block">
								<p className="text-xs font-bold text-foreground group-hover:text-[#5478FF] transition-colors leading-tight">
									{auth.user.name}
								</p>
								<p className="text-[10px] text-muted-foreground leading-tight">
									{auth.user.email}
								</p>
							</div>

							<ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors ml-0.5" />
						</button>
					</div>
				</header>

				{/* Page Content Container */}
				<main className="p-4 sm:p-8 max-w-7xl mx-auto">
					{children}
				</main>
			</div>

			{/* 1. Modal Konfirmasi Logout */}
			{logoutModalOpen && (
				<div
					className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
					onClick={() => setLogoutModalOpen(false)}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className="relative max-w-md w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up space-y-6"
					>
						<button
							onClick={() => setLogoutModalOpen(false)}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
							<LogOut className="h-6 w-6" />
						</div>

						<div>
							<h3 className="text-xl font-bold text-foreground">
								Konfirmasi Keluar
							</h3>
							<p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
								Apakah Anda yakin ingin keluar dari Panel Administrator Tritama Decorindo?
							</p>
						</div>

						<div className="flex items-center justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={() => setLogoutModalOpen(false)}
								className="rounded-full border border-border px-5 py-2.5 text-xs font-bold text-foreground hover:bg-secondary transition-all"
							>
								Batal
							</button>
							<Link
								href={route('logout')}
								method="post"
								as="button"
								onClick={() => setLogoutModalOpen(false)}
								className="rounded-full bg-red-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-red-700 transition-all shadow-md active:scale-95"
							>
								Ya, Keluar
							</Link>
						</div>
					</div>
				</div>
			)}

			{/* 2. Modal Kelola Profil & Upload Foto Avatar Admin (With Shake Effect on Outside Click) */}
			{profileModalOpen && (
				<div
					className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto"
					onClick={profileGuard.handleBackdropClick}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className={cn(
							'relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-border animate-scale-up my-8 transition-transform',
							profileGuard.isShaking && 'animate-modal-shake'
						)}
					>
						<button
							onClick={profileGuard.handleClose}
							className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="flex items-center gap-3 border-b border-border/60 pb-5">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-[#5478FF]">
								<Shield className="h-5 w-5" />
							</div>
							<div>
								<h3 className="text-lg font-bold text-foreground">
									Profil Administrator
								</h3>
								<p className="text-xs text-muted-foreground">
									Kelola data akun, informasi kontak, dan foto profil avatar Anda.
								</p>
							</div>
						</div>

						<form onSubmit={handleProfileSubmit} className="mt-6 space-y-5">
							{/* Avatar Upload Container */}
							<div className="flex flex-col items-center justify-center gap-3">
								<div className="relative group">
									<div className="h-24 w-24 overflow-hidden rounded-full bg-[#5478FF] text-white flex items-center justify-center font-bold text-2xl shadow-md ring-4 ring-cyan-500/20">
										{avatarPreview ? (
											<img src={avatarPreview} alt="Preview Avatar" className="h-full w-full object-cover" />
										) : (
											<span>{auth.user.name.charAt(0).toUpperCase()}</span>
										)}
									</div>
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#5478FF] text-white shadow-lg hover:bg-[#4064EB] transition-all"
										title="Ganti Foto Avatar"
									>
										<Camera className="h-4 w-4" />
									</button>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*,.heic,.heif"
									onChange={handleAvatarChange}
									className="hidden"
								/>
								<span className="text-[11px] text-muted-foreground">
									Mendukung format JPG, PNG, WEBP, HEIC, GIF (Maks. 5MB)
								</span>
							</div>

							{/* Name */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
									Nama Lengkap
								</label>
								<input
									type="text"
									value={profileData.name}
									onChange={(e) => setProfileData('name', e.target.value)}
									required
									className="w-full h-11 rounded-xl border border-border bg-white px-4 text-xs font-medium text-foreground focus:border-[#5478FF] focus:ring-1 focus:ring-[#5478FF]"
								/>
								{profileErrors.name && <p className="mt-1 text-xs text-red-600">{profileErrors.name}</p>}
							</div>

							{/* Email */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
									Email Login
								</label>
								<input
									type="email"
									value={profileData.email}
									onChange={(e) => setProfileData('email', e.target.value)}
									required
									className="w-full h-11 rounded-xl border border-border bg-white px-4 text-xs font-medium text-foreground focus:border-[#5478FF] focus:ring-1 focus:ring-[#5478FF]"
								/>
								{profileErrors.email && <p className="mt-1 text-xs text-red-600">{profileErrors.email}</p>}
							</div>

							{/* Phone */}
							<div>
								<label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
									No. Telepon / WhatsApp
								</label>
								<input
									type="text"
									value={profileData.phone}
									onChange={(e) => setProfileData('phone', e.target.value)}
									placeholder="+62 812-xxxx-xxxx"
									className="w-full h-11 rounded-xl border border-border bg-white px-4 text-xs font-medium text-foreground focus:border-[#5478FF] focus:ring-1 focus:ring-[#5478FF]"
								/>
							</div>

							{/* Action Buttons */}
							<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
								<button
									type="button"
									onClick={profileGuard.handleClose}
									className="rounded-full border border-border px-5 py-2.5 text-xs font-bold text-foreground hover:bg-secondary transition-all"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={profileProcessing}
									className="rounded-full bg-[#5478FF] px-7 py-2.5 text-xs font-bold text-white hover:bg-[#4064EB] transition-all shadow-md active:scale-95 disabled:opacity-60"
								>
									{profileProcessing ? 'Menyimpan...' : 'Simpan Perubahan'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Universal Toast Notifications */}
			{toast && (
				<div
					className={cn(
						'fixed bottom-6 right-6 z-[130] max-w-sm rounded-2xl px-5 py-3.5 text-sm font-medium text-white shadow-2xl transition-all animate-slide-up',
						toast.type === 'success' ? 'bg-[#0F172A] text-[#38BDF8] border border-[#38BDF8]/40' : 'bg-red-700'
					)}
				>
					<div className="flex items-center gap-3">
						{toast.type === 'success' ? (
							<CheckCircle2 className="h-5 w-5 text-[#38BDF8] shrink-0" />
						) : (
							<XCircle className="h-5 w-5 text-white shrink-0" />
						)}
						<span className="text-white text-xs leading-snug">{toast.message}</span>
						<button
							onClick={() => setToast(null)}
							className="ml-auto text-white/70 hover:text-white text-xs pl-2"
						>
							<X className="h-4 w-4" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
