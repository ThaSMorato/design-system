import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md'] },
    tone: { control: 'radio', options: ['default', 'muted', 'subtle'] },
    as: { control: 'radio', options: ['p', 'span', 'div'] },
  },
  args: {
    children: 'A short description of this section.',
    size: 'sm',
    tone: 'muted',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="space-y-1">
      <Text tone="default">Default tone (dark-300)</Text>
      <Text tone="muted">Muted tone (dark-400)</Text>
      <Text tone="subtle">Subtle tone (dark-500)</Text>
    </div>
  ),
};
