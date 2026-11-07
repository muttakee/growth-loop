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
        gap: "10px 16px",
        transform: `scale(${0.9 + enter * 0.1})`,
        opacity: enter,
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
const DeviceCard: React.FC<{ src: string }> = ({ src }) => {
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
        top: 560,
        height: 820,
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
          <Img src={src} style={{ maxHeight: 792, maxWidth: 812, objectFit: "contain", transform: `scale(${zoom})` }} />
        </div>
      </div>
    </div>
  );
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
  const image = bg && !video;
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
      {image && <DeviceCard src={staticFile(`${mediaDir}/${bg}`)} />}

      {variant === "hook" && !bg ? (
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 90px", transform: `scale(${interpolate(enter, [0, 1], [1.12, 1])})` }}>
          <Headline text={scene.text} theme={theme} size={104} align="center" />
          <div
            style={{
              height: 10,
              borderRadius: 5,
              background: theme.colors.primary,
              width: `${interpolate(f, [8, 26], [0, 46], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
              margin: "44px auto 0",
              boxShadow: `0 0 30px ${theme.colors.primary}`,
            }}
          />
        </AbsoluteFill>
      ) : variant === "cta" ? (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 90px", gap: 56 }}>
          <Headline text={scene.text} theme={theme} size={78} align="center" />
          {scene.sub && (
            <div
              style={{
                opacity: spring({ frame: f - 14, fps, config: { damping: 14 } }),
                transform: `scale(${1 + Math.sin(f / 8) * 0.025})`,
                background: theme.colors.primary,
                color: "#fff",
                fontSize: 54,
                fontWeight: 800,
                padding: "30px 56px",
                borderRadius: 999,
                boxShadow: `0 20px 60px ${theme.colors.primary}99, inset 0 -6px 0 rgba(0,0,0,0.15)`,
              }}
            >
              {scene.sub} →
            </div>
          )}
        </AbsoluteFill>
      ) : bg ? (
        <div style={{ position: "absolute", left: 80, right: 80, top: 230 }}>
          <Headline text={scene.text} theme={theme} size={64} align="left" />
        </div>
      ) : (
        // Text-only scene: big centred type over a glowing ring, with the scene number.
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 90px" }}>
          <div
            style={{
              position: "absolute",
              width: 760,
              height: 760,
              borderRadius: "50%",
              border: `3px solid ${theme.colors.primary}`,
              opacity: 0.35 * enter,
              transform: `scale(${0.85 + enter * 0.15 + Math.sin(f / 20) * 0.02})`,
              boxShadow: `0 0 120px ${theme.colors.primary}66, inset 0 0 120px ${theme.colors.primary}44`,
            }}
          />
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: 6,
              color: theme.colors.primary,
              background: "#fff",
              borderRadius: 999,
              padding: "8px 26px",
              marginBottom: 40,
              opacity: enter,
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <Headline text={scene.text} theme={theme} size={92} align="center" delay={4} />
          {scene.sub && (
            <div style={{ marginTop: 32, fontSize: 46, color: "rgba(255,255,255,0.88)", lineHeight: 1.4, textAlign: "center" }}>
              {scene.sub}
            </div>
          )}
        </AbsoluteFill>
      )}

      {scene.words && scene.words.length > 0 && (
        <div style={{ position: "absolute", left: 60, right: 60, bottom: 230 }}>
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
