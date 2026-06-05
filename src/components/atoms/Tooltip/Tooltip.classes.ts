import { cva } from 'class-variance-authority';

export const tooltipVariants = cva(
  'absolute z-50 px-2 py-1 text-xs rounded bg-dark-900 text-dark-100 shadow-lg border border-dark-700 whitespace-normal max-w-xs',
  {
    variants: {
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: { position: 'top' },
  },
);

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export const TOOLTIP_WRAPPER_CLASS = 'relative inline-block';
export const TOOLTIP_ARROW_BASE_CLASS = 'absolute w-2 h-2 bg-dark-900 border-dark-700 rotate-45';

export function tooltipArrowClass(position: TooltipPosition): string {
  switch (position) {
    case 'top': return 'top-full left-1/2 -translate-x-1/2 -mt-1 border-b border-r';
    case 'bottom': return 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-t border-l';
    case 'left': return 'left-full top-1/2 -translate-y-1/2 -ml-1 border-t border-r';
    case 'right': return 'right-full top-1/2 -translate-y-1/2 -mr-1 border-b border-l';
  }
}
