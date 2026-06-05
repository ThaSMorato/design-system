import type { Meta, StoryObj } from '@storybook/react';
import { FieldMessage } from './FieldMessage';

const meta = {
  title: 'Atoms/FieldMessage',
  component: FieldMessage,
  argTypes: {
    tone: { control: 'radio', options: ['error', 'helper'] },
  },
  args: { children: 'This field is required.', tone: 'error' },
} satisfies Meta<typeof FieldMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {};

export const Helper: Story = {
  args: { tone: 'helper', children: 'Use the name on your character sheet.' },
};
