import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Core/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default', 'level', 'role-dm', 'role-player',
        'status-active', 'status-paused', 'status-inactive',
        'success', 'warning', 'error', 'info', 'progression',
      ],
    },
    size: { control: 'radio', options: ['xs', 'sm', 'md'] },
    dot: { control: 'boolean' },
  },
  args: { children: 'Badge', variant: 'default', size: 'sm' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="level">Lvl 5</Badge>
      <Badge variant="role-dm">DM</Badge>
      <Badge variant="role-player">Player</Badge>
      <Badge variant="status-active" dot>Active</Badge>
      <Badge variant="status-paused" dot>Paused</Badge>
      <Badge variant="status-inactive" dot>Inactive</Badge>
      <Badge variant="success" dot>Success</Badge>
      <Badge variant="warning" dot>Warning</Badge>
      <Badge variant="error" dot>Error</Badge>
      <Badge variant="info" dot>Info</Badge>
      <Badge variant="progression">3/10</Badge>
    </div>
  ),
};
