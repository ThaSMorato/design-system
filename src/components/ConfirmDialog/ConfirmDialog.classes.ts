import { cva } from 'class-variance-authority';

export const confirmDialogVariants = cva('', {
  variants: {
    variant: { danger: '', warning: '', info: '', success: '' },
  },
  defaultVariants: { variant: 'danger' },
});

export type ConfirmDialogVariant = 'danger' | 'warning' | 'info' | 'success';

export const confirmIconConfig: Record<
  ConfirmDialogVariant,
  { bgColor: string; textColor: string }
> = {
  danger: { bgColor: 'bg-accent-crimson/20', textColor: 'text-accent-crimson' },
  warning: { bgColor: 'bg-accent-gold/20', textColor: 'text-accent-gold' },
  info: { bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
  success: { bgColor: 'bg-accent-emerald/20', textColor: 'text-accent-emerald' },
};

export const confirmButtonConfig: Record<ConfirmDialogVariant, string> = {
  danger: 'bg-accent-crimson hover:bg-accent-crimson/90 active:bg-accent-crimson/90 text-white',
  warning: 'bg-accent-gold hover:bg-accent-gold/90 active:bg-accent-gold/90 text-dark-900',
  info: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-white',
  success: 'bg-accent-emerald hover:bg-accent-emerald/90 active:bg-accent-emerald/90 text-dark-900',
};

export const CONFIRM_OVERLAY_CLASS =
  'fixed inset-0 z-50 flex items-center justify-center bg-dark-900/75 backdrop-blur-sm';
export const CONFIRM_PANEL_CLASS =
  'mx-4 w-full max-w-md rounded-lg bg-dark-800 border border-dark-700 shadow-xl';
export const CONFIRM_HEADER_ROW_CLASS = 'flex items-start gap-4 p-6';
export const CONFIRM_ICON_WRAPPER_BASE_CLASS =
  'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full';
export const CONFIRM_BODY_CLASS = 'flex-1 min-w-0';
export const CONFIRM_TITLE_CLASS = 'text-lg font-semibold text-dark-100';
export const CONFIRM_MESSAGE_CLASS = 'mt-2 text-sm text-dark-400';
export const CONFIRM_CLOSE_BUTTON_CLASS =
  'flex-shrink-0 rounded-lg p-1 text-dark-400 hover:bg-dark-700 active:bg-dark-700 hover:text-dark-100 active:text-dark-100 transition-colors';
export const CONFIRM_FOOTER_CLASS = 'flex justify-end gap-3 border-t border-dark-700 px-6 py-4';
export const CONFIRM_CANCEL_BUTTON_CLASS =
  'rounded-lg border border-dark-600 bg-dark-700 px-4 py-2 text-sm font-medium text-dark-300 hover:bg-dark-600 active:bg-dark-600 transition-colors disabled:opacity-50';
export const CONFIRM_PRIMARY_BUTTON_BASE_CLASS =
  'rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
