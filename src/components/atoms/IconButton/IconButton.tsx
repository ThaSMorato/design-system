import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { iconButtonVariants } from './IconButton.classes';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Accessible name — icon-only buttons must always have one. */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, shape, size, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(iconButtonVariants({ variant, shape, size }), className)}
      {...props}
    />
  )
);

IconButton.displayName = 'IconButton';

export { iconButtonVariants };
export type {
  IconButtonVariant,
  IconButtonShape,
  IconButtonSize,
} from './IconButton.classes';
