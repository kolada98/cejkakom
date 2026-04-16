import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  age: number;
  maxAge: number;
}

export default function HeroEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
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

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    const isMobile = () => window.innerWidth < 768;
    const count = isMobile() ? 12 : 25;

    const spawnEmber = (): Ember => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(0.3 + Math.random() * 0.9),
      size: 1 + Math.random() * 2,
      opacity: 0,
      age: 0,
      maxAge: 200 + Math.random() * 300,
    });

    const embers: Ember[] = [];
    for (let i = 0; i < count; i++) {
      const e = spawnEmber();
      // Spread initial y positions so they don't all appear at once
      e.y = Math.random() * canvas.height;
      e.age = Math.random() * e.maxAge * 0.7;
      embers.push(e);
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.age++;
        e.x += e.vx;
        e.y += e.vy;

        const progress = e.age / e.maxAge;
        // fade-in 0–20%, plateau 20–80%, fade-out 80–100%
        if (progress < 0.2) {
          e.opacity = progress / 0.2;
        } else if (progress < 0.8) {
          e.opacity = 1;
        } else {
          e.opacity = (1 - progress) / 0.2;
        }

        if (e.age >= e.maxAge || e.y < -10) {
          embers[i] = spawnEmber();
          continue;
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,146,60,${(e.opacity * 0.85).toFixed(3)})`;
        ctx.fill();

        // Soft glow halo
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,146,60,${(e.opacity * 0.12).toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
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
