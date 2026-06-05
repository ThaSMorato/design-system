import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Compound/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'interactive', 'fantasy', 'flat', 'outline'],
    },
  },
  args: { variant: 'default' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
      </Card.Header>
      <Card.Content>
        <p className="text-dark-300">Card body content goes here.</p>
      </Card.Content>
      <Card.Footer>
        <button className="text-sm text-dark-400">Cancel</button>
        <button className="text-sm text-primary-400">Save</button>
      </Card.Footer>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      {(['default', 'elevated', 'interactive', 'fantasy', 'flat', 'outline'] as const).map(
        (variant) => (
          <Card key={variant} variant={variant}>
            <Card.Header>
              <Card.Title>{variant}</Card.Title>
            </Card.Header>
            <Card.Content>
              <Card.Description>This is the {variant} variant.</Card.Description>
            </Card.Content>
          </Card>
        )
      )}
    </div>
  ),
};
