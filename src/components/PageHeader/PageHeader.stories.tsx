import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { Shield, Plus } from 'lucide-react';

const meta = {
  title: 'Core/PageHeader',
  component: PageHeader,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'compact'] },
    spacing: { control: 'select', options: ['none', 'sm', 'default', 'lg'] },
  },
  args: { title: 'My Characters', variant: 'default', spacing: 'default' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullFeatured: Story = {
  args: {
    title: 'Campaign Settings',
    description: 'Manage your campaign configuration and players.',
    icon: <Shield className="h-6 w-6" />,
    backLabel: 'Back to Campaigns',
    onBack: () => {},
    actions: (
      <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">
        <Plus className="h-4 w-4" /> Invite Player
      </button>
    ),
  },
};
