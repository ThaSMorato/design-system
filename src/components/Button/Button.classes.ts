/**
 * Shared Tailwind/NativeWind class strings for Button. This file is the
 * single source of truth consumed by BOTH `Button.tsx` (web) and
 * `Button.native.tsx` (React Native via NativeWind).
 *
 * Keep this file platform-agnostic — no DOM or React Native imports.
 *
 * Notes on cross-platform Tailwind utilities:
 * - `hover:*`, `focus:*`, `transition-*`, `shadow-[arbitrary]`,
 *   `underline-offset-*`, `ring-*` and other CSS-specific utilities are
 *   no-ops on native. They stay here because they harmlessly render on web
 *   and NativeWind skips what it cannot translate.
 * - For native press feedback we add `active:*` variants alongside the web
 *   `hover:*` ones so each platform gets equivalent affordances.
 */
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed gap-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]',
        secondary:
          'bg-dark-700 text-dark-100 border border-dark-600 hover:bg-dark-600 active:bg-dark-600 hover:border-primary-600 active:border-primary-600 focus:ring-primary-500',
        danger:
          'bg-accent-crimson text-white hover:opacity-80 active:opacity-80 focus:ring-accent-crimson',
        success:
          'bg-accent-emerald text-white hover:bg-accent-emerald/80 active:bg-accent-emerald/80 focus:ring-accent-emerald',
        ghost:
          'bg-transparent text-dark-300 hover:text-dark-100 active:text-dark-100 hover:bg-dark-700 active:bg-dark-700 focus:ring-primary-500',
        link: 'bg-transparent text-primary-400 hover:text-primary-300 active:text-primary-300 underline-offset-4 hover:underline focus:ring-primary-500 p-0',
      },
      size: {
        xs: 'px-2 py-1 text-xs gap-1',
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2',
      },
      iconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { iconOnly: true, size: 'xs', className: 'p-1' },
      { iconOnly: true, size: 'sm', className: 'p-1.5' },
      { iconOnly: true, size: 'md', className: 'p-2' },
      { iconOnly: true, size: 'lg', className: 'p-3' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
    },
  },
);

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
