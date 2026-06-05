import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Users, Plus } from 'lucide-react';

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'card'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  args: {
    icon: <Users className="h-8 w-8" />,
    title: 'No characters yet',
    description: 'Create your first character to get started.',
    variant: 'default',
    size: 'lg',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    icon: <Users className="h-8 w-8" />,
    title: 'No campaigns found',
    description: 'Start a new adventure by creating a campaign.',
    action: (
      <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">
        <Plus className="h-4 w-4" /> Create Campaign
      </button>
    ),
    secondaryAction: (
      <button className="px-4 py-2 text-sm text-dark-400">Browse</button>
    ),
  },
};
