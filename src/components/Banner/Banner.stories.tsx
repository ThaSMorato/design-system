import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';
import { Info, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

const meta = {
  title: 'Compound/Banner',
  component: Banner,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'primary', 'gradient'],
    },
    dismissible: { control: 'boolean' },
  },
  args: {
    title: 'Session starting soon',
    description: 'Your next session begins in 30 minutes.',
    variant: 'info',
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { icon: <Info className="h-5 w-5" /> },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <Banner variant="info" title="Info" description="Informational banner." icon={<Info className="h-5 w-5" />} />
      <Banner variant="success" title="Success" description="Action completed." icon={<CheckCircle className="h-5 w-5" />} />
      <Banner variant="warning" title="Warning" description="Proceed with caution." icon={<AlertTriangle className="h-5 w-5" />} />
      <Banner variant="danger" title="Danger" description="Critical issue detected." icon={<AlertTriangle className="h-5 w-5" />} />
      <Banner variant="primary" title="Feature" description="New feature available!" icon={<Sparkles className="h-5 w-5" />} />
      <Banner variant="gradient" title="Welcome" description="Ready for adventure?" icon={<Sparkles className="h-5 w-5" />} />
    </div>
  ),
};

export const CompoundComposition: Story = {
  render: () => (
    <Banner.Root variant="success">
      <Banner.Content>
        <Banner.Icon><CheckCircle className="h-5 w-5" /></Banner.Icon>
        <Banner.TextContent>
          <Banner.Title>Campaign Created</Banner.Title>
          <Banner.Description>Your new campaign is ready to go.</Banner.Description>
        </Banner.TextContent>
      </Banner.Content>
      <Banner.Actions>
        <button className="px-3 py-1.5 text-sm bg-accent-emerald text-dark-900 rounded font-medium">
          View Campaign
        </button>
      </Banner.Actions>
    </Banner.Root>
  ),
};
