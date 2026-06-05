/**
 * React Native variant of Badge.
 *
 * Web uses `<span>` with inline children; native wraps the content in a
 * `<View>` and the textual `children`/`icon` is rendered through `<Text>`
 * because RN cannot render bare strings inside a non-Text element.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  BADGE_DOT_BASE,
  badgeDotClassName,
  badgeVariants,
} from './Badge.classes';

const StyledView = styled(View);
const StyledText = styled(Text);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  icon?: ReactNode;
  dot?: boolean;
  className?: string;
  textClassName?: string;
}

export function Badge({
  children,
  variant,
  size,
  icon,
  dot,
  className,
  textClassName,
}: BadgeProps) {
  return (
    <StyledView className={cn(badgeVariants({ variant, size }), className)}>
      {dot ? <StyledView className={cn(BADGE_DOT_BASE, badgeDotClassName(variant))} /> : null}
      {icon}
      {typeof children === 'string' || typeof children === 'number' ? (
        <StyledText className={cn('text-inherit', textClassName)}>{children}</StyledText>
      ) : (
        children
      )}
    </StyledView>
  );
}
