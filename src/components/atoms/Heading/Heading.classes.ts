import { cva } from 'class-variance-authority';

/**
 * Title typography extracted from Card.Title, SectionHeader, PageHeader,
 * ConfirmDialog, WizardStep.Header, EmptyState, DangerZone and Modal.Header.
 * Size/weight/tone map 1:1 onto the class strings those components used.
 */
export const headingVariants = cva('', {
  variants: {
    size: {
      inherit: '',
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    },
    weight: {
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tone: {
      default: 'text-dark-100',
      danger: 'text-accent-crimson',
    },
  },
  defaultVariants: { size: 'md', weight: 'semibold', tone: 'default' },
});

export type HeadingSize = 'inherit' | 'sm' | 'md' | 'lg';
export type HeadingWeight = 'medium' | 'semibold' | 'bold';
export type HeadingTone = 'default' | 'danger';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
