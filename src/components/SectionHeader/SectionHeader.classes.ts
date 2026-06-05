import { cva } from 'class-variance-authority';

export const sectionHeaderVariants = cva('mb-6', {
  variants: {
    size: { sm: '', md: '', lg: '' },
  },
  defaultVariants: { size: 'md' },
});

export const sectionHeaderTitleVariants = cva('font-semibold text-dark-100', {
  variants: {
    size: { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' },
  },
  defaultVariants: { size: 'md' },
});

export const sectionHeaderDescriptionVariants = cva('text-dark-400', {
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
