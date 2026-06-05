import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FormGroup } from './FormGroup';

afterEach(cleanup);

describe('FormGroup', () => {
  it('should link the label to the field via htmlFor', () => {
    render(
      <FormGroup label="Name" htmlFor="name">
        <input id="name" />
      </FormGroup>
    );

    expect(screen.getByText('Name').getAttribute('for')).toBe('name');
  });

  it('should show the required asterisk', () => {
    render(
      <FormGroup label="Class" required>
        <input />
      </FormGroup>
    );

    expect(screen.getByText('*')).toBeTruthy();
  });

  it('should show the error and hide the helper when both are provided', () => {
    render(
      <FormGroup label="Email" error="Invalid email" helperText="We never share it">
        <input />
      </FormGroup>
    );

    expect(screen.getByText('Invalid email')).toBeTruthy();
    expect(screen.queryByText('We never share it')).toBeNull();
  });

  it('should show the helper when there is no error', () => {
    render(
      <FormGroup label="Email" helperText="We never share it">
        <input />
      </FormGroup>
    );

    expect(screen.getByText('We never share it')).toBeTruthy();
  });
});
