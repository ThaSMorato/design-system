import { useCallback } from 'react';

export interface UseWebShare {
  /** Whether the Web Share API is available in this environment. */
  canShare: boolean;
  /** Invokes the native share sheet; resolves to whether it succeeded. */
  share: (data: ShareData) => Promise<boolean>;
}

/**
 * Thin wrapper over the Web Share API. Safe on the server (guards `navigator`)
 * and swallows the user-cancelled `AbortError` rather than logging it.
 */
export function useWebShare(): UseWebShare {
  const canShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const share = useCallback(async (data: ShareData) => {
    if (typeof navigator === 'undefined' || !navigator.share) return false;
    try {
      await navigator.share(data);
      return true;
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
      return false;
    }
  }, []);

  return { canShare, share };
}
