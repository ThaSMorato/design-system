import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
} from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Heading } from '../../atoms/Heading';
import { IconBox } from '../../atoms/IconBox';
import { Text } from '../../atoms/Text';
import {
  EMPTY_ICON_BOX_SIZE,
  EMPTY_ICON_INNER_CLASS,
  emptyStateActionsClass,
  emptyStateDescriptionClass,
  emptyStateIconMarginClass,
  emptyStateVariants,
  type EmptyStateSize,
} from './EmptyState.classes';

interface EmptyStateContextValue {
  size: EmptyStateSize;
}

const EmptyStateContext = createContext<EmptyStateContextValue>({ size: 'lg' });
export const useEmptyStateContext = () => useContext(EmptyStateContext);

export interface EmptyStateProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {}

const EmptyStateRoot = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <EmptyStateContext.Provider value={{ size: (size ?? 'lg') as EmptyStateSize }}>
      <div
        ref={ref}
        className={cn(emptyStateVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    </EmptyStateContext.Provider>
  )
);

export interface EmptyStateIconProps extends HTMLAttributes<HTMLDivElement> {}

const EmptyStateIcon = forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useEmptyStateContext();
    return (
      <IconBox
        ref={ref}
        size={EMPTY_ICON_BOX_SIZE[size]}
        className={cn(
          'mx-auto bg-dark-700',
          emptyStateIconMarginClass(size),
          className
        )}
        {...props}
      >
        <div className={EMPTY_ICON_INNER_CLASS}>{children}</div>
      </IconBox>
    );
  }
);

export interface EmptyStateTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const EmptyStateTitle = forwardRef<HTMLHeadingElement, EmptyStateTitleProps>(
  ({ className, ...props }, ref) => {
    const { size } = useEmptyStateContext();
    return (
      <Heading
        ref={ref}
        as="h3"
        size={size === 'sm' ? 'sm' : 'md'}
        className={className}
        {...props}
      />
    );
  }
);

export interface EmptyStateDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const EmptyStateDescription = forwardRef<HTMLElement, EmptyStateDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = useEmptyStateContext();
    return (
      <Text
        ref={ref}
        size={size === 'lg' ? 'md' : 'sm'}
        tone="muted"
        className={cn(emptyStateDescriptionClass(size), className)}
        {...props}
      />
    );
  }
);

export interface EmptyStateActionsProps extends HTMLAttributes<HTMLDivElement> {}

const EmptyStateActions = forwardRef<HTMLDivElement, EmptyStateActionsProps>(
  ({ className, ...props }, ref) => {
    const { size } = useEmptyStateContext();
    return (
      <div
        ref={ref}
        className={cn(emptyStateActionsClass(size), className)}
        {...props}
      />
    );
  }
);

EmptyStateRoot.displayName = 'EmptyState';
EmptyStateIcon.displayName = 'EmptyState.Icon';
EmptyStateTitle.displayName = 'EmptyState.Title';
EmptyStateDescription.displayName = 'EmptyState.Description';
EmptyStateActions.displayName = 'EmptyState.Actions';

export const EmptyState = Object.assign(EmptyStateRoot, {
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Actions: EmptyStateActions,
});

export { emptyStateVariants };
export type { EmptyStateVariant, EmptyStateSize } from './EmptyState.classes';
