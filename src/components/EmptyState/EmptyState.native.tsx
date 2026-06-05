/**
 * React Native variant of EmptyState.
 *
 * Web wraps the icon in a <div>; native uses View/Text. Custom action and
 * secondaryAction nodes are rendered as-is so consumers can pass their
 * native Button.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  EMPTY_ICON_INNER_CLASS,
  emptyStateActionsClass,
  emptyStateDescriptionClass,
  emptyStateIconContainerVariants,
  emptyStateTitleClass,
  emptyStateVariants,
  type EmptyStateSize,
} from './EmptyState.classes';

const StyledView = styled(View);
const StyledText = styled(Text);

export interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
}

export const EmptyState = forwardRef<View, EmptyStateProps>(
  ({ className, variant, size, icon, title, description, action, secondaryAction }, ref) => {
    const sizeTyped = size as EmptyStateSize | null | undefined;
    return (
      <StyledView ref={ref} className={cn(emptyStateVariants({ variant, size }), className)}>
        <StyledView className={cn(emptyStateIconContainerVariants({ size, variant }))}>
          <StyledView className={EMPTY_ICON_INNER_CLASS}>{icon}</StyledView>
        </StyledView>
        <StyledText accessibilityRole="header" className={emptyStateTitleClass(sizeTyped)}>
          {title}
        </StyledText>
        {description ? (
          <StyledText className={emptyStateDescriptionClass(sizeTyped)}>
            {description}
          </StyledText>
        ) : null}
        {action || secondaryAction ? (
          <StyledView className={emptyStateActionsClass(sizeTyped)}>
            {action}
            {secondaryAction}
          </StyledView>
        ) : null}
      </StyledView>
    );
  },
);

EmptyState.displayName = 'EmptyState.native';
