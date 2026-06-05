import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Label } from './Label';

afterEach(cleanup);

describe('Label', () => {
  it('should render a label linked to a field', () => {
    render(<Label htmlFor="name">Character name</Label>);

    const label = screen.getByText('Character name');

    expect(label.tagName).toBe('LABEL');
    expect(label.getAttribute('for')).toBe('name');
  });

  it('should render a required asterisk when required', () => {
    render(<Label required>Class</Label>);

    expect(screen.getByText('*')).toBeTruthy();
  });

  it('should not render an asterisk by default', () => {
    render(<Label>Class</Label>);

    expect(screen.queryByText('*')).toBeNull();
  });

  it('should apply the muted tone class', () => {
    render(<Label tone="muted">Section</Label>);

    expect(screen.getByText('Section').className).toContain('text-dark-300');
  });
});
