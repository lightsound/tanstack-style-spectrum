import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

import {
  reactSpectrumManualChunk,
  reactSpectrumPlugins,
  reactSpectrumSsr,
  reactSpectrumTanStackStartRouter,
} from "./vite.react-spectrum.mjs";

export default defineConfig({
  fmt: {
    ignorePatterns: ["**/routeTree.gen.ts", ".agents/**"],
    sortImports: {
      partitionByComment: true,
    },
    sortPackageJson: {
      sortScripts: true,
    },
  },
  lint: {
    categories: {
      correctness: "error",
    },
    env: {
      browser: true,
      node: true,
    },
    ignorePatterns: ["**/routeTree.gen.ts"],
    options: {
      denyWarnings: true,
      typeAware: true,
      typeCheck: true,
    },
    overrides: [
      {
        files: ["src/router.tsx", "*.config.ts"],
        rules: {
          "no-default-export": "off",
        },
      },
    ],
    plugins: ["react", "react-perf", "import", "jsx-a11y", "promise"],
    rules: {
      "no-default-export": "error",
    },
  },
  staged: {
    "*.{js,jsx,ts,tsx,json,css}": "vp check --fix",
  },
  plugins: [
    ...reactSpectrumPlugins(),
    tanstackStart({
      router: {
        ...reactSpectrumTanStackStartRouter,
      },
    }),
    // react's vite plugin must come after start's vite plugin
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  build: {
    target: ["es2022"],
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        manualChunks(id) {
          return reactSpectrumManualChunk(id);
        },
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    ...reactSpectrumSsr,
  },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
