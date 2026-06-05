/**
 * React Native variant of PageHeader.
 *
 * `backHref` (web router link) becomes an `onBack` press handler on native.
 * Consumers wire their navigator (React Navigation / Expo Router) at the
 * call site. The `ArrowLeft` icon is supplied via a render-prop so this DS
 * package does not depend on `lucide-react-native`.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  PAGE_ACTIONS_CLASS,
  PAGE_BACK_LINK_CLASS,
  PAGE_DESCRIPTION_CLASS,
  PAGE_ICON_WRAPPER_CLASS,
  PAGE_LEFT_CLASS,
  PAGE_ROW_CLASS,
  PAGE_TITLE_CLASS,
  PAGE_TITLE_WRAPPER_CLASS,
  pageHeaderVariants,
} from './PageHeader.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface PageHeaderProps extends VariantProps<typeof pageHeaderVariants> {
  title: string;
  description?: string;
  icon?: ReactNode;
  backLabel?: string;
  onBack?: () => void;
  actions?: ReactNode;
  className?: string;
  /** Render-prop for the back arrow icon. */
  renderBackIcon?: (className: string) => ReactNode;
}

export const PageHeader = forwardRef<View, PageHeaderProps>(
  (
    {
      className,
      variant,
      spacing,
      title,
      description,
      icon,
      backLabel = 'Back',
      onBack,
      actions,
      renderBackIcon,
    },
    ref,
  ) => (
    <StyledView ref={ref} className={cn(pageHeaderVariants({ variant, spacing }), className)}>
      {onBack ? (
        <StyledPressable
          accessibilityRole="button"
          accessibilityLabel={backLabel}
          onPress={onBack}
          className={PAGE_BACK_LINK_CLASS}
        >
          {renderBackIcon ? renderBackIcon('h-4 w-4') : null}
          <StyledText className="text-inherit">{backLabel}</StyledText>
        </StyledPressable>
      ) : null}
      <StyledView className={PAGE_ROW_CLASS}>
        <StyledView className={PAGE_LEFT_CLASS}>
          {icon ? <StyledView className={PAGE_ICON_WRAPPER_CLASS}>{icon}</StyledView> : null}
          <StyledView className={PAGE_TITLE_WRAPPER_CLASS}>
            <StyledText accessibilityRole="header" className={PAGE_TITLE_CLASS}>
              {title}
            </StyledText>
            {description ? (
              <StyledText className={PAGE_DESCRIPTION_CLASS}>{description}</StyledText>
            ) : null}
          </StyledView>
        </StyledView>
        {actions ? <StyledView className={PAGE_ACTIONS_CLASS}>{actions}</StyledView> : null}
      </StyledView>
    </StyledView>
  ),
);

PageHeader.displayName = 'PageHeader.native';
