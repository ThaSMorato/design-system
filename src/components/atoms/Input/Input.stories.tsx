import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Search } from 'lucide-react';

// --- Input ---
const meta = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'error'] },
    inputSize: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  args: { placeholder: 'Enter text...', inputSize: 'md', variant: 'default' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabelAndError: Story = {
  args: { label: 'Email', error: 'Invalid email address', placeholder: 'you@example.com' },
};

export const WithIcons: Story = {
  args: {
    label: 'Search',
    leftIcon: <Search className="h-4 w-4" />,
    placeholder: 'Search...',
    helperText: 'Type to search',
  },
};

// --- Textarea ---
export const TextareaDefault: StoryObj = {
  render: () => (
    <Textarea label="Description" placeholder="Write something..." helperText="Max 500 characters" />
  ),
};

export const TextareaError: StoryObj = {
  render: () => (
    <Textarea label="Bio" placeholder="Tell us about yourself" error="Bio is required" />
  ),
};

// --- Select ---
export const SelectDefault: StoryObj = {
  render: () => (
    <Select label="Class" helperText="Choose your character class">
      <option value="">Select a class...</option>
      <option value="fighter">Fighter</option>
      <option value="wizard">Wizard</option>
      <option value="rogue">Rogue</option>
      <option value="cleric">Cleric</option>
    </Select>
  ),
};

export const SelectError: StoryObj = {
  render: () => (
    <Select label="Race" error="Race is required">
      <option value="">Select a race...</option>
    </Select>
  ),
};
