import type {
  RegistryIndex,
  RegistryItem,
} from '../../scripts/lib/registry-types';

export interface RegistryResponse {
  status: number;
  body: RegistryItem | RegistryIndex | { error: string };
}

export interface RegistryData {
  index: RegistryIndex;
  items: Record<string, RegistryItem>;
}

/**
 * Resolves a registry request shadcn-style: `GET /r/card.json` returns the
 * `card` registry item with relative registry dependencies (`/r/spinner.json`)
 * made absolute against the requesting host, so `npx shadcn add <url>` can
 * follow them.
 */
export function handleRegistryRequest(
  rawName: string | string[] | undefined,
  baseUrl: string,
  registry: RegistryData
): RegistryResponse {
  if (typeof rawName !== 'string' || rawName.length === 0) {
    return { status: 400, body: { error: 'Component name is required.' } };
  }

  const name = rawName.replace(/\.json$/, '');

  if (name === 'index') {
    return { status: 200, body: registry.index };
  }

  const item = registry.items[name];
  if (!item) {
    return {
      status: 404,
      body: { error: `Component "${name}" not found in the registry.` },
    };
  }

  return {
    status: 200,
    body: {
      ...item,
      registryDependencies: item.registryDependencies.map((dependency) =>
        dependency.startsWith('/') ? `${baseUrl}${dependency}` : dependency
      ),
    },
  };
}

/** Builds the request origin from proxy headers (Vercel sets x-forwarded-*). */
export function resolveBaseUrl(headers: {
  'x-forwarded-proto'?: string | string[];
  'x-forwarded-host'?: string | string[];
  host?: string | string[];
}): string {
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;
  const proto = first(headers['x-forwarded-proto']) ?? 'https';
  const host =
    first(headers['x-forwarded-host']) ?? first(headers.host) ?? 'localhost';
  return `${proto}://${host}`;
}
