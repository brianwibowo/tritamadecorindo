import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export default function ApplicationLogo({
	className,
	collapsed = false,
	...props
}: SVGProps<SVGSVGElement> & { collapsed?: boolean }) {
	if (collapsed) {
		return (
			<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 p-1 transition-all hover:scale-105">
				<img src="/images/logo.png" alt="Tritama Decorindo" className="h-full w-full object-contain" />
			</div>
		);
	}

	return (
		<div className={cn('flex items-center gap-3', className)}>
			{/* Logo Icon */}
			<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md border border-slate-200 p-1">
				<img src="/images/logo.png" alt="Tritama Decorindo" className="h-full w-full object-contain" />
			</div>

			{/* Typography */}
			<div className="flex flex-col text-left">
				<span className="font-display text-base font-bold tracking-tight text-foreground leading-none">
					TRITAMA
				</span>
				<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#006837] mt-0.5">
					DECORINDO
				</span>
			</div>
		</div>
	);
}
