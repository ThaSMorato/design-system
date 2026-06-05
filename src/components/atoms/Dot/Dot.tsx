import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { dotVariants } from './Dot.classes';

export interface DotProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dotVariants> {}

export const Dot = forwardRef<HTMLSpanElement, DotProps>(
  ({ className, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(dotVariants({ size }), className)}
      aria-hidden="true"
      {...props}
    />
  )
);

Dot.displayName = 'Dot';

export { dotVariants };
export type { DotSize } from './Dot.classes';
