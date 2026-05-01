import { useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BaseConfig {
  id: number;
  left: number;
  bottom: number;
  duration: number;
  delay: number;
  driftX: number;
  rotStart: number;
  rotMid: number;
  rotEnd: number;
}

interface EmberA extends BaseConfig { variant: "A"; width: number; height: number }
interface EmberB extends BaseConfig { variant: "B"; size: number }
interface EmberC extends BaseConfig { variant: "C" }
interface EmberD extends BaseConfig { variant: "D" }

type EmberConfig = EmberA | EmberB | EmberC | EmberD;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Weighted spawn:
 * 60% right (photo/stove area):  x 55–88%, bottom 5–40%
 * 25% centre:                    x 35–58%, bottom 8–45%
 * 15% scattered left:            x  5–32%, bottom 15–60%
 */
function spawnPos(): { left: number; bottom: number } {
  const r = Math.random();
  if (r < 0.60) return { left: rand(55, 88), bottom: rand(5,  40) };
  if (r < 0.85) return { left: rand(35, 58), bottom: rand(8,  45) };
  return             { left: rand(5,  32), bottom: rand(15, 60) };
}

function baseConfig(id: number): BaseConfig {
  const { left, bottom } = spawnPos();
  return {
    id,
    left, bottom,
    duration:  rand(5, 10),
    delay:    -rand(0, 10),
    driftX:    rand(-40, 40),
    rotStart:  rand(-8, 8),
    rotMid:    rand(-12, 12),
    rotEnd:    rand(-22, 22),
  };
}

// ─── Particle factory (runs once on module load) ──────────────────────────────

function buildEmbers(): EmberConfig[] {
  const out: EmberConfig[] = [];
  let id = 0;

  // Variant A — classic streak (12)
  for (let i = 0; i < 12; i++) {
    out.push({
      ...baseConfig(id++),
      variant: "A",
      width:  rand(1.2, 2.4),
      height: rand(7, 14),
    });
  }

  // Variant B — round glow (6)
  for (let i = 0; i < 6; i++) {
    out.push({
      ...baseConfig(id++),
      variant: "B",
      size: rand(3, 6),
      duration: rand(6, 11),
    });
  }

  // Variant C — tiny far sparks (4) — faster
  for (let i = 0; i < 4; i++) {
    const { left, bottom } = spawnPos();
    out.push({
      id: id++,
      variant: "C",
      left, bottom,
      duration:  rand(2.5, 4.5),
      delay:    -rand(0, 5),
      driftX:    rand(-30, 30),
      rotStart:  rand(-5, 5),
      rotMid:    rand(-8, 8),
      rotEnd:    rand(-15, 15),
    });
  }

  // Variant D — splitting ember (2)
  for (let i = 0; i < 2; i++) {
    out.push({
      ...baseConfig(id++),
      variant: "D",
      duration: rand(4, 7),
    });
  }

  return out;
}

const EMBERS = buildEmbers();

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroEmbers() {
  // useMemo is a no-op here (EMBERS is static), but keeps the pattern consistent
  // with potential future dynamic behaviour
  const embers = useMemo(() => EMBERS, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-[5]"
      aria-hidden="true"
    >
      <style>{`
        /* ── Variant A & B: standard rise ──────────────────────────────── */
        @keyframes ember-rise {
          0% {
            transform: translate3d(0, 0, 0)
                       rotate(var(--rot-start, 0deg))
                       scaleY(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translate3d(0, -20px, 0)
                       rotate(var(--rot-mid, 0deg))
                       scaleY(1);
          }
          60% { opacity: 0.9; }
          100% {
            transform: translate3d(var(--drift-x, 0px), -420px, 0)
                       rotate(var(--rot-end, 0deg))
                       scaleY(0.6);
            opacity: 0;
          }
        }

        /* ── Variant C: fast tiny sparks ───────────────────────────────── */
        @keyframes ember-rise-fast {
          0%   { transform: translate3d(0, 0, 0) rotate(var(--rot-start, 0deg)); opacity: 0; }
          12%  { opacity: 0.8; transform: translate3d(0, -12px, 0) rotate(var(--rot-mid, 0deg)); }
          100% { transform: translate3d(var(--drift-x, 0px), -300px, 0) rotate(var(--rot-end, 0deg)); opacity: 0; }
        }

        /* ── Variant D: split parent mover ─────────────────────────────── */
        @keyframes split-parent-rise {
          0%   { transform: translate3d(0, 0, 0); opacity: 0; }
          8%   { opacity: 1; }
          100% { transform: translate3d(var(--drift-x, 0px), -380px, 0); opacity: 1; }
        }
        /* streak visible from 0 → 50% then fades */
        @keyframes split-streak {
          0%   { opacity: 0; }
          8%   { opacity: 1; }
          50%  { opacity: 1; }
          65%  { opacity: 0; }
          100% { opacity: 0; }
        }
        /* children appear at 50% and fan out */
        @keyframes split-child-1 {
          0%   { transform: translate3d(0, 0, 0) scale(0); opacity: 0; }
          50%  { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
          100% { transform: translate3d(-18px, -60px, 0) scale(0.4); opacity: 0; }
        }
        @keyframes split-child-2 {
          0%   { transform: translate3d(0, 0, 0) scale(0); opacity: 0; }
          50%  { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
          100% { transform: translate3d(4px, -75px, 0) scale(0.4); opacity: 0; }
        }
        @keyframes split-child-3 {
          0%   { transform: translate3d(0, 0, 0) scale(0); opacity: 0; }
          50%  { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
          100% { transform: translate3d(20px, -55px, 0) scale(0.4); opacity: 0; }
        }

        /* ── Shared classes ─────────────────────────────────────────────── */
        .ember-v-a {
          position: absolute;
          border-radius: 50%;
          will-change: transform, opacity;
          mix-blend-mode: screen;
          background: linear-gradient(to top,
            rgba(255, 100,   0, 0.9)  0%,
            rgba(255, 180,  50, 1)   40%,
            rgba(255, 240, 180, 1)   80%,
            rgba(255, 255, 220, 1)  100%
          );
          box-shadow:
            0 0 4px 1px rgba(255, 180, 50, 0.8),
            0 0 8px 2px rgba(255, 120,  0, 0.4);
        }
        .ember-v-b {
          position: absolute;
          border-radius: 50%;
          will-change: transform, opacity;
          mix-blend-mode: screen;
          background: radial-gradient(circle,
            rgba(255, 255, 220, 1)   0%,
            rgba(255, 200,  80, 0.9) 35%,
            rgba(240, 140,   0, 0.5) 65%,
            transparent             100%
          );
          box-shadow:
            0 0 6px 2px rgba(255, 200, 80, 0.7),
            0 0 12px 4px rgba(240, 140,  0, 0.3);
        }
        .ember-v-c {
          position: absolute;
          width: 1px;
          height: 3px;
          border-radius: 50%;
          will-change: transform, opacity;
          mix-blend-mode: screen;
          background: rgba(255, 200, 100, 0.8);
        }
        .ember-v-d-mover {
          position: absolute;
          width: 0;
          height: 0;
          will-change: transform, opacity;
        }
        .ember-v-d-streak {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: screen;
          background: linear-gradient(to top,
            rgba(255, 120, 0, 0.9) 0%,
            rgba(255, 220, 80, 1) 60%,
            rgba(255, 255, 200, 1) 100%
          );
          box-shadow: 0 0 5px 1px rgba(255, 180, 50, 0.9);
          transform: translateX(-50%);
        }
        .ember-v-d-child {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: screen;
          background: radial-gradient(circle,
            rgba(255, 255, 180, 1) 0%,
            rgba(255, 160, 30, 0.8) 50%,
            transparent 100%
          );
          box-shadow: 0 0 3px 1px rgba(255, 160, 30, 0.6);
          transform: translate(-50%, -50%);
        }
      `}</style>

      {embers.map((e) => {
        const baseDur = `${e.duration}s`;
        const baseDel = `${e.delay}s`;
        const cssVars: React.CSSProperties = {
          left:    `${e.left}%`,
          bottom:  `${e.bottom}%`,
          ["--drift-x"   as string]: `${e.driftX}px`,
          ["--rot-start" as string]: `${e.rotStart}deg`,
          ["--rot-mid"   as string]: `${e.rotMid}deg`,
          ["--rot-end"   as string]: `${e.rotEnd}deg`,
        };

        if (e.variant === "A") {
          return (
            <span
              key={e.id}
              className="ember-v-a"
              style={{
                ...cssVars,
                width:  `${e.width}px`,
                height: `${e.height}px`,
                animation: `ember-rise ${baseDur} ease-in-out ${baseDel} infinite`,
              }}
            />
          );
        }

        if (e.variant === "B") {
          return (
            <span
              key={e.id}
              className="ember-v-b"
              style={{
                ...cssVars,
                width:  `${e.size}px`,
                height: `${e.size}px`,
                animation: `ember-rise ${baseDur} ease-in-out ${baseDel} infinite`,
              }}
            />
          );
        }

        if (e.variant === "C") {
          return (
            <span
              key={e.id}
              className="ember-v-c"
              style={{
                ...cssVars,
                animation: `ember-rise-fast ${baseDur} ease-in-out ${baseDel} infinite`,
              }}
            />
          );
        }

        // Variant D — splitting ember
        return (
          <div
            key={e.id}
            className="ember-v-d-mover"
            style={{
              ...cssVars,
              animation: `split-parent-rise ${baseDur} ease-in-out ${baseDel} infinite`,
            }}
          >
            {/* Main streak (0 → 50%) */}
            <span
              className="ember-v-d-streak"
              style={{
                width:  "2px",
                height: "12px",
                bottom: "0",
                left:   "0",
                animation: `split-streak ${baseDur} ease-in-out ${baseDel} infinite`,
              }}
            />
            {/* Child sparks fan out from 50% */}
            <span
              className="ember-v-d-child"
              style={{
                width: "3px", height: "3px",
                bottom: "0", left: "0",
                animation: `split-child-1 ${baseDur} ease-out ${baseDel} infinite`,
              }}
            />
            <span
              className="ember-v-d-child"
              style={{
                width: "2px", height: "2px",
                bottom: "0", left: "0",
                animation: `split-child-2 ${baseDur} ease-out ${baseDel} infinite`,
              }}
            />
            <span
              className="ember-v-d-child"
              style={{
                width: "3px", height: "3px",
                bottom: "0", left: "0",
                animation: `split-child-3 ${baseDur} ease-out ${baseDel} infinite`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
