import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { fieldMessageVariants } from './FieldMessage.classes';

export interface FieldMessageProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof fieldMessageVariants> {}

export const FieldMessage = forwardRef<HTMLParagraphElement, FieldMessageProps>(
  ({ className, tone, children, ...props }, ref) => {
    if (!children) return null;
    return (
      <p ref={ref} className={cn(fieldMessageVariants({ tone }), className)} {...props}>
        {children}
      </p>
    );
  }
);

FieldMessage.displayName = 'FieldMessage';

export { fieldMessageVariants };
export type { FieldMessageTone } from './FieldMessage.classes';
