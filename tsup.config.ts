import { defineConfig } from 'tsup';

// The web build intentionally excludes `*.native.tsx` files and `src/native.ts`.
// Those entries belong to the React Native consumers, which run their own
// bundler (Metro / Expo) against the unbuilt sources via the `./native`
// subpath export. Building them with tsup/esbuild would force a hard
// dependency on `react-native` here and break the web pipeline.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = { js: '"use client";' };
  },
});
