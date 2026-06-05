import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    disabled: { control: 'boolean' },
  },
  args: {
    tooltipContent: 'Tooltip text',
    position: 'top',
    children: <button className="px-3 py-1.5 bg-dark-700 text-dark-200 rounded text-sm">Hover me</button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllPositions: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8 py-16">
      {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
        <Tooltip key={pos} tooltipContent={`Position: ${pos}`} position={pos} delay={0}>
          <button className="px-3 py-1.5 bg-dark-700 text-dark-200 rounded text-sm">{pos}</button>
        </Tooltip>
      ))}
    </div>
  ),
};
