import { useEffect } from 'react';

/**
 * Calls `handler` when Escape is pressed, while `enabled` is true. The keydown
 * listener is added/removed with the enabled state, so it's inert when closed.
 */
export function useOnEscape(handler: () => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handler, enabled]);
}
