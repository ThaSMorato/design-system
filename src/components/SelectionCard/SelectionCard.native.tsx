/**
 * React Native variant of SelectionCard. Pressable card with selected state.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable, type PressableProps } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  SELECTION_BODY_CLASS,
  SELECTION_DESCRIPTION_CLASS,
  SELECTION_META_CLASS,
  selectionCardIconClass,
  selectionCardInnerClass,
  selectionCardTitleClass,
  selectionCardVariants,
  type SelectionCardIconPosition,
} from './SelectionCard.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface SelectionCardProps
  extends Omit<PressableProps, 'children' | 'style'>,
    VariantProps<typeof selectionCardVariants> {
  selected?: boolean;
  title: string;
  description?: string;
  meta?: string;
  icon?: ReactNode;
  iconPosition?: SelectionCardIconPosition;
  className?: string;
}

export const SelectionCard = forwardRef<unknown, SelectionCardProps>(
  (
    {
      className,
      variant,
      size,
      selected = false,
      title,
      description,
      meta,
      icon,
      iconPosition = 'left',
      disabled,
      ...props
    },
    ref,
  ) => (
    <StyledPressable
      ref={ref as never}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      className={cn(selectionCardVariants({ variant, size, selected }), className)}
      {...props}
    >
      <StyledView className={selectionCardInnerClass(iconPosition)}>
        {icon ? <StyledView className={selectionCardIconClass(selected)}>{icon}</StyledView> : null}
        <StyledView className={SELECTION_BODY_CLASS}>
          <StyledText className={selectionCardTitleClass(selected)}>{title}</StyledText>
          {description ? (
            <StyledText className={SELECTION_DESCRIPTION_CLASS}>{description}</StyledText>
          ) : null}
          {meta ? <StyledText className={SELECTION_META_CLASS}>{meta}</StyledText> : null}
        </StyledView>
      </StyledView>
    </StyledPressable>
  ),
);

SelectionCard.displayName = 'SelectionCard.native';
