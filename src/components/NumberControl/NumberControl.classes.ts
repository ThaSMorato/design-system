import { cva } from 'class-variance-authority';

export const numberControlVariants = cva('flex items-center gap-2', {
  variants: {
    variant: { default: '', hp: '', stat: '' },
  },
  defaultVariants: { variant: 'default' },
});

export const numberControlButtonVariants = cva(
  'p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        decrease: 'bg-accent-crimson/20 hover:bg-accent-crimson/30 active:bg-accent-crimson/30 text-accent-crimson',
        increase: 'bg-accent-emerald/20 hover:bg-accent-emerald/30 active:bg-accent-emerald/30 text-accent-emerald',
        neutral: 'bg-dark-600 hover:bg-dark-500 active:bg-dark-500 text-dark-300',
      },
      size: { sm: 'p-1', md: 'p-2', lg: 'p-3' },
    },
    defaultVariants: { intent: 'neutral', size: 'md' },
  },
);

export type NumberControlVariant = 'default' | 'hp' | 'stat';
export type NumberControlButtonIntent = 'decrease' | 'increase' | 'neutral';
export type NumberControlSize = 'sm' | 'md' | 'lg';

export const NUMBER_INPUT_BASE_CLASS =
  'flex-1 min-w-0 bg-dark-600 border border-dark-500 rounded text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500';

export const NUMBER_INPUT_SIZE_CLASSES: Record<NumberControlSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

export const NUMBER_ACTION_CLASS =
  'px-3 py-2 bg-primary-500/20 hover:bg-primary-500/30 active:bg-primary-500/30 text-primary-400 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium';

export const NUMBER_DISPLAY_ROOT_CLASS = 'flex items-center gap-2 text-lg font-bold';
export const NUMBER_DISPLAY_VALUE_CLASS = 'text-dark-100';
export const NUMBER_DISPLAY_SEP_CLASS = 'text-dark-500';
export const NUMBER_DISPLAY_MAX_CLASS = 'text-dark-400';
export const NUMBER_DISPLAY_EXTRA_CLASS = 'text-primary-400 text-sm';

// Legacy export name kept for backward compatibility
export { numberControlButtonVariants as buttonVariants };
