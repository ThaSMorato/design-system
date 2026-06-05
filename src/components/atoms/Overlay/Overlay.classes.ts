import { cva } from 'class-variance-authority';

/**
 * Full-screen backdrop extracted from MODAL_BACKDROP_CLASS (`dim`) and
 * CONFIRM_OVERLAY_CLASS (`blur`).
 */
export const overlayVariants = cva('fixed inset-0', {
  variants: {
    tone: {
      dim: 'bg-black/50',
      blur: 'bg-dark-900/75 backdrop-blur-sm',
      none: '',
    },
    depth: {
      base: '',
      top: 'z-50',
    },
    center: {
      true: 'flex items-center justify-center',
      false: '',
    },
  },
  defaultVariants: { tone: 'dim', depth: 'top', center: false },
});

export type OverlayTone = 'dim' | 'blur' | 'none';
export type OverlayDepth = 'base' | 'top';
