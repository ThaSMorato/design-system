import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { ArrowLeft } from 'lucide-react';
import {
  PAGE_ACTIONS_CLASS,
  PAGE_BACK_ICON_CLASS,
  PAGE_BACK_LINK_CLASS,
  PAGE_DESCRIPTION_CLASS,
  PAGE_ICON_WRAPPER_CLASS,
  PAGE_LEFT_CLASS,
  PAGE_ROW_CLASS,
  PAGE_TITLE_CLASS,
  PAGE_TITLE_WRAPPER_CLASS,
  pageHeaderVariants,
} from './PageHeader.classes';

export interface PageHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {
  /** Page title */
  title: string;
  /** Optional description */
  description?: string;
  /** Icon to display before the title */
  icon?: ReactNode;
  /** Back link URL */
  backHref?: string;
  /** Back link label */
  backLabel?: string;
  /** Back link click handler (alternative to backHref) */
  onBack?: () => void;
  /** Action elements (buttons, etc.) */
  actions?: ReactNode;
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      className,
      variant,
      spacing,
      title,
      description,
      icon,
      backHref,
      backLabel = 'Back',
      onBack,
      actions,
      ...props
    },
    ref
  ) => {
    const BackComponent = backHref ? 'a' : 'button';
    const showBackLink = backHref || onBack;

    return (
      <div
        ref={ref}
        className={cn(pageHeaderVariants({ variant, spacing }), className)}
        {...props}
      >
        {showBackLink && (
          <BackComponent
            href={backHref}
            onClick={onBack}
            className={PAGE_BACK_LINK_CLASS}
          >
            <ArrowLeft className={PAGE_BACK_ICON_CLASS} />
            {backLabel}
          </BackComponent>
        )}
        <div className={PAGE_ROW_CLASS}>
          <div className={PAGE_LEFT_CLASS}>
            {icon && <div className={PAGE_ICON_WRAPPER_CLASS}>{icon}</div>}
            <div className={PAGE_TITLE_WRAPPER_CLASS}>
              <h1 className={PAGE_TITLE_CLASS}>{title}</h1>
              {description && <p className={PAGE_DESCRIPTION_CLASS}>{description}</p>}
            </div>
          </div>
          {actions && <div className={PAGE_ACTIONS_CLASS}>{actions}</div>}
        </div>
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export { PageHeader, pageHeaderVariants };
export type { PageHeaderVariant, PageHeaderSpacing } from './PageHeader.classes';
