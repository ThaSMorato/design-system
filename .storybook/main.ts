import type { StorybookConfig } from '@storybook/react-vite';

// Same resolution order as scripts/build-registry.ts — the docs page shows
// the registry URL of the deployment it was built for.
const REGISTRY_URL =
  process.env.REGISTRY_HOMEPAGE ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: (prop) =>
        prop.parent
          ? !/node_modules\/(?!@morato)/.test(prop.parent.fileName)
          : true,
    },
  },
  async viteFinal(config) {
    const tailwindcss = (await import('@tailwindcss/vite')).default;
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    config.define = {
      ...config.define,
      'import.meta.env.VITE_REGISTRY_URL': JSON.stringify(REGISTRY_URL),
    };
    return config;
  },
};

export default config;
