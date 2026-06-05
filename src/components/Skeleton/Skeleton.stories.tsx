import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Core/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: { control: 'radio', options: ['text', 'circle', 'rect'] },
  },
  args: { variant: 'rect', width: 200, height: 20 },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circle" width={48} height={48} />
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" width={160} height={14} />
        <Skeleton variant="text" width={100} height={14} />
      </div>
      <Skeleton variant="rect" width={120} height={80} />
    </div>
  ),
};
