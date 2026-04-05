import { Avatar, Badge, Content, Divider, Footer, Header, Link, Text } from "@react-spectrum/s2";
import Briefcase from "@react-spectrum/s2/icons/Briefcase";
import HelpCircle from "@react-spectrum/s2/icons/HelpCircle";
import Home from "@react-spectrum/s2/icons/Home";
import UserGroup from "@react-spectrum/s2/icons/UserGroup";
import { focusRing, style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useRouterState } from "@tanstack/react-router";
import { useState, type ComponentProps, type ReactNode } from "react";

const shellClass = style({
  width: 276,
  flexShrink: 0,
  alignSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  borderEndWidth: 1,
  borderColor: "gray-300",
  backgroundColor: "layer-2",
});

const headerClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 20,
  paddingBottom: 16,
  backgroundColor: "layer-1",
});

const productRowClass = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 0,
});

const logoMarkClass = style({
  width: 32,
  height: 32,
  borderRadius: "sm",
  backgroundColor: "blue-800",
  flexShrink: 0,
});

const navScrollClass = style({
  flexGrow: 1,
  minHeight: 0,
  overflowY: "auto",
  paddingBottom: 16,
  paddingInline: 16,
  paddingTop: 12,
});

const sectionLabelClass = style({
  color: "gray-900",
  font: "heading-xs",
  marginBottom: 8,
  marginTop: 20,
  paddingInline: 8,
});

const sectionLabelFirstClass = style({
  color: "gray-900",
  font: "heading-xs",
  marginBottom: 8,
  marginTop: 4,
  paddingInline: 8,
});

const navListClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  listStyle: "none",
  margin: 0,
  padding: 0,
});

const sidenavLinkClass = style({
  ...focusRing(),
  alignItems: "center",
  borderRadius: "sm",
  boxSizing: "border-box",
  color: "gray-900",
  display: "flex",
  gap: 8,
  minWidth: 0,
  padding: 8,
  textDecoration: "none",
  width: "full",
  backgroundColor: {
    default: "transparent",
    isHovered: "gray-100",
    isActive: "gray-100",
  },
  borderColor: {
    default: "gray-300",
    isActive: "blue-800",
  },
  borderStartWidth: {
    default: 0,
    isActive: 4,
  },
  paddingInlineEnd: 12,
  paddingInlineStart: {
    default: 12,
    isActive: 8,
  },
});

const iconSlotClass = style({
  display: "flex",
  flexShrink: 0,
  color: "gray-800",
});

const footerClass = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 16,
  marginTop: "auto",
  borderTopWidth: 1,
  borderColor: "gray-300",
  backgroundColor: "layer-1",
});

const userTextColClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 0,
  flexGrow: 1,
});

const metaRowClass = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  minWidth: 0,
});

const titlesColClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 0,
  flexGrow: 1,
});

const placeholderRowClass = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "full",
  minWidth: 0,
  padding: 8,
  paddingInline: 12,
  borderRadius: "sm",
  color: "gray-800",
  boxSizing: "border-box",
  opacity: 0.55,
  cursor: "default",
});

const placeholderListClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

const productTitleClass = style({ font: "title-sm" });

const productTaglineClass = style({
  font: "detail",
  color: "gray-800",
});

const navLabelClass = style({ font: "body-sm" });

const userNameClass = style({
  font: "body-sm",
  fontWeight: "bold",
});

const userEmailClass = style({
  font: "detail",
  color: "gray-800",
});

type NavItem = {
  to: "/" | "/about";
  label: string;
  icon: typeof Home;
};

const workspaceItems: readonly NavItem[] = [
  { to: "/", label: "ダッシュボード", icon: Home },
  { to: "/about", label: "ドキュメントとヘルプ", icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside aria-label="メインナビゲーション" className={shellClass}>
      <Header styles={headerClass}>
        <Content styles={productRowClass}>
          <div aria-hidden className={logoMarkClass} />
          <Content styles={titlesColClass}>
            <Content styles={metaRowClass}>
              <Text styles={productTitleClass}>Acme Console</Text>
              <Badge fillStyle="outline" variant="accent">
                Sandbox
              </Badge>
            </Content>
            <Text styles={productTaglineClass}>本番相当のナビ体験（デモ）</Text>
          </Content>
        </Content>
      </Header>

      <Divider size="S" />

      <Content styles={navScrollClass}>
        <Text styles={sectionLabelFirstClass}>ワークスペース</Text>
        <NavList activePath={pathname} ariaLabel="ワークスペース" items={workspaceItems} />

        <Text styles={sectionLabelClass}>管理</Text>
        <ul className={placeholderListClass}>
          <li>
            <Content styles={placeholderRowClass}>
              <Content styles={iconSlotClass}>
                <UserGroup />
              </Content>
              <Text styles={navLabelClass}>メンバーと権限</Text>
              <Badge fillStyle="outline" variant="neutral">
                準備中
              </Badge>
            </Content>
          </li>
          <li>
            <Content styles={placeholderRowClass}>
              <Content styles={iconSlotClass}>
                <Briefcase />
              </Content>
              <Text styles={navLabelClass}>請求とプラン</Text>
              <Badge fillStyle="outline" variant="neutral">
                準備中
              </Badge>
            </Content>
          </li>
        </ul>
      </Content>

      <Footer styles={footerClass}>
        <Avatar alt="デモユーザー" size={32} />
        <Content styles={userTextColClass}>
          <Text styles={userNameClass}>山田 太郎</Text>
          <Text styles={userEmailClass}>demo.user@example.com</Text>
        </Content>
      </Footer>
    </aside>
  );
}

function SidenavLink({
  children,
  isActive,
  to,
}: {
  children: ReactNode;
  isActive: boolean;
  to: "/" | "/about";
}) {
  const [hover, setHover] = useState(false);
  return (
    <li onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Link
        aria-current={isActive ? "page" : undefined}
        href={{ to }}
        UNSAFE_className={
          sidenavLinkClass({
            isActive,
            isHovered: hover && !isActive,
          }) as unknown as NonNullable<ComponentProps<typeof Link>["UNSAFE_className"]>
        }
      >
        {children}
      </Link>
    </li>
  );
}

function NavList({
  activePath,
  ariaLabel,
  items,
}: {
  activePath: string;
  ariaLabel: string;
  items: readonly NavItem[];
}) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className={navListClass}>
        {items.map((item) => (
          <SidenavLink
            key={`${item.to}-${item.label}`}
            isActive={activePath === item.to}
            to={item.to}
          >
            <Content styles={iconSlotClass}>
              <item.icon />
            </Content>
            <Text styles={navLabelClass}>{item.label}</Text>
          </SidenavLink>
        ))}
      </ul>
    </nav>
  );
}
