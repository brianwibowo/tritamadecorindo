import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, Sprout } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Login({
	status,
	canResetPassword,
}: {
	status?: string;
	canResetPassword?: boolean;
}) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: 'admin@lfmjayatama.com',
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
			<Head title="Login Admin — LFM Global Jayatama" />

			{/* Left Column (50% on desktop): Atmospheric Visual & Brand Story */}
			<div className="hidden lg:flex lg:col-span-6 relative overflow-hidden bg-[#1a0203] text-white p-12 flex-col justify-between">
				{/* Background image overlay */}
				<div className="absolute inset-0 z-0">
					<img
						src="/scraped-5.jpg"
						alt="LFM Global Jayatama"
						className="h-full w-full object-cover opacity-35 mix-blend-luminosity"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#1a0203] via-[#1a0203]/75 to-[#80070A]/40" />
				</div>

				{/* Top Branding */}
				<div className="relative z-10 flex items-center justify-between">
					<Link href="/" className="flex items-center gap-3 group">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#80070A] text-[#F8C300] shadow-sm">
							<Sprout className="h-6 w-6" />
						</div>
						<div className="flex flex-col">
							<span className="font-display text-2xl font-bold tracking-tight text-white font-serif leading-none">
								LFM Global
							</span>
							<span className="text-[10px] tracking-[0.2em] text-[#F8C300] font-semibold uppercase mt-0.5">
								Jayatama Spices
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

				{/* Center Hero Message */}
				<div className="relative z-10 max-w-lg space-y-5 my-auto py-12">
					<div className="inline-flex items-center gap-2 rounded-full bg-[#F8C300]/20 border border-[#F8C300]/40 px-3.5 py-1 text-xs font-semibold text-[#F8C300] uppercase tracking-wider">
						<span>🔐 Portal Manajemen Ekspor & Gudang</span>
					</div>

					<h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12]">
						Kelola Komoditas & <br />
						<span className="italic font-normal text-[#F8C300]">Kontrak Ekspor</span> LFM Global.
					</h1>

					<p className="text-sm text-white/80 leading-relaxed font-sans">
						Pusat kendali operasional komoditas rempah Indonesia — atur katalog produk, stok gudang sortasi, monitoring pesanan pembeli B2B, dan sertifikasi ekspor secara terintegrasi.
					</p>
				</div>

				{/* Bottom Trust Info */}
				<div className="relative z-10 border-t border-white/15 pt-6 flex items-center justify-between text-xs text-white/60">
					<p>© {new Date().getFullYear()} PT LFM Global Jayatama</p>
					<span className="text-[#F8C300] font-medium">Enterprise Export Portal</span>
				</div>
			</div>

			{/* Right Column (50% on desktop): Clean Elegant Login Form */}
			<div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
				{/* Top Mobile Back Link */}
				<div className="flex lg:hidden items-center justify-between mb-8">
					<Link href="/" className="flex items-center gap-2.5">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#80070A] text-[#F8C300]">
							<Sprout className="h-5 w-5" />
						</div>
						<span className="font-display text-xl font-bold text-[#80070A]">LFM Global</span>
					</Link>
					<Link href="/" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
						<ArrowLeft className="h-3.5 w-3.5" />
						<span>Beranda</span>
					</Link>
				</div>

				{/* Center Form Card */}
				<div className="mx-auto w-full max-w-md my-auto space-y-8">
					<div>
						<span className="text-xs font-bold uppercase tracking-widest text-[#80070A]">
							Autentikasi Administrator
						</span>
						<h2 className="font-display text-3xl font-bold tracking-tight text-foreground mt-1">
							Selamat Datang Kembali
						</h2>
						<p className="text-xs text-muted-foreground mt-1.5">
							Silakan masuk untuk mengelola portal komoditas dan transaksi ekspor.
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
							<label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
									placeholder="admin@lfmjayatama.com"
									required
									className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#80070A] focus:outline-none focus:ring-1 focus:ring-[#80070A]"
								/>
								<Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
							</div>
							<InputError message={errors.email} className="mt-1" />
						</div>

						{/* Password Field */}
						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
									Kata Sandi
								</label>
								{canResetPassword && (
									<Link
										href={route('password.request')}
										className="text-xs text-[#80070A] hover:underline font-semibold"
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
									className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#80070A] focus:outline-none focus:ring-1 focus:ring-[#80070A]"
								/>
								<Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground"
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
								<span className="text-xs text-muted-foreground">Ingat sesi login saya</span>
							</label>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={processing}
							className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#80070A] text-sm font-bold text-white shadow-md hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all"
						>
							<span>{processing ? 'Memverifikasi Akun...' : 'Masuk ke Portal Admin'}</span>
							{!processing && <ArrowRight className="h-4 w-4" />}
						</button>
					</form>

					{/* Demo Credential Helper Box */}
					<div className="rounded-2xl border border-border/80 bg-secondary/30 p-4 text-xs space-y-1">
						<p className="font-bold text-foreground">💡 Akun Administrator Default:</p>
						<p className="text-muted-foreground">
							Email: <code className="font-mono text-foreground font-semibold">admin@lfmjayatama.com</code>
						</p>
						<p className="text-muted-foreground">
							Password: <code className="font-mono text-foreground font-semibold">admin123</code>
						</p>
					</div>
				</div>

				{/* Bottom Footer Text */}
				<div className="text-center text-xs text-muted-foreground mt-8">
					<p>PT LFM Global Jayatama &copy; {new Date().getFullYear()} — Indonesian Spices Exporter</p>
				</div>
			</div>
		</div>
	);
}
