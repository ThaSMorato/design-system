import {
  forwardRef,
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import {
  BANNER_ACTIONS_CLASS,
  BANNER_CONTENT_CLASS,
  BANNER_DISMISS_CLASS,
  BANNER_ROW_CLASS,
  BANNER_TEXT_CONTENT_CLASS,
  bannerDescriptionVariants,
  bannerIconContainerVariants,
  bannerTitleVariants,
  bannerVariants,
  descriptionVariants,
  iconContainerVariants,
  titleVariants,
  type BannerVariant,
} from './Banner.classes';

interface BannerContextValue {
  variant: BannerVariant;
}

const BannerContext = createContext<BannerContextValue>({ variant: 'info' });
export const useBannerContext = () => useContext(BannerContext);

export interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
}

const BannerRoot = forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant = 'info', dismissible, onDismiss, children, ...props }, ref) => (
    <BannerContext.Provider value={{ variant: variant as BannerVariant }}>
      <div ref={ref} className={cn(bannerVariants({ variant }), className)} {...props}>
        <div className={BANNER_ROW_CLASS}>
          {children}
          {dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className={BANNER_DISMISS_CLASS}
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </BannerContext.Provider>
  ),
);

export interface BannerIconProps extends HTMLAttributes<HTMLDivElement> {}
const BannerIcon = forwardRef<HTMLDivElement, BannerIconProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useBannerContext();
    return (
      <div
        ref={ref}
        className={cn(bannerIconContainerVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface BannerContentProps extends HTMLAttributes<HTMLDivElement> {}
const BannerContent = forwardRef<HTMLDivElement, BannerContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(BANNER_CONTENT_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface BannerTextContentProps extends HTMLAttributes<HTMLDivElement> {}
const BannerTextContent = forwardRef<HTMLDivElement, BannerTextContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(BANNER_TEXT_CONTENT_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface BannerTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
const BannerTitle = forwardRef<HTMLHeadingElement, BannerTitleProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useBannerContext();
    return (
      <h3 ref={ref} className={cn(bannerTitleVariants({ variant }), className)} {...props}>
        {children}
      </h3>
    );
  },
);

export interface BannerDescriptionProps extends HTMLAttributes<HTMLDivElement> {}
const BannerDescription = forwardRef<HTMLDivElement, BannerDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useBannerContext();
    return (
      <div ref={ref} className={cn(bannerDescriptionVariants({ variant }), className)} {...props}>
        {children}
      </div>
    );
  },
);

export interface BannerActionsProps extends HTMLAttributes<HTMLDivElement> {}
const BannerActions = forwardRef<HTMLDivElement, BannerActionsProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(BANNER_ACTIONS_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface SimpleBannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const SimpleBanner = forwardRef<HTMLDivElement, SimpleBannerProps>(
  (
    { className, variant = 'info', icon, title, description, action, dismissible = false, onDismiss, ...props },
    ref,
  ) => (
    <BannerRoot
      ref={ref}
      variant={variant}
      dismissible={dismissible}
      onDismiss={onDismiss}
      className={className}
      {...props}
    >
      <BannerContent>
        {icon && <BannerIcon>{icon}</BannerIcon>}
        <BannerTextContent>
          <BannerTitle>{title}</BannerTitle>
          {description && <BannerDescription>{description}</BannerDescription>}
        </BannerTextContent>
      </BannerContent>
      {action && <BannerActions>{action}</BannerActions>}
    </BannerRoot>
  ),
);

BannerRoot.displayName = 'Banner';
BannerIcon.displayName = 'Banner.Icon';
BannerContent.displayName = 'Banner.Content';
BannerTextContent.displayName = 'Banner.TextContent';
BannerTitle.displayName = 'Banner.Title';
BannerDescription.displayName = 'Banner.Description';
BannerActions.displayName = 'Banner.Actions';
SimpleBanner.displayName = 'SimpleBanner';

export const Banner = Object.assign(SimpleBanner, {
  Root: BannerRoot,
  Icon: BannerIcon,
  Content: BannerContent,
  TextContent: BannerTextContent,
  Title: BannerTitle,
  Description: BannerDescription,
  Actions: BannerActions,
});

export { bannerVariants, iconContainerVariants, titleVariants, descriptionVariants };
export type { BannerVariant } from './Banner.classes';
