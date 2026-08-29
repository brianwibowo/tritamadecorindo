import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterSection() {
	const [email, setEmail] = useState('');
	const [subscribed, setSubscribed] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;
		setSubscribed(true);
	};

	return (
		<section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28">
			<div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 sm:p-14 shadow-xl">
				<div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-yns-sun/15 blur-3xl" />
				<div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-yns-rose/15 blur-3xl" />

				<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
					<div>
						<p className="text-xs tracking-[0.22em] uppercase text-background/60 mb-3 font-semibold">— B2B Export Inquiry & Updates</p>
						{subscribed ? (
							<>
								<div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-background/10 mb-5">
									<Check className="h-6 w-6 text-[#F8C300]" />
								</div>
								<h2 className="yns-display text-4xl sm:text-5xl leading-[1.02] font-bold">Permintaan Terkirim.</h2>
								<p className="mt-3 text-background/70 max-w-md">Tim Export Sales LFM Global Jayatama akan mengirimkan lembar spesifikasi & pricelist resmi ke {email}.</p>
							</>
						) : (
							<>
								<h2 className="yns-display text-4xl sm:text-5xl leading-[1.02] font-bold">
									Katalog & Penawaran
									<br />
									<span className="italic font-normal text-[#F8C300]">Harga Ekspor Terkini.</span>
								</h2>
								<p className="mt-4 text-background/75 max-w-md leading-relaxed text-sm">
									Dapatkan lembar Certificate of Analysis (CoA), spesifikasi kadar air, dan update penawaran harga ekspor FOB / CIF komoditas rempah Indonesia.
								</p>
							</>
						)}
					</div>
					{!subscribed && (
						<form onSubmit={handleSubmit} className="w-full">
							<div className="flex flex-col gap-3">
								<label className="text-xs tracking-wider uppercase text-background/60 font-semibold">
									Alamat Email Bisnis / Perusahaan
								</label>
								<div className="flex flex-col sm:flex-row gap-3">
									<input
										type="email"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="company@spicetrading.com"
										required
										className="h-12 w-full flex-1 rounded-full border border-background/20 bg-background/10 px-5 text-background outline-none transition-all placeholder:text-background/40 focus:border-[#F8C300] focus:ring-2 focus:ring-[#F8C300]/20 text-sm"
									/>
									<button
										type="submit"
										className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-yns-sun px-8 font-bold text-foreground transition-all hover:brightness-110 active:scale-95 shadow-md"
									>
										<span>Minta Pricelist</span>
										<ArrowRight className="h-4 w-4" />
									</button>
								</div>
								<p className="text-[11px] text-background/50 mt-1">
									Kami menjaga kerahasiaan data Anda. Penawaran resmi dikirimkan dalam 1x24 jam kerja.
								</p>
							</div>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
