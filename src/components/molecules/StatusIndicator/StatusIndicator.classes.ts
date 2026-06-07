import { cva } from 'class-variance-authority';
import type { DotSize } from '../../atoms/Dot';

/**
 * Kept for the public API (`statusIndicatorVariants` is exported from the
 * barrel); internally StatusIndicator now renders the Dot atom with the
 * color/size helpers below.
 */
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
      info: 'bg-info-solid',
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

/** Color class for the dot — same map as statusIndicatorVariants.variant. */
export function statusIndicatorColor(
  variant: StatusIndicatorVariant | null | undefined
): string {
  switch (variant) {
    case 'connected':
    case 'online':
    case 'success':
      return 'bg-accent-emerald';
    case 'connecting':
    case 'reconnecting':
    case 'away':
    case 'warning':
      return 'bg-accent-gold';
    case 'disconnected':
    case 'busy':
    case 'error':
      return 'bg-accent-crimson';
    case 'info':
      return 'bg-info-solid';
    case 'offline':
      return 'bg-dark-500';
    default:
      return 'bg-dark-400';
  }
}

/** StatusIndicator sizes map onto the Dot atom's scale (md=h-3 → Dot lg, lg=h-4 → Dot xl). */
export const STATUS_DOT_SIZE: Record<StatusIndicatorSize, DotSize> = {
  xs: 'xs',
  sm: 'sm',
  md: 'lg',
  lg: 'xl',
};

export const STATUS_PULSE_VARIANTS: ReadonlyArray<StatusIndicatorVariant> = [
  'connecting',
  'reconnecting',
];

export const STATUS_WRAPPER_CLASS = 'inline-flex items-center gap-2';
export const STATUS_DOT_WRAPPER_CLASS = 'relative';
export const STATUS_PULSE_CLASS = 'absolute inset-0 animate-ping rounded-full opacity-75';

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
