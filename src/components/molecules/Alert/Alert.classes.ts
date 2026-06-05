import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'relative flex items-start gap-3 rounded-lg border p-4',
  {
    variants: {
      variant: {
        info: 'bg-blue-900/30 border-blue-700/50 text-blue-300',
        success: 'bg-emerald-900/30 border-emerald-700/50 text-emerald-300',
        warning: 'bg-amber-900/30 border-amber-700/50 text-amber-300',
        error: 'bg-red-900/30 border-red-700/50 text-red-300',
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
