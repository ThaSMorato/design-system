import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';
import { Shield, Plus } from 'lucide-react';

const meta = {
  title: 'Core/SectionHeader',
  component: SectionHeader,
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4'] },
  },
  args: { title: 'Section Title', size: 'md' },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescriptionAndAction: Story = {
  args: {
    title: 'Characters',
    description: 'Manage your RPG characters',
    icon: <Shield className="h-5 w-5" />,
    action: (
      <button className="flex items-center gap-1 text-sm text-primary-400">
        <Plus className="h-4 w-4" /> Add
      </button>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SectionHeader size="sm" title="Small Section" description="Small description" />
      <SectionHeader size="md" title="Medium Section" description="Medium description" />
      <SectionHeader size="lg" title="Large Section" description="Large description" />
    </div>
  ),
};
