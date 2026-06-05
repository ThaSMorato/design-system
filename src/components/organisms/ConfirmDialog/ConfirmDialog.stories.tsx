import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog } from './ConfirmDialog';

const meta = {
  title: 'Organisms/ConfirmDialog',
  component: ConfirmDialog,
  argTypes: {
    variant: { control: 'select', options: ['danger', 'warning', 'info', 'success'] },
    isLoading: { control: 'boolean' },
  },
  args: {
    isOpen: true,
    title: 'Delete Character',
    message: 'Are you sure you want to delete this character? This action cannot be undone.',
    variant: 'danger',
    confirmLabel: 'Delete',
    onClose: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => {
    const [open, setOpen] = useState<string | null>(null);
    const variants = [
      { v: 'danger' as const, title: 'Delete', msg: 'Permanently delete this item?' },
      { v: 'warning' as const, title: 'Leave Session', msg: 'You will lose unsaved changes.' },
      { v: 'info' as const, title: 'Join Campaign', msg: 'You will join as a player.' },
      { v: 'success' as const, title: 'Finalize', msg: 'Lock in your character choices?' },
    ];
    return (
      <>
        <div className="flex gap-2">
          {variants.map(({ v }) => (
            <button
              key={v}
              onClick={() => setOpen(v)}
              className="px-3 py-1.5 bg-dark-700 text-dark-200 rounded text-sm"
            >
              {v}
            </button>
          ))}
        </div>
        {variants.map(({ v, title, msg }) => (
          <ConfirmDialog
            key={v}
            isOpen={open === v}
            onClose={() => setOpen(null)}
            onConfirm={() => setOpen(null)}
            variant={v}
            title={title}
            message={msg}
          />
        ))}
      </>
    );
  },
};
