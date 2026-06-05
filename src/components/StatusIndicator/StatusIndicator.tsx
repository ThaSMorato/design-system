import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  STATUS_DEFAULT_LABELS,
  STATUS_DOT_WRAPPER_CLASS,
  STATUS_LABEL_CLASS,
  STATUS_PULSE_CLASS,
  STATUS_PULSE_VARIANTS,
  STATUS_WRAPPER_CLASS,
  statusIndicatorVariants,
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

    return (
      <span
        ref={ref}
        className={cn(STATUS_WRAPPER_CLASS, className)}
        {...props}
      >
        <span className={STATUS_DOT_WRAPPER_CLASS}>
          <span
            className={cn(statusIndicatorVariants({ variant, size }))}
            aria-hidden="true"
          />
          {shouldPulse && (
            <span
              className={cn(STATUS_PULSE_CLASS, statusIndicatorVariants({ variant, size }))}
              aria-hidden="true"
            />
          )}
        </span>
        {showLabel && displayLabel && (
          <span className={STATUS_LABEL_CLASS}>{displayLabel}</span>
        )}
      </span>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export { statusIndicatorVariants };
export type { StatusIndicatorVariant, StatusIndicatorSize } from './StatusIndicator.classes';
