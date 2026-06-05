import { cva } from 'class-variance-authority';
import type { IconBoxSize } from '../../atoms/IconBox';

export const emptyStateVariants = cva('rounded-lg border text-center', {
  variants: {
    variant: {
      default: 'bg-dark-800/50 border-dark-700',
      card: 'bg-dark-800 border-dark-600 shadow-lg',
    },
    size: {
      sm: 'p-6',
      md: 'p-8',
      lg: 'p-12',
    },
  },
  defaultVariants: { variant: 'default', size: 'lg' },
});

export type EmptyStateVariant = 'default' | 'card';
export type EmptyStateSize = 'sm' | 'md' | 'lg';

/** The icon container is an IconBox atom; EmptyState sizes map onto its scale. */
export const EMPTY_ICON_BOX_SIZE: Record<EmptyStateSize, IconBoxSize> = {
  sm: 'md', // h-12
  md: 'lg', // h-16
  lg: 'xl', // h-20
};

export function emptyStateIconMarginClass(size: EmptyStateSize): string {
  if (size === 'sm') return 'mb-3';
  if (size === 'md') return 'mb-4';
  return 'mb-6';
}

export const EMPTY_ICON_INNER_CLASS = 'text-dark-400';

// Titles are Heading atoms (h3, size sm|md).

/** Layout-only classes for Description — typography comes from the Text atom. */
export function emptyStateDescriptionClass(size: EmptyStateSize | null | undefined): string {
  const base = 'max-w-md mx-auto';
  if (size === 'sm') return `${base} mt-1`;
  return `${base} mt-2`;
}

export function emptyStateActionsClass(size: EmptyStateSize | null | undefined): string {
  const base = 'flex items-center justify-center gap-3';
  if (size === 'sm') return `${base} mt-4`;
  if (size === 'md') return `${base} mt-5`;
  return `${base} mt-6`;
}
