import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';
import { Info, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

const meta = {
  title: 'Organisms/Banner',
  component: Banner,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'primary', 'gradient'],
    },
    dismissible: { control: 'boolean' },
  },
  args: { variant: 'info' },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBanner = ({
  variant,
  title,
  description,
  icon,
  dismissible,
}: {
  variant: 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'gradient';
  title: string;
  description: string;
  icon: ReactNode;
  dismissible?: boolean;
}) => (
  <Banner variant={variant} dismissible={dismissible} onDismiss={() => {}}>
    <Banner.Content>
      <Banner.Icon>{icon}</Banner.Icon>
      <Banner.TextContent>
        <Banner.Title>{title}</Banner.Title>
        <Banner.Description>{description}</Banner.Description>
      </Banner.TextContent>
    </Banner.Content>
  </Banner>
);

export const Default: Story = {
  render: (args) => (
    <DemoBanner
      variant={args.variant ?? 'info'}
      title="Session starting soon"
      description="Your next session begins in 30 minutes."
      icon={<Info className="h-5 w-5" />}
      dismissible={args.dismissible}
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <DemoBanner variant="info" title="Info" description="Informational banner." icon={<Info className="h-5 w-5" />} />
      <DemoBanner variant="success" title="Success" description="Action completed." icon={<CheckCircle className="h-5 w-5" />} />
      <DemoBanner variant="warning" title="Warning" description="Proceed with caution." icon={<AlertTriangle className="h-5 w-5" />} />
      <DemoBanner variant="danger" title="Danger" description="Critical issue detected." icon={<AlertTriangle className="h-5 w-5" />} />
      <DemoBanner variant="primary" title="Feature" description="New feature available!" icon={<Sparkles className="h-5 w-5" />} />
      <DemoBanner variant="gradient" title="Welcome" description="Ready for adventure?" icon={<Sparkles className="h-5 w-5" />} />
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Banner variant="success">
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
    </Banner>
  ),
};
