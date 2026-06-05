import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectionCard } from './SelectionCard';
import { Sword, BookOpen, Heart } from 'lucide-react';

const meta = {
  title: 'Molecules/SelectionCard',
  component: SelectionCard,
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'warning'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    selected: { control: 'boolean' },
  },
  args: {
    title: 'Fighter',
    description: 'A master of martial combat.',
    meta: 'Hit Die: d10',
    variant: 'default',
    size: 'lg',
    selected: false,
  },
} satisfies Meta<typeof SelectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InteractiveSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState('fighter');
    const classes = [
      { id: 'fighter', title: 'Fighter', description: 'Master of martial combat', meta: 'Hit Die: d10', icon: <Sword className="h-5 w-5" /> },
      { id: 'wizard', title: 'Wizard', description: 'Scholarly magic user', meta: 'Hit Die: d6', icon: <BookOpen className="h-5 w-5" /> },
      { id: 'cleric', title: 'Cleric', description: 'Divine spellcaster', meta: 'Hit Die: d8', icon: <Heart className="h-5 w-5" /> },
    ];
    return (
      <div className="grid grid-cols-3 gap-3 max-w-2xl">
        {classes.map((c) => (
          <SelectionCard
            key={c.id}
            title={c.title}
            description={c.description}
            meta={c.meta}
            icon={c.icon}
            selected={selected === c.id}
            onClick={() => setSelected(c.id)}
          />
        ))}
      </div>
    );
  },
};
