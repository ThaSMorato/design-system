import { cva } from 'class-variance-authority';

export const avatarVariants = cva(
  'flex items-center justify-center flex-shrink-0 font-medium',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-2xl',
      },
      shape: {
        circle: 'rounded-full',
        rounded: 'rounded-lg',
        square: 'rounded-none',
      },
      variant: {
        default: 'bg-dark-700 text-dark-300 border border-dark-600',
        primary: 'bg-primary-900/50 text-primary-300',
        gradient: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
        warrior: 'bg-red-900/50 text-red-300',
        mage: 'bg-blue-900/50 text-blue-300',
        rogue: 'bg-emerald-900/50 text-emerald-300',
        cleric: 'bg-amber-900/50 text-amber-300',
        success: 'bg-accent-emerald/30 text-accent-emerald',
        warning: 'bg-accent-gold/30 text-accent-gold',
        danger: 'bg-accent-crimson/30 text-accent-crimson',
      },
    },
    defaultVariants: { size: 'md', shape: 'circle', variant: 'primary' },
  },
);

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

const AVATAR_AUTOCOLOR_VARIANTS = [
  'bg-primary-900/50 text-primary-300',
  'bg-blue-900/50 text-blue-300',
  'bg-emerald-900/50 text-emerald-300',
  'bg-amber-900/50 text-amber-300',
  'bg-purple-900/50 text-purple-300',
  'bg-pink-900/50 text-pink-300',
  'bg-red-900/50 text-red-300',
  'bg-cyan-900/50 text-cyan-300',
] as const;

/** Deterministic color class from a string (e.g. a character name). */
export function avatarAutoColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_AUTOCOLOR_VARIANTS[Math.abs(hash) % AVATAR_AUTOCOLOR_VARIANTS.length] as string;
}

/** Status dot color class. */
export function avatarStatusColor(status: AvatarStatus): string {
  switch (status) {
    case 'online': return 'bg-accent-emerald';
    case 'offline': return 'bg-dark-500';
    case 'away': return 'bg-accent-gold';
    case 'busy': return 'bg-accent-crimson';
  }
}

// Status dot sizing is handled by the Dot atom — AvatarSize maps 1:1 onto DotSize
// (xs 1.5 · sm 2 · md 2.5 · lg 3 · xl 4).
export const AVATAR_STATUS_POSITION =
  'absolute bottom-0 right-0 block ring-2 ring-dark-800';
export const AVATAR_IMAGE_BASE = 'h-full w-full object-cover';
