import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg'] },
    percentage: { control: { type: 'range', min: 0, max: 100 } },
    tempPercentage: { control: { type: 'range', min: 0, max: 100 } },
  },
  args: { percentage: 65, fillClassName: 'bg-accent-emerald', size: 'md' },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTempFill: Story = {
  args: { percentage: 50, tempPercentage: 20 },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <ProgressBar size="xs" percentage={80} fillClassName="bg-primary-500" />
      <ProgressBar size="sm" percentage={60} fillClassName="bg-blue-500" />
      <ProgressBar size="md" percentage={40} fillClassName="bg-accent-gold" />
      <ProgressBar size="lg" percentage={20} fillClassName="bg-accent-crimson" />
    </div>
  ),
};
