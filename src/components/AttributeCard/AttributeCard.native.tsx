/**
 * React Native variant of AttributeCard.
 *
 * Minus/Plus stepper icons come in as render-props so the DS does not
 * depend on lucide-react-native.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  ATTR_ABBR_CLASS,
  ATTR_BONUS_CLASS,
  ATTR_EDIT_ROW_CLASS,
  ATTR_MODIFIER_BASE_CLASS,
  ATTR_MODIFIER_NEG_CLASS,
  ATTR_MODIFIER_POS_CLASS,
  ATTR_SCORE_CLASS,
  ATTR_SCORE_WRAPPER_CLASS,
  ATTR_STEPPER_BUTTON_CLASS,
  attributeCardVariants,
  formatModifier,
} from './AttributeCard.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface AttributeCardProps extends VariantProps<typeof attributeCardVariants> {
  abbreviation: string;
  score: number;
  modifier: number;
  bonus?: number;
  editable?: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
  increaseDisabled?: boolean;
  decreaseDisabled?: boolean;
  className?: string;
  renderMinusIcon?: (className: string) => ReactNode;
  renderPlusIcon?: (className: string) => ReactNode;
}

export const AttributeCard = forwardRef<View, AttributeCardProps>(
  (
    {
      className,
      variant,
      size,
      abbreviation,
      score,
      modifier,
      bonus,
      editable = false,
      onIncrease,
      onDecrease,
      increaseDisabled = false,
      decreaseDisabled = false,
      renderMinusIcon,
      renderPlusIcon,
    },
    ref,
  ) => {
    const effectiveVariant = editable ? 'editable' : variant;

    return (
      <StyledView
        ref={ref}
        className={cn(attributeCardVariants({ variant: effectiveVariant, size }), className)}
      >
        <StyledText className={ATTR_ABBR_CLASS}>{abbreviation}</StyledText>

        {editable ? (
          <StyledView className={ATTR_EDIT_ROW_CLASS}>
            <StyledPressable
              accessibilityRole="button"
              accessibilityLabel={`Decrease ${abbreviation}`}
              disabled={decreaseDisabled}
              onPress={onDecrease}
              className={ATTR_STEPPER_BUTTON_CLASS}
            >
              {renderMinusIcon ? renderMinusIcon('h-4 w-4') : null}
            </StyledPressable>
            <StyledView className={ATTR_SCORE_WRAPPER_CLASS}>
              <StyledText className={ATTR_SCORE_CLASS}>{String(score)}</StyledText>
            </StyledView>
            <StyledPressable
              accessibilityRole="button"
              accessibilityLabel={`Increase ${abbreviation}`}
              disabled={increaseDisabled}
              onPress={onIncrease}
              className={ATTR_STEPPER_BUTTON_CLASS}
            >
              {renderPlusIcon ? renderPlusIcon('h-4 w-4') : null}
            </StyledPressable>
          </StyledView>
        ) : (
          <StyledView className="mt-1">
            <StyledText className={ATTR_SCORE_CLASS}>
              {String(score)}
              {bonus !== undefined && bonus > 0 ? (
                <StyledText className={ATTR_BONUS_CLASS}> +{bonus}</StyledText>
              ) : null}
            </StyledText>
          </StyledView>
        )}

        <StyledText
          className={cn(
            ATTR_MODIFIER_BASE_CLASS,
            modifier >= 0 ? ATTR_MODIFIER_POS_CLASS : ATTR_MODIFIER_NEG_CLASS,
          )}
        >
          {formatModifier(modifier)}
        </StyledText>
      </StyledView>
    );
  },
);

AttributeCard.displayName = 'AttributeCard.native';
