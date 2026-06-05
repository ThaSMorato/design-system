import { cva } from 'class-variance-authority';

/**
 * Shared spinner classes. The web Spinner uses a CSS-animated bordered div;
 * the native variant uses RN's `ActivityIndicator` (the OS spinner) which is
 * driven by its own props rather than these utility classes. We still keep
 * size + color tokens here so consumers can stay token-driven on both
 * platforms; the native variant maps them to ActivityIndicator props.
 */
export const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      color: {
        primary: 'text-primary-500',
        white: 'text-white',
        current: 'text-current',
      },
    },
    defaultVariants: { size: 'md', color: 'current' },
  },
);

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'white' | 'current';
