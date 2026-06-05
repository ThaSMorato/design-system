import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { FieldMessage } from '../FieldMessage';
import { Label } from '../Label';
import { FIELD_WRAPPER_CLASS, textareaVariants } from './Input.classes';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = !!error;

    return (
      <div className={FIELD_WRAPPER_CLASS}>
        {label && (
          <Label htmlFor={textareaId} className="mb-1">
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(textareaVariants({ variant: hasError ? 'error' : variant }), className)}
          {...props}
        />
        {error && <FieldMessage tone="error">{error}</FieldMessage>}
        {helperText && !error && <FieldMessage tone="helper">{helperText}</FieldMessage>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { textareaVariants };
