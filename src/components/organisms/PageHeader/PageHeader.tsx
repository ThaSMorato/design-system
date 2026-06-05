import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
} from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { ArrowLeft } from 'lucide-react';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import {
  PAGE_ACTIONS_CLASS,
  PAGE_BACK_ICON_CLASS,
  PAGE_BACK_LINK_CLASS,
  PAGE_ICON_WRAPPER_CLASS,
  PAGE_LEFT_CLASS,
  PAGE_ROW_CLASS,
  PAGE_TITLE_WRAPPER_CLASS,
  pageHeaderVariants,
} from './PageHeader.classes';

export interface PageHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {}

const PageHeaderRoot = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, variant, spacing, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(pageHeaderVariants({ variant, spacing }), className)}
      {...props}
    >
      {children}
    </div>
  )
);

export interface PageHeaderBackLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {}

/** Renders an `<a>` when `href` is given, otherwise a `<button>`. */
const PageHeaderBackLink = forwardRef<HTMLElement, PageHeaderBackLinkProps>(
  ({ className, href, children, ...props }, ref) => {
    const Component = (href ? 'a' : 'button') as 'a';
    return (
      <Component
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn(PAGE_BACK_LINK_CLASS, className)}
        {...props}
      >
        <ArrowLeft className={PAGE_BACK_ICON_CLASS} />
        {children}
      </Component>
    );
  }
);

export interface PageHeaderContentProps extends HTMLAttributes<HTMLDivElement> {}

/** The main row: title group on the left, actions on the right. */
const PageHeaderContent = forwardRef<HTMLDivElement, PageHeaderContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(PAGE_ROW_CLASS, className)} {...props} />
  )
);

export interface PageHeaderMainProps extends HTMLAttributes<HTMLDivElement> {}

/** Left block: icon + titles. */
const PageHeaderMain = forwardRef<HTMLDivElement, PageHeaderMainProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(PAGE_LEFT_CLASS, className)} {...props} />
  )
);

export interface PageHeaderIconProps extends HTMLAttributes<HTMLDivElement> {}

const PageHeaderIcon = forwardRef<HTMLDivElement, PageHeaderIconProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(PAGE_ICON_WRAPPER_CLASS, className)} {...props} />
  )
);

export interface PageHeaderTitlesProps extends HTMLAttributes<HTMLDivElement> {}

/** Wrapper for Title + Description (min-w-0 so the title can truncate). */
const PageHeaderTitles = forwardRef<HTMLDivElement, PageHeaderTitlesProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(PAGE_TITLE_WRAPPER_CLASS, className)} {...props} />
  )
);

export interface PageHeaderTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const PageHeaderTitle = forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(
  ({ className, ...props }, ref) => (
    <Heading
      ref={ref}
      as="h1"
      size="lg"
      weight="bold"
      className={cn('truncate', className)}
      {...props}
    />
  )
);

export interface PageHeaderDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const PageHeaderDescription = forwardRef<HTMLElement, PageHeaderDescriptionProps>(
  ({ className, ...props }, ref) => (
    <Text ref={ref} size="md" tone="muted" className={cn('mt-1', className)} {...props} />
  )
);

export interface PageHeaderActionsProps extends HTMLAttributes<HTMLDivElement> {}

const PageHeaderActions = forwardRef<HTMLDivElement, PageHeaderActionsProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(PAGE_ACTIONS_CLASS, className)} {...props} />
  )
);

PageHeaderRoot.displayName = 'PageHeader';
PageHeaderBackLink.displayName = 'PageHeader.BackLink';
PageHeaderContent.displayName = 'PageHeader.Content';
PageHeaderMain.displayName = 'PageHeader.Main';
PageHeaderIcon.displayName = 'PageHeader.Icon';
PageHeaderTitles.displayName = 'PageHeader.Titles';
PageHeaderTitle.displayName = 'PageHeader.Title';
PageHeaderDescription.displayName = 'PageHeader.Description';
PageHeaderActions.displayName = 'PageHeader.Actions';

export const PageHeader = Object.assign(PageHeaderRoot, {
  BackLink: PageHeaderBackLink,
  Content: PageHeaderContent,
  Main: PageHeaderMain,
  Icon: PageHeaderIcon,
  Titles: PageHeaderTitles,
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
  Actions: PageHeaderActions,
});

export { pageHeaderVariants };
export type { PageHeaderVariant, PageHeaderSpacing } from './PageHeader.classes';
