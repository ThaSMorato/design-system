/**
 * React Native variant of WizardStep (compound).
 *
 * The web Grid uses Tailwind's responsive `sm:`/`md:`/`lg:` breakpoints,
 * which NativeWind does not translate on native by default. The native Grid
 * accepts a single `cols` number and lays out children in a wrapped flex
 * grid using width percentages; consumers can use `useWindowDimensions()`
 * to compute responsive cols themselves if needed.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text } from 'react-native';
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
  WIZARD_CONTENT_CLASS,
  WIZARD_FOOTER_ALIGN_CLASSES,
  WIZARD_FOOTER_BASE_CLASS,
  WIZARD_GRID_BASE_CLASS,
  WIZARD_HEADER_DESC_CLASS,
  WIZARD_HEADER_ICON_CLASS,
  WIZARD_HEADER_ROOT_CLASS,
  WIZARD_HEADER_ROW_CLASS,
  WIZARD_HEADER_STEPNUM_CLASS,
  WIZARD_HEADER_TITLE_CLASS,
  WIZARD_INFO_BODY_CLASS,
  WIZARD_INFO_ROOT_CLASS,
  WIZARD_INFO_TITLE_CLASS,
  WIZARD_INFO_TITLE_WRAPPER_CLASS,
  WIZARD_SECTION_LABEL_CLASS,
  WIZARD_SECTION_REQUIRED_CLASS,
  WIZARD_SECTION_ROOT_CLASS,
  wizardStepVariants,
  type WizardStepFooterAlign,
  type WizardStepVariant,
} from './WizardStep.classes';

const StyledView = styled(View);
const StyledText = styled(Text);

interface WizardStepContextValue {
  variant?: WizardStepVariant | null;
}
const WizardStepContext = createContext<WizardStepContextValue>({});
export const useWizardStepContext = () => useContext(WizardStepContext);

export interface WizardStepProps extends VariantProps<typeof wizardStepVariants> {
  className?: string;
  children?: ReactNode;
}

const WizardStepRoot = forwardRef<View, WizardStepProps>(
  ({ className, variant, children }, ref) => (
    <WizardStepContext.Provider value={{ variant: variant ?? 'default' }}>
      <StyledView ref={ref} className={cn(wizardStepVariants({ variant }), className)}>
        {children}
      </StyledView>
    </WizardStepContext.Provider>
  ),
);

export interface WizardStepHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  stepNumber?: number;
  totalSteps?: number;
  className?: string;
}
const WizardStepHeader = forwardRef<View, WizardStepHeaderProps>(
  ({ className, title, description, icon, stepNumber, totalSteps }, ref) => (
    <StyledView ref={ref} className={cn(WIZARD_HEADER_ROOT_CLASS, className)}>
      {stepNumber !== undefined || icon ? (
        <StyledView className={WIZARD_HEADER_ROW_CLASS}>
          {icon ? <StyledView className={WIZARD_HEADER_ICON_CLASS}>{icon}</StyledView> : null}
          {stepNumber !== undefined && totalSteps !== undefined ? (
            <StyledText className={WIZARD_HEADER_STEPNUM_CLASS}>
              Step {String(stepNumber)} of {String(totalSteps)}
            </StyledText>
          ) : null}
        </StyledView>
      ) : null}
      <StyledView>
        <StyledText accessibilityRole="header" className={WIZARD_HEADER_TITLE_CLASS}>
          {title}
        </StyledText>
        {description ? <StyledText className={WIZARD_HEADER_DESC_CLASS}>{description}</StyledText> : null}
      </StyledView>
    </StyledView>
  ),
);

export interface WizardStepContentProps {
  className?: string;
  children?: ReactNode;
}
const WizardStepContent = forwardRef<View, WizardStepContentProps>(
  ({ className, children }, ref) => (
    <StyledView ref={ref} className={cn(WIZARD_CONTENT_CLASS, className)}>
      {children}
    </StyledView>
  ),
);

export interface WizardStepSectionProps {
  label?: string;
  required?: boolean;
  className?: string;
  children?: ReactNode;
}
const WizardStepSection = forwardRef<View, WizardStepSectionProps>(
  ({ className, label, required, children }, ref) => (
    <StyledView ref={ref} className={cn(WIZARD_SECTION_ROOT_CLASS, className)}>
      {label ? (
        <StyledText className={WIZARD_SECTION_LABEL_CLASS}>
          {label}
          {required ? <StyledText className={WIZARD_SECTION_REQUIRED_CLASS}>*</StyledText> : null}
        </StyledText>
      ) : null}
      {children}
    </StyledView>
  ),
);

export interface WizardStepGridProps {
  /** Number of columns. Native Grid does not honor web breakpoints. */
  cols?: 1 | 2 | 3 | 4;
  className?: string;
  children?: ReactNode;
}
const gridChildClass: Record<1 | 2 | 3 | 4, string> = {
  1: 'w-full',
  2: 'w-1/2',
  3: 'w-1/3',
  4: 'w-1/4',
};
const WizardStepGrid = forwardRef<View, WizardStepGridProps>(
  ({ className, cols = 2, children }, ref) => {
    const childArray = Array.isArray(children) ? children : [children];
    return (
      <StyledView
        ref={ref}
        className={cn(WIZARD_GRID_BASE_CLASS, 'flex-row flex-wrap', className)}
      >
        {childArray.map((child, i) => (
          <StyledView key={i} className={gridChildClass[cols]}>
            {child}
          </StyledView>
        ))}
      </StyledView>
    );
  },
);

export interface WizardStepFooterProps {
  align?: WizardStepFooterAlign;
  className?: string;
  children?: ReactNode;
}
const WizardStepFooter = forwardRef<View, WizardStepFooterProps>(
  ({ className, align = 'between', children }, ref) => (
    <StyledView
      ref={ref}
      className={cn(WIZARD_FOOTER_BASE_CLASS, WIZARD_FOOTER_ALIGN_CLASSES[align], className)}
    >
      {children}
    </StyledView>
  ),
);

export interface WizardStepInfoPanelProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}
const WizardStepInfoPanel = forwardRef<View, WizardStepInfoPanelProps>(
  ({ className, title, children }, ref) => (
    <StyledView ref={ref} className={cn(WIZARD_INFO_ROOT_CLASS, className)}>
      {title ? (
        <StyledView className={WIZARD_INFO_TITLE_WRAPPER_CLASS}>
          <StyledText accessibilityRole="header" className={WIZARD_INFO_TITLE_CLASS}>
            {title}
          </StyledText>
        </StyledView>
      ) : null}
      <StyledView className={WIZARD_INFO_BODY_CLASS}>{children}</StyledView>
    </StyledView>
  ),
);

WizardStepRoot.displayName = 'WizardStep.native';
WizardStepHeader.displayName = 'WizardStep.Header.native';
WizardStepContent.displayName = 'WizardStep.Content.native';
WizardStepSection.displayName = 'WizardStep.Section.native';
WizardStepGrid.displayName = 'WizardStep.Grid.native';
WizardStepFooter.displayName = 'WizardStep.Footer.native';
WizardStepInfoPanel.displayName = 'WizardStep.InfoPanel.native';

export const WizardStep = Object.assign(WizardStepRoot, {
  Header: WizardStepHeader,
  Content: WizardStepContent,
  Section: WizardStepSection,
  Grid: WizardStepGrid,
  Footer: WizardStepFooter,
  InfoPanel: WizardStepInfoPanel,
});
