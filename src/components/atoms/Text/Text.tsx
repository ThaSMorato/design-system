import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { textVariants, type TextElement } from './Text.classes';

export interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /** HTML element to render. */
  as?: TextElement;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, size, tone, as: Component = 'p', ...props }, ref) => (
    <Component
      ref={ref as React.Ref<never>}
      className={cn(textVariants({ size, tone }), className)}
      {...props}
    />
  )
);

Text.displayName = 'Text';

export { textVariants };
export type { TextSize, TextTone, TextElement } from './Text.classes';
