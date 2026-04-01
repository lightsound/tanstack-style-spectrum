# TanStack Start + React Spectrum

A minimal app template built with [TanStack Start](https://tanstack.com/start), [TanStack Router](https://tanstack.com/router), and [React Spectrum S2](https://react-spectrum.adobe.com/react-spectrum/index.html) (`@react-spectrum/s2`), using [Vite+](https://viteplus.dev/) for dev, build, format, lint, type-check, and tests.

## What you get

- **TanStack Start** with file-based routing under `src/routes/`
- **React 19**, **TypeScript**, and **React Compiler** (via `@vitejs/plugin-react` + Babel preset in `vite.config.ts`)
- **React Spectrum S2** at the document root: `Provider` with `elementType="html"` in `src/routes/__root.tsx`, default locale **`ja-JP`**, TanStack Router wired for client-side `Link` navigation
- **Vite plugins for S2:** `@react-aria/optimize-locales-plugin` (locales: `ja-JP`, `en-US`), `unplugin-parcel-macros` for style macros, CSS chunk `metadata.manualChunks` → `s2-styles`, `ssr.noExternal` for `@react-spectrum/s2`
- **Supplementary plain CSS** in `src/styles.css` (linked from the root route head)
- **Vite+** workflow: Oxlint, Oxfmt, tests via `vite-plus/test` (see [AGENTS.md](AGENTS.md))

## Requirements

Install [Vite+](https://viteplus.dev/guide/) so `vp` is on your `PATH`.

The repo pins **`pnpm@10.32.1`**. Use **`vp install`**, **`vp add`**, **`vp remove`**, and **`vp update`** for dependency changes—avoid calling `pnpm` / `npm` / `yarn` directly unless you have a deliberate exception.

## Getting started

```bash
git clone https://github.com/lightsound/tanstack-style-spectrum.git
cd tanstack-style-spectrum
vp install
vp dev
```

Open the URL printed in the terminal (Vite’s default is usually `http://localhost:5173`).

## UI and routing notes

- Import components from **`@react-spectrum/s2`**. Styling relies on Parcel-style **macros**; the Vite setup follows Adobe’s Vite guidance (macros plugin order, Lightning CSS minify, shared S2 CSS chunk).
- **`RouterConfig`** for typed `href` / `routerOptions` on Spectrum/RAC links is declared in **`src/routes/__root.tsx`** (module augmentation on `@react-spectrum/s2`). Keep it in sync if you change how navigation or `buildLocation` work.
- To support more **locales** in the bundle, edit the `locales` array passed to `optimizeLocales.vite()` in `vite.config.ts`.

## Everyday commands

| Command      | Purpose                                                          |
| ------------ | ---------------------------------------------------------------- |
| `vp dev`     | Start the dev server with HMR                                    |
| `vp build`   | Production build                                                 |
| `vp preview` | Preview the production build locally                             |
| `vp check`   | Format, lint, and type-check (fix with `--fix` where applicable) |
| `vp test`    | Run tests                                                        |
| `vp help`    | List built-in commands and options                               |

`package.json` scripts delegate to these same `vp` entry points.

Optional maintenance tools (not part of `vp check`):

- `vp run knip` — unused files, dependencies, exports (`knip.config.ts`)
- `vp run doctor` — React health checks (`react-doctor`, `--no-lint` in the script)

## License

[MIT](LICENSE.md).
