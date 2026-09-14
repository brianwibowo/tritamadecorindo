import { MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const WA_URL = 'https://wa.me/6281990909646?text=Halo%20Tritama%20Decorindo%20Stiker,%20saya%20ingin%20konsultasi%20pemasangan%20material%20dekorasi/kaca%20film.';

const peekMessages = [
	'Butuh konsultasi gratis? 💬',
	'Halo! Ada yang bisa kami bantu? 👋',
	'Survey gratis area Jabodetabek! 🏠',
	'Tanya harga & jadwal pasang? 📋',
];

interface FloatingWhatsAppProps {
	show?: boolean;
}

export default function FloatingWhatsApp({ show = true }: FloatingWhatsAppProps) {
	const [showPeek, setShowPeek] = useState(false);
	const [peekIndex, setPeekIndex] = useState(0);
	const [dismissed, setDismissed] = useState(false);

	useEffect(() => {
		if (!show) return;
		// Show first peek after 5 seconds when visible
		const initialTimer = setTimeout(() => {
			setShowPeek(true);
		}, 5000);

		return () => clearTimeout(initialTimer);
	}, [show]);

	useEffect(() => {
		if (dismissed || !show) return;

		// Cycle peek messages every 25 seconds
		const interval = setInterval(() => {
			setPeekIndex((prev) => (prev + 1) % peekMessages.length);
			setShowPeek(true);

			// Auto-hide after 6 seconds
			const hideTimer = setTimeout(() => {
				setShowPeek(false);
			}, 6000);

			return () => clearTimeout(hideTimer);
		}, 25000);

		return () => clearInterval(interval);
	}, [dismissed, show]);

	const handleDismiss = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowPeek(false);
		setDismissed(true);
	};

	return (
		<div
			className={cn(
				'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500',
				show
					? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
					: 'translate-y-8 opacity-0 scale-75 pointer-events-none'
			)}
		>
			{/* Peek Bubble */}
			<div
				className={cn(
					'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
					showPeek && !dismissed && show
						? 'translate-y-0 opacity-100 scale-100'
						: 'translate-y-4 opacity-0 scale-90 pointer-events-none'
				)}
			>
				<div className="relative max-w-[240px] rounded-2xl rounded-br-md bg-white px-4 py-3 shadow-xl border border-slate-200/80">
					<button
						type="button"
						onClick={handleDismiss}
						className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 transition-colors"
						aria-label="Tutup"
					>
						<X className="h-3 w-3" />
					</button>
					<p className="text-xs font-bold text-[#111FA2] leading-relaxed">
						{peekMessages[peekIndex]}
					</p>
					<p className="text-[10px] text-slate-500 mt-0.5">
						Tritama Decorindo Stiker
					</p>
					{/* Speech bubble tail */}
					<div className="absolute -bottom-[6px] right-4 h-3 w-3 rotate-45 bg-white border-r border-b border-slate-200/80" />
				</div>
			</div>

			{/* Floating Button */}
			<a
				href={WA_URL}
				target="_blank"
				rel="noopener noreferrer"
				className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300"
				aria-label="Chat WhatsApp"
			>
				{/* Ping ring */}
				<span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

				<MessageCircle className="h-6 w-6 relative z-10 group-hover:rotate-12 transition-transform" />
			</a>
		</div>
	);
}
