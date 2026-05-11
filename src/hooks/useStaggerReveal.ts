import { useEffect, useRef } from "react";

/**
 * Stagger-reveals all `[data-stagger]` children of the returned ref element
 * when it scrolls into view.
 *
 * Resilience guarantees:
 * 1. If IntersectionObserver is unavailable the children are made visible
 *    immediately on mount without animation.
 * 2. A 2 500 ms safety timeout forces visibility if the IO callback never
 *    fires (e.g. already in viewport, very slow devices).
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  staggerMs: number = 80
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-stagger]")
    );

    // Set initial hidden state for each stagger item.
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition =
        "opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)";
    });

    // Helper: reveal all items instantly (fallback / timeout path).
    const revealAll = () => {
      items.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.transition = "none";
      });
    };

    // Animated stagger reveal.
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const staggerReveal = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      items.forEach((el, i) => {
        window.setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * staggerMs);
      });
      observer?.unobserve(container);
    };

    // Fallback for environments without IntersectionObserver.
    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        staggerReveal();
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    // Safety timeout: if IO hasn't fired after 2 500 ms, reveal everything.
    timeoutId = setTimeout(revealAll, 2500);

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [staggerMs]);

  return ref;
}
