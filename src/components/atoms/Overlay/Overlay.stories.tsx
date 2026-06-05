import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Overlay } from './Overlay';

const meta = {
  title: 'Atoms/Overlay',
  component: Overlay,
  argTypes: {
    tone: { control: 'radio', options: ['dim', 'blur', 'none'] },
  },
  args: { tone: 'dim' },
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

const OverlayDemo = ({ tone }: { tone: 'dim' | 'blur' | 'none' }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="rounded-lg bg-primary-600 px-4 py-2 text-white"
        onClick={() => setOpen(true)}
      >
        Show overlay
      </button>
      {open && (
        <Overlay tone={tone} center onClick={() => setOpen(false)}>
          <div className="rounded-lg bg-dark-800 border border-dark-700 p-6 text-dark-100">
            Click anywhere to close
          </div>
        </Overlay>
      )}
    </div>
  );
};

export const Dim: Story = {
  render: () => <OverlayDemo tone="dim" />,
};

export const Blur: Story = {
  render: () => <OverlayDemo tone="blur" />,
};
