import { useEffect } from 'react';

/**
 * Locks `document.body` scrolling while `locked` is true, restoring the
 * previous `overflow` value on release (so nested locks don't clobber it).
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
