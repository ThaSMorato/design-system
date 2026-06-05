import {
  forwardRef,
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Heading } from '../../atoms/Heading';
import { IconBox } from '../../atoms/IconBox';
import { Label } from '../../atoms/Label';
import { Text } from '../../atoms/Text';
import {
  WIZARD_CONTENT_CLASS,
  WIZARD_FOOTER_ALIGN_CLASSES,
  WIZARD_FOOTER_BASE_CLASS,
  WIZARD_GRID_BASE_CLASS,
  WIZARD_HEADER_ICON_COLOR_CLASS,
  WIZARD_HEADER_ROOT_CLASS,
  WIZARD_HEADER_ROW_CLASS,
  WIZARD_HEADER_STEPNUM_CLASS,
  WIZARD_INFO_BODY_CLASS,
  WIZARD_INFO_ROOT_CLASS,
  WIZARD_INFO_TITLE_WRAPPER_CLASS,
  WIZARD_SECTION_ROOT_CLASS,
  wizardStepVariants,
  type WizardStepFooterAlign,
  type WizardStepVariant,
} from './WizardStep.classes';

interface WizardStepContextValue {
  variant?: WizardStepVariant | null;
}
const WizardStepContext = createContext<WizardStepContextValue>({});
export const useWizardStepContext = () => useContext(WizardStepContext);

export interface WizardStepProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wizardStepVariants> {}

const WizardStepRoot = forwardRef<HTMLDivElement, WizardStepProps>(
  ({ className, variant, children, ...props }, ref) => (
    <WizardStepContext.Provider value={{ variant: variant ?? 'default' }}>
      <div
        ref={ref}
        className={cn(wizardStepVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    </WizardStepContext.Provider>
  ),
);

export interface WizardStepHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: ReactNode;
  stepNumber?: number;
  totalSteps?: number;
}

const WizardStepHeader = forwardRef<HTMLDivElement, WizardStepHeaderProps>(
  ({ className, title, description, icon, stepNumber, totalSteps, ...props }, ref) => (
    <div ref={ref} className={cn(WIZARD_HEADER_ROOT_CLASS, className)} {...props}>
      {(stepNumber !== undefined || icon) && (
        <div className={WIZARD_HEADER_ROW_CLASS}>
          {icon && (
            <IconBox shape="rounded" className={WIZARD_HEADER_ICON_COLOR_CLASS}>
              {icon}
            </IconBox>
          )}
          {stepNumber !== undefined && totalSteps !== undefined && (
            <span className={WIZARD_HEADER_STEPNUM_CLASS}>
              Step {stepNumber} of {totalSteps}
            </span>
          )}
        </div>
      )}
      <div>
        <Heading as="h2" size="md">
          {title}
        </Heading>
        {description && (
          <Text size="md" tone="muted" className="mt-1">
            {description}
          </Text>
        )}
      </div>
    </div>
  ),
);

export interface WizardStepContentProps extends HTMLAttributes<HTMLDivElement> {}
const WizardStepContent = forwardRef<HTMLDivElement, WizardStepContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(WIZARD_CONTENT_CLASS, className)} {...props}>
      {children}
    </div>
  ),
);

export interface WizardStepSectionProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
}
const WizardStepSection = forwardRef<HTMLDivElement, WizardStepSectionProps>(
  ({ className, label, required, children, ...props }, ref) => (
    <div ref={ref} className={cn(WIZARD_SECTION_ROOT_CLASS, className)} {...props}>
      {label && (
        <Label tone="muted" required={required}>
          {label}
        </Label>
      )}
      {children}
    </div>
  ),
);

export interface WizardStepGridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: {
    default?: 1 | 2 | 3 | 4;
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
  };
}

const colClasses = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' } as const;

const WizardStepGrid = forwardRef<HTMLDivElement, WizardStepGridProps>(
  ({ className, cols = { default: 1, sm: 2, lg: 3 }, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        WIZARD_GRID_BASE_CLASS,
        cols.default && colClasses[cols.default],
        cols.sm && `sm:${colClasses[cols.sm]}`,
        cols.md && `md:${colClasses[cols.md]}`,
        cols.lg && `lg:${colClasses[cols.lg]}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

export interface WizardStepFooterProps extends HTMLAttributes<HTMLDivElement> {
  align?: WizardStepFooterAlign;
}
const WizardStepFooter = forwardRef<HTMLDivElement, WizardStepFooterProps>(
  ({ className, align = 'between', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(WIZARD_FOOTER_BASE_CLASS, WIZARD_FOOTER_ALIGN_CLASSES[align], className)}
      {...props}
    >
      {children}
    </div>
  ),
);

export interface WizardStepInfoPanelProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}
const WizardStepInfoPanel = forwardRef<HTMLDivElement, WizardStepInfoPanelProps>(
  ({ className, title, children, ...props }, ref) => (
    <div ref={ref} className={cn(WIZARD_INFO_ROOT_CLASS, className)} {...props}>
      {title && (
        <div className={WIZARD_INFO_TITLE_WRAPPER_CLASS}>
          <Heading as="h3" size="inherit" weight="medium">
            {title}
          </Heading>
        </div>
      )}
      <div className={WIZARD_INFO_BODY_CLASS}>{children}</div>
    </div>
  ),
);

WizardStepRoot.displayName = 'WizardStep';
WizardStepHeader.displayName = 'WizardStep.Header';
WizardStepContent.displayName = 'WizardStep.Content';
WizardStepSection.displayName = 'WizardStep.Section';
WizardStepGrid.displayName = 'WizardStep.Grid';
WizardStepFooter.displayName = 'WizardStep.Footer';
WizardStepInfoPanel.displayName = 'WizardStep.InfoPanel';

export const WizardStep = Object.assign(WizardStepRoot, {
  Header: WizardStepHeader,
  Content: WizardStepContent,
  Section: WizardStepSection,
  Grid: WizardStepGrid,
  Footer: WizardStepFooter,
  InfoPanel: WizardStepInfoPanel,
});

export { wizardStepVariants };
export type { WizardStepVariant, WizardStepFooterAlign } from './WizardStep.classes';
