/**
 * Shapes follow the shadcn registry schemas:
 * - https://ui.shadcn.com/schema/registry.json
 * - https://ui.shadcn.com/schema/registry-item.json
 */

export type RegistryFileType = 'registry:ui' | 'registry:lib' | 'registry:file';

export interface RegistryFile {
  path: string;
  content: string;
  type: RegistryFileType;
  target: string;
}

export interface RegistryItem {
  $schema: string;
  name: string;
  type: 'registry:ui' | 'registry:item';
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

/** Index entry: a registry item without inlined file contents. */
export interface RegistryIndexItem extends Omit<RegistryItem, 'files' | '$schema'> {
  files: Omit<RegistryFile, 'content'>[];
}

export interface RegistryIndex {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryIndexItem[];
}
