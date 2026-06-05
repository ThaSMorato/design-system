import { cva } from 'class-variance-authority';

/**
 * Status/indicator dot extracted from Badge's dot, Avatar's status dot and
 * StatusIndicator. Color is intentionally NOT a variant — each consumer keeps
 * its own semantic color map and passes a `bg-*` class via className.
 *
 * Size scale covers every dot in the system:
 * xs 1.5 (badge/avatar-xs) · sm 2 · md 2.5 (avatar-md) · lg 3 (status-md) · xl 4
 */
export const dotVariants = cva('rounded-full', {
  variants: {
    size: {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-4 w-4',
    },
  },
  defaultVariants: { size: 'md' },
});

export type DotSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
