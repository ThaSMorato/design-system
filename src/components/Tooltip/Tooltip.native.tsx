/**
 * React Native variant of Tooltip.
 *
 * Touch devices don't have hover. The native pattern shows the tooltip on
 * **long-press** (onLongPress) and dismisses on release. The trigger must
 * be wrapped in a Pressable for this to fire; this component wraps the
 * children in a Pressable automatically.
 *
 * Note: the absolute-positioned tooltip overlay relies on the parent being
 * positioned (`relative inline-block`). On native, RN's layout system is
 * already flex-based, so the same Tailwind classes (`absolute`/`top-full`/
 * etc.) translate via NativeWind. For richer placement (auto-flip,
 * collision detection), consumers should switch to a library like
 * `react-native-popover-view` or `react-native-tooltip`.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, useState, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  TOOLTIP_ARROW_BASE_CLASS,
  TOOLTIP_WRAPPER_CLASS,
  tooltipArrowClass,
  tooltipVariants,
  type TooltipPosition,
} from './Tooltip.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  tooltipContent: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Tooltip = forwardRef<View, TooltipProps>(
  ({ className, position, tooltipContent, children, disabled = false }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const resolvedPosition = (position ?? 'top') as TooltipPosition;

    return (
      <StyledView ref={ref} className={cn(TOOLTIP_WRAPPER_CLASS, className)}>
        <StyledPressable
          onLongPress={disabled ? undefined : () => setIsVisible(true)}
          onPressOut={() => setIsVisible(false)}
        >
          {children}
        </StyledPressable>
        {isVisible && tooltipContent ? (
          <StyledView
            accessibilityRole="text"
            className={cn(tooltipVariants({ position }))}
          >
            {typeof tooltipContent === 'string' || typeof tooltipContent === 'number' ? (
              <StyledText className="text-inherit">{tooltipContent}</StyledText>
            ) : (
              tooltipContent
            )}
            <StyledView className={cn(TOOLTIP_ARROW_BASE_CLASS, tooltipArrowClass(resolvedPosition))} />
          </StyledView>
        ) : null}
      </StyledView>
    );
  },
);

Tooltip.displayName = 'Tooltip.native';
