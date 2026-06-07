import { cva } from 'class-variance-authority';

export const conditionBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-dark-700 text-dark-200',
        positive: 'bg-accent-emerald/20 text-accent-emerald',
        negative: 'bg-accent-crimson/20 text-accent-crimson',
        neutral: 'bg-accent-gold/20 text-accent-gold',
        status: 'bg-info-solid/20 text-info-solid',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export type ConditionBadgeVariant = 'default' | 'positive' | 'negative' | 'neutral' | 'status';
export type ConditionBadgeSize = 'sm' | 'md' | 'lg';

/** Maps badge size to icon size utility class. */
export function conditionBadgeIconSize(size: ConditionBadgeSize | null | undefined): string {
  if (size === 'sm') return 'h-3 w-3';
  if (size === 'lg') return 'h-4 w-4';
  return 'h-3.5 w-3.5';
}

export const CONDITION_DURATION_CLASS = 'flex items-center gap-0.5 opacity-80';
export const CONDITION_REMOVE_BUTTON_CLASS =
  'ml-0.5 rounded-full p-0.5 hover:bg-dark-600/50 active:bg-dark-600/50 transition-colors';
