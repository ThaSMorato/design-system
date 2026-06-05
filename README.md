# @morato/design-system

A TypeScript design system with a Storybook showcase and a shadcn-style component registry, deployable to Vercel as a single project.

## What gets deployed

| Piece | URL | How |
|---|---|---|
| Storybook (static) | `https://<project>.vercel.app/` | `storybook build` → `storybook-static/` (Vercel `outputDirectory`) |
| Registry route | `https://<project>.vercel.app/r/<name>.json` | Vercel serverless function (`api/r/[name].ts`) |
| Registry index | `https://<project>.vercel.app/r/index.json` | Same function |

## Consuming components (shadcn style)

```bash
npx shadcn@latest add https://<project>.vercel.app/r/button.json
```

This copies the component sources (`components/ui/Button/…`) into the consuming app, installs its npm dependencies, and follows registry dependencies (e.g. `button` pulls `spinner` and the shadcn `utils` item for `cn`).

The Tailwind v4 theme tokens ship as their own item:

```bash
npx shadcn@latest add https://<project>.vercel.app/r/theme.json
```

> React Native variants (`*.native.tsx`) are intentionally **not** part of the registry — they are delivered through this package's `./native` export for Metro/Expo consumers.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Storybook dev server on :6006 |
| `npm run build` | Builds the registry, then the static Storybook (what Vercel runs) |
| `npm run registry:build` | Generates `registry/json/*.json` + `registry/items.ts` from `src/components` |
| `npm run build:lib` | tsup build of the npm package (`dist/`) |
| `npm test` | Vitest unit + integration tests (registry builder, API handler) |
| `npm run typecheck` | Registry build + `tsc --noEmit` |

## How the registry works

1. **Build time** — `scripts/build-registry.ts` scans `src/components/*`, excludes stories/native files, rewrites `../../utils/cn` imports to the canonical `@/lib/utils`, detects npm and sibling-component dependencies, and emits shadcn registry-item JSON (validated by the schema at `https://ui.shadcn.com/schema/registry-item.json`).
2. **Request time** — `api/r/[name].ts` serves the pre-built items, turning relative registry dependencies (`/r/spinner.json`) into absolute URLs based on the requesting host. `/r/:name` is rewritten to the function via `vercel.json`.

## Deploying

```bash
vercel deploy   # or connect the repo in the Vercel dashboard
```

No framework preset needed — `vercel.json` defines the build command, output directory, and the `/r/*` rewrite.
