/**
 * React Native variant of Banner (compound).
 *
 * Mirrors the web compound API: `Banner.Root`/`Banner.Icon`/`Banner.Content`/
 * `Banner.TextContent`/`Banner.Title`/`Banner.Description`/`Banner.Actions`,
 * plus a `SimpleBanner` convenience that the default `Banner` export points
 * at. The dismiss X icon is supplied via a render-prop.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable, type ViewProps, type TextProps } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
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
  type BannerVariant,
} from './Banner.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

interface BannerContextValue {
  variant: BannerVariant;
}
const BannerContext = createContext<BannerContextValue>({ variant: 'info' });
export const useBannerContext = () => useContext(BannerContext);

export interface BannerProps extends VariantProps<typeof bannerVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  children?: ReactNode;
  /** Render-prop for the dismiss X icon. */
  renderDismissIcon?: (className: string) => ReactNode;
}

const BannerRoot = forwardRef<View, BannerProps>(
  ({ className, variant = 'info', dismissible, onDismiss, children, renderDismissIcon }, ref) => (
    <BannerContext.Provider value={{ variant: variant as BannerVariant }}>
      <StyledView ref={ref} className={cn(bannerVariants({ variant }), className)}>
        <StyledView className={BANNER_ROW_CLASS}>
          {children}
          {dismissible ? (
            <StyledPressable
              accessibilityRole="button"
              accessibilityLabel="Dismiss"
              onPress={onDismiss}
              className={BANNER_DISMISS_CLASS}
            >
              {renderDismissIcon ? renderDismissIcon('h-5 w-5') : null}
            </StyledPressable>
          ) : null}
        </StyledView>
      </StyledView>
    </BannerContext.Provider>
  ),
);

export interface BannerIconProps extends ViewProps {
  className?: string;
  children?: ReactNode;
}
const BannerIcon = forwardRef<View, BannerIconProps>(({ className, children }, ref) => {
  const { variant } = useBannerContext();
  return (
    <StyledView ref={ref} className={cn(bannerIconContainerVariants({ variant }), className)}>
      {children}
    </StyledView>
  );
});

export interface BannerContentProps extends ViewProps {
  className?: string;
  children?: ReactNode;
}
const BannerContent = forwardRef<View, BannerContentProps>(({ className, children }, ref) => (
  <StyledView ref={ref} className={cn(BANNER_CONTENT_CLASS, className)}>
    {children}
  </StyledView>
));

export interface BannerTextContentProps extends ViewProps {
  className?: string;
  children?: ReactNode;
}
const BannerTextContent = forwardRef<View, BannerTextContentProps>(
  ({ className, children }, ref) => (
    <StyledView ref={ref} className={cn(BANNER_TEXT_CONTENT_CLASS, className)}>
      {children}
    </StyledView>
  ),
);

export interface BannerTitleProps extends TextProps {
  className?: string;
  children?: ReactNode;
}
const BannerTitle = forwardRef<Text, BannerTitleProps>(({ className, children }, ref) => {
  const { variant } = useBannerContext();
  return (
    <StyledText
      ref={ref}
      accessibilityRole="header"
      className={cn(bannerTitleVariants({ variant }), className)}
    >
      {children}
    </StyledText>
  );
});

export interface BannerDescriptionProps extends ViewProps {
  className?: string;
  children?: ReactNode;
}
const BannerDescription = forwardRef<View, BannerDescriptionProps>(
  ({ className, children }, ref) => {
    const { variant } = useBannerContext();
    return (
      <StyledView ref={ref} className={cn(bannerDescriptionVariants({ variant }), className)}>
        {typeof children === 'string' || typeof children === 'number' ? (
          <StyledText className="text-inherit">{children}</StyledText>
        ) : (
          children
        )}
      </StyledView>
    );
  },
);

export interface BannerActionsProps extends ViewProps {
  className?: string;
  children?: ReactNode;
}
const BannerActions = forwardRef<View, BannerActionsProps>(({ className, children }, ref) => (
  <StyledView ref={ref} className={cn(BANNER_ACTIONS_CLASS, className)}>
    {children}
  </StyledView>
));

export interface SimpleBannerProps extends VariantProps<typeof bannerVariants> {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  renderDismissIcon?: (className: string) => ReactNode;
}

const SimpleBanner = forwardRef<View, SimpleBannerProps>(
  (
    {
      className,
      variant = 'info',
      icon,
      title,
      description,
      action,
      dismissible = false,
      onDismiss,
      renderDismissIcon,
    },
    ref,
  ) => (
    <BannerRoot
      ref={ref}
      variant={variant}
      dismissible={dismissible}
      onDismiss={onDismiss}
      className={className}
      renderDismissIcon={renderDismissIcon}
    >
      <BannerContent>
        {icon ? <BannerIcon>{icon}</BannerIcon> : null}
        <BannerTextContent>
          <BannerTitle>{title}</BannerTitle>
          {description ? <BannerDescription>{description}</BannerDescription> : null}
        </BannerTextContent>
      </BannerContent>
      {action ? <BannerActions>{action}</BannerActions> : null}
    </BannerRoot>
  ),
);

BannerRoot.displayName = 'Banner.native';
SimpleBanner.displayName = 'SimpleBanner.native';

export const Banner = Object.assign(SimpleBanner, {
  Root: BannerRoot,
  Icon: BannerIcon,
  Content: BannerContent,
  TextContent: BannerTextContent,
  Title: BannerTitle,
  Description: BannerDescription,
  Actions: BannerActions,
});
