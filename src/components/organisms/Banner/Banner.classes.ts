import { cva } from 'class-variance-authority';

export const bannerVariants = cva('rounded-lg border p-4', {
  variants: {
    variant: {
      info: 'bg-blue-900/20 border-blue-700/50',
      success: 'bg-accent-emerald/20 border-accent-emerald/50',
      warning: 'bg-accent-gold/20 border-accent-gold/50',
      danger: 'bg-accent-crimson/20 border-accent-crimson/50',
      primary: 'bg-primary-900/20 border-primary-700/50',
      gradient: 'bg-gradient-to-r from-primary-900/30 to-accent-emerald/20 border-primary-700/30',
    },
  },
  defaultVariants: { variant: 'info' },
});

export const bannerIconContainerVariants = cva(
  'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      variant: {
        info: 'bg-blue-900/50 text-blue-400',
        success: 'bg-accent-emerald/30 text-accent-emerald',
        warning: 'bg-accent-gold/30 text-accent-gold',
        danger: 'bg-accent-crimson/30 text-accent-crimson',
        primary: 'bg-primary-900/50 text-primary-400',
        gradient: 'bg-primary-900/50 text-primary-400',
      },
    },
    defaultVariants: { variant: 'info' },
  },
);

export const bannerTitleVariants = cva('font-semibold', {
  variants: {
    variant: {
      info: 'text-blue-300',
      success: 'text-accent-emerald',
      warning: 'text-accent-gold',
      danger: 'text-accent-crimson',
      primary: 'text-primary-300',
      gradient: 'text-dark-100',
    },
  },
  defaultVariants: { variant: 'info' },
});

export const bannerDescriptionVariants = cva('text-sm', {
  variants: {
    variant: {
      info: 'text-blue-400/80',
      success: 'text-accent-emerald/80',
      warning: 'text-accent-gold/80',
      danger: 'text-accent-crimson/80',
      primary: 'text-primary-400/80',
      gradient: 'text-dark-300',
    },
  },
  defaultVariants: { variant: 'info' },
});

export type BannerVariant = 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'gradient';

export const BANNER_ROW_CLASS = 'flex items-center justify-between gap-4';
export const BANNER_CONTENT_CLASS = 'flex items-center gap-3 min-w-0 flex-1';
export const BANNER_TEXT_CONTENT_CLASS = 'min-w-0';
export const BANNER_ACTIONS_CLASS = 'flex items-center gap-3 flex-shrink-0';
// The dismiss button is an IconButton atom (variant="ghost", size="sm").

// Legacy export names kept for backward compatibility with the existing barrel.
export {
  bannerIconContainerVariants as iconContainerVariants,
  bannerTitleVariants as titleVariants,
  bannerDescriptionVariants as descriptionVariants,
};
