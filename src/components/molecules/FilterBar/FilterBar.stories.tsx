import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar, type FilterOption } from './FilterBar';

const meta = {
  title: 'Molecules/FilterBar',
  component: FilterBar,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'pills'] },
    wrap: { control: 'boolean' },
    showCount: { control: 'boolean' },
  },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta & { args: Record<string, unknown> }>;

const FilterBarDemo = ({ variant = 'default', showCount = true }: { variant?: 'default' | 'pills'; showCount?: boolean }) => {
  const [value, setValue] = useState('all');
  const options: FilterOption[] = [
    { value: 'all', label: 'All', count: 12 },
    { value: 'active', label: 'Active', count: 8 },
    { value: 'archived', label: 'Archived', count: 4 },
  ];
  return (
    <FilterBar
      variant={variant}
      showCount={showCount}
      options={options}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  render: () => <FilterBarDemo />,
};

export const Pills: Story = {
  render: () => <FilterBarDemo variant="pills" />,
};
