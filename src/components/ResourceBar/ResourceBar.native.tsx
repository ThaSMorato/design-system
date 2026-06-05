/**
 * React Native variant of ResourceBar.
 *
 * Width is driven by percentage. On web we use inline CSS `width: x%` —
 * RN's StyleSheet accepts the same percent string as a `DimensionValue`
 * so we pass it through the style prop (className-driven percent widths
 * aren't expressible in Tailwind utilities).
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, type ViewStyle } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  RESOURCE_FILL_CLASS,
  RESOURCE_LABEL_CLASS,
  RESOURCE_LABEL_ROW_CLASS,
  RESOURCE_TEMP_FILL_CLASS,
  RESOURCE_TEMP_VALUE_CLASS,
  RESOURCE_TRACK_INNER_CLASS,
  RESOURCE_VALUE_CLASS,
  resourceBarColor,
  resourceBarVariants,
  type ResourceBarColorScheme,
} from './ResourceBar.classes';

const StyledView = styled(View);
const StyledText = styled(Text);

export interface ResourceBarProps extends VariantProps<typeof resourceBarVariants> {
  current: number;
  max: number;
  temp?: number;
  label?: string;
  showValue?: boolean;
  customColor?: string;
  className?: string;
}

export function ResourceBar({
  current,
  max,
  temp = 0,
  label,
  showValue = true,
  size,
  colorScheme,
  customColor,
  className,
}: ResourceBarProps) {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  const tempPercentage = max > 0 ? Math.min((temp / max) * 100, 100 - percentage) : 0;
  const barColor =
    customColor || resourceBarColor(colorScheme as ResourceBarColorScheme | null | undefined, percentage);

  return (
    <StyledView className={cn('w-full', className)}>
      {label || showValue ? (
        <StyledView className={RESOURCE_LABEL_ROW_CLASS}>
          {label ? <StyledText className={RESOURCE_LABEL_CLASS}>{label}</StyledText> : null}
          {showValue ? (
            <StyledText className={RESOURCE_VALUE_CLASS}>
              {String(current)}
              {temp > 0 ? (
                <StyledText className={RESOURCE_TEMP_VALUE_CLASS}>+{String(temp)}</StyledText>
              ) : null}
              /{String(max)}
            </StyledText>
          ) : null}
        </StyledView>
      ) : null}
      <StyledView className={cn(resourceBarVariants({ size, colorScheme }))}>
        <StyledView className={RESOURCE_TRACK_INNER_CLASS}>
          <StyledView
            className={cn(RESOURCE_FILL_CLASS, barColor)}
            style={{ width: `${percentage}%` } as ViewStyle}
          />
          {temp > 0 ? (
            <StyledView
              className={RESOURCE_TEMP_FILL_CLASS}
              style={{ left: `${percentage}%`, width: `${tempPercentage}%` } as ViewStyle}
            />
          ) : null}
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
