import { cva } from 'class-variance-authority';

export const filterBarVariants = cva('flex gap-2', {
  variants: {
    variant: { default: '', pills: '' },
    wrap: { true: 'flex-wrap', false: '' },
  },
  defaultVariants: { variant: 'default', wrap: false },
});

export const filterButtonVariants = cva(
  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
  {
    variants: {
      variant: { default: '', pills: 'rounded-full' },
      selected: {
        true: 'bg-primary-500 text-white',
        false: 'bg-dark-700 text-dark-300 hover:bg-dark-600 active:bg-dark-600',
      },
    },
    defaultVariants: { variant: 'default', selected: false },
  },
);

export type FilterBarVariant = 'default' | 'pills';

// Button visuals (selected/disabled/count styling) now live in the Chip atom.
// `filterButtonVariants` is kept exported for backwards compatibility.
