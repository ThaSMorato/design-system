import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FieldMessage } from './FieldMessage';

afterEach(cleanup);

describe('FieldMessage', () => {
  it('should render an error-toned message', () => {
    render(<FieldMessage tone="error">Required field</FieldMessage>);

    expect(screen.getByText('Required field').className).toContain('text-accent-crimson');
  });

  it('should render a helper-toned message', () => {
    render(<FieldMessage tone="helper">Optional hint</FieldMessage>);

    expect(screen.getByText('Optional hint').className).toContain('text-dark-400');
  });

  it('should render nothing without children', () => {
    const { container } = render(<FieldMessage tone="error" />);

    expect(container.firstChild).toBeNull();
  });
});
