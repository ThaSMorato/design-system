/**
 * React Native variant of SectionHeader.
 *
 * No heading-level semantics on native — the `as` prop is ignored and the
 * title renders through <Text> with accessibilityRole="header".
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { forwardRef, type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  SECTION_ACTION_CLASS,
  SECTION_ICON_CLASS,
  SECTION_LEFT_CLASS,
  SECTION_ROW_CLASS,
  sectionHeaderDescriptionVariants,
  sectionHeaderTitleVariants,
  sectionHeaderVariants,
} from './SectionHeader.classes';

const StyledView = styled(View);
const StyledText = styled(Text);

export interface SectionHeaderProps extends VariantProps<typeof sectionHeaderVariants> {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader = forwardRef<View, SectionHeaderProps>(
  ({ className, size, title, description, icon, action }, ref) => (
    <StyledView ref={ref} className={cn(sectionHeaderVariants({ size }), className)}>
      <StyledView className={SECTION_ROW_CLASS}>
        <StyledView className={SECTION_LEFT_CLASS}>
          {icon ? <StyledView className={SECTION_ICON_CLASS}>{icon}</StyledView> : null}
          <StyledView>
            <StyledText
              accessibilityRole="header"
              className={cn(sectionHeaderTitleVariants({ size }))}
            >
              {title}
            </StyledText>
            {description ? (
              <StyledText className={cn(sectionHeaderDescriptionVariants({ size }))}>
                {description}
              </StyledText>
            ) : null}
          </StyledView>
        </StyledView>
        {action ? <StyledView className={SECTION_ACTION_CLASS}>{action}</StyledView> : null}
      </StyledView>
    </StyledView>
  ),
);

SectionHeader.displayName = 'SectionHeader.native';
