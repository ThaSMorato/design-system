/**
 * React Native variants of FormGroup, FormError, FormHelperText.
 *
 * `htmlFor` has no native equivalent — labels are simply rendered above
 * the input. Consumers can manually wire `accessibilityLabel` on inputs.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import {
  FORM_GROUP_ERROR_CLASS,
  FORM_GROUP_HELPER_CLASS,
  FORM_GROUP_LABEL_CLASS,
  FORM_GROUP_REQUIRED_CLASS,
  FORM_GROUP_ROOT_CLASS,
} from './Form.classes';

const StyledView = styled(View);
const StyledText = styled(Text);

export interface FormGroupProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormGroup({
  label,
  error,
  helperText,
  required,
  children,
  className,
}: FormGroupProps) {
  return (
    <StyledView className={cn(FORM_GROUP_ROOT_CLASS, className)}>
      {label ? (
        <StyledText className={FORM_GROUP_LABEL_CLASS}>
          {label}
          {required ? <StyledText className={FORM_GROUP_REQUIRED_CLASS}>*</StyledText> : null}
        </StyledText>
      ) : null}
      {children}
      {error ? <FormError>{error}</FormError> : null}
      {helperText && !error ? (
        <StyledText className={FORM_GROUP_HELPER_CLASS}>{helperText}</StyledText>
      ) : null}
    </StyledView>
  );
}

export interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

export function FormError({ children, className }: FormErrorProps) {
  if (!children) return null;
  return <StyledText className={cn(FORM_GROUP_ERROR_CLASS, className)}>{children}</StyledText>;
}

export interface FormHelperTextProps {
  children: ReactNode;
  className?: string;
}

export function FormHelperText({ children, className }: FormHelperTextProps) {
  return <StyledText className={cn(FORM_GROUP_HELPER_CLASS, className)}>{children}</StyledText>;
}
