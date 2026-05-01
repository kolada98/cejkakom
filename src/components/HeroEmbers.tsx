import { useMemo } from "react";

type SizeCategory = "small" | "medium" | "large";

interface SparkConfig {
  id: number;
  left: number;
  bottom: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
  driftX: number;
  rotStart: number;
  rotMid: number;
  rotEnd: number;
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const SIZE_DIMS: Record<SizeCategory, { w: number; hMin: number; hMax: number }> = {
  small:  { w: 1.5, hMin: 7,  hMax: 9  },
  medium: { w: 2.5, hMin: 10, hMax: 14 },
  large:  { w: 3.5, hMin: 14, hMax: 18 },
};

/**
 * Spawn position with weighted zone distribution:
 * 65% right (photo area): x 50–90%, bottom 5–40%
 * 25% center:             x 30–55%, bottom 10–45%
 * 10% left/scattered:     x  5–30%, bottom 15–60%
 */
function spawnPosition(): { left: number; bottom: number } {
  const r = Math.random();
  if (r < 0.65) {
    return { left: rand(50, 90), bottom: rand(5, 40) };
  } else if (r < 0.90) {
    return { left: rand(30, 55), bottom: rand(10, 45) };
  } else {
    return { left: rand(5, 30), bottom: rand(15, 60) };
  }
}

export default function HeroEmbers() {
  const sparks = useMemo<SparkConfig[]>(() => {
    const arr: SparkConfig[] = [];
    let id = 0;

    const plan: Array<[SizeCategory, number]> = [
      ["small",  13],
      ["medium",  7],
      ["large",   2],
    ];

    for (const [cat, count] of plan) {
      const { w, hMin, hMax } = SIZE_DIMS[cat];
      for (let i = 0; i < count; i++) {
        const { left, bottom } = spawnPosition();
        arr.push({
          id: id++,
          left,
          bottom,
          width: w,
          height: rand(hMin, hMax),
          duration: rand(4, 9),
          delay: -rand(0, 10),
          driftX: rand(-40, 40),
          rotStart: rand(-8, 8),
          rotMid:   rand(-12, 12),
          rotEnd:   rand(-20, 20),
        });
      }
    }

    return arr;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]" aria-hidden="true">
      <style>{`
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
          60% {
            opacity: 0.9;
          }
          100% {
            transform: translate3d(var(--drift-x, 0px), -400px, 0)
                       rotate(var(--rot-end, 0deg))
                       scaleY(0.6);
            opacity: 0;
          }
        }
        .ember-spark {
          position: absolute;
          border-radius: 50%;
          will-change: transform, opacity;
          mix-blend-mode: screen;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 220, 1)  0%,
            rgba(255, 200,  80, 1) 30%,
            rgba(240, 160,   0, 0.9) 70%,
            rgba(200, 100,   0, 0)  100%
          );
          box-shadow: 0 0 4px 1px rgba(255, 180, 50, 0.8);
        }
      `}</style>

      {sparks.map((s) => (
        <span
          key={s.id}
          className="ember-spark"
          style={{
            left:   `${s.left}%`,
            bottom: `${s.bottom}%`,
            width:  `${s.width}px`,
            height: `${s.height}px`,
            ["--rot-start" as string]: `${s.rotStart}deg`,
            ["--rot-mid"   as string]: `${s.rotMid}deg`,
            ["--rot-end"   as string]: `${s.rotEnd}deg`,
            ["--drift-x"   as string]: `${s.driftX}px`,
            animation: `ember-rise ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
