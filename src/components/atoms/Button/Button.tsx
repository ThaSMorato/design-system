import { type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../../utils/cn';
import { Spinner } from '../Spinner';
import { buttonVariants } from './Button.classes';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconOnly,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size === 'lg' ? 'sm' : 'xs'} />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
export type { ButtonVariant, ButtonSize } from './Button.classes';
