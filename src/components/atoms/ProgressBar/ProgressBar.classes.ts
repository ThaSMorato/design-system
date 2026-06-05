import { cva } from 'class-variance-authority';

/**
 * Bare progress track + fill extracted from ResourceBar. ResourceBar keeps
 * the label row and the semantic color logic; this atom only renders the bar.
 */
export const progressBarVariants = cva('overflow-hidden rounded-full bg-dark-700', {
  variants: {
    size: {
      xs: 'h-1',
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6',
    },
  },
  defaultVariants: { size: 'md' },
});

export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';

export const PROGRESS_TRACK_INNER_CLASS = 'relative h-full w-full';
export const PROGRESS_FILL_CLASS = 'h-full transition-all duration-300';
export const PROGRESS_TEMP_FILL_CLASS =
  'absolute top-0 h-full bg-blue-400/60 transition-all duration-300';
