import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDelayedVisibility } from './use-delayed-visibility';

describe('useDelayedVisibility', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('should become visible only after the delay elapses', () => {
    const { result } = renderHook(() => useDelayedVisibility({ delay: 200 }));

    act(() => result.current.show());
    expect(result.current.isVisible).toBe(false);

    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isVisible).toBe(true);
  });

  it('should hide immediately and cancel a pending show', () => {
    const { result } = renderHook(() => useDelayedVisibility({ delay: 200 }));

    act(() => result.current.show());
    act(() => result.current.hide());
    act(() => vi.advanceTimersByTime(500));

    expect(result.current.isVisible).toBe(false);
  });

  it('should be a no-op when disabled', () => {
    const { result } = renderHook(() =>
      useDelayedVisibility({ delay: 100, disabled: true })
    );

    act(() => result.current.show());
    act(() => vi.advanceTimersByTime(100));

    expect(result.current.isVisible).toBe(false);
  });

  it('should not fire the timer after unmount', () => {
    const { result, unmount } = renderHook(() =>
      useDelayedVisibility({ delay: 200 })
    );

    act(() => result.current.show());
    unmount();

    // Would throw "state update on unmounted component" if not cleaned up.
    expect(() => act(() => vi.advanceTimersByTime(200))).not.toThrow();
  });
});
