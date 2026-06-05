import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Dot } from '../../atoms/Dot';
import { Text } from '../../atoms/Text';
import {
  STATUS_DEFAULT_LABELS,
  STATUS_DOT_SIZE,
  STATUS_DOT_WRAPPER_CLASS,
  STATUS_PULSE_CLASS,
  STATUS_PULSE_VARIANTS,
  STATUS_WRAPPER_CLASS,
  statusIndicatorColor,
  statusIndicatorVariants,
  type StatusIndicatorSize,
} from './StatusIndicator.classes';

export interface StatusIndicatorProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof statusIndicatorVariants> {
  /** Whether to show pulse animation */
  pulse?: boolean;
  /** Label text to show next to the indicator */
  label?: string;
  /** Whether to show the label */
  showLabel?: boolean;
}

export const StatusIndicator = forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  (
    {
      className,
      variant,
      size,
      pulse,
      label,
      showLabel = true,
      ...props
    },
    ref
  ) => {
    const shouldPulse =
      pulse ?? (variant ? STATUS_PULSE_VARIANTS.includes(variant) : false);
    const displayLabel = label ?? (variant ? STATUS_DEFAULT_LABELS[variant] : undefined);
    const dotSize = STATUS_DOT_SIZE[(size ?? 'md') as StatusIndicatorSize];
    const dotColor = statusIndicatorColor(variant);

    return (
      <span
        ref={ref}
        className={cn(STATUS_WRAPPER_CLASS, className)}
        {...props}
      >
        <span className={STATUS_DOT_WRAPPER_CLASS}>
          <Dot size={dotSize} className={cn('block', dotColor)} />
          {shouldPulse && (
            <Dot size={dotSize} className={cn(STATUS_PULSE_CLASS, dotColor)} />
          )}
        </span>
        {showLabel && displayLabel && (
          <Text as="span" size="sm" tone="default">
            {displayLabel}
          </Text>
        )}
      </span>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export { statusIndicatorVariants };
export type { StatusIndicatorVariant, StatusIndicatorSize } from './StatusIndicator.classes';
