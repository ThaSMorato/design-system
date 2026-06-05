import { type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { formatModifier } from '../../../utils/format';
import { type VariantProps } from 'class-variance-authority';
import { Text } from '../../atoms/Text';
import {
  STAT_ICON_WRAPPER_CLASS,
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
        <Text as="div" size="sm" tone="default" className="font-medium">
          ({formatModifier(modifier)})
        </Text>
      )}
      <Text
        as="div"
        size="xs"
        tone="muted"
        className="mt-1 font-medium uppercase tracking-wide"
      >
        {label}
      </Text>
    </div>
  );
}

export { statCardVariants, valueVariants };
export type { StatCardVariant, StatCardSize } from './StatCard.classes';
