import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  STAT_ICON_WRAPPER_CLASS,
  STAT_LABEL_CLASS,
  STAT_MODIFIER_CLASS,
  formatStatModifier,
  statCardVariants,
  statValueVariants,
  valueVariants,
} from './StatCard.classes';

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  modifier?: number;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  modifier,
  icon,
  variant,
  size,
  className,
}: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant, size }), className)}>
      {icon && <div className={STAT_ICON_WRAPPER_CLASS}>{icon}</div>}
      <div className={cn(statValueVariants({ variant, size }))}>{value}</div>
      {modifier !== undefined && (
        <div className={STAT_MODIFIER_CLASS}>({formatStatModifier(modifier)})</div>
      )}
      <div className={STAT_LABEL_CLASS}>{label}</div>
    </div>
  );
}

export { statCardVariants, valueVariants };
export type { StatCardVariant, StatCardSize } from './StatCard.classes';
