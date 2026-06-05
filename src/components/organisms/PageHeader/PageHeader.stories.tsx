import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { Shield, Plus } from 'lucide-react';

const meta = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'compact'] },
    spacing: { control: 'select', options: ['none', 'sm', 'default', 'lg'] },
  },
  args: { variant: 'default', spacing: 'default' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <PageHeader {...args}>
      <PageHeader.Content>
        <PageHeader.Main>
          <PageHeader.Titles>
            <PageHeader.Title>My Characters</PageHeader.Title>
          </PageHeader.Titles>
        </PageHeader.Main>
      </PageHeader.Content>
    </PageHeader>
  ),
};

export const FullFeatured: Story = {
  render: (args) => (
    <PageHeader {...args}>
      <PageHeader.BackLink onClick={() => {}}>Back to Campaigns</PageHeader.BackLink>
      <PageHeader.Content>
        <PageHeader.Main>
          <PageHeader.Icon>
            <Shield className="h-6 w-6" />
          </PageHeader.Icon>
          <PageHeader.Titles>
            <PageHeader.Title>Campaign Settings</PageHeader.Title>
            <PageHeader.Description>
              Manage your campaign configuration and players.
            </PageHeader.Description>
          </PageHeader.Titles>
        </PageHeader.Main>
        <PageHeader.Actions>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">
            <Plus className="h-4 w-4" /> Invite Player
          </button>
        </PageHeader.Actions>
      </PageHeader.Content>
    </PageHeader>
  ),
};
