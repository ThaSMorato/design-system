import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { useDelayedVisibility } from '../../../hooks/use-delayed-visibility';
import {
  TOOLTIP_ARROW_BASE_CLASS,
  TOOLTIP_WRAPPER_CLASS,
  tooltipArrowClass,
  tooltipVariants,
  type TooltipPosition,
} from './Tooltip.classes';

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  /** The content to display in the tooltip */
  tooltipContent: ReactNode;
  /** The trigger element */
  children: ReactNode;
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Additional class name for the wrapper */
  className?: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      position,
      tooltipContent,
      children,
      delay = 200,
      disabled = false,
    },
    ref,
  ) => {
    const { isVisible, show, hide } = useDelayedVisibility({ delay, disabled });
    const resolvedPosition = (position ?? 'top') as TooltipPosition;

    return (
      <div
        ref={ref}
        className={cn(TOOLTIP_WRAPPER_CLASS, className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
        {isVisible && tooltipContent && (
          <div className={cn(tooltipVariants({ position }))} role="tooltip">
            {tooltipContent}
            <div className={cn(TOOLTIP_ARROW_BASE_CLASS, tooltipArrowClass(resolvedPosition))} />
          </div>
        )}
      </div>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export { tooltipVariants };
export type { TooltipPosition } from './Tooltip.classes';
