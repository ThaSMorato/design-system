import { cva } from 'class-variance-authority';

/**
 * Icon-only utility button extracted from the hand-rolled dismiss/close/
 * copy/share/remove buttons in Alert, Banner, Modal, ConfirmDialog,
 * ConditionBadge and CopyableLink. Each variant maps 1:1 onto one of those
 * original class strings:
 *
 * - ghost   → Banner/Modal/ConfirmDialog dismiss & close buttons
 * - fade    → Alert dismiss button
 * - soft    → ConditionBadge remove button
 * - outline → CopyableLink copy/share buttons
 */
export const iconButtonVariants = cva(
  'inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        ghost:
          'text-dark-400 hover:bg-dark-700 active:bg-dark-700 hover:text-dark-100 active:text-dark-100 transition-colors',
        fade: 'opacity-70 hover:opacity-100 active:opacity-100 transition-opacity',
        soft: 'hover:bg-dark-600/50 active:bg-dark-600/50 transition-colors',
        outline:
          'border border-dark-600 bg-dark-700 text-dark-300 hover:bg-dark-600 active:bg-dark-600 hover:text-dark-100 active:text-dark-100 transition-colors',
      },
      shape: {
        square: 'rounded',
        rounded: 'rounded-lg',
        pill: 'rounded-full',
      },
      size: {
        xs: 'p-0.5',
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-3',
      },
    },
    defaultVariants: { variant: 'ghost', shape: 'rounded', size: 'sm' },
  }
);

export type IconButtonVariant = 'ghost' | 'fade' | 'soft' | 'outline';
export type IconButtonShape = 'square' | 'rounded' | 'pill';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';
