import { type VariantProps } from 'class-variance-authority';
import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import {
  BADGE_DOT_BASE,
  badgeDotClassName,
  badgeVariants,
} from './Badge.classes';

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
      {dot && <span className={cn(BADGE_DOT_BASE, badgeDotClassName(variant))} />}
      {icon}
      {children}
    </span>
  );
}

export { badgeVariants };
export type { BadgeVariant, BadgeSize } from './Badge.classes';
