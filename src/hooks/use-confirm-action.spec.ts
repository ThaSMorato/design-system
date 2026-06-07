import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useConfirmAction } from './use-confirm-action';

describe('useConfirmAction', () => {
  it('should start outside the confirmation step', () => {
    const { result } = renderHook(() => useConfirmAction(vi.fn()));

    expect(result.current.isConfirming).toBe(false);
  });

  it('should enter the confirmation step on request', () => {
    const { result } = renderHook(() => useConfirmAction(vi.fn()));

    act(() => result.current.request());

    expect(result.current.isConfirming).toBe(true);
  });

  it('should run the action and exit the step on confirm', async () => {
    const action = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useConfirmAction(action));

    act(() => result.current.request());
    await act(async () => {
      await result.current.confirm();
    });

    expect(action).toHaveBeenCalledTimes(1);
    expect(result.current.isConfirming).toBe(false);
  });

  it('should exit the step on cancel without running the action', () => {
    const action = vi.fn();
    const { result } = renderHook(() => useConfirmAction(action));

    act(() => result.current.request());
    act(() => result.current.cancel());

    expect(action).not.toHaveBeenCalled();
    expect(result.current.isConfirming).toBe(false);
  });
});
