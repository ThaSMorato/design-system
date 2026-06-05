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

/** CopyableLink sizes map onto the IconButton atom's size scale. */
export const COPY_BUTTON_SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const satisfies Record<CopyableLinkSize, string>;

export const COPY_ICON_SIZE_CLASSES: Record<CopyableLinkSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export const COPY_INPUT_BASE_CLASS =
  'flex-1 rounded-lg border border-dark-600 bg-dark-900 font-mono text-dark-200 truncate';
// Button styling now comes from the IconButton atom (variant="outline").
export const COPY_CHECK_ICON_COLOR_CLASS = 'text-accent-emerald';
