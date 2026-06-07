import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseDelayedVisibilityOptions {
  /** Delay before becoming visible, in ms. */
  delay?: number;
  /** When true, `show()` is a no-op. */
  disabled?: boolean;
}

export interface UseDelayedVisibility {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

/**
 * Visibility flag that turns on after a delay and off immediately — the
 * hover/focus behavior behind Tooltip. The pending timer is always cleared
 * before scheduling a new one and on unmount, so it never leaks or fires
 * after the component is gone.
 */
export function useDelayedVisibility(
  { delay = 200, disabled = false }: UseDelayedVisibilityOptions = {}
): UseDelayedVisibility {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const show = useCallback(() => {
    if (disabled) return;
    clear();
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [disabled, delay, clear]);

  const hide = useCallback(() => {
    clear();
    setIsVisible(false);
  }, [clear]);

  useEffect(() => clear, [clear]);

  return { isVisible, show, hide };
}
