/// <reference types="vite-plus/client" />
import { Content, Heading, ProgressCircle, Text } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { SpectrumDocumentProvider } from "../components/SpectrumDocumentProvider";

const bodyLayoutClass = style({
  display: "flex",
  flexDirection: "column",
  height: "full",
  margin: 0,
  minHeight: "screen",
});

const appLayoutRootClass = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: 0,
  minWidth: 0,
  width: "full",
});

const fallbackPanelClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 16,
});

const fallbackHeadingClass = style({
  font: "heading-lg",
  fontWeight: "bold",
  margin: 0,
});

const fallbackBodyClass = style({
  font: "body",
  margin: 0,
});

const fallbackErrorHeadingClass = style({
  color: "negative",
  font: "heading-lg",
  fontWeight: "bold",
  margin: 0,
});

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent,
  head: () => ({
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
  return (
    <SpectrumDocumentProvider>
      <head>
        <HeadContent />
      </head>
      <body className={bodyLayoutClass}>
        <Content styles={appLayoutRootClass}>
          <Outlet />
        </Content>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </SpectrumDocumentProvider>
  );
}

function NotFoundComponent() {
  return (
    <Content styles={fallbackPanelClass}>
      <Heading level={1} styles={fallbackHeadingClass}>
        404
      </Heading>
      <Text styles={fallbackBodyClass}>ページが見つかりませんでした。</Text>
    </Content>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <Content styles={fallbackPanelClass}>
      <Heading level={1} styles={fallbackErrorHeadingClass}>
        エラー
      </Heading>
      <Text styles={fallbackBodyClass}>{error.message}</Text>
    </Content>
  );
}

function PendingComponent() {
  return (
    <Content styles={fallbackPanelClass}>
      <ProgressCircle isIndeterminate />
      <Text styles={fallbackBodyClass}>読み込み中...</Text>
    </Content>
  );
}
