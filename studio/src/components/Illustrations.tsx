import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Theme } from "../types";

// Animated SVG illustrations that fill a Reel scene when there is no footage or screenshot.
// All are drawn on a 760×760 canvas in the brand's colours. See docs/video-rules.md.

type P = { theme: Theme; label?: string };
const W = "#ffffff";
const SOFT = "rgba(255,255,255,0.14)";
const LINE = "rgba(255,255,255,0.32)";

const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { f, fps, s: f / fps };
};
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const pop = (f: number, fps: number, delay = 0) => spring({ frame: f - delay, fps, config: { damping: 14, mass: 0.7 } });

const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 760 760" width="100%" height="100%" style={{ overflow: "visible" }}>
    {children}
  </svg>
);

// A rounded "glass" panel used by several illustrations.
const Panel: React.FC<{ x: number; y: number; w: number; h: number; r?: number; fill?: string }> = ({ x, y, w, h, r = 28, fill = SOFT }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={LINE} strokeWidth={3} />
);

export const Timer: React.FC<P> = ({ theme }) => {
  const { f, fps, s } = useT();
  const p = pop(f, fps);
  const c = theme.colors.primary;
  const R = 230;
  const circ = 2 * Math.PI * R;
  const prog = (s % 12) / 12;
  const remaining = Math.max(0, 40 * 60 - Math.floor(s * 7));
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const hand = s * 60;
  return (
    <Svg>
      <g transform={`translate(380 360) scale(${p})`}>
        <rect x={-38} y={-312} width={76} height={46} rx={14} fill={W} />
        <rect x={-14} y={-336} width={28} height={30} rx={8} fill={W} />
        <circle r={262} fill={SOFT} stroke={LINE} strokeWidth={4} />
        <circle r={R} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={26} />
        <circle
          r={R}
          fill="none"
          stroke={c}
          strokeWidth={26}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * prog}
          transform="rotate(-90)"
          style={{ filter: `drop-shadow(0 0 18px ${c})` }}
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={0} y1={-190} x2={0} y2={i % 3 === 0 ? -160 : -172} stroke={W} strokeWidth={i % 3 === 0 ? 8 : 4} strokeLinecap="round" transform={`rotate(${i * 30})`} />
        ))}
        <line x1={0} y1={20} x2={0} y2={-150} stroke={W} strokeWidth={10} strokeLinecap="round" transform={`rotate(${hand})`} />
        <line x1={0} y1={0} x2={0} y2={-100} stroke={c} strokeWidth={14} strokeLinecap="round" transform={`rotate(${hand / 12})`} />
        <circle r={18} fill={c} stroke={W} strokeWidth={6} />
      </g>
      <g opacity={pop(f, fps, 8)}>
        <rect x={250} y={650} width={260} height={84} rx={42} fill={W} />
        <text x={380} y={708} textAnchor="middle" fontSize={50} fontWeight={800} fill={c} fontFamily="Plus Jakarta Sans">
          {mm}:{ss}
        </text>
      </g>
    </Svg>
  );
};

// A computer showing a test: passage on the left, questions on the right, timer bar on top.
export const Screen: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const p = pop(f, fps);
  const c = theme.colors.primary;
  const lines = (x: number, y: number, n: number, w: number, d: number) =>
    Array.from({ length: n }).map((_, i) => (
      <rect key={i} x={x} y={y + i * 30} height={12} rx={6} fill="rgba(0,0,0,0.12)" width={w * interpolate(f, [d + i * 2, d + i * 2 + 12], [0, i % 3 === 2 ? 0.6 : 1], clamp)} />
    ));
  return (
    <Svg>
      <g transform={`translate(0 ${(1 - p) * 80})`} opacity={p}>
        <rect x={60} y={110} width={640} height={430} rx={26} fill="#1b1b1b" stroke={LINE} strokeWidth={3} />
        <rect x={84} y={134} width={592} height={382} rx={12} fill={W} />
        <rect x={84} y={134} width={592} height={44} rx={12} fill="#f3f3f3" />
        <circle cx={110} cy={156} r={8} fill={c} />
        <rect x={130} y={150} width={110} height={12} rx={6} fill="rgba(0,0,0,0.2)" />
        <rect x={560} y={146} width={100} height={22} rx={11} fill={c} />
        {lines(104, 200, 9, 270, 6)}
        <line x1={392} y1={192} x2={392} y2={500} stroke="#e6e6e6" strokeWidth={3} />
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i} opacity={interpolate(f, [14 + i * 4, 22 + i * 4], [0, 1], clamp)}>
            <rect x={410} y={204 + i * 58} width={30} height={30} rx={8} fill={i === 1 ? c : "#eee"} />
            <rect x={452} y={212 + i * 58} width={190} height={12} rx={6} fill="rgba(0,0,0,0.14)" />
          </g>
        ))}
        <rect x={330} y={540} width={100} height={70} fill="#2a2a2a" />
        <rect x={240} y={606} width={280} height={22} rx={11} fill="#2a2a2a" />
      </g>
    </Svg>
  );
};

export const Highlight: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const p = pop(f, fps);
  const c = theme.colors.primary;
  const sweep = interpolate(f, [14, 40], [0, 1], clamp);
  return (
    <Svg>
      <g opacity={p}>
        <Panel x={90} y={120} w={580} h={520} fill={W} />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={140} y={180 + i * 48} width={i === 8 ? 300 : 480} height={14} rx={7} fill="rgba(0,0,0,0.14)" />
        ))}
        <rect x={130} y={308} width={500 * sweep} height={46} rx={10} fill={c} opacity={0.35} />
        <rect x={140} y={324} width={480} height={14} rx={7} fill="rgba(0,0,0,0.3)" />
        <g transform={`translate(${140 + 480 * sweep} 360)`}>
          <path d="M0 0 L0 64 L18 48 L30 76 L42 70 L30 44 L54 42 Z" fill={W} stroke="#111" strokeWidth={4} strokeLinejoin="round" />
        </g>
      </g>
    </Svg>
  );
};

export const Typing: React.FC<P> = ({ theme, label = "inference" }) => {
  const { f, fps } = useT();
  const p = pop(f, fps);
  const c = theme.colors.primary;
  const n = Math.floor(interpolate(f, [10, 10 + label.length * 4], [0, label.length], clamp));
  const caret = Math.floor(f / 15) % 2 === 0;
  const pressed = Math.floor(f / 4) % 14;
  return (
    <Svg>
      <g opacity={p} transform={`translate(0 ${(1 - p) * 60})`}>
        <Panel x={110} y={110} w={540} h={170} fill={W} />
        <text x={150} y={168} fontSize={30} fill="#888" fontFamily="Plus Jakarta Sans" fontWeight={700}>
          Q 14
        </text>
        <rect x={150} y={190} width={460} height={64} rx={14} fill="#f5f5f5" stroke={c} strokeWidth={4} />
        <text x={170} y={234} fontSize={38} fill="#1a1a1a" fontFamily="Plus Jakarta Sans" fontWeight={700}>
          {label.slice(0, n)}
          {caret ? "|" : " "}
        </text>
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 10 - r }).map((_, k) => {
            const idx = r * 10 + k;
            const on = idx % 14 === pressed;
            return (
              <rect key={idx} x={110 + r * 26 + k * 54} y={360 + r * 66 + (on ? 6 : 0)} width={46} height={54} rx={10} fill={on ? c : W} opacity={on ? 1 : 0.9} />
            );
          }),
        )}
        <rect x={250} y={560} width={260} height={52} rx={12} fill={W} opacity={0.9} />
      </g>
    </Svg>
  );
};

export const Navigate: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const p = pop(f, fps);
  const c = theme.colors.primary;
  const seq = [2, 7, 4, 9, 1, 6];
  const at = seq[Math.floor(f / 18) % seq.length];
  return (
    <Svg>
      <g opacity={p}>
        <Panel x={70} y={180} w={620} h={300} />
        {Array.from({ length: 10 }).map((_, i) => {
          const row = Math.floor(i / 5);
          const col = i % 5;
          const active = i + 1 === at;
          const done = [1, 2, 4].includes(i + 1);
          return (
            <g key={i} transform={`translate(${118 + col * 112} ${222 + row * 120})`}>
              <rect width={92} height={92} rx={20} fill={active ? c : done ? W : "rgba(255,255,255,0.18)"} style={active ? { filter: `drop-shadow(0 0 16px ${c})` } : undefined} transform={active ? "scale(1.08)" : undefined} />
              <text x={46} y={60} textAnchor="middle" fontSize={40} fontWeight={800} fill={active ? W : done ? c : W} fontFamily="Plus Jakarta Sans">
                {i + 1}
              </text>
            </g>
          );
        })}
        <g transform={`translate(${118 + ((at - 1) % 5) * 112 + 46} ${222 + Math.floor((at - 1) / 5) * 120 + 130})`}>
          <path d="M0 0 L0 64 L18 48 L30 76 L42 70 L30 44 L54 42 Z" fill={W} stroke="#111" strokeWidth={4} strokeLinejoin="round" />
        </g>
      </g>
    </Svg>
  );
};

export const Score: React.FC<P> = ({ theme, label = "Band score" }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  const press = interpolate(f, [8, 14, 20], [1, 0.9, 1], clamp);
  const fill = interpolate(f, [22, 60], [0, 0.78], clamp);
  const R = 200;
  const arc = Math.PI * R;
  return (
    <Svg>
      <g opacity={pop(f, fps)} transform={`translate(380 300)`}>
        <path d={`M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0`} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={34} strokeLinecap="round" />
        <path d={`M ${-R} 0 A ${R} ${R} 0 0 1 ${R} 0`} fill="none" stroke={c} strokeWidth={34} strokeLinecap="round" strokeDasharray={arc} strokeDashoffset={arc * (1 - fill)} style={{ filter: `drop-shadow(0 0 16px ${c})` }} />
        <circle cx={0} cy={-40} r={70} fill={W} opacity={interpolate(f, [50, 62], [0, 1], clamp)} />
        <path d="M -32 -40 L -8 -14 L 36 -66" fill="none" stroke={c} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={140} strokeDashoffset={interpolate(f, [56, 70], [140, 0], clamp)} />
        <text x={0} y={60} textAnchor="middle" fontSize={40} fontWeight={800} fill={W} fontFamily="Plus Jakarta Sans">
          {label}
        </text>
      </g>
      <g transform={`translate(380 560) scale(${press})`} opacity={pop(f, fps, 2)}>
        <rect x={-150} y={-46} width={300} height={92} rx={46} fill={W} />
        <text x={0} y={16} textAnchor="middle" fontSize={42} fontWeight={800} fill={c} fontFamily="Plus Jakarta Sans">
          Submit
        </text>
      </g>
    </Svg>
  );
};

export const Price: React.FC<P> = ({ theme, label = "৳২০" }) => {
  const { f, fps } = useT();
  const p = pop(f, fps);
  const c = theme.colors.primary;
  const spin = Math.sin(f / 14) * 6;
  return (
    <Svg>
      <g transform={`translate(380 380) rotate(${spin}) scale(${p})`}>
        <path d="M -230 -150 L 120 -150 L 250 0 L 120 150 L -230 150 Q -260 150 -260 120 L -260 -120 Q -260 -150 -230 -150 Z" fill={W} style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.4))" }} />
        <circle cx={130} cy={0} r={26} fill={c} />
        <text x={-70} y={52} textAnchor="middle" fontSize={150} fontWeight={800} fill={c} fontFamily="'Plus Jakarta Sans','Hind Siliguri'">
          {label}
        </text>
      </g>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2 + f / 40;
        return <circle key={i} cx={380 + Math.cos(a) * 320} cy={380 + Math.sin(a) * 320} r={10} fill={W} opacity={0.5} />;
      })}
    </Svg>
  );
};

export const Criteria: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  const rows = [
    ["TR", 0.72],
    ["CC", 0.8],
    ["LR", 0.62],
    ["GRA", 0.7],
  ] as const;
  return (
    <Svg>
      <g opacity={pop(f, fps)}>
        <Panel x={80} y={130} w={600} h={500} fill={W} />
        {rows.map(([k, v], i) => {
          const g = interpolate(f, [10 + i * 6, 34 + i * 6], [0, v as number], clamp);
          return (
            <g key={k} transform={`translate(130 ${200 + i * 105})`}>
              <text x={0} y={34} fontSize={36} fontWeight={800} fill="#222" fontFamily="Plus Jakarta Sans">
                {k}
              </text>
              <rect x={120} y={8} width={380} height={34} rx={17} fill="#eee" />
              <rect x={120} y={8} width={380 * g} height={34} rx={17} fill={c} />
            </g>
          );
        })}
      </g>
    </Svg>
  );
};

export const Checklist: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  return (
    <Svg>
      <g opacity={pop(f, fps)}>
        <Panel x={120} y={100} w={520} h={560} fill={W} />
        {Array.from({ length: 4 }).map((_, i) => {
          const t = interpolate(f, [12 + i * 10, 20 + i * 10], [0, 1], clamp);
          return (
            <g key={i} transform={`translate(170 ${170 + i * 120})`}>
              <rect width={70} height={70} rx={16} fill={t > 0.5 ? c : "#f1f1f1"} stroke={c} strokeWidth={4} />
              <path d="M 16 36 L 30 50 L 56 20" fill="none" stroke={W} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={70} strokeDashoffset={70 * (1 - t)} />
              <rect x={100} y={18} width={i === 3 ? 220 : 300} height={16} rx={8} fill="rgba(0,0,0,0.18)" />
              <rect x={100} y={44} width={180} height={12} rx={6} fill="rgba(0,0,0,0.1)" />
            </g>
          );
        })}
      </g>
    </Svg>
  );
};

export const Loop: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  const labels = ["Test", "Fix", "Test"];
  const active = Math.floor(f / 20) % 3;
  return (
    <Svg>
      <g transform="translate(380 380)" opacity={pop(f, fps)}>
        <circle r={230} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={10} strokeDasharray="30 22" transform={`rotate(${f * 1.5})`} />
        {labels.map((l, i) => {
          const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
          const on = i === active;
          return (
            <g key={i} transform={`translate(${Math.cos(a) * 230} ${Math.sin(a) * 230}) scale(${on ? 1.12 : 1})`}>
              <circle r={92} fill={on ? c : W} style={on ? { filter: `drop-shadow(0 0 22px ${c})` } : undefined} />
              <text y={14} textAnchor="middle" fontSize={40} fontWeight={800} fill={on ? W : c} fontFamily="Plus Jakarta Sans">
                {l}
              </text>
            </g>
          );
        })}
      </g>
    </Svg>
  );
};

export const Mistake: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  const shake = Math.sin(f * 1.6) * interpolate(f, [10, 24], [10, 0], clamp);
  return (
    <Svg>
      <g transform={`translate(${380 + shake} 380) scale(${pop(f, fps)})`}>
        <circle r={230} fill={W} style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))" }} />
        <circle r={190} fill="none" stroke={c} strokeWidth={22} />
        <path d="M -90 -90 L 90 90 M 90 -90 L -90 90" stroke={c} strokeWidth={40} strokeLinecap="round" strokeDasharray={260} strokeDashoffset={interpolate(f, [6, 20], [260, 0], clamp)} />
      </g>
    </Svg>
  );
};

export const Chat: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  const bubbles = [
    { x: 80, y: 120, w: 420, me: false },
    { x: 260, y: 300, w: 420, me: true },
    { x: 80, y: 480, w: 360, me: false },
  ];
  return (
    <Svg>
      {bubbles.map((b, i) => {
        const p = pop(f, fps, i * 10);
        return (
          <g key={i} opacity={p} transform={`translate(0 ${(1 - p) * 40})`}>
            <rect x={b.x} y={b.y} width={b.w} height={130} rx={40} fill={b.me ? c : W} />
            <path d={b.me ? `M ${b.x + b.w - 60} ${b.y + 120} l 40 40 l -6 -48 z` : `M ${b.x + 50} ${b.y + 120} l -36 40 l 60 -30 z`} fill={b.me ? c : W} />
            {i === 2 ? (
              [0, 1, 2].map((d) => (
                <circle key={d} cx={b.x + 120 + d * 60} cy={b.y + 65} r={16} fill={c} opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 8 + d))} />
              ))
            ) : (
              <>
                <rect x={b.x + 40} y={b.y + 36} width={b.w - 100} height={16} rx={8} fill={b.me ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.2)"} />
                <rect x={b.x + 40} y={b.y + 72} width={b.w - 180} height={16} rx={8} fill={b.me ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.12)"} />
              </>
            )}
          </g>
        );
      })}
    </Svg>
  );
};

export const Headphones: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  return (
    <Svg>
      <g transform={`translate(380 400) scale(${pop(f, fps)})`}>
        {[0, 1, 2].map((i) => {
          const r = 200 + ((f * 3 + i * 60) % 180);
          return <circle key={i} r={r} fill="none" stroke={W} strokeWidth={4} opacity={interpolate(r, [200, 380], [0.5, 0])} />;
        })}
        <path d="M -170 40 Q -170 -200 0 -200 Q 170 -200 170 40" fill="none" stroke={W} strokeWidth={34} strokeLinecap="round" />
        <rect x={-210} y={10} width={90} height={160} rx={40} fill={c} stroke={W} strokeWidth={8} />
        <rect x={120} y={10} width={90} height={160} rx={40} fill={c} stroke={W} strokeWidth={8} />
      </g>
    </Svg>
  );
};

export const Paper: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  const items = 3;
  const t = interpolate(f, [8, 60], [0, items], clamp);
  const k = Math.min(items - 1, Math.floor(t));
  const pen = t - k;
  return (
    <Svg>
      <g opacity={pop(f, fps)}>
        <rect x={150} y={90} width={460} height={580} rx={24} fill={W} transform="rotate(-3 380 380)" />
        {Array.from({ length: items }).map((_, i) => {
          const w = i < k ? 1 : i === k ? pen : 0;
          return (
            <g key={i} transform={`translate(210 ${200 + i * 140}) rotate(-3)`}>
              <circle cx={0} cy={10} r={14} fill={c} />
              <rect x={36} y={0} width={300 * w} height={20} rx={10} fill="rgba(0,0,0,0.25)" />
              <rect x={36} y={40} width={200 * w} height={14} rx={7} fill="rgba(0,0,0,0.12)" />
            </g>
          );
        })}
        <g transform={`translate(${246 + 300 * pen} ${170 + k * 140}) rotate(35)`}>
          <rect x={-14} y={-150} width={28} height={150} rx={8} fill={c} />
          <path d="M -14 0 L 14 0 L 0 34 Z" fill="#222" />
        </g>
      </g>
    </Svg>
  );
};

export const Magnifier: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  const x = interpolate(Math.sin(f / 18), [-1, 1], [230, 520]);
  return (
    <Svg>
      <g opacity={pop(f, fps)}>
        <Panel x={90} y={140} w={580} h={460} fill={W} />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x={140} y={200 + i * 52} width={i === 6 ? 280 : 480} height={14} rx={7} fill="rgba(0,0,0,0.14)" />
        ))}
        <path d="M 300 330 q 15 -12 30 0 t 30 0 t 30 0 t 30 0" fill="none" stroke={c} strokeWidth={6} opacity={interpolate(x, [330, 380], [0, 1], clamp)} />
        <g transform={`translate(${x} 320)`}>
          <circle r={90} fill="rgba(255,255,255,0.25)" stroke="#222" strokeWidth={18} />
          <line x1={64} y1={64} x2={150} y2={150} stroke="#222" strokeWidth={30} strokeLinecap="round" />
        </g>
      </g>
    </Svg>
  );
};

export const Graduation: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  const p = pop(f, fps);
  const bob = Math.sin(f / 16) * 10;
  return (
    <Svg>
      <g transform={`translate(380 ${340 + bob}) scale(${p})`}>
        <path d="M -300 0 L 0 -140 L 300 0 L 0 140 Z" fill={W} />
        <path d="M -170 70 L -170 190 Q 0 270 170 190 L 170 70 L 0 150 Z" fill={c} />
        <line x1={240} y1={20} x2={240} y2={190} stroke={W} strokeWidth={10} />
        <circle cx={240} cy={200} r={24} fill={c} stroke={W} strokeWidth={6} />
      </g>
      {Array.from({ length: 10 }).map((_, i) => {
        const y = ((f * (3 + (i % 3)) + i * 70) % 760) - 40;
        return <rect key={i} x={60 + i * 68} y={y} width={16} height={26} rx={4} fill={i % 2 ? W : c} transform={`rotate(${f * 4 + i * 30} ${68 + i * 68} ${y + 13})`} opacity={0.8} />;
      })}
    </Svg>
  );
};

export const Money: React.FC<P> = ({ theme, label = "৳২০" }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  return (
    <Svg>
      <g opacity={pop(f, fps)}>
        {Array.from({ length: 9 }).map((_, i) => {
          const p = pop(f, fps, i * 2);
          return <rect key={i} x={90} y={560 - i * 46 - (1 - p) * 60} width={290} height={40} rx={8} fill={i % 2 ? "#e7f3ea" : "#cfe8d6"} stroke="#7aa886" strokeWidth={3} opacity={p} />;
        })}
        <text x={235} y={680} textAnchor="middle" fontSize={44} fontWeight={800} fill={W} fontFamily="'Plus Jakarta Sans','Hind Siliguri'">
          Exam fee
        </text>
        <g transform={`translate(560 470) scale(${pop(f, fps, 20)})`}>
          <circle r={110} fill={W} stroke={c} strokeWidth={14} style={{ filter: `drop-shadow(0 0 24px ${c})` }} />
          <text y={26} textAnchor="middle" fontSize={78} fontWeight={800} fill={c} fontFamily="'Plus Jakarta Sans','Hind Siliguri'">
            {label}
          </text>
        </g>
        <text x={560} y={680} textAnchor="middle" fontSize={44} fontWeight={800} fill={W} fontFamily="Plus Jakarta Sans">
          Mock
        </text>
      </g>
    </Svg>
  );
};

export const Spark: React.FC<P> = ({ theme }) => {
  const { f, fps } = useT();
  const c = theme.colors.primary;
  return (
    <Svg>
      <g transform={`translate(380 380) scale(${pop(f, fps)})`}>
        {[260, 190, 120].map((r, i) => (
          <circle key={r} r={r} fill="none" stroke={i === 1 ? c : W} strokeWidth={i === 1 ? 14 : 4} strokeDasharray={i === 0 ? "8 18" : undefined} opacity={0.7} transform={`rotate(${f * (i % 2 ? -1 : 1) * 1.2})`} />
        ))}
        <path d="M 0 -80 L 22 -22 L 80 0 L 22 22 L 0 80 L -22 22 L -80 0 L -22 -22 Z" fill={W} transform={`rotate(${f * 2}) scale(${1 + Math.sin(f / 10) * 0.08})`} />
      </g>
    </Svg>
  );
};

export const ILLUSTRATIONS: Record<string, React.FC<P>> = {
  timer: Timer,
  screen: Screen,
  highlight: Highlight,
  typing: Typing,
  navigate: Navigate,
  score: Score,
  price: Price,
  criteria: Criteria,
  checklist: Checklist,
  loop: Loop,
  mistake: Mistake,
  chat: Chat,
  headphones: Headphones,
  paper: Paper,
  magnifier: Magnifier,
  graduation: Graduation,
  money: Money,
  spark: Spark,
};

// Used when a scene names no illustration: pick one from its words, so no scene is ever empty.
const RULES: [RegExp, string][] = [
  [/timer|সময়|মিনিট|⏱/i, "timer"],
  [/highlight/i, "highlight"],
  [/টাইপ|type|typing|typed/i, "typing"],
  [/প্রশ্নে|navigation|bar/i, "navigate"],
  [/submit|band score|result/i, "score"],
  [/criteria|Task Response|Coherence|Lexical|Grammatical/i, "criteria"],
  [/fee|ফি|টাকা/i, "money"],
  [/৳/, "price"],
  [/plan|ধাপ|step/i, "paper"],
  [/proofread|check|চেক/i, "magnifier"],
  [/loop|আবার/i, "loop"],
  [/ভুল|mistake|❌|myth/i, "mistake"],
  [/HSC|রেজাল্ট|result/i, "graduation"],
  [/Listening|headphone/i, "headphones"],
  [/screen|স্ক্রিন|computer|CD IELTS/i, "screen"],
  [/\?|কবে|প্রশ্ন/i, "chat"],
];
export const pickIllustration = (text: string) => RULES.find(([re]) => re.test(text))?.[1] ?? "spark";
