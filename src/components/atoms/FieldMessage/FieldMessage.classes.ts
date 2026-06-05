import { cva } from 'class-variance-authority';

/**
 * Unifies FORM_GROUP_ERROR_CLASS / FORM_GROUP_HELPER_CLASS and the
 * identical FIELD_ERROR_CLASS / FIELD_HELPER_CLASS duplicates.
 */
export const fieldMessageVariants = cva('mt-1 text-sm', {
  variants: {
    tone: {
      error: 'text-accent-crimson',
      helper: 'text-dark-400',
    },
  },
  defaultVariants: { tone: 'helper' },
});

export type FieldMessageTone = 'error' | 'helper';
