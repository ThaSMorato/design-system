/**
 * React Native variant of Button. Imported via the `@rpg-app/design-system/native`
 * subpath only. Web consumers continue to import `@rpg-app/design-system`
 * unchanged.
 *
 * Shares its class strings with `Button.tsx` (web) via `Button.classes.ts`.
 * The component itself is a separate implementation because the React Native
 * primitive surface differs from the DOM (Pressable / Text / ActivityIndicator
 * rather than button / span / a Spinner div) and the props API uses RN's
 * `PressableProps` instead of `ButtonHTMLAttributes`.
 *
 * Status: scaffold. `react-native` and `nativewind` are intentionally not yet
 * installed in this workspace — `*.native.tsx` files are excluded from the
 * web build so this file does not break `pnpm build`/`pnpm typecheck` today.
 * Install them in the RN app workspace when you bootstrap it.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { Pressable, Text, ActivityIndicator, type PressableProps } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { buttonVariants } from './Button.classes';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export interface ButtonNativeProps
  extends Omit<PressableProps, 'children' | 'style'>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Override class string — merged after variant classes. */
  className?: string;
  /** Class string applied to the inner <Text> for label styling. */
  textClassName?: string;
}

export const Button = forwardRef<unknown, ButtonNativeProps>(
  (
    {
      className,
      textClassName,
      variant,
      size,
      iconOnly,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledPressable
        ref={ref as never}
        accessibilityRole="button"
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {leftIcon}
            {typeof children === 'string' ? (
              <StyledText className={cn('text-inherit', textClassName)}>{children}</StyledText>
            ) : (
              children
            )}
            {rightIcon}
          </>
        )}
      </StyledPressable>
    );
  },
);

Button.displayName = 'Button.native';

export { buttonVariants };
export type { ButtonVariant, ButtonSize } from './Button.classes';
