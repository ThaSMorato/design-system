import { cva } from 'class-variance-authority';

export const selectionCardVariants = cva(
  'w-full text-left rounded-lg border-2 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: { default: '', primary: '', success: '', warning: '' },
      size: { sm: 'p-2', md: 'p-3', lg: 'p-4' },
      selected: { true: '', false: '' },
    },
    compoundVariants: [
      { variant: 'default', selected: false, className: 'border-dark-600 bg-dark-800 hover:border-dark-500 active:border-dark-500 hover:bg-dark-700 active:bg-dark-700' },
      { variant: 'default', selected: true, className: 'border-primary-500 bg-primary-900/30' },
      { variant: 'primary', selected: false, className: 'border-dark-600 bg-dark-800 hover:border-primary-600 active:border-primary-600 hover:bg-dark-700 active:bg-dark-700' },
      { variant: 'primary', selected: true, className: 'border-primary-500 bg-primary-900/30' },
      { variant: 'success', selected: false, className: 'border-dark-600 bg-dark-800 hover:border-accent-emerald/50 active:border-accent-emerald/50 hover:bg-dark-700 active:bg-dark-700' },
      { variant: 'success', selected: true, className: 'border-accent-emerald bg-accent-emerald/20' },
      { variant: 'warning', selected: false, className: 'border-dark-600 bg-dark-800 hover:border-accent-gold/50 active:border-accent-gold/50 hover:bg-dark-700 active:bg-dark-700' },
      { variant: 'warning', selected: true, className: 'border-accent-gold bg-accent-gold/20' },
    ],
    defaultVariants: { variant: 'default', size: 'lg', selected: false },
  },
);

export type SelectionCardVariant = 'default' | 'primary' | 'success' | 'warning';
export type SelectionCardSize = 'sm' | 'md' | 'lg';
export type SelectionCardIconPosition = 'left' | 'top';

export function selectionCardInnerClass(iconPosition: SelectionCardIconPosition): string {
  return iconPosition === 'top'
    ? 'flex gap-3 flex-col items-center text-center'
    : 'flex gap-3 items-start';
}

export function selectionCardIconClass(selected: boolean): string {
  return `flex-shrink-0 ${selected ? 'text-primary-400' : 'text-dark-400'}`;
}

export function selectionCardTitleClass(selected: boolean): string {
  return `font-medium ${selected ? 'text-dark-100' : 'text-dark-200'}`;
}

export const SELECTION_BODY_CLASS = 'flex-1 min-w-0';
export const SELECTION_DESCRIPTION_CLASS = 'text-sm text-dark-400 mt-0.5';
export const SELECTION_META_CLASS = 'text-xs text-dark-500 mt-1';
