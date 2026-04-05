import optimizeLocales from "@react-aria/optimize-locales-plugin";
import macros from "unplugin-parcel-macros";

/**
 * TanStack Router が `src/routes/*.tsx?tsr-split=...` として解決するため、
 * unplugin-parcel-macros の既定の transformInclude（拡張子が id の末尾一致）だとマクロが外れ、
 * クライアントに Node 専用の style-macro 実装が入ってしまう。
 *
 * @param {import("vite").Plugin} plugin
 * @returns {import("vite").Plugin}
 */
function parcelMacrosPluginForRouteQueryString(plugin) {
  return {
    ...plugin,
    transformInclude(id) {
      const pathOnly = id.replace(/[?#].*$/, "");
      return /\.(js|jsx|ts|tsx)$/.test(pathOnly) && !id.includes("/node_modules/");
    },
  };
}

/**
 * @param {() => import("vite").PluginOption | import("vite").PluginOption[]} factory
 * @returns {import("vite").Plugin[]}
 */
function wrapParcelMacroPlugins(factory) {
  const raw = factory();
  const list = Array.isArray(raw) ? raw : [raw];
  return list
    .filter((p) => p != null && typeof p === "object")
    .map(parcelMacrosPluginForRouteQueryString);
}

/** Vite+ クライアント向け */
const macroVitePlugins = wrapParcelMacroPlugins(() => macros.vite());
/** dev / SSR が Rolldown 経由のとき用（vite フックだけだとマクロが抜ける） */
const macroRolldownPlugins = wrapParcelMacroPlugins(() => macros.rolldown());

/**
 * React Spectrum S2（style マクロ・ロケール最適化）用の Vite プラグイン。
 * tanstackStart / react の **前** に並べること。
 *
 * @returns {import("vite").Plugin[]}
 */
export function reactSpectrumPlugins() {
  return [
    {
      ...optimizeLocales.vite({
        locales: ["ja-JP", "en-US"],
      }),
      enforce: "pre",
    },
    ...macroVitePlugins,
    ...macroRolldownPlugins,
  ];
}

/**
 * 既定の [["component"], …] だと `?tsr-split=…` 仮想モジュールが生成され、
 * dev/SSR で style マクロが展開されない経路になる。マクロを route 内で使うなら分割を切る。
 * （初期バンドルはやや大きくなる）
 */
export const reactSpectrumTanStackStartRouter = {
  codeSplittingOptions: {
    defaultBehavior: [],
  },
};

/**
 * @param {string} id
 * @returns {string | undefined}
 */
export function reactSpectrumManualChunk(id) {
  if (/macro-(.*)\.css$/.test(id) || /@react-spectrum\/s2\/.*\.css$/.test(id)) {
    return "s2-styles";
  }
  return undefined;
}

/** S2 の各コンポーネントが .css を ESM import するため、SSR では外部化せず Vite で変換させる */
export const reactSpectrumSsr = {
  noExternal: ["@react-spectrum/s2"],
};
