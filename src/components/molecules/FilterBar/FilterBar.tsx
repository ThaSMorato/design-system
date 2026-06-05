import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { type VariantProps } from 'class-variance-authority';
import { Chip } from '../../atoms/Chip';
import { filterBarVariants, filterButtonVariants } from './FilterBar.classes';

export interface FilterOption<T = string> {
  value: T;
  label: string;
  icon?: ReactNode;
  count?: number;
  disabled?: boolean;
}

export interface FilterBarProps<T = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof filterBarVariants> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  showCount?: boolean;
}

function FilterBarComponent<T = string>(
  {
    className,
    variant,
    wrap,
    options,
    value,
    onChange,
    showCount = true,
    ...props
  }: FilterBarProps<T>,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(filterBarVariants({ variant, wrap }), className)}
      role="radiogroup"
      {...props}
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Chip
            key={String(option.value)}
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            disabled={option.disabled}
            shape={variant === 'pills' ? 'pill' : 'rounded'}
            selected={selected}
            icon={option.icon}
            count={showCount ? option.count : undefined}
          >
            {option.label}
          </Chip>
        );
      })}
    </div>
  );
}

export const FilterBar = forwardRef(FilterBarComponent) as <T = string>(
  props: FilterBarProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => ReturnType<typeof FilterBarComponent>;

export { filterBarVariants, filterButtonVariants };
export type { FilterBarVariant } from './FilterBar.classes';
