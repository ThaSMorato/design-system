import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
  args: { variant: 'info' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-lg">
      <Alert.Icon />
      <Alert.Body>
        <Alert.Description>This is an alert message.</Alert.Description>
      </Alert.Body>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="info">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Info</Alert.Title>
          <Alert.Description>Something you should know.</Alert.Description>
        </Alert.Body>
      </Alert>
      <Alert variant="success">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Success</Alert.Title>
          <Alert.Description>Operation completed.</Alert.Description>
        </Alert.Body>
      </Alert>
      <Alert variant="warning">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>Proceed with caution.</Alert.Description>
        </Alert.Body>
      </Alert>
      <Alert variant="error">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>Something went wrong.</Alert.Description>
        </Alert.Body>
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <Alert variant="warning" className="max-w-lg">
      <Alert.Icon />
      <Alert.Body>
        <Alert.Title>Warning</Alert.Title>
        <Alert.Description>This alert can be dismissed.</Alert.Description>
      </Alert.Body>
      <Alert.Dismiss onDismiss={() => {}} />
    </Alert>
  ),
};
