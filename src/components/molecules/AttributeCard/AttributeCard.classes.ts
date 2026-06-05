import { cva } from 'class-variance-authority';

export const attributeCardVariants = cva('rounded-lg border text-center', {
  variants: {
    variant: {
      default: 'bg-dark-800/50 border-dark-700',
      editable: 'bg-dark-800 border-dark-600',
      highlighted: 'bg-primary-900/20 border-primary-700',
    },
    size: { sm: 'p-2', md: 'p-3', lg: 'p-4' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

export type AttributeCardVariant = 'default' | 'editable' | 'highlighted';
export type AttributeCardSize = 'sm' | 'md' | 'lg';

// The abbreviation row is rendered with the Text atom (xs/muted + overrides).
export const ATTR_EDIT_ROW_CLASS = 'flex items-center justify-center gap-2 mt-2';
/**
 * Stepper buttons compose NumberControl.Button (intent="neutral"); this
 * override restores AttributeCard's original compact w-7/h-7 dark-700 look
 * via tailwind-merge.
 */
export const ATTR_STEPPER_OVERRIDE_CLASS =
  'w-7 h-7 p-0 flex items-center justify-center bg-dark-700 hover:bg-dark-600 active:bg-dark-600 hover:text-dark-100 active:text-dark-100';
export const ATTR_SCORE_WRAPPER_CLASS = 'min-w-[3rem] text-center';
export const ATTR_SCORE_CLASS = 'text-2xl font-bold text-dark-100';
export const ATTR_BONUS_CLASS = 'text-sm text-accent-emerald ml-1';
export const ATTR_MODIFIER_BASE_CLASS = 'text-lg font-medium mt-1';
export const ATTR_MODIFIER_POS_CLASS = 'text-accent-emerald';
export const ATTR_MODIFIER_NEG_CLASS = 'text-accent-crimson';

// Modifier formatting moved to src/utils/format.ts (formatModifier).
