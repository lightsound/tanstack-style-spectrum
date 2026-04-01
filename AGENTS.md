# Using Vite+ (`vp`)

**Vite+** is one CLI for dev, build, tests, lint, format, and package management—it wraps Vite and related bundled tooling. `vp dev` and `vp build` invoke Vite. Explore with `vp help`, `vp <command> --help`, and `vp --version`.

**Common commands:** `vp install`, `vp dev`, `vp check`, `vp lint`, `vp test`, `vp build`, `vp run <script>`, `vp add` / `vp remove` / `vp update`.

**Workflow:** After pulling, run `vp install` when dependencies or lockfiles may have changed. Before calling work done, run `vp check` and `vp test`.

## Common Pitfalls

- **Using the package manager directly:** Do not use pnpm, npm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Running scripts:** Vite+ commands take precedence over `package.json` scripts. If there is a `test` script defined in `scripts` that conflicts with the built-in `vp test` command, run it using `vp run test`.
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.

## React Spectrum S2

- **Install UI via Vite+:** add `@react-spectrum/s2` with **`vp add @react-spectrum/s2`**. Supporting tooling is already in `vite.config.ts`: **`unplugin-parcel-macros`** (must stay **before** `tanstackStart()` / `react()`), **`@react-aria/optimize-locales-plugin`** with `enforce: "pre"`, **`build.target` / `cssMinify` / `rollupOptions.output.manualChunks`** for the `s2-styles` CSS bundle, and **`ssr.noExternal: ["@react-spectrum/s2"]`** so SSR resolves S2’s CSS imports. Do not drop these without replacing them per [Adobe’s React Spectrum S2 docs](https://react-spectrum.adobe.com/react-spectrum/index.html) (Vite tab under _Getting started_).
- **Locales:** broaden or shrink bundled strings by editing the `locales` list passed to `optimizeLocales.vite()` in `vite.config.ts`.
- **Root `Provider`:** the app shell uses **`Provider`** from `@react-spectrum/s2` with **`elementType="html"`** in `src/routes/__root.tsx`, plus a TanStack **`navigate` / `useHref`** bridge for client-side links. Refactors should preserve that wiring.
- **TypeScript `RouterConfig`:** link `href` / `routerOptions` typing for Spectrum + React Aria is augmented in **`src/routes/__root.tsx`** (`declare module "@react-spectrum/s2"` → `RouterConfig`). If you move it, keep a single augmentation that matches `useNavigate` / `buildLocation` (TanStack `ToOptions` / `NavigateOptions`).
- **Imports in app code:** use **`import { … } from "vite-plus"`** / **`vite-plus/test`** as in Common Pitfalls. That rule applies to config/tooling imports, not to **`@react-spectrum/s2`** in components.

## Supplementary project tools

Not part of `vp check`. Use `vp run` so installs stay routed through Vite+.

- **Knip** (`vp run knip`) — unused files, dependencies, and exports. Use when trimming deps or refactoring entry points (`knip.config.ts` configures the project).
- **react-doctor** (`vp run doctor`) — React-focused health checks. The script uses `--no-lint`; keep ordinary linting on `vp lint`.
