import { cva } from 'class-variance-authority';

/**
 * Selectable filter pill extracted from FilterBar's `filterButtonVariants`.
 * Class strings preserved verbatim; the disabled styling moved from a
 * conditional class to CSS `disabled:` prefixes (same rendered result).
 */
export const chipVariants = cva(
  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      shape: {
        rounded: '',
        pill: 'rounded-full',
      },
      selected: {
        true: 'bg-primary-500 text-white',
        false: 'bg-dark-700 text-dark-300 hover:bg-dark-600 active:bg-dark-600',
      },
    },
    defaultVariants: { shape: 'rounded', selected: false },
  }
);

export type ChipShape = 'rounded' | 'pill';

const CHIP_COUNT_BASE = 'text-xs';

export function chipCountClass(selected: boolean): string {
  return `${CHIP_COUNT_BASE} ${selected ? 'text-white/80' : 'text-dark-400'}`;
}
