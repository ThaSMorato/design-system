import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Minus, Plus } from 'lucide-react';
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

export interface AttributeCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof attributeCardVariants> {
  abbreviation: string;
  score: number;
  modifier: number;
  bonus?: number;
  editable?: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
  increaseDisabled?: boolean;
  decreaseDisabled?: boolean;
}

export const AttributeCard = forwardRef<HTMLDivElement, AttributeCardProps>(
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
      ...props
    },
    ref
  ) => {
    const effectiveVariant = editable ? 'editable' : variant;

    return (
      <div
        ref={ref}
        className={cn(attributeCardVariants({ variant: effectiveVariant, size }), className)}
        {...props}
      >
        <div className={ATTR_ABBR_CLASS}>{abbreviation}</div>

        {editable ? (
          <div className={ATTR_EDIT_ROW_CLASS}>
            <button
              type="button"
              onClick={onDecrease}
              disabled={decreaseDisabled}
              className={ATTR_STEPPER_BUTTON_CLASS}
              aria-label={`Decrease ${abbreviation}`}
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className={ATTR_SCORE_WRAPPER_CLASS}>
              <div className={ATTR_SCORE_CLASS}>{score}</div>
            </div>
            <button
              type="button"
              onClick={onIncrease}
              disabled={increaseDisabled}
              className={ATTR_STEPPER_BUTTON_CLASS}
              aria-label={`Increase ${abbreviation}`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="mt-1">
            <span className={ATTR_SCORE_CLASS}>{score}</span>
            {bonus !== undefined && bonus > 0 && (
              <span className={ATTR_BONUS_CLASS}>+{bonus}</span>
            )}
          </div>
        )}

        <div
          className={cn(
            ATTR_MODIFIER_BASE_CLASS,
            modifier >= 0 ? ATTR_MODIFIER_POS_CLASS : ATTR_MODIFIER_NEG_CLASS,
          )}
        >
          {formatModifier(modifier)}
        </div>
      </div>
    );
  }
);

AttributeCard.displayName = 'AttributeCard';

export { attributeCardVariants };
export type { AttributeCardVariant, AttributeCardSize } from './AttributeCard.classes';
