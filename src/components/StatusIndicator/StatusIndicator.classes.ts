import { cva } from 'class-variance-authority';

export const statusIndicatorVariants = cva('block rounded-full', {
  variants: {
    variant: {
      connected: 'bg-accent-emerald',
      connecting: 'bg-accent-gold',
      reconnecting: 'bg-accent-gold',
      disconnected: 'bg-accent-crimson',
      online: 'bg-accent-emerald',
      offline: 'bg-dark-500',
      away: 'bg-accent-gold',
      busy: 'bg-accent-crimson',
      success: 'bg-accent-emerald',
      warning: 'bg-accent-gold',
      error: 'bg-accent-crimson',
      info: 'bg-blue-500',
      default: 'bg-dark-400',
    },
    size: {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-3 w-3',
      lg: 'h-4 w-4',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

export type StatusIndicatorVariant =
  | 'connected'
  | 'connecting'
  | 'reconnecting'
  | 'disconnected'
  | 'online'
  | 'offline'
  | 'away'
  | 'busy'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'default';
export type StatusIndicatorSize = 'xs' | 'sm' | 'md' | 'lg';

export const STATUS_PULSE_VARIANTS: ReadonlyArray<StatusIndicatorVariant> = [
  'connecting',
  'reconnecting',
];

export const STATUS_WRAPPER_CLASS = 'inline-flex items-center gap-2';
export const STATUS_DOT_WRAPPER_CLASS = 'relative';
export const STATUS_PULSE_CLASS = 'absolute inset-0 animate-ping rounded-full opacity-75';
export const STATUS_LABEL_CLASS = 'text-sm text-dark-300';

export const STATUS_DEFAULT_LABELS: Record<string, string> = {
  connected: 'Connected',
  connecting: 'Connecting...',
  reconnecting: 'Reconnecting...',
  disconnected: 'Disconnected',
  online: 'Online',
  offline: 'Offline',
  away: 'Away',
  busy: 'Busy',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  info: 'Info',
};
