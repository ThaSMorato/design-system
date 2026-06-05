import { describe, expect, it } from 'vitest';
import type {
  RegistryIndex,
  RegistryItem,
} from '../../scripts/lib/registry-types';
import {
  handleRegistryRequest,
  resolveBaseUrl,
  type RegistryData,
} from './handler';

function makeItem(overrides: Partial<RegistryItem> = {}): RegistryItem {
  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: 'card',
    type: 'registry:ui',
    title: 'Card',
    description: 'Card component.',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'src/components/Card/Card.tsx',
        content: 'export const Card = () => null;',
        type: 'registry:ui',
        target: 'components/ui/Card/Card.tsx',
      },
    ],
    ...overrides,
  };
}

function makeRegistry(items: RegistryItem[] = [makeItem()]): RegistryData {
  const index: RegistryIndex = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'morato',
    homepage: 'https://ds.example.com',
    items: [],
  };
  return {
    index,
    items: Object.fromEntries(items.map((item) => [item.name, item])),
  };
}

const BASE_URL = 'https://ds.example.com';

describe('handleRegistryRequest', () => {
  describe('Success', () => {
    it('should return the registry item for a known component', () => {
      const registry = makeRegistry();

      const response = handleRegistryRequest('card', BASE_URL, registry);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ name: 'card' });
    });

    it('should strip a .json suffix from the requested name', () => {
      const registry = makeRegistry();

      const response = handleRegistryRequest('card.json', BASE_URL, registry);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ name: 'card' });
    });

    it('should return the index for index.json', () => {
      const registry = makeRegistry();

      const response = handleRegistryRequest('index.json', BASE_URL, registry);

      expect(response.status).toBe(200);
      expect(response.body).toBe(registry.index);
    });

    it('should absolutize relative registry dependencies against the base url', () => {
      const registry = makeRegistry([
        makeItem({
          name: 'button',
          registryDependencies: ['utils', '/r/spinner.json'],
        }),
      ]);

      const response = handleRegistryRequest('button', BASE_URL, registry);

      expect(response.status).toBe(200);
      expect((response.body as RegistryItem).registryDependencies).toEqual([
        'utils',
        'https://ds.example.com/r/spinner.json',
      ]);
    });
  });

  describe('Failure', () => {
    it('should return 404 for an unknown component', () => {
      const registry = makeRegistry();

      const response = handleRegistryRequest('nope', BASE_URL, registry);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Component "nope" not found in the registry.',
      });
    });

    it('should return 400 when the name is missing', () => {
      const registry = makeRegistry();

      const response = handleRegistryRequest(undefined, BASE_URL, registry);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Component name is required.' });
    });
  });
});

describe('resolveBaseUrl', () => {
  it('should build the origin from forwarded headers', () => {
    const baseUrl = resolveBaseUrl({
      'x-forwarded-proto': 'https',
      'x-forwarded-host': 'morato-ds.vercel.app',
    });

    expect(baseUrl).toBe('https://morato-ds.vercel.app');
  });

  it('should fall back to the host header with https', () => {
    const baseUrl = resolveBaseUrl({ host: 'localhost:3000' });

    expect(baseUrl).toBe('https://localhost:3000');
  });
});
