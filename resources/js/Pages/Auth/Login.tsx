import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Layers, Lock, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Login({
	status,
	canResetPassword,
}: {
	status?: string;
	canResetPassword?: boolean;
}) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: 'admin@tritamadecorindo.com',
		password: '',
		remember: true as boolean,
	});

	const [showPassword, setShowPassword] = useState(false);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('login'), {
			onFinish: () => reset('password'),
		});
	};

	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background font-sans antialiased text-foreground">
			<Head title="Login Admin — Tritama Decorindo Stiker" />

			{/* Left Column: Brand Showcase */}
			<div className="hidden lg:flex lg:col-span-6 relative overflow-hidden bg-[#0B0F17] text-white p-12 flex-col justify-between border-r border-slate-800">
				{/* Background image */}
				<div className="absolute inset-0 z-0">
					<img
						src="/images/products/kaca-film-sparta.webp"
						alt="Tritama Decorindo Stiker"
						className="h-full w-full object-cover opacity-30"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/85 to-[#0284C7]/30" />
				</div>

				{/* Top Branding */}
				<div className="relative z-10 flex items-center justify-between">
					<Link href="/" className="flex items-center gap-3 group">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm p-0.5 shrink-0">
							<img src="/images/logo.png" alt="Tritama Decorindo" className="h-full w-full object-contain" />
						</div>
						<div className="flex flex-col">
							<span className="text-xl font-bold tracking-tight text-white leading-none">
								Tritama Decorindo
							</span>
							<span className="text-[10px] tracking-[0.2em] text-[#38BDF8] font-semibold uppercase mt-0.5">
								Stiker & Interior • Est. 2009
							</span>
						</div>
					</Link>

					<Link
						href="/"
						className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white/90 backdrop-blur-md hover:bg-white/20 transition-colors"
					>
						<ArrowLeft className="h-3.5 w-3.5" />
						<span>Kembali ke Beranda</span>
					</Link>
				</div>

				{/* Center Message */}
				<div className="relative z-10 max-w-lg space-y-5 my-auto py-12">
					<div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 text-xs font-semibold text-[#38BDF8] uppercase tracking-wider">
						<span>🔐 Portal Manajemen Tritama Decorindo</span>
					</div>

					<h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
						Kelola Katalog Produk, <br />
						<span className="text-[#38BDF8]">Galeri Proyek & Penawaran</span>
					</h1>

					<p className="text-sm text-slate-300 leading-relaxed font-normal">
						Pusat kendali katalog material Kaca Film, Sandblast, Wallpaper, Blinds, Signage Huruf Timbul, dan dokumentasi proyek instalasi pelanggan.
					</p>
				</div>

				{/* Bottom Trust Info */}
				<div className="relative z-10 border-t border-white/15 pt-6 flex items-center justify-between text-xs text-slate-400">
					<p>© {new Date().getFullYear()} Tritama Decorindo Stiker</p>
					<span className="text-[#38BDF8] font-medium">Admin Control Panel</span>
				</div>
			</div>

			{/* Right Column: Clean Login Form */}
			<div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-white">
				{/* Top Mobile Back Link */}
				<div className="flex lg:hidden items-center justify-between mb-8">
					<Link href="/" className="flex items-center gap-2.5">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 p-0.5 shrink-0">
							<img src="/images/logo.png" alt="Tritama Decorindo" className="h-full w-full object-contain" />
						</div>
						<span className="text-lg font-bold text-slate-900">Tritama Decorindo</span>
					</Link>
					<Link href="/" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
						<ArrowLeft className="h-3.5 w-3.5" />
						<span>Beranda</span>
					</Link>
				</div>

				{/* Center Form Card */}
				<div className="mx-auto w-full max-w-md my-auto space-y-8">
					<div>
						<span className="text-xs font-bold uppercase tracking-widest text-[#0284C7]">
							Autentikasi Administrator
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
							Selamat Datang Kembali
						</h2>
						<p className="text-xs text-slate-500 mt-1.5">
							Silakan masuk untuk mengelola katalog produk dan galeri proyek.
						</p>
					</div>

					{status && (
						<div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800">
							{status}
						</div>
					)}

					<form onSubmit={submit} className="space-y-5">
						{/* Email Field */}
						<div className="space-y-1.5">
							<label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
								Alamat Email
							</label>
							<div className="relative">
								<input
									id="email"
									type="email"
									name="email"
									value={data.email}
									autoComplete="username"
									autoFocus
									onChange={(e) => setData('email', e.target.value)}
									placeholder="admin@tritamadecorindo.com"
									required
									className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0284C7] focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
								/>
								<Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
							</div>
							<InputError message={errors.email} className="mt-1" />
						</div>

						{/* Password Field */}
						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
									Kata Sandi
								</label>
								{canResetPassword && (
									<Link
										href={route('password.request')}
										className="text-xs text-[#0284C7] hover:underline font-semibold"
									>
										Lupa sandi?
									</Link>
								)}
							</div>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? 'text' : 'password'}
									name="password"
									value={data.password}
									autoComplete="current-password"
									onChange={(e) => setData('password', e.target.value)}
									placeholder="••••••••"
									required
									className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0284C7] focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
								/>
								<Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700"
								>
									{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								</button>
							</div>
							<InputError message={errors.password} className="mt-1" />
						</div>

						{/* Remember Me */}
						<div className="flex items-center">
							<label className="flex items-center gap-2 cursor-pointer">
								<Checkbox
									name="remember"
									checked={data.remember}
									onChange={(e) => setData('remember', (e.target.checked || false) as false)}
								/>
								<span className="text-xs text-slate-600">Ingat sesi login saya</span>
							</label>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={processing}
							className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0284C7] text-sm font-bold text-white shadow-md hover:bg-[#0369a1] active:scale-[0.99] disabled:opacity-50 transition-all"
						>
							<span>{processing ? 'Memverifikasi Akun...' : 'Masuk ke Panel Admin'}</span>
							{!processing && <ArrowRight className="h-4 w-4" />}
						</button>
					</form>
				</div>

				{/* Bottom Footer Text */}
				<div className="text-center text-xs text-slate-400 mt-8">
					<p>Tritama Decorindo Stiker &copy; {new Date().getFullYear()}</p>
				</div>
			</div>
		</div>
	);
}
