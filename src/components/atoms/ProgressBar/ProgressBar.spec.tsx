import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ProgressBar } from './ProgressBar';

afterEach(cleanup);

describe('ProgressBar', () => {
  it('should expose progressbar semantics', () => {
    render(<ProgressBar percentage={65} />);

    const bar = screen.getByRole('progressbar');

    expect(bar.getAttribute('aria-valuenow')).toBe('65');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should size the fill from the percentage and color it from fillClassName', () => {
    render(<ProgressBar percentage={40} fillClassName="bg-accent-emerald" />);

    const fill = screen.getByRole('progressbar').querySelector('.bg-accent-emerald');

    expect(fill).toBeTruthy();
    expect((fill as HTMLElement).style.width).toBe('40%');
  });

  it('should render the temp fill after the main fill', () => {
    render(<ProgressBar percentage={50} tempPercentage={20} />);

    const temp = screen
      .getByRole('progressbar')
      .querySelector('.bg-blue-400\\/60') as HTMLElement;

    expect(temp).toBeTruthy();
    expect(temp.style.left).toBe('50%');
    expect(temp.style.width).toBe('20%');
  });

  it('should not render a temp fill when tempPercentage is 0', () => {
    render(<ProgressBar percentage={50} />);

    expect(screen.getByRole('progressbar').querySelector('.bg-blue-400\\/60')).toBeNull();
  });
});
