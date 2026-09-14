import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
	threshold?: number;
	rootMargin?: string;
	triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
	options: UseScrollRevealOptions = {}
) {
	const { threshold = 0.08, rootMargin = '0px 0px -20px 0px', triggerOnce = true } = options;
	const ref = useRef<T | null>(null);
	const [isRevealed, setIsRevealed] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		// Fallback for environments without IntersectionObserver
		if (!('IntersectionObserver' in window)) {
			setIsRevealed(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsRevealed(true);
					if (triggerOnce) {
						observer.unobserve(node);
					}
				} else if (!triggerOnce) {
					setIsRevealed(false);
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(node);

		return () => {
			if (node) observer.unobserve(node);
		};
	}, [threshold, rootMargin, triggerOnce]);

	return { ref, isRevealed };
}
