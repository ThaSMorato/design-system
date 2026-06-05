/**
 * React Native variant of DangerZone.
 *
 * Two-step confirm flow preserved. Icon is provided via render-prop to
 * avoid a hard dependency on lucide-react-native.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import {
  DANGER_ZONE_CANCEL_BUTTON_CLASS,
  DANGER_ZONE_CONFIRM_BUTTON_CLASS,
  DANGER_ZONE_CONFIRM_ROW_CLASS,
  DANGER_ZONE_DESCRIPTION_CLASS,
  DANGER_ZONE_HEADER_CLASS,
  DANGER_ZONE_PRIMARY_BUTTON_CLASS,
  DANGER_ZONE_ROOT_CLASS,
  DANGER_ZONE_TITLE_CLASS,
} from './DangerZone.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface DangerZoneProps {
  title?: string;
  description: string;
  actionLabel: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onAction: () => void | Promise<void>;
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
  /** Render-prop for the AlertTriangle warning icon. */
  renderIcon?: (className: string) => ReactNode;
}

export const DangerZone = forwardRef<View, DangerZoneProps>(
  (
    {
      className,
      title = 'Danger Zone',
      description,
      actionLabel,
      confirmLabel = 'Yes, confirm',
      cancelLabel = 'Cancel',
      onAction,
      isLoading = false,
      icon,
      renderIcon,
    },
    ref,
  ) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleAction = async () => {
      await onAction();
      setShowConfirm(false);
    };

    return (
      <StyledView ref={ref} className={cn(DANGER_ZONE_ROOT_CLASS, className)}>
        <StyledView className={DANGER_ZONE_HEADER_CLASS}>
          {icon ?? (renderIcon ? renderIcon('h-5 w-5 text-accent-crimson') : null)}
          <StyledText className={DANGER_ZONE_TITLE_CLASS}>{title}</StyledText>
        </StyledView>
        <StyledText className={DANGER_ZONE_DESCRIPTION_CLASS}>{description}</StyledText>
        {showConfirm ? (
          <StyledView className={DANGER_ZONE_CONFIRM_ROW_CLASS}>
            <StyledPressable
              accessibilityRole="button"
              disabled={isLoading}
              onPress={handleAction}
              className={DANGER_ZONE_CONFIRM_BUTTON_CLASS}
            >
              <StyledText className="text-inherit">
                {isLoading ? 'Processing...' : confirmLabel}
              </StyledText>
            </StyledPressable>
            <StyledPressable
              accessibilityRole="button"
              disabled={isLoading}
              onPress={() => setShowConfirm(false)}
              className={DANGER_ZONE_CANCEL_BUTTON_CLASS}
            >
              <StyledText className="text-inherit">{cancelLabel}</StyledText>
            </StyledPressable>
          </StyledView>
        ) : (
          <StyledPressable
            accessibilityRole="button"
            onPress={() => setShowConfirm(true)}
            className={DANGER_ZONE_PRIMARY_BUTTON_CLASS}
          >
            <StyledText className="text-inherit">{actionLabel}</StyledText>
          </StyledPressable>
        )}
      </StyledView>
    );
  },
);

DangerZone.displayName = 'DangerZone.native';
