import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type {
  RegistryFile,
  RegistryIndex,
  RegistryIndexItem,
  RegistryItem,
} from './registry-types';

const REGISTRY_ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';
const REGISTRY_SCHEMA = 'https://ui.shadcn.com/schema/registry.json';

/**
 * Packages that consumers receive through other channels and must NOT be
 * listed as npm dependencies of a registry item:
 * - react / react-dom / react-native are peer deps of any consuming app
 * - clsx / tailwind-merge arrive via the `utils` registry dependency (cn)
 */
const EXCLUDED_NPM_DEPENDENCIES = new Set([
  'react',
  'react-dom',
  'react-native',
]);

/** Matches any relative import of the internal cn utility, e.g. `../../utils/cn`. */
const CN_IMPORT_PATTERN = /from\s+(['"])(?:\.\.\/)+utils\/cn\1/g;

/** Matches relative imports of sibling components, e.g. `from '../Spinner'`. */
const SIBLING_IMPORT_PATTERN = /from\s+['"]\.\.\/([A-Z][\w-]*)['"]/g;

const IMPORT_SPECIFIER_PATTERN = /from\s+['"]([^'"]+)['"]/g;

export function toKebabCase(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Rewrites internal imports so the delivered files compile in a standard
 * shadcn-style project: the private `utils/cn` module becomes the canonical
 * `@/lib/utils` (provided by the `utils` registry dependency).
 */
export function rewriteImports(content: string): string {
  return content.replace(CN_IMPORT_PATTERN, "from '@/lib/utils'");
}

/** Resolves an import specifier to its npm package name (handles scopes/subpaths). */
export function toPackageName(specifier: string): string {
  const segments = specifier.split('/');
  return specifier.startsWith('@')
    ? segments.slice(0, 2).join('/')
    : segments[0];
}

/**
 * Detects external npm packages imported by the given source content.
 * Relative imports, alias imports (`@/...`) and excluded packages are ignored.
 */
export function detectNpmDependencies(content: string): string[] {
  const dependencies = new Set<string>();
  for (const match of content.matchAll(IMPORT_SPECIFIER_PATTERN)) {
    const specifier = match[1];
    if (specifier.startsWith('.') || specifier.startsWith('@/')) continue;
    const packageName = toPackageName(specifier);
    if (EXCLUDED_NPM_DEPENDENCIES.has(packageName)) continue;
    dependencies.add(packageName);
  }
  return [...dependencies].sort();
}

/**
 * Detects imports of sibling components (e.g. Button imports `../Spinner`)
 * and returns their registry item names in kebab-case.
 */
export function detectSiblingDependencies(content: string): string[] {
  const siblings = new Set<string>();
  for (const match of content.matchAll(SIBLING_IMPORT_PATTERN)) {
    siblings.add(toKebabCase(match[1]));
  }
  return [...siblings].sort();
}

export interface ComponentSource {
  /** Directory name, e.g. `Card`. */
  directory: string;
  /** File name → raw content for every non-story source file. */
  files: Map<string, string>;
}

/**
 * Reads every component folder under `componentsDir`, skipping stories,
 * React Native variants (delivered via the npm `./native` export, not the
 * registry — they would force nativewind/react-native on web consumers)
 * and empty dirs.
 */
export function scanComponents(componentsDir: string): ComponentSource[] {
  const components: ComponentSource[] = [];
  for (const entry of readdirSync(componentsDir).sort()) {
    const directory = join(componentsDir, entry);
    if (!statSync(directory).isDirectory()) continue;
    const files = new Map<string, string>();
    for (const fileName of readdirSync(directory).sort()) {
      if (!/\.(ts|tsx)$/.test(fileName)) continue;
      if (/\.(stories|native)\.(ts|tsx)$/.test(fileName)) continue;
      files.set(fileName, readFileSync(join(directory, fileName), 'utf-8'));
    }
    if (files.size > 0) components.push({ directory: entry, files });
  }
  return components;
}

/** Builds a shadcn registry item from one component folder. */
export function buildComponentItem(component: ComponentSource): RegistryItem {
  const name = toKebabCase(component.directory);
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();
  let usesCn = false;
  const files: RegistryFile[] = [];

  for (const [fileName, rawContent] of component.files) {
    usesCn = usesCn || CN_IMPORT_PATTERN.test(rawContent);
    CN_IMPORT_PATTERN.lastIndex = 0;
    for (const dependency of detectNpmDependencies(rawContent)) {
      dependencies.add(dependency);
    }
    for (const sibling of detectSiblingDependencies(rawContent)) {
      registryDependencies.add(`/r/${sibling}.json`);
    }
    files.push({
      path: `src/components/${component.directory}/${fileName}`,
      content: rewriteImports(rawContent),
      type: 'registry:ui',
      target: `components/ui/${component.directory}/${fileName}`,
    });
  }

  return {
    $schema: REGISTRY_ITEM_SCHEMA,
    name,
    type: 'registry:ui',
    title: component.directory,
    description: `${component.directory} component from the Morato design system.`,
    dependencies: [...dependencies].sort(),
    registryDependencies: [
      ...(usesCn ? ['utils'] : []),
      ...[...registryDependencies].sort(),
    ],
    files,
  };
}

/** Builds the registry item exposing the Tailwind v4 theme stylesheet. */
export function buildThemeItem(themeCss: string): RegistryItem {
  return {
    $schema: REGISTRY_ITEM_SCHEMA,
    name: 'theme',
    type: 'registry:item',
    title: 'Theme',
    description:
      'Tailwind CSS v4 theme tokens (colors, fonts, utilities) for the Morato design system.',
    dependencies: ['tailwindcss'],
    registryDependencies: [],
    files: [
      {
        path: 'src/styles/theme.css',
        content: themeCss,
        type: 'registry:file',
        target: 'styles/morato-theme.css',
      },
    ],
  };
}

export function buildIndex(
  items: RegistryItem[],
  homepage: string
): RegistryIndex {
  const indexItems: RegistryIndexItem[] = items.map(
    ({ $schema: _schema, files, ...item }) => ({
      ...item,
      files: files.map(({ content: _content, ...file }) => file),
    })
  );
  return {
    $schema: REGISTRY_SCHEMA,
    name: 'morato',
    homepage,
    items: indexItems,
  };
}
