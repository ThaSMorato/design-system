import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { headingVariants, type HeadingLevel } from './Heading.classes';

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** HTML heading element to render. */
  as?: HeadingLevel;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, weight, tone, as: Component = 'h2', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(headingVariants({ size, weight, tone }), className)}
      {...props}
    />
  )
);

Heading.displayName = 'Heading';

export { headingVariants };
export type {
  HeadingSize,
  HeadingWeight,
  HeadingTone,
  HeadingLevel,
} from './Heading.classes';
