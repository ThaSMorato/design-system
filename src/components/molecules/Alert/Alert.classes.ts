import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'relative flex items-start gap-3 rounded-lg border p-4',
  {
    variants: {
      variant: {
        info: 'bg-info-surface border-info-border text-info-text',
        success: 'bg-success-surface border-success-border text-success-text',
        warning: 'bg-warning-surface border-warning-border text-warning-text',
        error: 'bg-error-surface border-error-border text-error-text',
      },
    },
    defaultVariants: { variant: 'info' },
  },
);

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export const ALERT_ICON_CLASS = 'h-5 w-5 shrink-0 mt-0.5';
export const ALERT_BODY_CLASS = 'flex-1';
export const ALERT_TITLE_CLASS = 'font-medium mb-1';
export const ALERT_CONTENT_CLASS = 'text-sm opacity-90';
// The dismiss button is an IconButton atom (variant="fade", shape="square", size="sm").
export const ALERT_DISMISS_ICON_CLASS = 'h-4 w-4';
