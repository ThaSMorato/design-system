import type { Meta, StoryObj } from '@storybook/react';
import { Dot } from './Dot';

const meta = {
  title: 'Atoms/Dot',
  component: Dot,
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: { size: 'md', className: 'bg-accent-emerald' },
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SemanticColors: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Dot className="bg-accent-emerald" />
      <Dot className="bg-accent-gold" />
      <Dot className="bg-accent-crimson" />
      <Dot className="bg-blue-500" />
      <Dot className="bg-dark-400" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Dot size="xs" className="bg-primary-400" />
      <Dot size="sm" className="bg-primary-400" />
      <Dot size="md" className="bg-primary-400" />
      <Dot size="lg" className="bg-primary-400" />
      <Dot size="xl" className="bg-primary-400" />
    </div>
  ),
};
