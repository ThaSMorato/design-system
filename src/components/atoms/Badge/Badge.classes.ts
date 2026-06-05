import { cva } from 'class-variance-authority';

export const badgeVariants = cva('inline-flex items-center font-medium rounded-full', {
  variants: {
    variant: {
      default: 'bg-dark-700 text-dark-300 border border-dark-600',
      level: 'bg-primary-900/50 text-primary-300 border border-primary-700',
      'role-dm': 'bg-amber-200 text-amber-900 ring-2 ring-amber-300',
      'role-player': 'bg-blue-200 text-blue-900 ring-2 ring-blue-300',
      'status-active': 'bg-accent-emerald/20 text-accent-emerald',
      'status-paused': 'bg-accent-gold/20 text-accent-gold',
      'status-inactive': 'bg-dark-700 text-dark-300',
      success: 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50',
      warning: 'bg-amber-900/30 text-amber-300 border border-amber-700/50',
      error: 'bg-red-900/30 text-red-300 border border-red-700/50',
      info: 'bg-blue-900/30 text-blue-300 border border-blue-700/50',
      progression: 'bg-dark-700 text-dark-300',
    },
    size: {
      xs: 'px-1.5 py-0.5 text-xs gap-1',
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-3 py-1 text-sm gap-1.5',
    },
  },
  defaultVariants: { variant: 'default', size: 'sm' },
});

export type BadgeVariant =
  | 'default'
  | 'level'
  | 'role-dm'
  | 'role-player'
  | 'status-active'
  | 'status-paused'
  | 'status-inactive'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'progression';
export type BadgeSize = 'xs' | 'sm' | 'md';

/**
 * Maps a Badge variant to the class used for its optional status dot.
 * Shared between web and native so the dot color stays consistent.
 */
export function badgeDotClassName(variant: BadgeVariant | null | undefined): string {
  switch (variant) {
    case 'status-active':
      return 'bg-accent-emerald';
    case 'status-paused':
      return 'bg-accent-gold';
    case 'status-inactive':
      return 'bg-dark-400';
    case 'success':
      return 'bg-emerald-400';
    case 'warning':
      return 'bg-amber-400';
    case 'error':
      return 'bg-red-400';
    case 'info':
      return 'bg-blue-400';
    default:
      return '';
  }
}

// The dot itself is rendered by the Dot atom (size="xs" = h-1.5 w-1.5 rounded-full).
