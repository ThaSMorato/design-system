import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { chipCountClass, chipVariants } from './Chip.classes';

export interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional trailing count, styled according to selection state. */
  count?: number;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    { className, shape, selected, icon, count, children, type = 'button', ...props },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(chipVariants({ shape, selected }), className)}
      {...props}
    >
      {icon}
      <span>{children}</span>
      {count !== undefined && (
        <span className={chipCountClass(Boolean(selected))}>({count})</span>
      )}
    </button>
  )
);

Chip.displayName = 'Chip';

export { chipVariants };
export type { ChipShape } from './Chip.classes';
