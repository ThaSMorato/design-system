import type { Meta, StoryObj } from '@storybook/react';
import { Sword, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { Chip } from './Chip';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  argTypes: {
    shape: { control: 'radio', options: ['rounded', 'pill'] },
    selected: { control: 'boolean' },
    count: { control: 'number' },
  },
  args: { children: 'Warriors', selected: false, count: 12 },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

const ToggleDemo = () => {
  const [selected, setSelected] = useState('melee');
  return (
    <div className="flex gap-2">
      <Chip
        icon={<Sword className="h-4 w-4" />}
        selected={selected === 'melee'}
        onClick={() => setSelected('melee')}
        count={8}
      >
        Melee
      </Chip>
      <Chip
        icon={<Wand2 className="h-4 w-4" />}
        selected={selected === 'magic'}
        onClick={() => setSelected('magic')}
        count={5}
      >
        Magic
      </Chip>
      <Chip selected={selected === 'all'} onClick={() => setSelected('all')} disabled>
        Disabled
      </Chip>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <ToggleDemo />,
};
