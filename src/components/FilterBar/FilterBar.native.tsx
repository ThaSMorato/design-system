/**
 * React Native variant of FilterBar.
 *
 * RN doesn't have radio semantics built into Pressable, but
 * `accessibilityState={{ selected }}` conveys the same idea to screen
 * readers. The generic typing is kept to match the web API.
 */
// @ts-expect-error — `react-native` is not installed in this workspace yet.
import { View, Text, Pressable } from 'react-native';
// @ts-expect-error — `nativewind` is not installed in this workspace yet.
import { styled } from 'nativewind';
import { type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  FILTER_DISABLED_CLASS,
  filterBarVariants,
  filterButtonVariants,
  filterCountClass,
} from './FilterBar.classes';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export interface FilterOption<T = string> {
  value: T;
  label: string;
  icon?: ReactNode;
  count?: number;
  disabled?: boolean;
}

export interface FilterBarProps<T = string> extends VariantProps<typeof filterBarVariants> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  showCount?: boolean;
  className?: string;
}

export function FilterBar<T = string>({
  className,
  variant,
  wrap,
  options,
  value,
  onChange,
  showCount = true,
}: FilterBarProps<T>) {
  return (
    <StyledView className={cn(filterBarVariants({ variant, wrap }), className)}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <StyledPressable
            key={String(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled: !!option.disabled }}
            disabled={option.disabled}
            onPress={() => onChange(option.value)}
            className={cn(
              filterButtonVariants({ variant, selected }),
              option.disabled && FILTER_DISABLED_CLASS,
            )}
          >
            {option.icon}
            <StyledText className="text-inherit">{option.label}</StyledText>
            {showCount && option.count !== undefined ? (
              <StyledText className={filterCountClass(selected)}>
                ({String(option.count)})
              </StyledText>
            ) : null}
          </StyledPressable>
        );
      })}
    </StyledView>
  );
}
