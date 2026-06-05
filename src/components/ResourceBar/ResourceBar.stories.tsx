import type { Meta, StoryObj } from '@storybook/react';
import { ResourceBar } from './ResourceBar';

const meta = {
  title: 'RPG/ResourceBar',
  component: ResourceBar,
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg'] },
    colorScheme: { control: 'select', options: ['health', 'mana', 'resource', 'xp', 'custom'] },
    showValue: { control: 'boolean' },
  },
  args: { current: 25, max: 40, size: 'md', colorScheme: 'health', showValue: true },
} satisfies Meta<typeof ResourceBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'HP' } };

export const HealthStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <ResourceBar current={35} max={40} label="Full HP" colorScheme="health" />
      <ResourceBar current={18} max={40} label="Half HP" colorScheme="health" />
      <ResourceBar current={8} max={40} label="Low HP" colorScheme="health" />
      <ResourceBar current={2} max={40} label="Critical HP" colorScheme="health" />
    </div>
  ),
};

export const WithTempHP: Story = {
  args: { current: 25, max: 40, temp: 10, label: 'HP + Temp' },
};

export const AllColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <ResourceBar current={30} max={40} label="Health" colorScheme="health" />
      <ResourceBar current={6} max={10} label="Mana" colorScheme="mana" />
      <ResourceBar current={3} max={5} label="Ki Points" colorScheme="resource" />
      <ResourceBar current={450} max={900} label="XP" colorScheme="xp" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <ResourceBar current={30} max={40} label="XS" size="xs" />
      <ResourceBar current={30} max={40} label="SM" size="sm" />
      <ResourceBar current={30} max={40} label="MD" size="md" />
      <ResourceBar current={30} max={40} label="LG" size="lg" />
    </div>
  ),
};
