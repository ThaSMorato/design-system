import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';

const meta = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    align: { control: 'select', options: ['left', 'center', 'right', 'between'] },
    direction: { control: 'radio', options: ['row', 'column'] },
    withBorder: { control: 'boolean' },
    paddingTop: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
  args: {
    align: 'between',
    direction: 'row',
    children: (
      <>
        <button className="px-4 py-2 text-sm text-dark-400 bg-dark-700 rounded">Cancel</button>
        <button className="px-4 py-2 text-sm text-white bg-primary-500 rounded">Save</button>
      </>
    ),
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBorder: Story = {
  args: { align: 'right', withBorder: true },
};

export const ColumnDirection: Story = {
  args: { direction: 'column', align: 'center' },
};
