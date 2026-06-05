import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Clock, X } from 'lucide-react';
import { IconButton } from '../../atoms/IconButton';
import {
  CONDITION_DURATION_CLASS,
  conditionBadgeIconSize,
  conditionBadgeVariants,
} from './ConditionBadge.classes';

export interface ConditionBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof conditionBadgeVariants> {
  /** Condition name */
  name: string;
  /** Duration in rounds (optional) */
  duration?: number;
  /** Icon to display */
  icon?: ReactNode;
  /** Whether the condition is removable */
  removable?: boolean;
  /** Callback when remove is clicked */
  onRemove?: () => void;
  /** Show duration indicator */
  showDuration?: boolean;
}

const ConditionBadge = forwardRef<HTMLSpanElement, ConditionBadgeProps>(
  (
    {
      className,
      variant,
      size,
      name,
      duration,
      icon,
      removable = false,
      onRemove,
      showDuration = true,
      ...props
    },
    ref
  ) => {
    const iconSize = conditionBadgeIconSize(size);

    return (
      <span
        ref={ref}
        className={cn(conditionBadgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon}
        <span>{name}</span>
        {showDuration && duration !== undefined && duration > 0 && (
          <span className={CONDITION_DURATION_CLASS}>
            <Clock className={iconSize} />
            <span className="text-xs">{duration}</span>
          </span>
        )}
        {removable && onRemove && (
          <IconButton
            aria-label={`Remove ${name}`}
            variant="soft"
            shape="pill"
            size="xs"
            className="ml-0.5"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X className={iconSize} />
          </IconButton>
        )}
      </span>
    );
  }
);

ConditionBadge.displayName = 'ConditionBadge';

export { ConditionBadge, conditionBadgeVariants };
export type { ConditionBadgeVariant, ConditionBadgeSize } from './ConditionBadge.classes';
