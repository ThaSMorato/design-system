import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup, FormError, FormHelperText } from './FormGroup';

const meta = {
  title: 'Molecules/FormGroup',
  component: FormGroup,
  argTypes: {
    required: { control: 'boolean' },
  },
  args: {
    label: 'Character Name',
    children: (
      <input
        className="w-full rounded-lg border border-dark-600 bg-dark-800 px-3 py-2 text-dark-100"
        placeholder="Enter name"
      />
    ),
  },
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: 'Name is required', required: true },
};

export const WithHelperText: Story = {
  args: { helperText: 'Must be between 2 and 50 characters' },
};

export const StandaloneComponents: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-sm">
      <FormHelperText>This is helper text.</FormHelperText>
      <FormError>This is an error message.</FormError>
    </div>
  ),
};
