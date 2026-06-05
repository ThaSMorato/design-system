/**
 * React Native variant of ConditionBadge.
 *
 * Icons (Clock, X) are passed through as render-props so this DS package
 * does not depend on `lucide-react-native`. Consumers wire those in once
 * at the app level.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  CONDITION_DURATION_CLASS,
  CONDITION_REMOVE_BUTTON_CLASS,
  conditionBadgeIconSize,
  conditionBadgeVariants,
  type ConditionBadgeSize,
} from './ConditionBadge.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface ConditionBadgeProps extends VariantProps<typeof conditionBadgeVariants> {
  name: string;
  duration?: number;
  icon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  showDuration?: boolean;
  className?: string;
  /** Render-prop for the duration clock icon. Receives an iconSize class. */
  renderClockIcon?: (className: string) => ReactNode;
  /** Render-prop for the remove X icon. */
  renderRemoveIcon?: (className: string) => ReactNode;
}

export const ConditionBadge = forwardRef<View, ConditionBadgeProps>(
  (
    {
      className,
      variant,
      size,
      name,
      duration,
      icon,
      removable = false,
      onRemove,
      showDuration = true,
      renderClockIcon,
      renderRemoveIcon,
    },
    ref,
  ) => {
    const iconSize = conditionBadgeIconSize(size as ConditionBadgeSize | null | undefined);

    return (
      <StyledView
        ref={ref}
        className={cn(conditionBadgeVariants({ variant, size }), className)}
      >
        {icon}
        <StyledText className="text-inherit">{name}</StyledText>
        {showDuration && duration !== undefined && duration > 0 ? (
          <StyledView className={CONDITION_DURATION_CLASS}>
            {renderClockIcon ? renderClockIcon(iconSize) : null}
            <StyledText className="text-xs">{String(duration)}</StyledText>
          </StyledView>
        ) : null}
        {removable && onRemove ? (
          <StyledPressable
            accessibilityLabel={`Remove ${name}`}
            accessibilityRole="button"
            onPress={onRemove}
            className={CONDITION_REMOVE_BUTTON_CLASS}
          >
            {renderRemoveIcon ? renderRemoveIcon(iconSize) : null}
          </StyledPressable>
        ) : null}
      </StyledView>
    );
  },
);

ConditionBadge.displayName = 'ConditionBadge.native';
