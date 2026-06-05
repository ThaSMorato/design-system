import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../atoms/Avatar';
import { AvatarGroup } from './AvatarGroup';

const meta = {
  title: 'Molecules/AvatarGroup',
  component: AvatarGroup,
  argTypes: {
    max: { control: 'number' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: { max: 3, size: 'md' },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name="Alice" autoColor />
      <Avatar name="Bob" autoColor />
      <Avatar name="Charlie" autoColor />
      <Avatar name="Diana" autoColor />
      <Avatar name="Eve" autoColor />
    </AvatarGroup>
  ),
};
