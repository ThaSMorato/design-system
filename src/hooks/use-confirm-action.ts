import { useCallback, useState } from 'react';

export interface UseConfirmAction {
  /** Whether the confirmation step is currently shown. */
  isConfirming: boolean;
  /** Enter the confirmation step. */
  request: () => void;
  /** Run the action, then leave the confirmation step. */
  confirm: () => Promise<void>;
  /** Leave the confirmation step without running the action. */
  cancel: () => void;
}

/**
 * Two-step "click to reveal confirm, click again to run" state machine behind
 * DangerZone. The confirmation step is dismissed automatically once the action
 * resolves.
 */
export function useConfirmAction(
  action: () => void | Promise<void>
): UseConfirmAction {
  const [isConfirming, setIsConfirming] = useState(false);

  const request = useCallback(() => setIsConfirming(true), []);
  const cancel = useCallback(() => setIsConfirming(false), []);
  const confirm = useCallback(async () => {
    await action();
    setIsConfirming(false);
  }, [action]);

  return { isConfirming, request, confirm, cancel };
}
