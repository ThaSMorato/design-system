import { cva } from 'class-variance-authority';

export const pageHeaderVariants = cva('', {
  variants: {
    variant: { default: '', compact: '' },
    spacing: {
      default: 'mb-6',
      none: '',
      sm: 'mb-4',
      lg: 'mb-8',
    },
  },
  defaultVariants: { variant: 'default', spacing: 'default' },
});

export type PageHeaderVariant = 'default' | 'compact';
export type PageHeaderSpacing = 'default' | 'none' | 'sm' | 'lg';

export const PAGE_BACK_LINK_CLASS =
  'inline-flex items-center gap-1 text-sm text-dark-400 hover:text-dark-200 active:text-dark-200 transition-colors mb-3';
export const PAGE_BACK_ICON_CLASS = 'h-4 w-4';
export const PAGE_ROW_CLASS = 'flex items-center justify-between gap-4';
export const PAGE_LEFT_CLASS = 'flex items-center gap-3 min-w-0';
export const PAGE_ICON_WRAPPER_CLASS = 'flex-shrink-0 text-primary-400';
export const PAGE_TITLE_WRAPPER_CLASS = 'min-w-0';
export const PAGE_TITLE_CLASS = 'text-2xl font-bold text-dark-100 truncate';
export const PAGE_DESCRIPTION_CLASS = 'mt-1 text-dark-400';
export const PAGE_ACTIONS_CLASS = 'flex items-center gap-3 flex-shrink-0';
