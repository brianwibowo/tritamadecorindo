import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

interface ScrollRevealProps extends PropsWithChildren {
	className?: string;
	effect?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'fade';
	delay?: number;
	duration?: number;
	threshold?: number;
}

export default function ScrollReveal({
	children,
	className,
	effect = 'fade-up',
	delay = 0,
	duration = 750,
	threshold = 0.1,
}: ScrollRevealProps) {
	const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({ threshold });

	const effectStyles: Record<string, string> = {
		'fade-up': 'translate-y-8 opacity-0',
		'fade-down': '-translate-y-8 opacity-0',
		'fade-left': '-translate-x-8 opacity-0',
		'fade-right': 'translate-x-8 opacity-0',
		'scale-up': 'scale-95 opacity-0',
		fade: 'opacity-0',
	};

	const revealedStyle = 'translate-y-0 translate-x-0 scale-100 opacity-100';

	const dynamicStyle: React.CSSProperties = {
		transitionDuration: `${duration}ms`,
		transitionDelay: `${delay}ms`,
		transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
	};

	return (
		<div
			ref={ref}
			style={dynamicStyle}
			className={cn(
				'transition-all will-change-transform',
				isRevealed ? revealedStyle : effectStyles[effect],
				className
			)}
		>
			{children}
		</div>
	);
}
