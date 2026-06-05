import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Users, Plus } from 'lucide-react';

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'card'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  args: { variant: 'default', size: 'lg' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyState.Icon>
        <Users className="h-8 w-8" />
      </EmptyState.Icon>
      <EmptyState.Title>No characters yet</EmptyState.Title>
      <EmptyState.Description>
        Create your first character to get started.
      </EmptyState.Description>
    </EmptyState>
  ),
};

export const WithActions: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyState.Icon>
        <Users className="h-8 w-8" />
      </EmptyState.Icon>
      <EmptyState.Title>No campaigns found</EmptyState.Title>
      <EmptyState.Description>
        Start a new adventure by creating a campaign.
      </EmptyState.Description>
      <EmptyState.Actions>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">
          <Plus className="h-4 w-4" /> Create Campaign
        </button>
        <button className="px-4 py-2 text-sm text-dark-400">Browse</button>
      </EmptyState.Actions>
    </EmptyState>
  ),
};
