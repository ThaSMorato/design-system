import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  RESOURCE_FILL_CLASS,
  RESOURCE_LABEL_CLASS,
  RESOURCE_LABEL_ROW_CLASS,
  RESOURCE_TEMP_FILL_CLASS,
  RESOURCE_TEMP_VALUE_CLASS,
  RESOURCE_TRACK_INNER_CLASS,
  RESOURCE_VALUE_CLASS,
  resourceBarColor,
  resourceBarVariants,
  type ResourceBarColorScheme,
} from './ResourceBar.classes';

export interface ResourceBarProps extends VariantProps<typeof resourceBarVariants> {
  current: number;
  max: number;
  temp?: number;
  label?: string;
  showValue?: boolean;
  customColor?: string;
  className?: string;
}

export function ResourceBar({
  current,
  max,
  temp = 0,
  label,
  showValue = true,
  size,
  colorScheme,
  customColor,
  className,
}: ResourceBarProps) {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  const tempPercentage = max > 0 ? Math.min((temp / max) * 100, 100 - percentage) : 0;
  const barColor =
    customColor || resourceBarColor(colorScheme as ResourceBarColorScheme | null | undefined, percentage);

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className={RESOURCE_LABEL_ROW_CLASS}>
          {label && <span className={RESOURCE_LABEL_CLASS}>{label}</span>}
          {showValue && (
            <span className={RESOURCE_VALUE_CLASS}>
              {current}
              {temp > 0 && <span className={RESOURCE_TEMP_VALUE_CLASS}>+{temp}</span>}
              /{max}
            </span>
          )}
        </div>
      )}
      <div className={cn(resourceBarVariants({ size, colorScheme }))}>
        <div className={RESOURCE_TRACK_INNER_CLASS}>
          <div
            className={cn(RESOURCE_FILL_CLASS, barColor)}
            style={{ width: `${percentage}%` }}
          />
          {temp > 0 && (
            <div
              className={RESOURCE_TEMP_FILL_CLASS}
              style={{ left: `${percentage}%`, width: `${tempPercentage}%` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { resourceBarVariants };
export type { ResourceBarSize, ResourceBarColorScheme } from './ResourceBar.classes';
