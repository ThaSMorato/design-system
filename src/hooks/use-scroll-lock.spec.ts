import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useScrollLock } from './use-scroll-lock';

describe('useScrollLock', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should lock body scroll while enabled', () => {
    renderHook(() => useScrollLock(true));

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should not touch overflow when disabled', () => {
    document.body.style.overflow = 'scroll';

    renderHook(() => useScrollLock(false));

    expect(document.body.style.overflow).toBe('scroll');
  });

  it('should restore the previous overflow on unmount', () => {
    document.body.style.overflow = 'scroll';

    const { unmount } = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('scroll');
  });
});
