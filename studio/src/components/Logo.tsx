import React from "react";
import { Img, staticFile } from "remotion";
import { Theme } from "../types";

export const Logo: React.FC<{ logo: string | null; theme: Theme; inset: number; onDark?: boolean }> = ({
  logo,
  theme,
  inset,
  onDark,
}) => {
  if (!logo) return null;
  const [v, h] = theme.logo.position.split("-") as ["top" | "bottom", "left" | "right"];
  return (
    <div
      style={{
        position: "absolute",
        [v]: inset,
        [h]: inset,
        background: onDark ? "rgba(255,255,255,0.94)" : "transparent",
        borderRadius: 14,
        padding: onDark ? "10px 14px" : 0,
        display: "flex",
        zIndex: 10,
      }}
    >
      <Img src={staticFile(logo)} style={{ height: theme.logo.size, width: "auto" }} />
    </div>
  );
};
