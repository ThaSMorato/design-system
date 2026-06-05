import {
  forwardRef,
  useState,
  useRef,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
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
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = () => {
      if (disabled) return;
      timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsVisible(false);
    };

    const resolvedPosition = (position ?? 'top') as TooltipPosition;

    return (
      <div
        ref={ref}
        className={cn(TOOLTIP_WRAPPER_CLASS, className)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
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
