import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildComponentItem, scanComponents } from './registry';

const COMPONENTS_DIR = join(__dirname, '..', '..', 'src', 'components');

describe('registry build (integration with real sources)', () => {
  it('should scan every component folder and skip stories and native variants', () => {
    const components = scanComponents(COMPONENTS_DIR);

    expect(components.length).toBeGreaterThan(20);
    for (const component of components) {
      const fileNames = [...component.files.keys()];
      expect(fileNames.some((name) => name.includes('.stories.'))).toBe(false);
      expect(fileNames.some((name) => name.includes('.native.'))).toBe(false);
      expect(fileNames.length).toBeGreaterThan(0);
    }
  });

  it('should never depend on native-only packages', () => {
    const components = scanComponents(COMPONENTS_DIR);

    const items = components.map(buildComponentItem);

    for (const item of items) {
      expect(item.dependencies).not.toContain('nativewind');
      expect(item.dependencies).not.toContain('react-native');
    }
  });

  it('should link button to spinner through a registry dependency', () => {
    const components = scanComponents(COMPONENTS_DIR);
    const button = components.find((c) => c.directory === 'Button');

    const item = buildComponentItem(button!);

    expect(item.registryDependencies).toContain('/r/spinner.json');
  });

  it('should never leak internal utils imports into delivered files', () => {
    const components = scanComponents(COMPONENTS_DIR);

    const items = components.map(buildComponentItem);

    for (const item of items) {
      for (const file of item.files) {
        expect(file.content).not.toMatch(/['"](\.\.\/)+utils\//);
      }
    }
  });

  it('should link components using formatModifier to the format lib item', () => {
    const components = scanComponents(COMPONENTS_DIR);
    const statCard = components.find((c) => c.directory === 'StatCard');

    const item = buildComponentItem(statCard!);

    expect(item.registryDependencies).toContain('/r/format.json');
  });

  it('should link compound consumers to their atom dependencies', () => {
    const components = scanComponents(COMPONENTS_DIR);
    const alert = components.find((c) => c.directory === 'Alert');
    const confirm = components.find((c) => c.directory === 'ConfirmDialog');

    const alertItem = buildComponentItem(alert!);
    const confirmItem = buildComponentItem(confirm!);

    expect(alertItem.registryDependencies).toContain('/r/icon-button.json');
    expect(confirmItem.registryDependencies).toContain('/r/modal.json');
    expect(confirmItem.registryDependencies).toContain('/r/icon-box.json');
  });
});
