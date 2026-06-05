import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import {
  FIELD_ERROR_CLASS,
  FIELD_HELPER_CLASS,
  FIELD_LABEL_CLASS,
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
        {label && <label htmlFor={selectId} className={FIELD_LABEL_CLASS}>{label}</label>}
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
        {error && <p className={FIELD_ERROR_CLASS}>{error}</p>}
        {helperText && !error && <p className={FIELD_HELPER_CLASS}>{helperText}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';

export { selectVariants };
