import { fireEvent, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useOnEscape } from './use-on-escape';

describe('useOnEscape', () => {
  it('should call the handler on Escape when enabled', () => {
    const handler = vi.fn();
    renderHook(() => useOnEscape(handler, true));

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should ignore other keys', () => {
    const handler = vi.fn();
    renderHook(() => useOnEscape(handler, true));

    fireEvent.keyDown(document, { key: 'Enter' });

    expect(handler).not.toHaveBeenCalled();
  });

  it('should not listen when disabled', () => {
    const handler = vi.fn();
    renderHook(() => useOnEscape(handler, false));

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handler).not.toHaveBeenCalled();
  });

  it('should remove the listener on unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useOnEscape(handler, true));

    unmount();
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handler).not.toHaveBeenCalled();
  });
});
