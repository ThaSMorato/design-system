/**
 * React Native variant of Alert.
 *
 * Web uses `lucide-react`; native should use `lucide-react-native` (icons
 * with the same names but rendered via react-native-svg). Until that
 * package is installed we accept icons as a `renderIcon` render-prop so the
 * scaffold compiles for the workspace's TypeScript even without RN
 * installed; downstream code can pass any RN component.
 *
 * Layout/styling stays token-driven via the shared `Alert.classes` so any
 * Tailwind change in the source of truth reaches both platforms.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  ALERT_BODY_CLASS,
  ALERT_CONTENT_CLASS,
  ALERT_DISMISS_BUTTON_CLASS,
  ALERT_TITLE_CLASS,
  type AlertVariant,
  alertVariants,
} from './Alert.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  /**
   * Render-prop for the variant icon. Receives the resolved variant and an
   * className that already includes size/positioning tokens. Lets consumers
   * plug in `lucide-react-native` icons without this DS depending on them.
   */
  renderIcon?: (variant: AlertVariant, className: string) => ReactNode;
  /** Render-prop for the dismiss icon. */
  renderDismissIcon?: (className: string) => ReactNode;
}

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible,
  onDismiss,
  className,
  renderIcon,
  renderDismissIcon,
}: AlertProps) {
  const resolved: AlertVariant = (variant ?? 'info') as AlertVariant;
  return (
    <StyledView
      accessibilityRole="alert"
      className={cn(alertVariants({ variant: resolved }), className)}
    >
      {renderIcon ? renderIcon(resolved, 'h-5 w-5 shrink-0 mt-0.5') : null}
      <StyledView className={ALERT_BODY_CLASS}>
        {title ? (
          <StyledText className={ALERT_TITLE_CLASS}>{title}</StyledText>
        ) : null}
        {typeof children === 'string' || typeof children === 'number' ? (
          <StyledText className={ALERT_CONTENT_CLASS}>{children}</StyledText>
        ) : (
          <StyledView className={ALERT_CONTENT_CLASS}>{children}</StyledView>
        )}
      </StyledView>
      {dismissible && onDismiss ? (
        <StyledPressable
          accessibilityLabel="Dismiss alert"
          accessibilityRole="button"
          onPress={onDismiss}
          className={ALERT_DISMISS_BUTTON_CLASS}
        >
          {renderDismissIcon ? renderDismissIcon('h-4 w-4') : null}
        </StyledPressable>
      ) : null}
    </StyledView>
  );
}
