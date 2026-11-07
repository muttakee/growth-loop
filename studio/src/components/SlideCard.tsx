import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { fontStack, loadFonts } from "../fonts";
import { SlideProps } from "../types";
import { Logo } from "./Logo";

// Headline size shrinks with length so long Bangla lines still fit.
const headlineSize = (text: string, big: boolean) => {
  const n = text.length;
  const base = big ? 92 : 72;
  if (n < 30) return base;
  if (n < 60) return base * 0.82;
  if (n < 100) return base * 0.68;
  return base * 0.56;
};

export const SlideCard: React.FC<SlideProps> = ({ theme, logo, mediaDir, slide, index, total }) => {
  loadFonts([theme.fonts.latin, theme.fonts.main]);
  const variant = slide.variant ?? (index === 0 ? "cover" : "content");
  const dark = variant !== "content";
  const c = theme.colors;
  const fg = dark ? "#ffffff" : c.text;
  const pad = 88;

  return (
    <AbsoluteFill
      style={{
        background: dark
          ? `linear-gradient(160deg, ${c.primary} 0%, ${c.primaryDark} 100%)`
          : c.background,
        fontFamily: fontStack(theme.fonts.latin, theme.fonts.main),
        color: fg,
      }}
    >
      {!dark && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 18, background: c.primary }} />
      )}
      <Logo logo={logo} theme={theme} inset={56} onDark={dark} />

      <div
        style={{
          position: "absolute",
          inset: `${theme.logo.position.startsWith("top") ? 200 : pad}px ${pad}px 0 ${pad}px`,
          display: "flex",
          flexDirection: "column",
        }}
      >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: variant === "content" ? "flex-start" : "center",
          gap: slide.table || slide.image ? 24 : 36,
          minHeight: 0,
        }}
      >
        {slide.kicker && (
          <div
            style={{
              alignSelf: "flex-start",
              fontSize: 34,
              fontWeight: 700,
              padding: "10px 24px",
              borderRadius: 999,
              background: dark ? "rgba(255,255,255,0.18)" : c.primary,
              color: "#fff",
            }}
          >
            {slide.kicker}
          </div>
        )}
        <div
          style={{
            fontSize: headlineSize(slide.headline, variant === "cover"),
            fontWeight: 800,
            lineHeight: 1.3,
            color: dark ? "#fff" : c.primaryDark,
          }}
        >
          {slide.headline}
        </div>
        {slide.body && (
          <div style={{ fontSize: slide.image ? 36 : 42, lineHeight: 1.5, fontWeight: 400 }}>{slide.body}</div>
        )}
        {slide.bullets && (
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {slide.bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 22, fontSize: slide.image ? 34 : 40, lineHeight: 1.45 }}>
                <div
                  style={{
                    flex: "0 0 auto",
                    width: 54,
                    height: 54,
                    borderRadius: 27,
                    background: dark ? "#fff" : c.primary,
                    color: dark ? c.primary : "#fff",
                    fontWeight: 800,
                    fontSize: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 4,
                  }}
                >
                  {i + 1}
                </div>
                <div>{b}</div>
              </div>
            ))}
          </div>
        )}
        {slide.table &&
          slide.table.map((t, ti) => (
            <div key={ti} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {t.title && (
                <div style={{ fontSize: 34, fontWeight: 700, color: c.accent, marginBottom: 4 }}>{t.title}</div>
              )}
              {t.rows.map((r, ri) => (
                <div
                  key={ri}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 24,
                    fontSize: 36,
                    padding: "10px 0",
                    borderBottom: `2px solid ${dark ? "rgba(255,255,255,0.25)" : "#EEEEEE"}`,
                  }}
                >
                  <span>{r.label}</span>
                  <span style={{ whiteSpace: "nowrap" }}>
                    {r.old && (
                      <span style={{ textDecoration: "line-through", opacity: 0.5, marginRight: 14, fontSize: 30 }}>
                        {r.old}
                      </span>
                    )}
                    <span style={{ fontWeight: 800, color: dark ? "#fff" : c.primary }}>{r.value}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        {slide.note && (
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.45,
              padding: "20px 26px",
              borderRadius: 16,
              background: dark ? "rgba(255,255,255,0.15)" : `${c.accent}14`,
              color: dark ? "#fff" : c.accent,
            }}
          >
            {slide.note}
          </div>
        )}
        {slide.image && (
          <Img
            src={staticFile(`${mediaDir}/${slide.image}`)}
            style={{
              flex: "1 1 0",
              minHeight: 240,
              width: "100%",
              objectFit: "contain",
              objectPosition: "center top",
              borderRadius: 24,
              filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
            }}
          />
        )}
        {slide.button && (
          <div
            style={{
              alignSelf: "flex-start",
              marginTop: 12,
              fontSize: 44,
              fontWeight: 800,
              padding: "24px 44px",
              borderRadius: 20,
              background: dark ? "#fff" : c.primary,
              color: dark ? c.primary : "#fff",
            }}
          >
            {slide.button}
          </div>
        )}
      </div>

      <div
        style={{
          flex: "0 0 auto",
          height: theme.logo.position.startsWith("bottom") ? 170 : 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 30,
          opacity: 0.8,
        }}
      >
        <span>{slide.button ? "" : theme.handle ?? ""}</span>
        {total > 1 && (
          <span>
            {index + 1} / {total} {index < total - 1 ? "→" : ""}
          </span>
        )}
      </div>
      </div>
    </AbsoluteFill>
  );
};
