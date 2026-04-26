import { useMemo } from "react";

interface ParticleConfig {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  sign: 1 | -1;
  isSpark: boolean;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function HeroEmbers() {
  const particles = useMemo<ParticleConfig[]>(() => {
    const arr: ParticleConfig[] = [];
    // 19 small embers (2-5px, 4-8s)
    for (let i = 0; i < 19; i++) {
      arr.push({
        id: i,
        left: rand(0, 100),
        size: rand(2, 5),
        duration: rand(4, 8),
        delay: -rand(0, 8),
        sway: rand(15, 35),
        sign: Math.random() > 0.5 ? 1 : -1,
        isSpark: false,
      });
    }
    // 3 larger sparks (8-12px, 8-12s)
    for (let i = 0; i < 3; i++) {
      arr.push({
        id: 100 + i,
        left: rand(10, 90),
        size: rand(8, 12),
        duration: rand(8, 12),
        delay: -rand(0, 12),
        sway: rand(20, 40),
        sign: Math.random() > 0.5 ? 1 : -1,
        isSpark: true,
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      <style>{`
        @keyframes ember-rise-1 {
          0%   { transform: translate3d(0, 0, 0) scale(0.5); opacity: 0; }
          15%  { opacity: 1; transform: translate3d(var(--sway, 10px), -60px, 0) scale(1); }
          50%  { transform: translate3d(calc(var(--sway) * -1), -220px, 0) scale(0.95) rotate(180deg); }
          85%  { opacity: 0.85; transform: translate3d(calc(var(--sway) * 0.6), -360px, 0) scale(0.6) rotate(300deg); }
          100% { transform: translate3d(0, -440px, 0) scale(0.2) rotate(360deg); opacity: 0; }
        }
        @keyframes ember-rise-2 {
          0%   { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
          18%  { opacity: 1; transform: translate3d(calc(var(--sway) * -1), -70px, 0) scale(1); }
          45%  { transform: translate3d(var(--sway), -200px, 0) scale(1) rotate(-180deg); }
          80%  { opacity: 0.7; transform: translate3d(calc(var(--sway) * -0.5), -340px, 0) scale(0.55) rotate(-300deg); }
          100% { transform: translate3d(0, -420px, 0) scale(0.25) rotate(-360deg); opacity: 0; }
        }
        @keyframes ember-rise-3 {
          0%   { transform: translate3d(0, 0, 0) scale(0.6); opacity: 0; }
          12%  { opacity: 1; transform: translate3d(var(--sway), -50px, 0) scale(1); }
          40%  { transform: translate3d(0, -180px, 0) scale(1.05) rotate(90deg); }
          70%  { transform: translate3d(calc(var(--sway) * 0.7), -300px, 0) scale(0.7) rotate(180deg); }
          100% { transform: translate3d(0, -400px, 0) scale(0.3) rotate(270deg); opacity: 0; }
        }
        .ember {
          position: absolute;
          bottom: 0;
          border-radius: 50%;
          will-change: transform, opacity;
          background: radial-gradient(circle at 35% 35%, #FFE1A6 0%, #FFB347 45%, #E8B14B 100%);
          box-shadow:
            0 0 12px 2px rgba(255,179,71,0.55),
            0 0 24px 4px rgba(232,177,75,0.3);
        }
        .ember-spark {
          box-shadow:
            0 0 18px 4px rgba(255,179,71,0.7),
            0 0 36px 8px rgba(232,177,75,0.45);
        }
      `}</style>

      {particles.map((p, i) => {
        const keyframe = i % 3 === 0 ? "ember-rise-1" : i % 3 === 1 ? "ember-rise-2" : "ember-rise-3";
        const easings = [
          "cubic-bezier(0.2, 0.6, 0.4, 1)",
          "cubic-bezier(0.4, 0.1, 0.2, 1)",
          "cubic-bezier(0.1, 0.7, 0.3, 0.95)",
        ];
        return (
          <span
            key={p.id}
            className={`ember${p.isSpark ? " ember-spark" : ""}`}
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              ["--sway" as string]: `${p.sway * p.sign}px`,
              animation: `${keyframe} ${p.duration}s ${easings[i % 3]} ${p.delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
