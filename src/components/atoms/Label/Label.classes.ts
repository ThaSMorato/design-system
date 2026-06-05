import { cva } from 'class-variance-authority';

/**
 * Single source of truth for form/section labels. Class strings extracted
 * verbatim from FORM_GROUP_LABEL_CLASS, FIELD_LABEL_CLASS and
 * WIZARD_SECTION_LABEL_CLASS.
 */
export const labelVariants = cva('block text-sm font-medium', {
  variants: {
    tone: {
      default: 'text-dark-200',
      muted: 'text-dark-300',
    },
  },
  defaultVariants: { tone: 'default' },
});

export type LabelTone = 'default' | 'muted';

export const LABEL_REQUIRED_CLASS = 'ml-1 text-accent-crimson';
