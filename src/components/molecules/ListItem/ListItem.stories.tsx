import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Badge } from '../../atoms/Badge/Badge';
import { MoreVertical } from 'lucide-react';

const meta = {
  title: 'Molecules/ListItem',
  component: ListItem,
  argTypes: {
    variant: { control: 'select', options: ['default', 'interactive', 'compact', 'ghost'] },
  },
  args: { variant: 'default' },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ListItem {...args}>
      <ListItem.Leading>
        <Avatar name="Aragorn" variant="warrior" size="sm" />
      </ListItem.Leading>
      <ListItem.Content>
        <ListItem.Title>Aragorn</ListItem.Title>
        <ListItem.Subtitle>Human Fighter - Level 12</ListItem.Subtitle>
        <ListItem.Meta>
          <Badge variant="status-active" size="xs" dot>Active</Badge>
        </ListItem.Meta>
      </ListItem.Content>
      <ListItem.Separator />
      <ListItem.Actions>
        <button className="p-1 text-dark-400 hover:text-dark-200">
          <MoreVertical className="h-4 w-4" />
        </button>
      </ListItem.Actions>
    </ListItem>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-md">
      {(['default', 'interactive', 'compact', 'ghost'] as const).map((v) => (
        <ListItem key={v} variant={v}>
          <ListItem.Content>
            <ListItem.Title>{v}</ListItem.Title>
            <ListItem.Subtitle>Variant: {v}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </div>
  ),
};
