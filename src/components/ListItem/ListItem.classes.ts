import { cva } from 'class-variance-authority';

export const listItemVariants = cva(
  'flex items-center justify-between rounded-lg border',
  {
    variants: {
      variant: {
        default: 'border-dark-700 bg-dark-800 p-3',
        interactive:
          'border-dark-700 bg-dark-800 p-3 hover:border-dark-600 active:border-dark-600 hover:bg-dark-750 active:bg-dark-750 cursor-pointer transition-colors',
        compact: 'border-dark-700 bg-dark-800 p-2',
        ghost: 'border-transparent bg-transparent p-3 hover:bg-dark-800/50 active:bg-dark-800/50',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export type ListItemVariant = 'default' | 'interactive' | 'compact' | 'ghost';

export const LIST_ITEM_LEADING_CLASS = 'flex-shrink-0';
export const LIST_ITEM_CONTENT_CLASS = 'flex-1 min-w-0';
export const LIST_ITEM_TITLE_CLASS = 'font-medium text-dark-100 truncate';
export const LIST_ITEM_SUBTITLE_CLASS = 'text-sm text-dark-400';
export const LIST_ITEM_META_CLASS = 'mt-1 flex items-center gap-2';
export const LIST_ITEM_ACTIONS_CLASS = 'flex items-center gap-2 flex-shrink-0';
export const LIST_ITEM_SEPARATOR_CLASS = 'h-8 w-px bg-dark-700 mx-3';
