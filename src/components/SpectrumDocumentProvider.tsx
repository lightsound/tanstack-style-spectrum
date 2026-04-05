import { Provider } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { NavigateOptions, RegisteredRouter, ToOptions } from "@tanstack/react-router";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useCallback, type ReactNode } from "react";

declare module "@react-spectrum/s2" {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Pick<NavigateOptions, Exclude<keyof NavigateOptions, keyof ToOptions>>;
  }
}

const documentHtmlClass = style({
  boxSizing: "border-box",
  height: "full",
});

export function SpectrumDocumentProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const router = useRouter();

  const spectrumNavigate = useCallback(
    (
      pathOrTo: string | ToOptions<RegisteredRouter>,
      routerOptions: NavigateOptions<RegisteredRouter> | undefined,
    ) => {
      // React Aria は第1引数に Link の href オブジェクトを渡す（文字列のみ想定しない）。
      if (typeof pathOrTo === "string") {
        void navigate({
          to: pathOrTo,
          ...routerOptions,
        } as NavigateOptions<RegisteredRouter>);
      } else {
        void navigate({
          ...pathOrTo,
          ...routerOptions,
        } as NavigateOptions<RegisteredRouter>);
      }
    },
    [navigate],
  );

  const spectrumUseHref = useCallback(
    (href: ToOptions<RegisteredRouter> | string) => {
      const toOptions = typeof href === "string" || href == null ? { to: href ?? "/" } : href;
      return router.buildLocation(toOptions as NavigateOptions<RegisteredRouter>).href;
    },
    [router],
  );

  return (
    <Provider
      background="base"
      elementType="html"
      locale="ja-JP"
      router={{ navigate: spectrumNavigate, useHref: spectrumUseHref }}
      styles={documentHtmlClass}
    >
      {children}
    </Provider>
  );
}
