import { cva } from 'class-variance-authority';

export const skeletonVariants = cva('animate-pulse bg-dark-700', {
  variants: {
    variant: {
      text: 'rounded',
      circle: 'rounded-full',
      rect: 'rounded-lg',
    },
  },
  defaultVariants: { variant: 'rect' },
});

export type SkeletonVariant = 'text' | 'circle' | 'rect';
