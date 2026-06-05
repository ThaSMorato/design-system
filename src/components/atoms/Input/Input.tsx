import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { FieldMessage } from '../FieldMessage';
import { Label } from '../Label';
import {
  FIELD_LEFT_ICON_CLASS,
  FIELD_RELATIVE_CLASS,
  FIELD_RIGHT_ICON_CLASS,
  FIELD_WRAPPER_CLASS,
  inputVariants,
} from './Input.classes';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = !!error;

    return (
      <div className={FIELD_WRAPPER_CLASS}>
        {label && (
          <Label htmlFor={inputId} className="mb-1">
            {label}
          </Label>
        )}
        <div className={FIELD_RELATIVE_CLASS}>
          {leftIcon && <div className={FIELD_LEFT_ICON_CLASS}>{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: hasError ? 'error' : variant, inputSize }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />
          {rightIcon && <div className={FIELD_RIGHT_ICON_CLASS}>{rightIcon}</div>}
        </div>
        {error && <FieldMessage tone="error">{error}</FieldMessage>}
        {helperText && !error && <FieldMessage tone="helper">{helperText}</FieldMessage>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { inputVariants };
export type { InputVariant, InputSize } from './Input.classes';
