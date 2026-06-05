import { cva } from 'class-variance-authority';

export const statCardVariants = cva('rounded-lg border p-4 text-center', {
  variants: {
    variant: {
      default: 'bg-dark-800/50 border-dark-700',
      strength: 'bg-red-900/20 border-red-800/50',
      dexterity: 'bg-green-900/20 border-green-800/50',
      constitution: 'bg-orange-900/20 border-orange-800/50',
      intelligence: 'bg-blue-900/20 border-blue-800/50',
      wisdom: 'bg-purple-900/20 border-purple-800/50',
      charisma: 'bg-pink-900/20 border-pink-800/50',
      hp: 'bg-accent-crimson/20 border-accent-crimson/50',
      ac: 'bg-blue-900/20 border-blue-800/50',
      initiative: 'bg-green-900/20 border-green-800/50',
      speed: 'bg-purple-900/20 border-purple-800/50',
      proficiency: 'bg-orange-900/20 border-orange-800/50',
    },
    size: { sm: 'p-2', md: 'p-4', lg: 'p-6' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

export const statValueVariants = cva('font-bold', {
  variants: {
    variant: {
      default: 'text-dark-100',
      strength: 'text-red-400',
      dexterity: 'text-green-400',
      constitution: 'text-orange-400',
      intelligence: 'text-blue-400',
      wisdom: 'text-purple-400',
      charisma: 'text-pink-400',
      hp: 'text-accent-crimson',
      ac: 'text-blue-400',
      initiative: 'text-green-400',
      speed: 'text-purple-400',
      proficiency: 'text-orange-400',
    },
    size: { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

export type StatCardVariant =
  | 'default' | 'strength' | 'dexterity' | 'constitution' | 'intelligence'
  | 'wisdom' | 'charisma' | 'hp' | 'ac' | 'initiative' | 'speed' | 'proficiency';
export type StatCardSize = 'sm' | 'md' | 'lg';

export const STAT_ICON_WRAPPER_CLASS = 'mb-2 flex justify-center text-dark-400';
export const STAT_MODIFIER_CLASS = 'text-sm font-medium text-dark-300';
export const STAT_LABEL_CLASS = 'mt-1 text-xs font-medium uppercase tracking-wide text-dark-400';

export function formatStatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// Re-export with legacy name for the existing web public API
export { statValueVariants as valueVariants };
