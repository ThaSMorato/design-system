/**
 * React Native variant of NumberControl (compound).
 *
 * Web's `<input type="number">` is replaced by RN's `TextInput` with
 * `keyboardType="numeric"`. Numeric coercion is intentionally left to the
 * consumer's `onChangeText` handler since RN doesn't expose a native
 * "number" input event.
 *
 * Minus/Plus default icons come in as render-props on the Button part to
 * avoid a lucide-react-native dependency in this package.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable, TextInput } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  NUMBER_ACTION_CLASS,
  NUMBER_DISPLAY_EXTRA_CLASS,
  NUMBER_DISPLAY_MAX_CLASS,
  NUMBER_DISPLAY_ROOT_CLASS,
  NUMBER_DISPLAY_SEP_CLASS,
  NUMBER_DISPLAY_VALUE_CLASS,
  NUMBER_INPUT_BASE_CLASS,
  NUMBER_INPUT_SIZE_CLASSES,
  numberControlButtonVariants,
  numberControlVariants,
  type NumberControlSize,
  type NumberControlVariant,
} from './NumberControl.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledTextInput = styled(TextInput);

interface NumberControlContextValue {
  variant?: NumberControlVariant | null;
}
const NumberControlContext = createContext<NumberControlContextValue>({});
export const useNumberControlContext = () => useContext(NumberControlContext);

export interface NumberControlProps extends VariantProps<typeof numberControlVariants> {
  className?: string;
  children?: ReactNode;
}

const NumberControlRoot = forwardRef<View, NumberControlProps>(
  ({ className, variant, children }, ref) => (
    <NumberControlContext.Provider value={{ variant: variant ?? 'default' }}>
      <StyledView ref={ref} className={cn(numberControlVariants({ variant }), className)}>
        {children}
      </StyledView>
    </NumberControlContext.Provider>
  ),
);

export interface NumberControlButtonProps extends VariantProps<typeof numberControlButtonVariants> {
  value?: number;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  renderDefaultIcon?: (intent: 'decrease' | 'increase' | 'neutral', size: number) => ReactNode;
}

const NumberControlButton = forwardRef<unknown, NumberControlButtonProps>(
  ({ className, intent, size, value, onPress, disabled, children, renderDefaultIcon }, ref) => {
    const intentTyped = (intent ?? 'neutral') as 'decrease' | 'increase' | 'neutral';
    return (
      <StyledPressable
        ref={ref as never}
        accessibilityRole="button"
        accessibilityLabel={value ? `${value > 0 ? '+' : ''}${value}` : undefined}
        disabled={disabled}
        onPress={onPress}
        className={cn(numberControlButtonVariants({ intent, size }), className)}
      >
        {children ?? renderDefaultIcon?.(intentTyped, 16)}
      </StyledPressable>
    );
  },
);

export interface NumberControlInputProps {
  value?: string;
  defaultValue?: string;
  onChangeText?: (next: string) => void;
  placeholder?: string;
  className?: string;
  inputSize?: NumberControlSize;
}

const NumberControlInput = forwardRef<TextInput, NumberControlInputProps>(
  ({ className, inputSize = 'md', ...props }, ref) => (
    <StyledTextInput
      ref={ref}
      keyboardType="numeric"
      className={cn(NUMBER_INPUT_BASE_CLASS, NUMBER_INPUT_SIZE_CLASSES[inputSize], className)}
      {...props}
    />
  ),
);

export interface NumberControlActionProps {
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
  children?: ReactNode;
}

const NumberControlAction = forwardRef<unknown, NumberControlActionProps>(
  ({ className, disabled, onPress, children }, ref) => (
    <StyledPressable
      ref={ref as never}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={cn(NUMBER_ACTION_CLASS, className)}
    >
      <StyledText className="text-inherit">
        {children ?? 'Apply'}
      </StyledText>
    </StyledPressable>
  ),
);

export interface NumberControlDisplayProps {
  value: number;
  max?: number;
  extra?: number;
  extraLabel?: string;
  className?: string;
}

const NumberControlDisplay = forwardRef<View, NumberControlDisplayProps>(
  ({ className, value, max, extra, extraLabel = 'temp' }, ref) => (
    <StyledView ref={ref} className={cn(NUMBER_DISPLAY_ROOT_CLASS, className)}>
      <StyledText className={NUMBER_DISPLAY_VALUE_CLASS}>{String(value)}</StyledText>
      {max !== undefined ? (
        <>
          <StyledText className={NUMBER_DISPLAY_SEP_CLASS}>/</StyledText>
          <StyledText className={NUMBER_DISPLAY_MAX_CLASS}>{String(max)}</StyledText>
        </>
      ) : null}
      {extra !== undefined && extra > 0 ? (
        <StyledText className={NUMBER_DISPLAY_EXTRA_CLASS}>
          (+{String(extra)} {extraLabel})
        </StyledText>
      ) : null}
    </StyledView>
  ),
);

NumberControlRoot.displayName = 'NumberControl.native';
NumberControlButton.displayName = 'NumberControl.Button.native';
NumberControlInput.displayName = 'NumberControl.Input.native';
NumberControlAction.displayName = 'NumberControl.Action.native';
NumberControlDisplay.displayName = 'NumberControl.Display.native';

export const NumberControl = Object.assign(NumberControlRoot, {
  Button: NumberControlButton,
  Input: NumberControlInput,
  Action: NumberControlAction,
  Display: NumberControlDisplay,
});
