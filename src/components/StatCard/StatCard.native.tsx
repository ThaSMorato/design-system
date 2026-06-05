/**
 * React Native variant of StatCard.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  STAT_ICON_WRAPPER_CLASS,
  STAT_LABEL_CLASS,
  STAT_MODIFIER_CLASS,
  formatStatModifier,
  statCardVariants,
  statValueVariants,
} from './StatCard.classes';

const StyledView = styled(View);
const StyledText = styled(Text);

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  modifier?: number;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  modifier,
  icon,
  variant,
  size,
  className,
}: StatCardProps) {
  return (
    <StyledView className={cn(statCardVariants({ variant, size }), className)}>
      {icon ? <StyledView className={STAT_ICON_WRAPPER_CLASS}>{icon}</StyledView> : null}
      <StyledText className={cn(statValueVariants({ variant, size }))}>
        {String(value)}
      </StyledText>
      {modifier !== undefined ? (
        <StyledText className={STAT_MODIFIER_CLASS}>
          ({formatStatModifier(modifier)})
        </StyledText>
      ) : null}
      <StyledText className={STAT_LABEL_CLASS}>{label}</StyledText>
    </StyledView>
  );
}
