import { type VariantProps } from 'class-variance-authority';
import { type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { Dot } from '../Dot';
import { badgeDotClassName, badgeVariants } from './Badge.classes';

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  icon?: ReactNode;
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant,
  size,
  icon,
  dot,
  className,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {dot && <Dot size="xs" className={badgeDotClassName(variant)} />}
      {icon}
      {children}
    </span>
  );
}

export { badgeVariants };
export type { BadgeVariant, BadgeSize } from './Badge.classes';
