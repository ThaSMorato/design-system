import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import {
  SECTION_ACTION_CLASS,
  SECTION_ICON_CLASS,
  SECTION_LEFT_CLASS,
  SECTION_ROW_CLASS,
  sectionHeaderDescriptionVariants,
  sectionHeaderTitleVariants,
  sectionHeaderVariants,
} from './SectionHeader.classes';

export interface SectionHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionHeaderVariants> {
  /** The section title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional icon to display before title */
  icon?: ReactNode;
  /** Optional action element (button, link) to display on the right */
  action?: ReactNode;
  /** HTML heading level */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      size,
      title,
      description,
      icon,
      action,
      as: Component = 'h2',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(sectionHeaderVariants({ size }), className)}
        {...props}
      >
        <div className={SECTION_ROW_CLASS}>
          <div className={SECTION_LEFT_CLASS}>
            {icon && <div className={SECTION_ICON_CLASS}>{icon}</div>}
            <div>
              <Component className={cn(sectionHeaderTitleVariants({ size }))}>
                {title}
              </Component>
              {description && (
                <p className={cn(sectionHeaderDescriptionVariants({ size }))}>
                  {description}
                </p>
              )}
            </div>
          </div>
          {action && <div className={SECTION_ACTION_CLASS}>{action}</div>}
        </div>
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export { sectionHeaderVariants };
export type { SectionHeaderSize } from './SectionHeader.classes';
