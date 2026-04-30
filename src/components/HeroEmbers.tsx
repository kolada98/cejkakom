import { useMemo } from "react";

type ParticleCategory = "small" | "medium" | "large" | "top";

interface ParticleConfig {
  id: number;
  left: number;
  bottom: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  sign: 1 | -1;
  category: ParticleCategory;
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Weighted x spawn: 70% right (50–95%), 20% centre (30–55%), 10% left (5–30%). */
function spawnLeft(): number {
  const r = Math.random();
  if (r < 0.70) return rand(50, 95);
  if (r < 0.90) return rand(30, 55);
  return rand(5, 30);
}

/**
 * Weighted bottom spawn: 80% near base (bottom 0–40% = top 60–100%),
 * 20% mid-screen (bottom 40–70% = top 30–60%).
 */
function spawnBottom(): number {
  return Math.random() < 0.8 ? rand(0, 40) : rand(40, 70);
}

const glowByCategory: Record<ParticleCategory, string> = {
  small:  "0 0 6px 1px rgba(240,160,0,0.5)",
  medium: "0 0 10px 2px rgba(240,160,0,0.6)",
  large:  "0 0 16px 4px rgba(240,160,0,0.7)",
  top:    "0 0 4px 1px rgba(240,160,0,0.4)",
};

export default function HeroEmbers() {
  const particles = useMemo<ParticleConfig[]>(() => {
    const arr: ParticleConfig[] = [];
    let id = 0;

    // 18 small embers (2–4 px, 5–9 s)
    for (let i = 0; i < 18; i++) {
      arr.push({
        id: id++,
        left: spawnLeft(),
        bottom: spawnBottom(),
        size: rand(2, 4),
        duration: rand(5, 9),
        delay: -rand(0, 9),
        sway: rand(15, 35),
        sign: Math.random() > 0.5 ? 1 : -1,
        category: "small",
      });
    }

    // 7 medium embers (5–8 px, 7–12 s)
    for (let i = 0; i < 7; i++) {
      arr.push({
        id: id++,
        left: spawnLeft(),
        bottom: spawnBottom(),
        size: rand(5, 8),
        duration: rand(7, 12),
        delay: -rand(0, 12),
        sway: rand(20, 40),
        sign: Math.random() > 0.5 ? 1 : -1,
        category: "medium",
      });
    }

    // 3 large sparks (9–14 px, 10–15 s)
    for (let i = 0; i < 3; i++) {
      arr.push({
        id: id++,
        left: spawnLeft(),
        bottom: spawnBottom(),
        size: rand(9, 14),
        duration: rand(10, 15),
        delay: -rand(0, 15),
        sway: rand(20, 40),
        sign: Math.random() > 0.5 ? 1 : -1,
        category: "large",
      });
    }

    // 8 chimney-top particles — already high, short travel, quick fade
    // x: 55–80%, y: 5–25% from top → bottom: 75–95%
    for (let i = 0; i < 8; i++) {
      arr.push({
        id: id++,
        left: rand(55, 80),
        bottom: rand(75, 95),
        size: rand(2, 3),
        duration: rand(3, 5),
        delay: -rand(0, 5),
        sway: rand(8, 20),
        sign: Math.random() > 0.5 ? 1 : -1,
        category: "top",
      });
    }

    return arr;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      <style>{`
        @keyframes ember-rise-1 {
          0%   { transform: translate3d(0, 0, 0) scale(0.5); opacity: 0; }
          10%  { opacity: 1; }
          15%  { transform: translate3d(var(--sway), -60px, 0) scale(1); }
          50%  { transform: translate3d(calc(var(--sway) * -1), -220px, 0) scale(0.95); }
          70%  { opacity: 1; }
          85%  { opacity: 0; transform: translate3d(calc(var(--sway) * 0.6), -360px, 0) scale(0.5); }
          100% { transform: translate3d(0, -440px, 0) scale(0.2); opacity: 0; }
        }
        @keyframes ember-rise-2 {
          0%   { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
          10%  { opacity: 1; }
          18%  { transform: translate3d(calc(var(--sway) * -1), -70px, 0) scale(1); }
          45%  { transform: translate3d(var(--sway), -200px, 0) scale(1); }
          70%  { opacity: 1; }
          80%  { opacity: 0; transform: translate3d(calc(var(--sway) * -0.5), -340px, 0) scale(0.5); }
          100% { transform: translate3d(0, -420px, 0) scale(0.25); opacity: 0; }
        }
        @keyframes ember-rise-3 {
          0%   { transform: translate3d(0, 0, 0) scale(0.6); opacity: 0; }
          10%  { opacity: 1; }
          12%  { transform: translate3d(var(--sway), -50px, 0) scale(1); }
          40%  { transform: translate3d(0, -180px, 0) scale(1.05); }
          70%  { opacity: 1; }
          85%  { opacity: 0; transform: translate3d(calc(var(--sway) * 0.7), -300px, 0) scale(0.6); }
          100% { transform: translate3d(0, -400px, 0) scale(0.3); opacity: 0; }
        }
        @keyframes ember-top-fade {
          0%   { transform: translate3d(0, 0, 0) scale(1); opacity: 0; }
          20%  { opacity: 0.15; transform: translate3d(calc(var(--sway) * 0.5), -15px, 0) scale(0.9); }
          60%  { opacity: 0.08; transform: translate3d(0, -40px, 0) scale(0.65); }
          100% { transform: translate3d(calc(var(--sway) * -0.3), -70px, 0) scale(0.3); opacity: 0; }
        }
        .ember-particle {
          position: absolute;
          border-radius: 50%;
          will-change: transform, opacity;
          background: radial-gradient(circle at 35% 35%, #FFE1A6 0%, #FFB347 45%, #F0A000 100%);
        }
      `}</style>

      {particles.map((p, i) => {
        const isTop = p.category === "top";
        const keyframe = isTop
          ? "ember-top-fade"
          : i % 3 === 0
          ? "ember-rise-1"
          : i % 3 === 1
          ? "ember-rise-2"
          : "ember-rise-3";
        const easings = [
          "cubic-bezier(0.2, 0.6, 0.4, 1)",
          "cubic-bezier(0.4, 0.1, 0.2, 1)",
          "cubic-bezier(0.1, 0.7, 0.3, 0.95)",
        ];
        const easing = isTop ? "ease-out" : easings[i % 3];

        return (
          <span
            key={p.id}
            className="ember-particle"
            style={{
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: glowByCategory[p.category],
              ["--sway" as string]: `${p.sway * p.sign}px`,
              animation: `${keyframe} ${p.duration}s ${easing} ${p.delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
