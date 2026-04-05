import { Content } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppSidebar } from "../components/AppSidebar";

export const Route = createFileRoute("/_main")({
  component: MainShellLayout,
});

function MainShellLayout() {
  return (
    <Content
      styles={style({
        alignItems: "stretch",
        display: "flex",
        flexGrow: 1,
        minHeight: 0,
        width: "full",
      })}
    >
      <AppSidebar />
      <Content
        styles={style({
          backgroundColor: "base",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: 0,
          minWidth: 0,
          overflow: "auto",
          padding: 32,
          paddingBottom: 40,
        })}
      >
        <Outlet />
      </Content>
    </Content>
  );
}
