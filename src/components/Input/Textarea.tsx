import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  FIELD_ERROR_CLASS,
  FIELD_HELPER_CLASS,
  FIELD_LABEL_CLASS,
  FIELD_WRAPPER_CLASS,
  textareaVariants,
} from './Input.classes';

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
        {label && <label htmlFor={textareaId} className={FIELD_LABEL_CLASS}>{label}</label>}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(textareaVariants({ variant: hasError ? 'error' : variant }), className)}
          {...props}
        />
        {error && <p className={FIELD_ERROR_CLASS}>{error}</p>}
        {helperText && !error && <p className={FIELD_HELPER_CLASS}>{helperText}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { textareaVariants };
