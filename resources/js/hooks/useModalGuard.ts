import { useCallback, useState } from 'react';

interface UseModalGuardOptions {
	isDirty?: boolean;
	onClose: () => void;
}

/**
 * useModalGuard Hook
 * Prevents closing modal on dirty form state and triggers a 300ms horizontal shake animation.
 */
export function useModalGuard({ isDirty = false, onClose }: UseModalGuardOptions) {
	const [isShaking, setIsShaking] = useState(false);

	const triggerShake = useCallback(() => {
		setIsShaking(true);
		const timer = setTimeout(() => {
			setIsShaking(false);
		}, 300);
		return () => clearTimeout(timer);
	}, []);

	// Handle click on outside backdrop
	const handleBackdropClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === e.currentTarget) {
				if (isDirty) {
					triggerShake();
				} else {
					onClose();
				}
			}
		},
		[isDirty, onClose, triggerShake]
	);

	// Handle explicit close button (X or Batal)
	const handleClose = useCallback(() => {
		if (isDirty) {
			if (window.confirm('Ada perubahan data yang belum disimpan. Yakin ingin menutup form ini?')) {
				onClose();
			} else {
				triggerShake();
			}
		} else {
			onClose();
		}
	}, [isDirty, onClose, triggerShake]);

	return {
		isShaking,
		triggerShake,
		handleBackdropClick,
		handleClose,
	};
}

export default useModalGuard;
