import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  EMPTY_ICON_INNER_CLASS,
  emptyStateActionsClass,
  emptyStateDescriptionClass,
  emptyStateIconContainerVariants,
  emptyStateTitleClass,
  emptyStateVariants,
  type EmptyStateSize,
} from './EmptyState.classes';

export interface EmptyStateProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /** Icon to display */
  icon: ReactNode;
  /** Main title text */
  title: string;
  /** Description text */
  description?: string;
  /** Primary action button/link */
  action?: ReactNode;
  /** Secondary action button/link */
  secondaryAction?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      title,
      description,
      action,
      secondaryAction,
      ...props
    },
    ref
  ) => {
    const sizeTyped = size as EmptyStateSize | null | undefined;
    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ variant, size }), className)}
        {...props}
      >
        <div className={cn(emptyStateIconContainerVariants({ size, variant }))}>
          <div className={EMPTY_ICON_INNER_CLASS}>{icon}</div>
        </div>

        <h3 className={emptyStateTitleClass(sizeTyped)}>{title}</h3>

        {description && (
          <p className={emptyStateDescriptionClass(sizeTyped)}>{description}</p>
        )}

        {(action || secondaryAction) && (
          <div className={emptyStateActionsClass(sizeTyped)}>
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { emptyStateVariants };
export type { EmptyStateVariant, EmptyStateSize } from './EmptyState.classes';
