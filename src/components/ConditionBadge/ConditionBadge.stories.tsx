import type { Meta, StoryObj } from '@storybook/react';
import { ConditionBadge } from './ConditionBadge';
import { Flame, Snowflake, Eye, Shield } from 'lucide-react';

const meta = {
  title: 'RPG/ConditionBadge',
  component: ConditionBadge,
  argTypes: {
    variant: { control: 'select', options: ['default', 'positive', 'negative', 'neutral', 'status'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    removable: { control: 'boolean' },
    showDuration: { control: 'boolean' },
  },
  args: { name: 'Poisoned', variant: 'negative', size: 'md', duration: 3 },
} satisfies Meta<typeof ConditionBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <ConditionBadge name="Blessed" variant="positive" icon={<Shield className="h-3.5 w-3.5" />} duration={5} />
      <ConditionBadge name="Burning" variant="negative" icon={<Flame className="h-3.5 w-3.5" />} duration={2} removable onRemove={() => {}} />
      <ConditionBadge name="Frozen" variant="neutral" icon={<Snowflake className="h-3.5 w-3.5" />} duration={1} />
      <ConditionBadge name="Invisible" variant="status" icon={<Eye className="h-3.5 w-3.5" />} />
      <ConditionBadge name="Exhaustion" variant="default" />
    </div>
  ),
};
