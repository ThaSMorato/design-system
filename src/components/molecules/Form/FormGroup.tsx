import { type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { FieldMessage } from '../../atoms/FieldMessage';
import { Label } from '../../atoms/Label';
import { FORM_GROUP_ROOT_CLASS } from './Form.classes';

export interface FormGroupProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormGroup({
  label,
  htmlFor,
  error,
  helperText,
  required,
  children,
  className,
}: FormGroupProps) {
  return (
    <div className={cn(FORM_GROUP_ROOT_CLASS, className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required} className="mb-1">
          {label}
        </Label>
      )}
      {children}
      {error && <FormError>{error}</FormError>}
      {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
    </div>
  );
}

export interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

/** Thin alias over the FieldMessage atom (error tone). */
export function FormError({ children, className }: FormErrorProps) {
  return (
    <FieldMessage tone="error" className={className}>
      {children}
    </FieldMessage>
  );
}

export interface FormHelperTextProps {
  children: ReactNode;
  className?: string;
}

/** Thin alias over the FieldMessage atom (helper tone). */
export function FormHelperText({ children, className }: FormHelperTextProps) {
  return (
    <FieldMessage tone="helper" className={className}>
      {children}
    </FieldMessage>
  );
}
