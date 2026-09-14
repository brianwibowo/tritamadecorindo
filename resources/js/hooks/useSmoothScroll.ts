import { useEffect } from 'react';

interface SmoothScrollOptions {
	/** Scroll distance multiplier per wheel event (default: 0.75 for slower, calmer travel) */
	speedMultiplier?: number;
	/** Interpolation factor per frame, between 0 and 1 (default: 0.08 for smooth, gentle deceleration) */
	ease?: number;
	/** Whether smooth scroll is enabled (default: true) */
	enabled?: boolean;
}

/**
 * useSmoothScroll: Provides a calm, velvety smooth momentum scroll for mousewheel/trackpad
 * allowing visitors to absorb animations and content without fast jerky page jumps.
 */
export function useSmoothScroll(options: SmoothScrollOptions = {}) {
	const {
		speedMultiplier = 0.75,
		ease = 0.08,
		enabled = true,
	} = options;

	useEffect(() => {
		if (!enabled) return;
		if (typeof window === 'undefined') return;

		// Only apply on fine-pointer devices (desktop mouse/trackpad), preserve native inertia on touchscreens
		const isFinePointer = window.matchMedia('(pointer: fine)').matches;
		if (!isFinePointer) return;

		let targetY = window.scrollY;
		let currentY = window.scrollY;
		let isRunning = false;
		let animationFrameId: number | null = null;

		const getMaxScroll = () =>
			Math.max(
				0,
				document.documentElement.scrollHeight - window.innerHeight
			);

		const render = () => {
			const maxScroll = getMaxScroll();
			targetY = Math.max(0, Math.min(targetY, maxScroll));

			const diff = targetY - currentY;
			currentY += diff * ease;

			// If very close to target, snap to target and stop loop
			if (Math.abs(diff) < 0.5) {
				currentY = targetY;
				window.scrollTo(0, Math.round(currentY));
				isRunning = false;
				animationFrameId = null;
				return;
			}

			window.scrollTo(0, Math.round(currentY));
			animationFrameId = requestAnimationFrame(render);
		};

		const handleWheel = (e: WheelEvent) => {
			// Don't intercept if body scroll is locked (e.g. preview modal open)
			if (document.body.style.overflow === 'hidden') return;

			// Don't intercept if scrolling inside a scrollable child element (e.g. inner modal or dropdown)
			let target = e.target as HTMLElement | null;
			while (target && target !== document.body && target !== document.documentElement) {
				const style = window.getComputedStyle(target);
				const hasScrollableY =
					(style.overflowY === 'auto' || style.overflowY === 'scroll') &&
					target.scrollHeight > target.clientHeight;
				if (hasScrollableY) {
					return;
				}
				target = target.parentElement;
			}

			// Prevent default instant jump
			e.preventDefault();

			const maxScroll = getMaxScroll();
			// Dampen wheel delta with speedMultiplier
			targetY += e.deltaY * speedMultiplier;
			targetY = Math.max(0, Math.min(targetY, maxScroll));

			if (!isRunning) {
				isRunning = true;
				currentY = window.scrollY;
				animationFrameId = requestAnimationFrame(render);
			}
		};

		// Keep current/target in sync if user drags native scrollbar or presses keys when rAF is idle
		const handleScroll = () => {
			if (!isRunning) {
				targetY = window.scrollY;
				currentY = window.scrollY;
			}
		};

		const handleResize = () => {
			const maxScroll = getMaxScroll();
			targetY = Math.max(0, Math.min(targetY, maxScroll));
			currentY = Math.max(0, Math.min(currentY, maxScroll));
		};

		window.addEventListener('wheel', handleWheel, { passive: false });
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
			if (animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	}, [enabled, speedMultiplier, ease]);
}
