import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberControl } from './NumberControl';

const meta = {
  title: 'Compound/NumberControl',
  component: NumberControl,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'hp', 'stat'] },
  },
  args: { variant: 'default' },
} satisfies Meta<typeof NumberControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <NumberControl {...args}>
      <NumberControl.Button intent="decrease" onClick={() => {}} />
      <NumberControl.Input defaultValue={10} />
      <NumberControl.Button intent="increase" onClick={() => {}} />
    </NumberControl>
  ),
};

export const HPControl: Story = {
  render: () => {
    const [hp, setHp] = useState(25);
    return (
      <div className="flex flex-col gap-3 max-w-xs">
        <NumberControl.Display value={hp} max={40} extra={5} extraLabel="temp" />
        <NumberControl variant="hp">
          <NumberControl.Button intent="decrease" onClick={() => setHp((v) => Math.max(0, v - 1))} />
          <NumberControl.Input
            value={hp}
            onChange={(e) => setHp(Number(e.target.value))}
            min={0}
            max={40}
          />
          <NumberControl.Button intent="increase" onClick={() => setHp((v) => Math.min(40, v + 1))} />
          <NumberControl.Action onClick={() => {}}>Apply</NumberControl.Action>
        </NumberControl>
      </div>
    );
  },
};
