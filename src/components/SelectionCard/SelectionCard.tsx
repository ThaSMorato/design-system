import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
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

export interface SelectionCardProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof selectionCardVariants> {
  /** Whether this card is currently selected */
  selected?: boolean;
  /** Main title/label for this option */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional metadata line (e.g., "Speed: 30 ft") */
  meta?: string;
  /** Optional icon to display */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: SelectionCardIconPosition;
}

export const SelectionCard = forwardRef<HTMLButtonElement, SelectionCardProps>(
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
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(selectionCardVariants({ variant, size, selected }), className)}
        aria-pressed={selected}
        {...props}
      >
        <div className={selectionCardInnerClass(iconPosition)}>
          {icon && <div className={selectionCardIconClass(selected)}>{icon}</div>}
          <div className={SELECTION_BODY_CLASS}>
            <div className={selectionCardTitleClass(selected)}>{title}</div>
            {description && <div className={SELECTION_DESCRIPTION_CLASS}>{description}</div>}
            {meta && <div className={SELECTION_META_CLASS}>{meta}</div>}
          </div>
        </div>
      </button>
    );
  }
);

SelectionCard.displayName = 'SelectionCard';

export { selectionCardVariants };
export type {
  SelectionCardVariant,
  SelectionCardSize,
  SelectionCardIconPosition,
} from './SelectionCard.classes';
