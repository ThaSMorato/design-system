import type { Meta, StoryObj } from '@storybook/react';
import { AttributeCard } from './AttributeCard';

const meta = {
  title: 'Molecules/AttributeCard',
  component: AttributeCard,
  argTypes: {
    variant: { control: 'select', options: ['default', 'editable', 'highlighted'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    editable: { control: 'boolean' },
  },
  args: { abbreviation: 'STR', score: 16, modifier: 3, variant: 'default', size: 'md' },
} satisfies Meta<typeof AttributeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBonus: Story = {
  args: { abbreviation: 'CON', score: 14, modifier: 2, bonus: 2, variant: 'highlighted' },
};

export const Editable: Story = {
  args: {
    abbreviation: 'DEX',
    score: 12,
    modifier: 1,
    editable: true,
    onIncrease: () => {},
    onDecrease: () => {},
    decreaseDisabled: false,
    increaseDisabled: false,
  },
};

export const AllAttributes: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-3 max-w-2xl">
      <AttributeCard abbreviation="STR" score={16} modifier={3} />
      <AttributeCard abbreviation="DEX" score={14} modifier={2} />
      <AttributeCard abbreviation="CON" score={12} modifier={1} />
      <AttributeCard abbreviation="INT" score={10} modifier={0} />
      <AttributeCard abbreviation="WIS" score={8} modifier={-1} />
      <AttributeCard abbreviation="CHA" score={18} modifier={4} variant="highlighted" />
    </div>
  ),
};
