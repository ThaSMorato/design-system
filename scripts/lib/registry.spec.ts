import { describe, expect, it } from 'vitest';
import {
  buildComponentItem,
  buildIndex,
  buildThemeItem,
  detectNpmDependencies,
  detectSiblingDependencies,
  rewriteImports,
  toKebabCase,
  toPackageName,
  type ComponentSource,
} from './registry';

function makeComponent(overrides: Partial<ComponentSource> = {}): ComponentSource {
  return {
    directory: 'Card',
    files: new Map([
      [
        'Card.tsx',
        "import { cn } from '../../utils/cn';\nexport const Card = () => null;\n",
      ],
    ]),
    ...overrides,
  };
}

describe('toKebabCase', () => {
  it('should convert PascalCase component names', () => {
    expect(toKebabCase('Card')).toBe('card');
    expect(toKebabCase('AttributeCard')).toBe('attribute-card');
    expect(toKebabCase('ConfirmDialog')).toBe('confirm-dialog');
  });
});

describe('rewriteImports', () => {
  it('should rewrite the internal cn import to @/lib/utils', () => {
    const content = "import { cn } from '../../utils/cn';";

    expect(rewriteImports(content)).toBe("import { cn } from '@/lib/utils';");
  });

  it('should rewrite cn imports regardless of relative depth and quote style', () => {
    const content = 'import { cn } from "../utils/cn";';

    expect(rewriteImports(content)).toBe("import { cn } from '@/lib/utils';");
  });

  it('should leave unrelated imports untouched', () => {
    const content = "import { Spinner } from '../Spinner';";

    expect(rewriteImports(content)).toBe(content);
  });
});

describe('toPackageName', () => {
  it('should resolve scoped packages with subpaths', () => {
    expect(toPackageName('@radix-ui/react-slot')).toBe('@radix-ui/react-slot');
    expect(toPackageName('lucide-react/icons')).toBe('lucide-react');
  });
});

describe('detectNpmDependencies', () => {
  it('should detect external packages from imports', () => {
    const content = [
      "import { cva } from 'class-variance-authority';",
      "import { ChevronDown } from 'lucide-react';",
    ].join('\n');

    expect(detectNpmDependencies(content)).toEqual([
      'class-variance-authority',
      'lucide-react',
    ]);
  });

  it('should ignore react, react-native, relative and alias imports', () => {
    const content = [
      "import { forwardRef } from 'react';",
      "import { View } from 'react-native';",
      "import { cn } from '@/lib/utils';",
      "import { cardVariants } from './Card.classes';",
    ].join('\n');

    expect(detectNpmDependencies(content)).toEqual([]);
  });
});

describe('detectSiblingDependencies', () => {
  it('should detect sibling component imports as kebab-case names', () => {
    const content = "import { Spinner } from '../Spinner';";

    expect(detectSiblingDependencies(content)).toEqual(['spinner']);
  });

  it('should not treat the utils import as a sibling component', () => {
    const content = "import { cn } from '../../utils/cn';";

    expect(detectSiblingDependencies(content)).toEqual([]);
  });
});

describe('buildComponentItem', () => {
  it('should build a registry:ui item with rewritten file content', () => {
    const component = makeComponent();

    const item = buildComponentItem(component);

    expect(item.name).toBe('card');
    expect(item.type).toBe('registry:ui');
    expect(item.files).toHaveLength(1);
    expect(item.files[0].path).toBe('src/components/Card/Card.tsx');
    expect(item.files[0].target).toBe('components/ui/Card/Card.tsx');
    expect(item.files[0].content).toContain("from '@/lib/utils'");
    expect(item.files[0].content).not.toContain('utils/cn');
  });

  it('should add utils as a registry dependency when cn is used', () => {
    const component = makeComponent();

    const item = buildComponentItem(component);

    expect(item.registryDependencies).toContain('utils');
  });

  it('should not add utils when cn is not used', () => {
    const component = makeComponent({
      files: new Map([['Plain.tsx', 'export const Plain = () => null;\n']]),
      directory: 'Plain',
    });

    const item = buildComponentItem(component);

    expect(item.registryDependencies).toEqual([]);
  });

  it('should record sibling components as relative registry dependencies', () => {
    const component = makeComponent({
      directory: 'Button',
      files: new Map([
        [
          'Button.tsx',
          "import { cn } from '../../utils/cn';\nimport { Spinner } from '../Spinner';\n",
        ],
      ]),
    });

    const item = buildComponentItem(component);

    expect(item.registryDependencies).toEqual(['utils', '/r/spinner.json']);
  });

  it('should collect npm dependencies across all files without duplicates', () => {
    const component = makeComponent({
      files: new Map([
        ['Card.tsx', "import { type VariantProps } from 'class-variance-authority';\n"],
        ['Card.classes.ts', "import { cva } from 'class-variance-authority';\n"],
      ]),
    });

    const item = buildComponentItem(component);

    expect(item.dependencies).toEqual(['class-variance-authority']);
  });
});

describe('buildThemeItem', () => {
  it('should expose the theme css as a registry:file with an explicit target', () => {
    const item = buildThemeItem('@import "tailwindcss";');

    expect(item.name).toBe('theme');
    expect(item.files[0].type).toBe('registry:file');
    expect(item.files[0].target).toBe('styles/morato-theme.css');
    expect(item.files[0].content).toBe('@import "tailwindcss";');
  });
});

describe('buildIndex', () => {
  it('should list every item without inlined file contents', () => {
    const items = [buildComponentItem(makeComponent())];

    const index = buildIndex(items, 'https://ds.example.com');

    expect(index.homepage).toBe('https://ds.example.com');
    expect(index.items).toHaveLength(1);
    expect(index.items[0].name).toBe('card');
    expect(index.items[0].files[0]).not.toHaveProperty('content');
  });
});
