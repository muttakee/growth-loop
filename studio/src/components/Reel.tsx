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

const SceneView: React.FC<{ scene: Scene; theme: Theme; mediaDir: string }> = ({ scene, theme, mediaDir }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const c = theme.colors;
  const variant = scene.variant ?? "content";
  const hasBg = Boolean(scene.background);
  const big = variant !== "content" || !hasBg;

  return (
    <AbsoluteFill
      style={{ background: `linear-gradient(170deg, ${c.primary} 0%, ${c.primaryDark} 100%)` }}
    >
      {hasBg &&
        (isVideo(scene.background!) ? (
          <OffthreadVideo src={staticFile(`${mediaDir}/${scene.background}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Img src={staticFile(`${mediaDir}/${scene.background}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ))}
      <AbsoluteFill
        style={{
          justifyContent: big ? "center" : "flex-end",
          padding: big ? "0 80px" : "0 60px 360px",
          fontFamily: fontStack(theme.fonts.latin, theme.fonts.main),
        }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(enter, [0, 1], [60, 0])}px)`,
            opacity: enter,
            background: hasBg ? "rgba(255,255,255,0.95)" : "transparent",
            color: hasBg ? c.primaryDark : "#fff",
            borderRadius: 28,
            padding: hasBg ? "34px 40px" : 0,
            textAlign: big && !hasBg ? "center" : "left",
          }}
        >
          <div style={{ fontSize: big ? 84 : 60, fontWeight: 800, lineHeight: 1.3 }}>{scene.text}</div>
          {scene.sub && (
            <div style={{ fontSize: big ? 46 : 40, marginTop: 20, lineHeight: 1.4, opacity: 0.92 }}>{scene.sub}</div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const reelDuration = (scenes: Scene[], fps: number) =>
  Math.max(1, Math.round(scenes.reduce((s, x) => s + x.seconds, 0) * fps));

export const Reel: React.FC<ReelProps> = ({ theme, logo, mediaDir, scenes, music, voiceover }) => {
  loadFonts([theme.fonts.latin, theme.fonts.main]);
  const { fps } = useVideoConfig();
  let from = 0;
  return (
    <AbsoluteFill style={{ background: theme.colors.primaryDark }}>
      {scenes.map((s, i) => {
        const d = Math.round(s.seconds * fps);
        const el = (
          <Sequence key={i} from={from} durationInFrames={d}>
            <SceneView scene={s} theme={theme} mediaDir={mediaDir} />
          </Sequence>
        );
        from += d;
        return el;
      })}
      <Logo logo={logo} theme={theme} inset={64} onDark />
      {music && <Audio src={staticFile(`${mediaDir}/${music}`)} volume={voiceover ? 0.15 : 0.5} />}
      {voiceover && <Audio src={staticFile(`${mediaDir}/${voiceover}`)} />}
    </AbsoluteFill>
  );
};
