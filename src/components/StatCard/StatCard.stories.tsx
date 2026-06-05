import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { Shield, Heart, Swords } from 'lucide-react';

const meta = {
  title: 'RPG/StatCard',
  component: StatCard,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default', 'strength', 'dexterity', 'constitution',
        'intelligence', 'wisdom', 'charisma', 'hp', 'ac',
        'initiative', 'speed', 'proficiency',
      ],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  args: { label: 'Strength', value: 16, modifier: 3, variant: 'strength', size: 'md' },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AttributeRow: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-3 max-w-2xl">
      <StatCard label="STR" value={16} modifier={3} variant="strength" />
      <StatCard label="DEX" value={14} modifier={2} variant="dexterity" />
      <StatCard label="CON" value={12} modifier={1} variant="constitution" />
      <StatCard label="INT" value={10} modifier={0} variant="intelligence" />
      <StatCard label="WIS" value={8} modifier={-1} variant="wisdom" />
      <StatCard label="CHA" value={18} modifier={4} variant="charisma" />
    </div>
  ),
};

export const CombatStats: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-3 max-w-xl">
      <StatCard label="HP" value="45" variant="hp" icon={<Heart className="h-5 w-5" />} />
      <StatCard label="AC" value="18" variant="ac" icon={<Shield className="h-5 w-5" />} />
      <StatCard label="Init" value="+3" variant="initiative" icon={<Swords className="h-5 w-5" />} />
      <StatCard label="Prof" value="+3" variant="proficiency" />
    </div>
  ),
};
