import { cva } from 'class-variance-authority';

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

export const emptyStateIconContainerVariants = cva(
  'mx-auto rounded-full flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'w-12 h-12 mb-3',
        md: 'w-16 h-16 mb-4',
        lg: 'w-20 h-20 mb-6',
      },
      variant: { default: 'bg-dark-700', card: 'bg-dark-700' },
    },
    defaultVariants: { size: 'lg', variant: 'default' },
  },
);

export type EmptyStateVariant = 'default' | 'card';
export type EmptyStateSize = 'sm' | 'md' | 'lg';

export const EMPTY_ICON_INNER_CLASS = 'text-dark-400';

export function emptyStateTitleClass(size: EmptyStateSize | null | undefined): string {
  const base = 'font-semibold text-dark-100';
  if (size === 'sm') return `${base} text-lg`;
  return `${base} text-xl`;
}

export function emptyStateDescriptionClass(size: EmptyStateSize | null | undefined): string {
  const base = 'text-dark-400 max-w-md mx-auto';
  if (size === 'sm') return `${base} text-sm mt-1`;
  if (size === 'md') return `${base} text-sm mt-2`;
  return `${base} mt-2`;
}

export function emptyStateActionsClass(size: EmptyStateSize | null | undefined): string {
  const base = 'flex items-center justify-center gap-3';
  if (size === 'sm') return `${base} mt-4`;
  if (size === 'md') return `${base} mt-5`;
  return `${base} mt-6`;
}
