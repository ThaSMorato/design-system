import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  PROGRESS_FILL_CLASS,
  PROGRESS_TEMP_FILL_CLASS,
  PROGRESS_TRACK_INNER_CLASS,
  progressBarVariants,
} from './ProgressBar.classes';

export interface ProgressBarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  /** Fill percentage, 0–100. */
  percentage: number;
  /** Optional secondary (e.g. temp HP) fill percentage, rendered after the main fill. */
  tempPercentage?: number;
  /** Color class(es) for the main fill, e.g. `bg-accent-emerald`. */
  fillClassName?: string;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { className, size, percentage, tempPercentage = 0, fillClassName, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(progressBarVariants({ size }), className)}
      {...props}
    >
      <div className={PROGRESS_TRACK_INNER_CLASS}>
        <div
          className={cn(PROGRESS_FILL_CLASS, fillClassName)}
          style={{ width: `${percentage}%` }}
        />
        {tempPercentage > 0 && (
          <div
            className={PROGRESS_TEMP_FILL_CLASS}
            style={{ left: `${percentage}%`, width: `${tempPercentage}%` }}
          />
        )}
      </div>
    </div>
  )
);

ProgressBar.displayName = 'ProgressBar';

export { progressBarVariants };
export type { ProgressBarSize } from './ProgressBar.classes';
