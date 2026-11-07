import React from "react";
import { Composition, Still } from "remotion";
import { Reel, reelDuration } from "./components/Reel";
import { SlideCard } from "./components/SlideCard";
import { ReelProps, SlideProps, Theme } from "./types";

// Neutral preview values only. Real renders always pass the brand's theme.json (no brand in code).
const previewTheme: Theme = {
  colors: { primary: "#444444", primaryDark: "#111111", accent: "#888888", background: "#ffffff", text: "#222222" },
  fonts: { latin: "Plus Jakarta Sans", main: "Hind Siliguri" },
  logo: { position: "top-left", size: 72 },
  handle: "example.com",
};

const FPS = 30;

export const Root: React.FC = () => (
  <>
    <Still
      id="Slide"
      component={SlideCard as unknown as React.FC<Record<string, unknown>>}
      width={1080}
      height={1350}
      defaultProps={
        {
          theme: previewTheme,
          logo: null,
          mediaDir: "",
          slide: { headline: "শিরোনাম এখানে, IELTS Preview", body: "Body text" },
          index: 0,
          total: 1,
        } satisfies SlideProps
      }
    />
    <Composition
      id="Reel"
      component={Reel as unknown as React.FC<Record<string, unknown>>}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={FPS * 3}
      calculateMetadata={({ props }) => ({
        durationInFrames: reelDuration((props as unknown as ReelProps).scenes, FPS),
      })}
      defaultProps={
        {
          theme: previewTheme,
          logo: null,
          mediaDir: "",
          scenes: [{ seconds: 3, variant: "hook", text: "হুক টেক্সট" }],
        } satisfies ReelProps
      }
    />
  </>
);
