import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
} from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import {
  SECTION_ACTION_CLASS,
  SECTION_ICON_CLASS,
  SECTION_LEFT_CLASS,
  SECTION_ROW_CLASS,
  sectionHeaderDescriptionVariants,
  sectionHeaderVariants,
  type SectionHeaderSize,
} from './SectionHeader.classes';

interface SectionHeaderContextValue {
  size: SectionHeaderSize;
}

const SectionHeaderContext = createContext<SectionHeaderContextValue>({ size: 'md' });
export const useSectionHeaderContext = () => useContext(SectionHeaderContext);

export interface SectionHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionHeaderVariants> {}

const SectionHeaderRoot = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, size, children, ...props }, ref) => (
    <SectionHeaderContext.Provider value={{ size: (size ?? 'md') as SectionHeaderSize }}>
      <div
        ref={ref}
        className={cn(sectionHeaderVariants({ size }), className)}
        {...props}
      >
        <div className={SECTION_ROW_CLASS}>{children}</div>
      </div>
    </SectionHeaderContext.Provider>
  )
);

export interface SectionHeaderContentProps extends HTMLAttributes<HTMLDivElement> {}

/** Left block: icon + titles. */
const SectionHeaderContent = forwardRef<HTMLDivElement, SectionHeaderContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(SECTION_LEFT_CLASS, className)} {...props} />
  )
);

export interface SectionHeaderIconProps extends HTMLAttributes<HTMLDivElement> {}

const SectionHeaderIcon = forwardRef<HTMLDivElement, SectionHeaderIconProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(SECTION_ICON_CLASS, className)} {...props} />
  )
);

export interface SectionHeaderTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** HTML heading level */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

const SectionHeaderTitle = forwardRef<HTMLHeadingElement, SectionHeaderTitleProps>(
  ({ className, as = 'h2', ...props }, ref) => {
    // SectionHeader sizes map 1:1 onto the Heading atom's scale
    // (sm=text-lg, md=text-xl, lg=text-2xl — semibold, dark-100).
    const { size } = useSectionHeaderContext();
    return <Heading ref={ref} as={as} size={size} className={className} {...props} />;
  }
);

export interface SectionHeaderDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const SectionHeaderDescription = forwardRef<HTMLElement, SectionHeaderDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = useSectionHeaderContext();
    return (
      <Text
        ref={ref}
        tone="muted"
        size="md"
        className={cn(sectionHeaderDescriptionVariants({ size }), className)}
        {...props}
      />
    );
  }
);

export interface SectionHeaderActionProps extends HTMLAttributes<HTMLDivElement> {}

const SectionHeaderAction = forwardRef<HTMLDivElement, SectionHeaderActionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(SECTION_ACTION_CLASS, className)} {...props} />
  )
);

SectionHeaderRoot.displayName = 'SectionHeader';
SectionHeaderContent.displayName = 'SectionHeader.Content';
SectionHeaderIcon.displayName = 'SectionHeader.Icon';
SectionHeaderTitle.displayName = 'SectionHeader.Title';
SectionHeaderDescription.displayName = 'SectionHeader.Description';
SectionHeaderAction.displayName = 'SectionHeader.Action';

export const SectionHeader = Object.assign(SectionHeaderRoot, {
  Content: SectionHeaderContent,
  Icon: SectionHeaderIcon,
  Title: SectionHeaderTitle,
  Description: SectionHeaderDescription,
  Action: SectionHeaderAction,
});

export { sectionHeaderVariants };
export type { SectionHeaderSize } from './SectionHeader.classes';
