import { useEffect, useRef } from "react";

interface Ember {
  baseX: number;
  x: number;
  y: number;
  vy: number;
  size: number;
  opacity: number;
  age: number;
  maxAge: number;
  glow: boolean;
  swayPhase: number;
  swayAmp: number;
  swayFreq: number;
}

export default function HeroEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = () => window.innerWidth < 768;

    // Spawn near the chimney base area (right ~50% of canvas) and random elsewhere
    const spawnEmber = (): Ember => {
      // Bias toward right half where the hero illustration sits
      const rightBias = Math.random() > 0.35;
      const spawnX = rightBias
        ? canvas.width * 0.45 + Math.random() * canvas.width * 0.55
        : Math.random() * canvas.width * 0.45;

      const size = 2 + Math.random() * 4; // 2–6 px
      // Slower to faster rise: 4s–9s → ~240–540 frames at 60fps
      const maxAge = 240 + Math.random() * 300;

      return {
        baseX: spawnX,
        x: spawnX,
        y: canvas.height + Math.random() * 30,
        vy: -(0.4 + Math.random() * 1.0),
        size,
        opacity: 0,
        age: 0,
        maxAge,
        glow: Math.random() > 0.4,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 10 + Math.random() * 25,
        swayFreq: 0.015 + Math.random() * 0.025,
      };
    };

    const count = isMobile() ? 12 : 18;
    const embers: Ember[] = [];
    for (let i = 0; i < count; i++) {
      const e = spawnEmber();
      // Stagger initial positions so they don't all start at bottom
      e.y = Math.random() * canvas.height;
      e.age = Math.random() * e.maxAge * 0.7;
      embers.push(e);
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.age++;
        e.y += e.vy;
        // Sinusoidal sway for organic left-right drift
        e.x = e.baseX + Math.sin(e.swayPhase + e.age * e.swayFreq) * e.swayAmp;

        // Opacity: fade in 0–15%, hold, fade out 80–100%
        const progress = e.age / e.maxAge;
        if (progress < 0.15) {
          e.opacity = progress / 0.15;
        } else if (progress < 0.8) {
          e.opacity = 1;
        } else {
          e.opacity = (1 - progress) / 0.2;
        }

        if (e.age >= e.maxAge || e.y < -20) {
          embers[i] = spawnEmber();
          continue;
        }

        // Core dot — warm amber/golden
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,146,60,${(e.opacity * 0.95).toFixed(3)})`;
        ctx.fill();

        // Inner bright white-hot center on larger particles
        if (e.size > 3.5) {
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,220,160,${(e.opacity * 0.7).toFixed(3)})`;
          ctx.fill();
        }

        if (e.glow) {
          // Wide soft glow halo
          const haloSize = e.size * 5;
          const gradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, haloSize);
          gradient.addColorStop(0, `rgba(251,146,60,${(e.opacity * 0.35).toFixed(3)})`);
          gradient.addColorStop(0.4, `rgba(240,120,30,${(e.opacity * 0.15).toFixed(3)})`);
          gradient.addColorStop(1, "rgba(251,146,60,0)");
          ctx.beginPath();
          ctx.arc(e.x, e.y, haloSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } else {
          // Smaller soft halo for non-glow particles
          const miniHalo = e.size * 3;
          ctx.beginPath();
          ctx.arc(e.x, e.y, miniHalo, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251,146,60,${(e.opacity * 0.1).toFixed(3)})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
