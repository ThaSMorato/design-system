import { cva } from 'class-variance-authority';

export const copyableLinkVariants = cva('flex items-center gap-2', {
  variants: {
    variant: { default: '', compact: '' },
    size: { sm: '', md: '', lg: '' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

export type CopyableLinkVariant = 'default' | 'compact';
export type CopyableLinkSize = 'sm' | 'md' | 'lg';

export const COPY_INPUT_SIZE_CLASSES: Record<CopyableLinkSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

export const COPY_BUTTON_SIZE_CLASSES: Record<CopyableLinkSize, string> = {
  sm: 'p-1',
  md: 'p-2',
  lg: 'p-3',
};

export const COPY_ICON_SIZE_CLASSES: Record<CopyableLinkSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export const COPY_INPUT_BASE_CLASS =
  'flex-1 rounded-lg border border-dark-600 bg-dark-900 font-mono text-dark-200 truncate';
export const COPY_BUTTON_BASE_CLASS =
  'inline-flex items-center justify-center rounded-lg border border-dark-600 bg-dark-700 text-dark-300 hover:bg-dark-600 active:bg-dark-600 hover:text-dark-100 active:text-dark-100 transition-colors';
export const COPY_CHECK_ICON_COLOR_CLASS = 'text-accent-emerald';
