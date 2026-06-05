/**
 * React Native variants of Input, Textarea, and Select.
 *
 * `<input>` and `<textarea>` collapse onto RN's single `TextInput` primitive.
 * Web's `onChange(event)` is replaced by RN's `onChangeText(text: string)` —
 * the value/handler signature differs, so the props are NOT identical to
 * web. Consumers passing a controlled value should switch to `onChangeText`.
 *
 * `<select>` has no RN equivalent. Consumers should pick a picker library
 * (e.g. `@react-native-picker/picker`) and wrap it with the same label /
 * error / helperText scaffolding we provide here. The Select export below
 * is intentionally a no-op placeholder that throws on render so we don't
 * silently ship a broken control.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, TextInput, type TextInputProps } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  FIELD_ERROR_CLASS,
  FIELD_HELPER_CLASS,
  FIELD_LABEL_CLASS,
  FIELD_LEFT_ICON_CLASS,
  FIELD_RELATIVE_CLASS,
  FIELD_RIGHT_ICON_CLASS,
  FIELD_WRAPPER_CLASS,
  inputVariants,
  textareaVariants,
} from './Input.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export interface InputProps
  extends Omit<TextInputProps, 'style'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    return (
      <StyledView className={FIELD_WRAPPER_CLASS}>
        {label ? <StyledText className={FIELD_LABEL_CLASS}>{label}</StyledText> : null}
        <StyledView className={FIELD_RELATIVE_CLASS}>
          {leftIcon ? <StyledView className={FIELD_LEFT_ICON_CLASS}>{leftIcon}</StyledView> : null}
          <StyledTextInput
            ref={ref}
            accessibilityLabel={label}
            className={cn(
              inputVariants({ variant: hasError ? 'error' : variant, inputSize }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />
          {rightIcon ? <StyledView className={FIELD_RIGHT_ICON_CLASS}>{rightIcon}</StyledView> : null}
        </StyledView>
        {error ? <StyledText className={FIELD_ERROR_CLASS}>{error}</StyledText> : null}
        {helperText && !error ? (
          <StyledText className={FIELD_HELPER_CLASS}>{helperText}</StyledText>
        ) : null}
      </StyledView>
    );
  },
);

Input.displayName = 'Input.native';

export interface TextareaProps
  extends Omit<TextInputProps, 'style' | 'multiline'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
  className?: string;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ className, variant, label, error, helperText, rows = 4, ...props }, ref) => {
    const hasError = !!error;
    return (
      <StyledView className={FIELD_WRAPPER_CLASS}>
        {label ? <StyledText className={FIELD_LABEL_CLASS}>{label}</StyledText> : null}
        <StyledTextInput
          ref={ref}
          multiline
          numberOfLines={rows}
          accessibilityLabel={label}
          className={cn(textareaVariants({ variant: hasError ? 'error' : variant }), className)}
          {...props}
        />
        {error ? <StyledText className={FIELD_ERROR_CLASS}>{error}</StyledText> : null}
        {helperText && !error ? (
          <StyledText className={FIELD_HELPER_CLASS}>{helperText}</StyledText>
        ) : null}
      </StyledView>
    );
  },
);

Textarea.displayName = 'Textarea.native';

/**
 * Placeholder Select. The web `<select>` has no equivalent on native.
 * Importing it intentionally surfaces a runtime error so we never silently
 * ship a broken control. When the RN app is bootstrapped, swap this for a
 * dedicated picker (e.g. `@react-native-picker/picker`) wrapped with the
 * same label / error / helper-text scaffolding.
 */
export interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  children?: ReactNode;
  className?: string;
}

export function Select(_props: SelectProps): never {
  throw new Error(
    '@rpg-app/design-system/native: <Select> has no built-in native implementation. ' +
      'Install @react-native-picker/picker and wrap it with this DS’s label/error/helper scaffolding.',
  );
}

export { inputVariants, textareaVariants };
