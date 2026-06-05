import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'radio', options: ['circle', 'rounded', 'square'] },
    variant: {
      control: 'select',
      options: [
        'default', 'primary', 'gradient', 'warrior', 'mage',
        'rogue', 'cleric', 'success', 'warning', 'danger',
      ],
    },
    status: { control: 'select', options: [undefined, 'online', 'offline', 'away', 'busy'] },
    autoColor: { control: 'boolean' },
  },
  args: { name: 'Gandalf', size: 'md', variant: 'primary' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Fighter" variant="warrior" />
      <Avatar name="Mage" variant="mage" />
      <Avatar name="Rogue" variant="rogue" />
      <Avatar name="Cleric" variant="cleric" />
      <Avatar name="Gradient" variant="gradient" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Online" variant="primary" status="online" />
      <Avatar name="Away" variant="primary" status="away" />
      <Avatar name="Busy" variant="primary" status="busy" />
      <Avatar name="Offline" variant="primary" status="offline" />
    </div>
  ),
};
