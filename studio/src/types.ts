// Shapes of the files the renderer reads. See studio/README.md.

export type Theme = {
  colors: {
    primary: string; // main accent (buttons, cover backgrounds)
    primaryDark: string; // headings on light backgrounds
    accent: string; // secondary accent
    background: string; // light background
    text: string; // body text
  };
  fonts: {
    latin: string; // family used for Latin script
    main: string; // family used for the brand's main language
  };
  logo: {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    size: number; // logo height in px on a 1080-wide canvas
  };
  handle?: string; // e.g. website shown on CTA slides
};

export type Slide = {
  variant?: "cover" | "content" | "cta";
  kicker?: string;
  headline: string;
  body?: string;
  bullets?: string[];
  image?: string; // file name inside the post's media-inputs folder
  button?: string; // CTA button text
  table?: { title?: string; rows: { label: string; value: string; old?: string }[] }[]; // e.g. a price list
  note?: string; // small highlighted line near the bottom
};

export type Scene = {
  seconds: number;
  variant?: "hook" | "content" | "cta";
  text: string; // on-screen text
  sub?: string;
  background?: string; // image or video file inside media-inputs; empty = brand colour
  say?: string; // spoken line (voiceover.mjs)
  words?: { w: string; s: number; e: number }[]; // word timings from voiceover.mjs, seconds from scene start
};

export type Job = {
  theme: Theme;
  logo: string | null; // staticFile path, set by render.mjs
  mediaDir: string; // staticFile folder for this post's inputs, set by render.mjs
};

export type SlideProps = Job & { slide: Slide; index: number; total: number };
export type ReelProps = Job & { scenes: Scene[]; music?: string; voiceover?: string };
