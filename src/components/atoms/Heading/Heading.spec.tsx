import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Heading } from './Heading';

afterEach(cleanup);

describe('Heading', () => {
  it('should render an h2 with default typography', () => {
    render(<Heading>Session</Heading>);

    const heading = screen.getByText('Session');

    expect(heading.tagName).toBe('H2');
    expect(heading.className).toContain('text-xl');
    expect(heading.className).toContain('font-semibold');
    expect(heading.className).toContain('text-dark-100');
  });

  it('should respect the `as` heading level', () => {
    render(<Heading as="h1">Page</Heading>);

    expect(screen.getByText('Page').tagName).toBe('H1');
  });

  it('should apply the danger tone', () => {
    render(<Heading tone="danger">Danger Zone</Heading>);

    expect(screen.getByText('Danger Zone').className).toContain('text-accent-crimson');
  });

  it('should emit no size class for size="inherit"', () => {
    render(<Heading size="inherit">Inline</Heading>);

    const heading = screen.getByText('Inline');

    expect(heading.className).not.toMatch(/text-(lg|xl|2xl)/);
  });
});
