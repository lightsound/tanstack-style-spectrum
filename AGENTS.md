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

- **Install UI via Vite+:** add `@react-spectrum/s2` with **`vp add @react-spectrum/s2`**. Integration helpers live in **`vite.react-spectrum.mjs`** (`reactSpectrumPlugins`, `reactSpectrumTanStackStartRouter`, `reactSpectrumManualChunk`, `reactSpectrumSsr`) and are wired from **`vite.config.ts`**. Keep the Parcel **macros** (from `reactSpectrumPlugins()`) **before** `tanstackStart()` and **`react()`** after Start’s plugin; keep **`@react-aria/optimize-locales-plugin`** with `enforce: "pre"`; keep **`build.target` / `cssMinify` / `rollupOptions.output.manualChunks`** for the `s2-styles` CSS chunk and **`ssr.noExternal: ["@react-spectrum/s2"]`** so SSR resolves S2’s CSS imports. Pass **`reactSpectrumTanStackStartRouter`** into `tanstackStart({ router: … })` so default route code splitting stays off and S2 **style macros** still expand on TanStack’s `?tsr-split=…` route IDs (larger initial bundles if macros live in routes). Do not drop these patterns without replacing them per [Adobe’s React Spectrum S2 docs](https://react-spectrum.adobe.com/react-spectrum/index.html) (Vite tab under _Getting started_).
- **Locales:** broaden or shrink bundled strings by editing the `locales` array passed to `optimizeLocales.vite()` in **`vite.react-spectrum.mjs`**.
- **Root `Provider`:** the app shell uses **`Provider`** from `@react-spectrum/s2` with **`elementType="html"`** in **`src/components/SpectrumDocumentProvider.tsx`**, plus a TanStack **`navigate` / `useHref`** bridge for client-side links. In that bridge, **`useHref`** turns a string or null **`href`** into **`{ to: href ?? "/" }`** before **`router.buildLocation`**, matching how **`navigate`** accepts a string **`pathOrTo`**. `__root.tsx` wraps the document with that provider. Refactors should preserve that wiring.
- **TypeScript `RouterConfig`:** link `href` / `routerOptions` typing for Spectrum + React Aria is augmented next to that bridge in **`src/components/SpectrumDocumentProvider.tsx`** (`declare module "@react-spectrum/s2"` → `RouterConfig`). Keep a single augmentation that matches `useNavigate` / `buildLocation` (TanStack `ToOptions` / `NavigateOptions`).
- **Imports in app code:** use **`import { … } from "vite-plus"`** / **`vite-plus/test`** as in Common Pitfalls. That rule applies to config/tooling imports, not to **`@react-spectrum/s2`** in components.

## Supplementary project tools

Not part of `vp check`. Use `vp run` so installs stay routed through Vite+.

- **Knip** (`vp run knip`) — unused files, dependencies, and exports. Use when trimming deps or refactoring entry points (`knip.config.ts` configures the project).
- **react-doctor** (`vp run doctor`) — React-focused health checks. The script uses `--no-lint`; keep ordinary linting on `vp lint`.

## Learned User Preferences

- Prefer **`@react-spectrum/s2`** built-in components (e.g. **`Link`**, **`Heading`**, **`Text`**, **`Content`**, **`Header`**, **`Footer`**) instead of ad-hoc HTML or **`@tanstack/react-router` `Link`** where they fit the design system.
- Prefer the Spectrum **`style` macro** for styling; avoid growing **`src/styles.css`** for layout and polish.
- **App shell / sidebar:** aim for a typical SaaS-style, full-viewport-height side navigation with consistent padding; verify in the browser when changing navigation or layout.
- Keep **`__root.tsx`** lean by moving shell UI behind **TanStack Router layout routes** (e.g. pathless **`_main`**); keep document-level Spectrum + router bridging in **`SpectrumDocumentProvider`**.

## Learned Workspace Facts

- **Parcel macros + TanStack routes:** `reactSpectrumPlugins()` wraps **`unplugin-parcel-macros`** so **`transformInclude`** tests the path after stripping **`?…`** / **`#…`** from the module id; otherwise **`?tsr-split=…`** IDs skip the macro transform.
- **S2 `style` macro:** macro arguments must be **statically evaluable** at build time—do not feed **runtime state** (e.g. `useState`) into **`style({ … })`** values; use separate static macro classes and choose between them, or patterns like Spectrum **`styles`** / **`UNSAFE_className`** for dynamic composition.
