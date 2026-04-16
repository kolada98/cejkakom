import { useState, useEffect, useRef } from "react";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animates a number from `start` to `target` over `durationMs`.
 * Only starts when `enabled` is true.
 * Respects prefers-reduced-motion (returns target immediately).
 */
export function useCountUp(
  target: number,
  durationMs: number,
  enabled: boolean,
  start: number = 0
): number {
  const [current, setCurrent] = useState(start);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      setCurrent(Math.round(start + eased * (target - start)));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [enabled, target, durationMs, start]);

  return current;
}
