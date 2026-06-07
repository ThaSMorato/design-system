import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(join(__dirname, 'theme.css'), 'utf-8');

/** Extracts `--name` declarations from a CSS block matched by `open`…closing brace. */
function declaredVars(block: string): Set<string> {
  const match = css.match(block === '@theme' ? /@theme\s*{([\s\S]*?)\n}/ : /\.light\s*{([\s\S]*?)\n}/);
  const body = match?.[1] ?? '';
  return new Set([...body.matchAll(/(--[\w-]+):/g)].map((m) => m[1]));
}

const themeVars = declaredVars('@theme');
const lightVars = declaredVars('.light');

const STATUSES = ['info', 'success', 'warning', 'error'];
const STATUS_PARTS = ['surface', 'border', 'text', 'solid', 'solid-strong'];

describe('theme.css light/dark integrity', () => {
  it('should override every flippable color token in .light', () => {
    const flippable = [...themeVars].filter((v) =>
      /^--color-(dark|primary|secondary|accent|info|success|warning|error)-/.test(v)
    );

    const missing = flippable.filter((v) => !lightVars.has(v));

    expect(flippable.length).toBeGreaterThan(50);
    expect(missing).toEqual([]);
  });

  it('should not declare light-only tokens that do not exist in the dark theme', () => {
    const unknown = [...lightVars].filter(
      (v) => v.startsWith('--color-') && !themeVars.has(v)
    );

    expect(unknown).toEqual([]);
  });

  it('should define the full status token matrix', () => {
    for (const status of STATUSES) {
      for (const part of STATUS_PARTS) {
        expect(themeVars.has(`--color-${status}-${part}`)).toBe(true);
        expect(lightVars.has(`--color-${status}-${part}`)).toBe(true);
      }
    }
  });

  it('should define the effect variables in both modes', () => {
    for (const v of ['--glow-text', '--glow-shadow', '--page-gradient-end']) {
      expect(css.includes(`${v}:`)).toBe(true);
      expect(lightVars.has(v)).toBe(true);
    }
  });

  it('should set color-scheme: light in light mode', () => {
    expect(css).toMatch(/\.light\s*{[\s\S]*color-scheme: light/);
  });
});

describe('status token adoption in components', () => {
  const read = (p: string) =>
    readFileSync(join(__dirname, '..', 'components', p), 'utf-8');

  it.each([
    'molecules/Alert/Alert.classes.ts',
    'atoms/Badge/Badge.classes.ts',
    'molecules/StatusIndicator/StatusIndicator.classes.ts',
    'molecules/ConditionBadge/ConditionBadge.classes.ts',
    'organisms/ConfirmDialog/ConfirmDialog.classes.ts',
  ])('%s should not use raw status palette classes', (file) => {
    const content = read(file);

    // role-dm/role-player badges are RPG-domain colors, intentionally static
    const withoutDomain = content
      .replace(/'role-dm': '[^']*'/, '')
      .replace(/'role-player': '[^']*'/, '');

    expect(withoutDomain).not.toMatch(
      /\b(bg|text|border|ring)-(blue|emerald|amber|red)-\d/
    );
  });

  it('Banner info variant should use the info tokens', () => {
    const content = read('organisms/Banner/Banner.classes.ts');

    expect(content).toContain('bg-info-surface');
    expect(content).not.toMatch(/blue-900/);
  });
});
