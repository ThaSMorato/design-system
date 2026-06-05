import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { FieldMessage } from '../FieldMessage';
import { Label } from '../Label';
import {
  FIELD_RIGHT_ICON_CLASS,
  FIELD_WRAPPER_CLASS,
  selectVariants,
} from './Input.classes';

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, selectSize, label, error, helperText, id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = !!error;

    return (
      <div className={FIELD_WRAPPER_CLASS}>
        {label && (
          <Label htmlFor={selectId} className="mb-1">
            {label}
          </Label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              selectVariants({ variant: hasError ? 'error' : variant, selectSize }),
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <div className={FIELD_RIGHT_ICON_CLASS}>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && <FieldMessage tone="error">{error}</FieldMessage>}
        {helperText && !error && <FieldMessage tone="helper">{helperText}</FieldMessage>}
      </div>
    );
  },
);

Select.displayName = 'Select';

export { selectVariants };
