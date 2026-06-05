import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'node',
          environment: 'node',
          include: ['scripts/**/*.spec.ts', 'api/**/*.spec.ts'],
        },
      },
      {
        test: {
          name: 'components',
          environment: 'jsdom',
          include: ['src/**/*.spec.{ts,tsx}'],
        },
      },
    ],
  },
});
