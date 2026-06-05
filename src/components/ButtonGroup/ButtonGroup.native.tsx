/**
 * React Native variant of ButtonGroup. Pure layout, no events.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  BUTTON_GROUP_BORDER_CLASS,
  buttonGroupPaddingClass,
  buttonGroupVariants,
  type ButtonGroupPaddingTop,
} from './ButtonGroup.classes';

const StyledView = styled(View);

export interface ButtonGroupProps extends VariantProps<typeof buttonGroupVariants> {
  children: ReactNode;
  withBorder?: boolean;
  paddingTop?: ButtonGroupPaddingTop;
  className?: string;
}

export const ButtonGroup = forwardRef<View, ButtonGroupProps>(
  ({ className, align, direction, children, withBorder = false, paddingTop = 'md' }, ref) => (
    <StyledView
      ref={ref}
      className={cn(
        buttonGroupVariants({ align, direction }),
        withBorder && BUTTON_GROUP_BORDER_CLASS,
        buttonGroupPaddingClass(paddingTop),
        className,
      )}
    >
      {children}
    </StyledView>
  ),
);

ButtonGroup.displayName = 'ButtonGroup.native';
