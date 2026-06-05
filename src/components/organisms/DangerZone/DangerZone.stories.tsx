import type { Meta, StoryObj } from '@storybook/react';
import { DangerZone } from './DangerZone';

const meta = {
  title: 'Organisms/DangerZone',
  component: DangerZone,
  argTypes: {
    isLoading: { control: 'boolean' },
  },
  args: {
    description: 'Once you delete this campaign, there is no going back. All data will be permanently removed.',
    actionLabel: 'Delete Campaign',
    onAction: () => {},
  },
} satisfies Meta<typeof DangerZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomTitle: Story = {
  args: {
    title: 'Remove Character',
    description: 'This will permanently remove the character from this campaign.',
    actionLabel: 'Remove Character',
    confirmLabel: 'Yes, remove',
  },
};
