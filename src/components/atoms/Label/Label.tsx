import { forwardRef, type LabelHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { LABEL_REQUIRED_CLASS, labelVariants } from './Label.classes';

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /** Renders a required asterisk after the label text. */
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, tone, required, children, ...props }, ref) => (
    <label ref={ref} className={cn(labelVariants({ tone }), className)} {...props}>
      {children}
      {required && <span className={LABEL_REQUIRED_CLASS}>*</span>}
    </label>
  )
);

Label.displayName = 'Label';

export { labelVariants };
export type { LabelTone } from './Label.classes';
