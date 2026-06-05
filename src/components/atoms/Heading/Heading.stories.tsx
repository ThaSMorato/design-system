import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  argTypes: {
    size: { control: 'radio', options: ['inherit', 'sm', 'md', 'lg'] },
    weight: { control: 'radio', options: ['medium', 'semibold', 'bold'] },
    tone: { control: 'radio', options: ['default', 'danger'] },
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
  },
  args: { children: 'Session Title', size: 'md', weight: 'semibold', tone: 'default' },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading size="sm">Small heading (text-lg)</Heading>
      <Heading size="md">Medium heading (text-xl)</Heading>
      <Heading size="lg">Large heading (text-2xl)</Heading>
    </div>
  ),
};

export const Danger: Story = {
  args: { tone: 'danger', children: 'Danger Zone' },
};
