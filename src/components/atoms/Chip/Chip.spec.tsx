import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Chip } from './Chip';

afterEach(cleanup);

describe('Chip', () => {
  it('should render unselected styling by default', () => {
    render(<Chip>Warriors</Chip>);

    expect(screen.getByRole('button').className).toContain('bg-dark-700');
  });

  it('should render selected styling when selected', () => {
    render(<Chip selected>Warriors</Chip>);

    expect(screen.getByRole('button').className).toContain('bg-primary-500');
  });

  it('should render the count styled by selection state', () => {
    render(
      <Chip selected count={12}>
        Warriors
      </Chip>
    );

    expect(screen.getByText('(12)').className).toContain('text-white/80');
  });

  it('should use the pill shape when requested', () => {
    render(<Chip shape="pill">Magic</Chip>);

    expect(screen.getByRole('button').className).toContain('rounded-full');
  });

  it('should not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <Chip disabled onClick={onClick}>
        Locked
      </Chip>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
