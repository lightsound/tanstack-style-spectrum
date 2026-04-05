import { Heading, Text } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { createFileRoute } from "@tanstack/react-router";

const aboutMainClass = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginInline: "auto",
  maxWidth: 720,
  paddingBlock: 8,
  width: "full",
});

const aboutTitleClass = style({
  font: "heading-xl",
  margin: 0,
});

const aboutBodyClass = style({
  font: "body",
  margin: 0,
});

export const Route = createFileRoute("/_main/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className={aboutMainClass}>
      <Heading level={1} styles={aboutTitleClass}>
        このアプリについて
      </Heading>
      <Text styles={aboutBodyClass}>
        TanStack Start と React Spectrum S2
        を使ったサンプルです。左のサイドバーからページを切り替えられます。
      </Text>
    </main>
  );
}
