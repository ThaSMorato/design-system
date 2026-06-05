import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';
import { Shield, Plus } from 'lucide-react';

const meta = {
  title: 'Molecules/SectionHeader',
  component: SectionHeader,
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md' },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SectionHeader {...args}>
      <SectionHeader.Content>
        <div>
          <SectionHeader.Title>Section Title</SectionHeader.Title>
        </div>
      </SectionHeader.Content>
    </SectionHeader>
  ),
};

export const WithDescriptionAndAction: Story = {
  render: (args) => (
    <SectionHeader {...args}>
      <SectionHeader.Content>
        <SectionHeader.Icon>
          <Shield className="h-5 w-5" />
        </SectionHeader.Icon>
        <div>
          <SectionHeader.Title>Characters</SectionHeader.Title>
          <SectionHeader.Description>
            Manage your RPG characters
          </SectionHeader.Description>
        </div>
      </SectionHeader.Content>
      <SectionHeader.Action>
        <button className="flex items-center gap-1 text-sm text-primary-400">
          <Plus className="h-4 w-4" /> Add
        </button>
      </SectionHeader.Action>
    </SectionHeader>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <SectionHeader key={size} size={size}>
          <SectionHeader.Content>
            <div>
              <SectionHeader.Title>{`${size} section`}</SectionHeader.Title>
              <SectionHeader.Description>{`${size} description`}</SectionHeader.Description>
            </div>
          </SectionHeader.Content>
        </SectionHeader>
      ))}
    </div>
  ),
};
