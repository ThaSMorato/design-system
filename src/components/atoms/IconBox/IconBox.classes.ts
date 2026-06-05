import { cva } from 'class-variance-authority';

/**
 * Colored icon container extracted from Banner.Icon (h-10 circle),
 * ConfirmDialog's icon wrapper (h-12 circle), EmptyState's icon container
 * (h-12/16/20 circle) and WizardStep.Header's icon (h-10 rounded-lg).
 * Background/text color comes from the caller via className.
 */
export const iconBoxVariants = cva('flex items-center justify-center', {
  variants: {
    shape: {
      circle: 'rounded-full',
      rounded: 'rounded-lg',
    },
    size: {
      sm: 'h-10 w-10',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-20 w-20',
    },
  },
  defaultVariants: { shape: 'circle', size: 'sm' },
});

export type IconBoxShape = 'circle' | 'rounded';
export type IconBoxSize = 'sm' | 'md' | 'lg' | 'xl';
