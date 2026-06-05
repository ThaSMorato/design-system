import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'w-full rounded-lg border bg-dark-800 px-3 py-2 text-dark-100 placeholder-dark-400 transition-all focus:outline-none focus:ring-1',
  {
    variants: {
      variant: {
        default: 'border-dark-600 focus:border-primary-500 focus:ring-primary-500',
        error: 'border-accent-crimson focus:border-accent-crimson focus:ring-accent-crimson',
      },
      inputSize: {
        sm: 'py-1.5 text-sm',
        md: 'py-2 text-sm',
        lg: 'py-3 text-base',
      },
    },
    defaultVariants: { variant: 'default', inputSize: 'md' },
  },
);

export const textareaVariants = cva(
  'w-full rounded-lg border bg-dark-800 px-3 py-2 text-dark-100 placeholder-dark-400 transition-all focus:outline-none focus:ring-1 resize-none',
  {
    variants: {
      variant: {
        default: 'border-dark-600 focus:border-primary-500 focus:ring-primary-500',
        error: 'border-accent-crimson focus:border-accent-crimson focus:ring-accent-crimson',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export const selectVariants = cva(
  'w-full appearance-none rounded-lg border bg-dark-800 px-3 py-2 pr-10 text-dark-100 transition-all focus:outline-none focus:ring-1 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border-dark-600 focus:border-primary-500 focus:ring-primary-500',
        error: 'border-accent-crimson focus:border-accent-crimson focus:ring-accent-crimson',
      },
      selectSize: {
        sm: 'py-1.5 text-sm',
        md: 'py-2 text-sm',
        lg: 'py-3 text-base',
      },
    },
    defaultVariants: { variant: 'default', selectSize: 'md' },
  },
);

export type InputVariant = 'default' | 'error';
export type InputSize = 'sm' | 'md' | 'lg';

export const FIELD_WRAPPER_CLASS = 'w-full';
export const FIELD_LABEL_CLASS = 'mb-1 block text-sm font-medium text-dark-200';
export const FIELD_RELATIVE_CLASS = 'relative';
export const FIELD_LEFT_ICON_CLASS =
  'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-400';
export const FIELD_RIGHT_ICON_CLASS =
  'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-dark-400';
export const FIELD_ERROR_CLASS = 'mt-1 text-sm text-accent-crimson';
export const FIELD_HELPER_CLASS = 'mt-1 text-sm text-dark-400';
