import type { Meta, StoryObj } from '@storybook/react';
import { Copy, Share2, X } from 'lucide-react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    variant: { control: 'radio', options: ['ghost', 'fade', 'soft', 'outline'] },
    shape: { control: 'radio', options: ['square', 'rounded', 'pill'] },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg'] },
  },
  args: {
    'aria-label': 'Close',
    variant: 'ghost',
    shape: 'rounded',
    size: 'sm',
    children: <X className="h-5 w-5" />,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="Close" variant="ghost">
        <X className="h-5 w-5" />
      </IconButton>
      <IconButton aria-label="Dismiss" variant="fade">
        <X className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="Remove" variant="soft" shape="pill" size="xs">
        <X className="h-3.5 w-3.5" />
      </IconButton>
      <IconButton aria-label="Copy" variant="outline" size="md">
        <Copy className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="Share" variant="outline" size="md">
        <Share2 className="h-4 w-4" />
      </IconButton>
    </div>
  ),
};
