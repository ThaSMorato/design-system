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

export const ATTR_ABBR_CLASS = 'text-xs font-medium text-dark-400 uppercase tracking-wide';
export const ATTR_EDIT_ROW_CLASS = 'flex items-center justify-center gap-2 mt-2';
export const ATTR_STEPPER_BUTTON_CLASS =
  'w-7 h-7 flex items-center justify-center rounded bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-dark-100 active:bg-dark-600 active:text-dark-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
export const ATTR_SCORE_WRAPPER_CLASS = 'min-w-[3rem] text-center';
export const ATTR_SCORE_CLASS = 'text-2xl font-bold text-dark-100';
export const ATTR_BONUS_CLASS = 'text-sm text-accent-emerald ml-1';
export const ATTR_MODIFIER_BASE_CLASS = 'text-lg font-medium mt-1';
export const ATTR_MODIFIER_POS_CLASS = 'text-accent-emerald';
export const ATTR_MODIFIER_NEG_CLASS = 'text-accent-crimson';

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}
