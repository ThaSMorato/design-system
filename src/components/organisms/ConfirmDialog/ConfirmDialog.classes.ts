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

// Overlay/panel/escape handling come from the Modal organism; the icon
// container is an IconBox atom; title/message use Heading/Text atoms; close is
// an IconButton; cancel/confirm are Button atoms (confirm gets the per-variant
// color override from confirmButtonConfig via tailwind-merge).
export const CONFIRM_HEADER_ROW_CLASS = 'flex items-start gap-4 p-6';
export const CONFIRM_BODY_CLASS = 'flex-1 min-w-0';
export const CONFIRM_FOOTER_CLASS = 'flex justify-end gap-3 border-t border-dark-700 px-6 py-4';
