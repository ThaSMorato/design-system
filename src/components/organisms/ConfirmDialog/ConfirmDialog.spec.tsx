import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConfirmDialog } from './ConfirmDialog';

afterEach(cleanup);

function makeProps(overrides: Partial<Parameters<typeof ConfirmDialog>[0]> = {}) {
  return {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: 'Delete character?',
    message: 'This cannot be undone.',
    ...overrides,
  };
}

describe('ConfirmDialog (built on Modal)', () => {
  describe('Success', () => {
    it('should render the dialog with title and message when open', () => {
      render(<ConfirmDialog {...makeProps()} />);

      expect(screen.getByRole('dialog')).toBeTruthy();
      expect(screen.getByText('Delete character?')).toBeTruthy();
      expect(screen.getByText('This cannot be undone.')).toBeTruthy();
    });

    it('should call onConfirm when the confirm button is pressed', () => {
      const props = makeProps();
      render(<ConfirmDialog {...props} />);

      fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

      expect(props.onConfirm).toHaveBeenCalledTimes(1);
    });

    it('should call onClose from both the cancel and close buttons', () => {
      const props = makeProps();
      render(<ConfirmDialog {...props} />);

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      fireEvent.click(screen.getByRole('button', { name: 'Close' }));

      expect(props.onClose).toHaveBeenCalledTimes(2);
    });

    it('should close on Escape via the underlying Modal', () => {
      const props = makeProps();
      render(<ConfirmDialog {...props} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Failure / edge states', () => {
    it('should render nothing when closed', () => {
      render(<ConfirmDialog {...makeProps({ isOpen: false })} />);

      expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('should disable actions and show progress while loading', () => {
      render(<ConfirmDialog {...makeProps({ isLoading: true })} />);

      const processing = screen.getByRole('button', { name: 'Processing...' });

      expect((processing as HTMLButtonElement).disabled).toBe(true);
      expect(
        (screen.getByRole('button', { name: 'Cancel' }) as HTMLButtonElement).disabled
      ).toBe(true);
    });
  });
});
