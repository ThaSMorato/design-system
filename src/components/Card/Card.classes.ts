import { cva } from 'class-variance-authority';

export const cardVariants = cva('bg-dark-800 border border-dark-700 rounded-lg', {
  variants: {
    variant: {
      default: 'shadow-lg',
      elevated: 'shadow-xl',
      interactive:
        'shadow-lg transition-all hover:border-primary-600 active:border-primary-600 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer',
      fantasy:
        'shadow-lg transition-all hover:border-primary-600 active:border-primary-600 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer',
      flat: '',
      outline: 'border-2 border-dashed border-dark-600 bg-transparent shadow-none',
    },
  },
  defaultVariants: { variant: 'default' },
});

export type CardVariant =
  | 'default'
  | 'elevated'
  | 'interactive'
  | 'fantasy'
  | 'flat'
  | 'outline';

export const CARD_HEADER_BASE_CLASS = 'flex items-center justify-between px-4 py-3';
export const CARD_HEADER_BORDER_CLASS = 'border-b border-dark-700';
export const CARD_TITLE_CLASS = 'text-lg font-semibold text-dark-100';
export const CARD_DESCRIPTION_CLASS = 'text-sm text-dark-400';
export const CARD_CONTENT_CLASS = 'p-4';
export const CARD_FOOTER_BASE_CLASS = 'flex items-center justify-end gap-3 px-4 py-3';
export const CARD_FOOTER_BORDER_CLASS = 'border-t border-dark-700';
