import { cva } from 'class-variance-authority';

export const sectionHeaderVariants = cva('mb-6', {
  variants: {
    size: { sm: '', md: '', lg: '' },
  },
  defaultVariants: { size: 'md' },
});

// Titles are Heading atoms — SectionHeader sizes map 1:1 onto Heading sizes.

// Description typography composes the Text atom (tone="muted"); this cva only
// carries the per-size text-size + spacing adjustments.
export const sectionHeaderDescriptionVariants = cva('', {
  variants: {
    size: { sm: 'text-xs mt-1', md: 'text-sm mt-2', lg: 'text-base mt-2' },
  },
  defaultVariants: { size: 'md' },
});

export type SectionHeaderSize = 'sm' | 'md' | 'lg';

export const SECTION_ROW_CLASS = 'flex items-start justify-between gap-4';
export const SECTION_LEFT_CLASS = 'flex items-center gap-3';
export const SECTION_ICON_CLASS = 'flex-shrink-0 text-primary-400';
export const SECTION_ACTION_CLASS = 'flex-shrink-0';
