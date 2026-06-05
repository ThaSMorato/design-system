import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import {
  FORM_GROUP_ERROR_CLASS,
  FORM_GROUP_HELPER_CLASS,
  FORM_GROUP_LABEL_CLASS,
  FORM_GROUP_REQUIRED_CLASS,
  FORM_GROUP_ROOT_CLASS,
} from './Form.classes';

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
        <label htmlFor={htmlFor} className={FORM_GROUP_LABEL_CLASS}>
          {label}
          {required && <span className={FORM_GROUP_REQUIRED_CLASS}>*</span>}
        </label>
      )}
      {children}
      {error && <FormError>{error}</FormError>}
      {helperText && !error && <p className={FORM_GROUP_HELPER_CLASS}>{helperText}</p>}
    </div>
  );
}

export interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

export function FormError({ children, className }: FormErrorProps) {
  if (!children) return null;
  return <p className={cn(FORM_GROUP_ERROR_CLASS, className)}>{children}</p>;
}

export interface FormHelperTextProps {
  children: ReactNode;
  className?: string;
}

export function FormHelperText({ children, className }: FormHelperTextProps) {
  return <p className={cn(FORM_GROUP_HELPER_CLASS, className)}>{children}</p>;
}
