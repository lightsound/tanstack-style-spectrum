import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [isBlue, setIsBlue] = useState(false);
  return (
    <main className="main-home">
      <div className="home-stack">
        <h1 className={isBlue ? "title-hero is-blue" : "title-hero"}>Hello World!</h1>
        <button type="button" onClick={() => setIsBlue((prev) => !prev)}>
          Toggle
        </button>
      </div>
    </main>
  );
}
