import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  argTypes: {
    tone: { control: 'radio', options: ['default', 'muted'] },
    required: { control: 'boolean' },
  },
  args: { children: 'Character name', tone: 'default', required: false },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const Muted: Story = {
  args: { tone: 'muted', children: 'Section label' },
};
