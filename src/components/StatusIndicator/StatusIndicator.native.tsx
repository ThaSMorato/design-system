/**
 * React Native variant of StatusIndicator.
 *
 * Web wraps everything in <span>s; native wraps in <View>s and renders the
 * label through <Text>. Pulse uses the same `animate-ping` Tailwind utility
 * — NativeWind translates it on supported versions; on older versions the
 * pulse animation may be a no-op until upgraded.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, type ViewProps } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  STATUS_DEFAULT_LABELS,
  STATUS_DOT_WRAPPER_CLASS,
  STATUS_LABEL_CLASS,
  STATUS_PULSE_CLASS,
  STATUS_PULSE_VARIANTS,
  STATUS_WRAPPER_CLASS,
  statusIndicatorVariants,
} from './StatusIndicator.classes';

const StyledView = styled(View);
const StyledText = styled(Text);

export interface StatusIndicatorProps
  extends Omit<ViewProps, 'children'>,
    VariantProps<typeof statusIndicatorVariants> {
  pulse?: boolean;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export const StatusIndicator = forwardRef<View, StatusIndicatorProps>(
  (
    { className, variant, size, pulse, label, showLabel = true, ...props },
    ref,
  ) => {
    const shouldPulse =
      pulse ?? (variant ? STATUS_PULSE_VARIANTS.includes(variant) : false);
    const displayLabel = label ?? (variant ? STATUS_DEFAULT_LABELS[variant] : undefined);

    return (
      <StyledView ref={ref} className={cn(STATUS_WRAPPER_CLASS, className)} {...props}>
        <StyledView className={STATUS_DOT_WRAPPER_CLASS}>
          <StyledView
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            className={cn(statusIndicatorVariants({ variant, size }))}
          />
          {shouldPulse ? (
            <StyledView
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              className={cn(STATUS_PULSE_CLASS, statusIndicatorVariants({ variant, size }))}
            />
          ) : null}
        </StyledView>
        {showLabel && displayLabel ? (
          <StyledText className={STATUS_LABEL_CLASS}>{displayLabel}</StyledText>
        ) : null}
      </StyledView>
    );
  },
);

StatusIndicator.displayName = 'StatusIndicator.native';
