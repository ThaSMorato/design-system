import type { Meta, StoryObj } from '@storybook/react';
import { AlertTriangle, Shield, Sparkles, Swords } from 'lucide-react';
import { IconBox } from './IconBox';

const meta = {
  title: 'Atoms/IconBox',
  component: IconBox,
  argTypes: {
    shape: { control: 'radio', options: ['circle', 'rounded'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: {
    shape: 'circle',
    size: 'sm',
    className: 'bg-primary-900/50 text-primary-400',
    children: <Sparkles className="h-5 w-5" />,
  },
} satisfies Meta<typeof IconBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Examples: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconBox className="bg-accent-crimson/20 text-accent-crimson" size="md">
        <AlertTriangle className="h-6 w-6" />
      </IconBox>
      <IconBox shape="rounded" className="bg-primary-900/30 text-primary-400">
        <Swords className="h-5 w-5" />
      </IconBox>
      <IconBox size="lg" className="bg-dark-700 text-dark-400">
        <Shield className="h-8 w-8" />
      </IconBox>
    </div>
  ),
};
