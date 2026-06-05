import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from './StatusIndicator';

const meta = {
  title: 'Core/StatusIndicator',
  component: StatusIndicator,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'connected', 'connecting', 'reconnecting', 'disconnected',
        'online', 'offline', 'away', 'busy',
        'success', 'warning', 'error', 'info', 'default',
      ],
    },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg'] },
    pulse: { control: 'boolean' },
    showLabel: { control: 'boolean' },
  },
  args: { variant: 'connected', size: 'md', showLabel: true },
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusIndicator variant="connected" />
      <StatusIndicator variant="connecting" />
      <StatusIndicator variant="disconnected" />
      <StatusIndicator variant="online" />
      <StatusIndicator variant="offline" />
      <StatusIndicator variant="away" />
      <StatusIndicator variant="busy" />
      <StatusIndicator variant="success" />
      <StatusIndicator variant="warning" />
      <StatusIndicator variant="error" />
      <StatusIndicator variant="info" />
    </div>
  ),
};
