import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  BUTTON_GROUP_BORDER_CLASS,
  buttonGroupPaddingClass,
  buttonGroupVariants,
} from './ButtonGroup.classes';

export interface ButtonGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  /** Button elements to render */
  children: ReactNode;
  /** Whether to show a top border (for footer style) */
  withBorder?: boolean;
  /** Padding top value */
  paddingTop?: 'none' | 'sm' | 'md' | 'lg';
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      align,
      direction,
      children,
      withBorder = false,
      paddingTop = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          buttonGroupVariants({ align, direction }),
          withBorder && BUTTON_GROUP_BORDER_CLASS,
          buttonGroupPaddingClass(paddingTop),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export { buttonGroupVariants };
export type { ButtonGroupAlign, ButtonGroupDirection, ButtonGroupPaddingTop } from './ButtonGroup.classes';
