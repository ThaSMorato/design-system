import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useWebShare } from './use-web-share';

describe('useWebShare', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('should report canShare=false when the API is missing', () => {
    vi.stubGlobal('navigator', {});

    const { result } = renderHook(() => useWebShare());

    expect(result.current.canShare).toBe(false);
  });

  it('should invoke navigator.share and resolve true on success', async () => {
    const shareSpy = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { share: shareSpy });
    const { result } = renderHook(() => useWebShare());

    let ok: boolean | undefined;
    await act(async () => {
      ok = await result.current.share({ url: 'https://x.dev' });
    });

    expect(result.current.canShare).toBe(true);
    expect(shareSpy).toHaveBeenCalledWith({ url: 'https://x.dev' });
    expect(ok).toBe(true);
  });

  it('should swallow AbortError silently and resolve false', async () => {
    const abort = Object.assign(new Error('cancelled'), { name: 'AbortError' });
    vi.stubGlobal('navigator', { share: vi.fn().mockRejectedValue(abort) });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useWebShare());

    let ok: boolean | undefined;
    await act(async () => {
      ok = await result.current.share({ url: 'https://x.dev' });
    });

    expect(ok).toBe(false);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
