import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

afterEach(cleanup);

describe('IconButton', () => {
  describe('Success', () => {
    it('should render a type="button" with its accessible name', () => {
      render(
        <IconButton aria-label="Close">
          <X />
        </IconButton>
      );

      const button = screen.getByRole('button', { name: 'Close' });

      expect(button).toBeTruthy();
      expect(button.getAttribute('type')).toBe('button');
    });

    it('should apply the variant, shape and size classes', () => {
      render(
        <IconButton aria-label="Copy" variant="outline" shape="pill" size="md">
          <X />
        </IconButton>
      );

      const button = screen.getByRole('button', { name: 'Copy' });

      expect(button.className).toContain('border-dark-600');
      expect(button.className).toContain('rounded-full');
      expect(button.className).toContain('p-2');
    });

    it('should fire onClick when pressed', () => {
      const onClick = vi.fn();
      render(
        <IconButton aria-label="Dismiss" onClick={onClick}>
          <X />
        </IconButton>
      );

      fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Failure', () => {
    it('should not fire onClick when disabled', () => {
      const onClick = vi.fn();
      render(
        <IconButton aria-label="Dismiss" onClick={onClick} disabled>
          <X />
        </IconButton>
      );

      fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
