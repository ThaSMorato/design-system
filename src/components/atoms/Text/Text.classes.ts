import { cva } from 'class-variance-authority';

/**
 * Body/description typography extracted from Card.Description,
 * ListItem.Subtitle, PageHeader/SectionHeader/EmptyState descriptions,
 * SelectionCard description/meta and similar muted text occurrences.
 */
export const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: '',
    },
    tone: {
      default: 'text-dark-300',
      muted: 'text-dark-400',
      subtle: 'text-dark-500',
    },
  },
  defaultVariants: { size: 'sm', tone: 'muted' },
});

export type TextSize = 'xs' | 'sm' | 'md';
export type TextTone = 'default' | 'muted' | 'subtle';
export type TextElement = 'p' | 'span' | 'div';
