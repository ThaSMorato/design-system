import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Alert } from './Alert';

afterEach(cleanup);

function renderAlert(variant: 'info' | 'success' | 'warning' | 'error' = 'info') {
  const onDismiss = vi.fn();
  render(
    <Alert variant={variant}>
      <Alert.Icon />
      <Alert.Body>
        <Alert.Title>Heads up</Alert.Title>
        <Alert.Description>Something happened.</Alert.Description>
      </Alert.Body>
      <Alert.Dismiss onDismiss={onDismiss} />
    </Alert>
  );
  return { onDismiss };
}

describe('Alert (compound)', () => {
  describe('Success', () => {
    it('should render with alert semantics and the variant styling', () => {
      renderAlert('error');

      const alert = screen.getByRole('alert');

      expect(alert.className).toContain('bg-red-900/30');
    });

    it('should render title and description', () => {
      renderAlert();

      expect(screen.getByText('Heads up')).toBeTruthy();
      expect(screen.getByText('Something happened.')).toBeTruthy();
    });

    it('should render the variant icon automatically from context', () => {
      renderAlert('warning');

      expect(screen.getByRole('alert').querySelector('svg')).toBeTruthy();
    });

    it('should call onDismiss when the dismiss button is pressed', () => {
      const { onDismiss } = renderAlert();

      fireEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }));

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Composition', () => {
    it('should allow a custom icon to replace the variant icon', () => {
      render(
        <Alert variant="info">
          <Alert.Icon>
            <span data-testid="custom-icon" />
          </Alert.Icon>
          <Alert.Body>
            <Alert.Description>Custom.</Alert.Description>
          </Alert.Body>
        </Alert>
      );

      expect(screen.getByTestId('custom-icon')).toBeTruthy();
    });
  });
});
