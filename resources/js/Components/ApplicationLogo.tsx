import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';
import type { SVGProps } from 'react';

export default function ApplicationLogo({
	className,
	collapsed = false,
	...props
}: SVGProps<SVGSVGElement> & { collapsed?: boolean }) {
	if (collapsed) {
		return (
			<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1E232A] text-[#C5A880] shadow-md border border-[#C5A880]/30 transition-all hover:scale-105">
				<Layers className="h-5 w-5" />
			</div>
		);
	}

	return (
		<div className={cn('flex items-center gap-3', className)}>
			{/* Luxury Emblem Icon */}
			<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#1E232A] text-[#C5A880] shadow-md border border-[#C5A880]/30">
				<Layers className="h-5 w-5" />
			</div>

			{/* Typography */}
			<div className="flex flex-col text-left">
				<span className="font-display text-base font-bold tracking-tight text-foreground leading-none">
					TRITAMA
				</span>
				<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#937341] mt-0.5">
					DECORINDO
				</span>
			</div>
		</div>
	);
}
