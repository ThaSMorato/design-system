import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { iconBoxVariants } from './IconBox.classes';

export interface IconBoxProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBoxVariants> {}

export const IconBox = forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className, shape, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(iconBoxVariants({ shape, size }), className)}
      {...props}
    />
  )
);

IconBox.displayName = 'IconBox';

export { iconBoxVariants };
export type { IconBoxShape, IconBoxSize } from './IconBox.classes';
