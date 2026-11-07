import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontStack, loadFonts } from "../fonts";
import { ReelProps, Scene, Theme } from "../types";
import { Logo } from "./Logo";
import { ILLUSTRATIONS, pickIllustration } from "./Illustrations";

const isVideo = (f: string) => /\.(mp4|mov|webm)$/i.test(f);
const hasNumber = (w: string) => /[৳%]/.test(w);

// Continuous background: deep brand gradient with two slowly drifting glows and a fine grid.
const Backdrop: React.FC<{ theme: Theme }> = ({ theme }) => {
  const f = useCurrentFrame();
  const c = theme.colors;
  const x1 = 30 + Math.sin(f / 90) * 12;
  const y1 = 22 + Math.cos(f / 110) * 8;
  const x2 = 72 + Math.cos(f / 100) * 10;
  const y2 = 78 + Math.sin(f / 120) * 8;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #160303 0%, ${c.primaryDark} 55%, #1a0303 100%)` }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${x1}% ${y1}%, ${c.primary}cc 0%, transparent 42%), radial-gradient(circle at ${x2}% ${y2}%, ${c.primary}88 0%, transparent 38%)`,
          filter: "blur(30px)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at 50% 45%, black 0%, transparent 75%)",
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
    </AbsoluteFill>
  );
};

// Headline that builds word by word.
const Headline: React.FC<{ text: string; theme: Theme; size: number; align: "left" | "center"; delay?: number }> = ({
  text,
  theme,
  size,
  align,
  delay = 0,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: `${size * 0.12}px ${size * 0.26}px`,
        fontSize: size,
        fontWeight: 800,
        lineHeight: 1.28,
        color: "#fff",
        textAlign: align,
        textShadow: "0 6px 30px rgba(0,0,0,0.35)",
      }}
    >
      {words.map((w, i) => {
        const p = spring({ frame: f - delay - i * 3, fps, config: { damping: 16, mass: 0.6 } });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${(1 - p) * 40}px)`,
              filter: `blur(${(1 - p) * 8}px)`,
              color: hasNumber(w) ? theme.colors.primary : "#fff",
              ...(hasNumber(w) ? { background: "#fff", borderRadius: 14, padding: "0 14px" } : {}),
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

// Captions synced to the voiceover: short chunks, the word being spoken is highlighted.
const Captions: React.FC<{ words: NonNullable<Scene["words"]>; theme: Theme }> = ({ words, theme }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const chunks: (typeof words)[] = [];
  let cur: typeof words = [];
  words.forEach((w, i) => {
    cur.push(w);
    const next = words[i + 1];
    const end = /[।?!,.:;]$/.test(w.w) || cur.length >= 4 || (next && next.s - w.e > 0.35);
    if (end || !next) {
      chunks.push(cur);
      cur = [];
    }
  });
  const idx = chunks.findIndex((ch, i) => t < (chunks[i + 1]?.[0].s ?? Infinity));
  const chunk = chunks[Math.max(0, idx)];
  if (!chunk || t < chunk[0].s - 0.05) return null;
  const startF = Math.round(chunk[0].s * fps);
  const enter = spring({ frame: f - startF, fps, config: { damping: 18, mass: 0.5 } });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px 14px",
        transform: `scale(${0.9 + enter * 0.1})`,
        opacity: enter,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        borderRadius: 28,
        padding: "18px 22px",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {chunk.map((w, i) => {
        const active = t >= w.s && t < w.e + 0.08;
        const said = t >= w.e;
        return (
          <span
            key={i}
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.25,
              padding: "4px 16px",
              borderRadius: 16,
              color: active ? "#fff" : said ? "#fff" : "rgba(255,255,255,0.55)",
              background: active ? theme.colors.primary : "transparent",
              transform: `scale(${active ? 1.08 : 1})`,
              boxShadow: active ? `0 10px 30px ${theme.colors.primary}88` : "none",
              textShadow: active ? "none" : "0 4px 18px rgba(0,0,0,0.6)",
            }}
          >
            {w.w}
          </span>
        );
      })}
    </div>
  );
};

// A screenshot shown whole in a floating device card, with a slow zoom.
const DeviceCard: React.FC<{ src: string; top?: number }> = ({ src, top = 560 }) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame: f - 4, fps, config: { damping: 15 } });
  const zoom = interpolate(f, [0, durationInFrames], [1, 1.06]);
  const float = Math.sin(f / 22) * 6;
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        top,
        height: 1380 - top,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 120 + float}px) rotate(${(1 - enter) * -4}deg)`,
      }}
    >
      <div
        style={{
          maxHeight: "100%",
          borderRadius: 44,
          padding: 14,
          background: "linear-gradient(145deg, #2a2a2a, #0d0d0d)",
          boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.08)",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div style={{ borderRadius: 32, overflow: "hidden", display: "flex" }}>
          <Img src={src} style={{ maxHeight: 1352 - top, maxWidth: 812, objectFit: "contain", transform: `scale(${zoom})` }} />
        </div>
      </div>
    </div>
  );
};

// The scene's illustration (named in the spec, or picked from its words), so no scene is empty.
const Illo: React.FC<{ scene: Scene; theme: Theme }> = ({ scene, theme }) => {
  const name = scene.illustration ?? pickIllustration(`${scene.text} ${scene.say ?? ""}`);
  const C = ILLUSTRATIONS[name] ?? ILLUSTRATIONS.spark;
  return <C theme={theme} label={scene.illustrationLabel} />;
};

const SceneView: React.FC<{ scene: Scene; theme: Theme; mediaDir: string; muted: boolean; index: number; total: number }> = ({
  scene,
  theme,
  mediaDir,
  muted,
  index,
  total,
}) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const variant = scene.variant ?? "content";
  const bg = scene.background;
  const video = bg && isVideo(bg);
  // End cards always use the clean layout (illustration, title, button), never a screenshot.
  const image = bg && !video && variant !== "cta";
  const exit = interpolate(f, [durationInFrames - 6, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const enter = spring({ frame: f, fps, config: { damping: 200 } });
  const font = fontStack(theme.fonts.latin, theme.fonts.main);

  return (
    <AbsoluteFill style={{ fontFamily: font, opacity: index === total - 1 ? 1 : exit }}>
      {video && (
        <>
          <OffthreadVideo muted={muted} src={staticFile(`${mediaDir}/${bg}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.75) 100%)" }} />
        </>
      )}
      {image && <DeviceCard src={staticFile(`${mediaDir}/${bg}`)} top={scene.text.length > 60 ? 700 : 560} />}

      {variant === "cta" ? (
        <AbsoluteFill style={{ alignItems: "center", padding: "0 90px" }}>
          {!video && (
            <div style={{ position: "absolute", top: 210, left: 190, width: 700, height: 700 }}>
              <Illo scene={scene} theme={theme} />
            </div>
          )}
          <div style={{ position: "absolute", top: video ? 300 : 860, left: 90, right: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
            <Headline text={scene.text} theme={theme} size={72} align="center" />
            {scene.sub && (
              <div
                style={{
                  opacity: spring({ frame: f - 14, fps, config: { damping: 14 } }),
                  transform: `scale(${1 + Math.sin(f / 8) * 0.025})`,
                  background: theme.colors.primary,
                  color: "#fff",
                  fontSize: 52,
                  fontWeight: 800,
                  padding: "28px 52px",
                  borderRadius: 999,
                  boxShadow: `0 20px 60px ${theme.colors.primary}99, inset 0 -6px 0 rgba(0,0,0,0.15)`,
                }}
              >
                {scene.sub} →
              </div>
            )}
          </div>
        </AbsoluteFill>
      ) : (
        <>
          <div style={{ position: "absolute", left: 80, right: 80, top: 210 }}>
            <Headline text={scene.text} theme={theme} size={variant === "hook" ? 84 : scene.text.length > 60 ? 54 : 70} align={variant === "hook" ? "center" : "left"} />
            {variant === "hook" && (
              <div
                style={{
                  height: 8,
                  borderRadius: 4,
                  background: theme.colors.primary,
                  width: `${interpolate(f, [8, 26], [0, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                  margin: "28px auto 0",
                  boxShadow: `0 0 30px ${theme.colors.primary}`,
                }}
              />
            )}
          </div>
          {!bg && (
            <div style={{ position: "absolute", top: 500, left: 90, width: 900, height: 900 }}>
              <Illo scene={scene} theme={theme} />
            </div>
          )}
        </>
      )}

      {scene.words && scene.words.length > 0 && (
        <div style={{ position: "absolute", left: 50, right: 50, bottom: 300, display: "flex", justifyContent: "center" }}>
          <Captions words={scene.words} theme={theme} />
        </div>
      )}
    </AbsoluteFill>
  );
};

const Progress: React.FC<{ theme: Theme }> = ({ theme }) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: "rgba(255,255,255,0.15)" }}>
      <div style={{ height: "100%", width: `${(f / durationInFrames) * 100}%`, background: theme.colors.primary, boxShadow: `0 0 18px ${theme.colors.primary}` }} />
    </div>
  );
};

export const reelDuration = (scenes: Scene[], fps: number) =>
  Math.max(1, scenes.reduce((s, x) => s + Math.round(x.seconds * fps), 0));

export const Reel: React.FC<ReelProps> = ({ theme, logo, mediaDir, scenes, music, voiceover }) => {
  loadFonts([theme.fonts.latin, theme.fonts.main]);
  const { fps } = useVideoConfig();
  let from = 0;
  return (
    <AbsoluteFill>
      <Backdrop theme={theme} />
      {scenes.map((s, i) => {
        const d = Math.round(s.seconds * fps);
        const el = (
          <Sequence key={i} from={from} durationInFrames={d}>
            <SceneView scene={s} theme={theme} mediaDir={mediaDir} muted={Boolean(voiceover)} index={i} total={scenes.length} />
          </Sequence>
        );
        from += d;
        return el;
      })}
      <Progress theme={theme} />
      <Logo logo={logo} theme={theme} inset={64} onDark />
      {music && <Audio src={staticFile(`${mediaDir}/${music}`)} volume={voiceover ? 0.12 : 0.5} />}
      {voiceover && <Audio src={staticFile(`${mediaDir}/${voiceover}`)} />}
    </AbsoluteFill>
  );
};
