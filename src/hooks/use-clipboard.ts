import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseClipboardOptions {
  /** How long the `copied` flag stays true after a successful copy, in ms. */
  timeout?: number;
  /** Called after a successful copy. */
  onCopy?: () => void;
}

export interface UseClipboard {
  copied: boolean;
  /** Copies `text` to the clipboard; resolves to whether it succeeded. */
  copy: (text: string) => Promise<boolean>;
}

/**
 * Writes text to the clipboard and exposes a transient `copied` flag that
 * auto-resets after `timeout`. The reset timer is cleared on unmount and
 * before re-arming, so rapid copies don't stack timers.
 */
export function useClipboard(
  { timeout = 2000, onCopy }: UseClipboardOptions = {}
): UseClipboard {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onCopy?.();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (err) {
        console.error('Failed to copy:', err);
        return false;
      }
    },
    [timeout, onCopy]
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  return { copied, copy };
}
