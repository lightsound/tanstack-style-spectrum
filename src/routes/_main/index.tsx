import { Button, Content, Heading, Text } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_main/")({
  component: HomePage,
});

/** Typography on `h1`; text color on inner `span` so `color` is not merged away with `font`. */
const heroTitleShellClass = style({
  font: "heading-3xl",
  fontWeight: "bold",
  margin: 0,
});

const heroTitleTextNegativeClass = style({
  color: "negative",
});

const heroTitleTextAccentClass = style({
  color: "accent",
});

function HomePage() {
  const [isBlue, setIsBlue] = useState(false);

  return (
    <main
      className={style({
        display: "grid",
        flexGrow: 1,
        minHeight: 0,
        placeItems: "center",
        paddingBlock: 24,
      })}
    >
      <Content
        styles={style({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          maxWidth: 480,
          paddingInline: 16,
          textAlign: "center",
        })}
      >
        <Heading level={1} styles={heroTitleShellClass}>
          <Text styles={isBlue ? heroTitleTextAccentClass : heroTitleTextNegativeClass}>
            Hello World!
          </Text>
        </Heading>
        <Button onPress={() => setIsBlue((prev) => !prev)} variant="accent">
          Toggle
        </Button>
      </Content>
    </main>
  );
}
