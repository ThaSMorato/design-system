import { cva } from 'class-variance-authority';

export const buttonGroupVariants = cva('flex gap-3', {
  variants: {
    align: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    },
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
  },
  defaultVariants: { align: 'between', direction: 'row' },
});

export type ButtonGroupAlign = 'left' | 'center' | 'right' | 'between';
export type ButtonGroupDirection = 'row' | 'column';
export type ButtonGroupPaddingTop = 'none' | 'sm' | 'md' | 'lg';

export const BUTTON_GROUP_BORDER_CLASS = 'border-t border-dark-700';

export function buttonGroupPaddingClass(pt: ButtonGroupPaddingTop): string {
  switch (pt) {
    case 'sm': return 'pt-2';
    case 'md': return 'pt-4';
    case 'lg': return 'pt-6';
    default: return '';
  }
}
