import type { Meta, StoryObj } from '@storybook/react';
import { CopyableLink } from './CopyableLink';

const meta = {
  title: 'Molecules/CopyableLink',
  component: CopyableLink,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'compact'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    showShare: { control: 'boolean' },
  },
  args: {
    value: 'https://rpg-hub.app/invite/abc123',
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof CopyableLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <CopyableLink value="https://rpg-hub.app/invite/sm" size="sm" showShare={false} />
      <CopyableLink value="https://rpg-hub.app/invite/md" size="md" showShare={false} />
      <CopyableLink value="https://rpg-hub.app/invite/lg" size="lg" showShare={false} />
    </div>
  ),
};
