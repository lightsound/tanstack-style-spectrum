/// <reference types="vite-plus/client" />
import { Provider } from "@react-spectrum/s2";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import type { NavigateOptions, RegisteredRouter, ToOptions } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useCallback } from "react";

import appCss from "../styles.css?url";

declare module "@react-spectrum/s2" {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Pick<NavigateOptions, Exclude<keyof NavigateOptions, keyof ToOptions>>;
  }
}

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent,
  head: () => ({
    links: [{ href: appCss, rel: "stylesheet" }],
    meta: [
      { charSet: "utf8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: "TanStack Start Start" },
    ],
  }),
  notFoundComponent: NotFoundComponent,
  pendingComponent: PendingComponent,
});

function RootComponent() {
  const navigate = useNavigate();
  const router = useRouter();

  const spectrumNavigate = useCallback(
    (path: string, routerOptions: NavigateOptions<RegisteredRouter> | undefined) => {
      void navigate({
        to: path,
        ...routerOptions,
      } as NavigateOptions<RegisteredRouter>);
    },
    [navigate],
  );

  const spectrumUseHref = useCallback(
    (href: ToOptions<RegisteredRouter>) => router.buildLocation(href).href,
    [router],
  );

  return (
    <Provider
      background="base"
      elementType="html"
      locale="ja-JP"
      router={{ navigate: spectrumNavigate, useHref: spectrumUseHref }}
    >
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </Provider>
  );
}

function NotFoundComponent() {
  return (
    <div className="page-shell">
      <h1 className="heading-lg">404</h1>
      <p>ページが見つかりませんでした。</p>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="page-shell">
      <h1 className="heading-lg heading-error">エラー</h1>
      <p>{error.message}</p>
    </div>
  );
}

function PendingComponent() {
  return (
    <div className="page-shell">
      <p>読み込み中...</p>
    </div>
  );
}
