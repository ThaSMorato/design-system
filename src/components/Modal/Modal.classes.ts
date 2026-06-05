import { cva } from 'class-variance-authority';

export const modalVariants = cva(
  'relative w-full bg-dark-800 border border-dark-700 rounded-lg shadow-xl',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full mx-4',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export const MODAL_BACKDROP_WRAPPER_CLASS = 'fixed inset-0 z-50 overflow-y-auto';
export const MODAL_BACKDROP_CLASS = 'fixed inset-0 bg-black/50 transition-opacity';
export const MODAL_POSITIONING_CLASS = 'flex min-h-full items-center justify-center p-4';
export const MODAL_HEADER_CLASS = 'flex items-center justify-between px-4 py-3 border-b border-dark-700';
export const MODAL_HEADER_TITLE_CLASS = 'text-lg font-medium text-dark-100';
export const MODAL_HEADER_CLOSE_BUTTON_CLASS =
  'rounded-lg p-1 text-dark-400 hover:bg-dark-700 active:bg-dark-700 hover:text-dark-100 active:text-dark-100 transition-colors';
export const MODAL_BODY_CLASS = 'px-4 py-5 sm:p-6';
export const MODAL_FOOTER_CLASS = 'flex items-center justify-end gap-3 px-4 py-3 border-t border-dark-700';
