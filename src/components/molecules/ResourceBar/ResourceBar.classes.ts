import { cva } from 'class-variance-authority';

export const resourceBarVariants = cva('overflow-hidden rounded-full bg-dark-700', {
  variants: {
    size: { xs: 'h-1', sm: 'h-2', md: 'h-4', lg: 'h-6' },
    colorScheme: { health: '', mana: '', resource: '', xp: '', custom: '' },
  },
  defaultVariants: { size: 'md', colorScheme: 'health' },
});

export type ResourceBarSize = 'xs' | 'sm' | 'md' | 'lg';
export type ResourceBarColorScheme = 'health' | 'mana' | 'resource' | 'xp' | 'custom';

export function resourceBarColor(
  colorScheme: ResourceBarColorScheme | null | undefined,
  percentage: number,
): string {
  switch (colorScheme) {
    case 'health':
      if (percentage > 50) return 'bg-accent-emerald';
      if (percentage > 25) return 'bg-accent-gold';
      return 'bg-accent-crimson';
    case 'mana': return 'bg-blue-500';
    case 'resource': return 'bg-primary-500';
    case 'xp': return 'bg-purple-500';
    default: return 'bg-primary-500';
  }
}

export const RESOURCE_LABEL_ROW_CLASS = 'mb-1 flex items-center justify-between';
export const RESOURCE_LABEL_CLASS = 'text-xs font-medium text-dark-300 uppercase tracking-wide';
export const RESOURCE_VALUE_CLASS = 'text-sm font-semibold text-dark-100';
export const RESOURCE_TEMP_VALUE_CLASS = 'text-blue-400';
// Track, fill and temp-fill rendering moved to the ProgressBar atom.
