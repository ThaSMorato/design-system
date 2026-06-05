import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'Compound/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta & { args: Record<string, unknown> }>;

const ModalDemo = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary-500 text-white rounded"
      >
        Open Modal
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} size="md">
        <Modal.Header onClose={() => setOpen(false)}>Modal Title</Modal.Header>
        <Modal.Body>
          <p className="text-dark-300">Modal body content goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1.5 text-sm text-dark-300"
          >
            Cancel
          </button>
          <button className="px-3 py-1.5 text-sm bg-primary-500 text-white rounded">
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

const ModalSizes = () => {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);
  return (
    <>
      <div className="flex gap-2">
        {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className="px-3 py-1.5 bg-dark-700 text-dark-200 rounded text-sm"
          >
            {s}
          </button>
        ))}
      </div>
      {size && (
        <Modal isOpen onClose={() => setSize(null)} size={size}>
          <Modal.Header onClose={() => setSize(null)}>Size: {size}</Modal.Header>
          <Modal.Body>
            <p className="text-dark-300">This modal uses size=&quot;{size}&quot;.</p>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export const Sizes: Story = {
  render: () => <ModalSizes />,
};
