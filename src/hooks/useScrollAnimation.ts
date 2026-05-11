import { useEffect, useRef } from "react";

/**
 * Fades the returned ref element in when it scrolls into view.
 *
 * Resilience guarantees:
 * 1. If IntersectionObserver is unavailable (very old browsers) the element
 *    is made visible immediately on mount.
 * 2. A 2 500 ms safety timeout forces visibility if the IO callback never
 *    fires (e.g. content already in viewport before observer attaches, or
 *    very slow devices where the callback is delayed).
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Helper: make the element visible immediately (no animation).
    const reveal = () => {
      el.classList.add("animation-done");
    };

    // Animate reveal — adds the fade-up class and removes the safety timeout.
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const animatedReveal = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      el.classList.add("animate-fade-up");
      observer?.unobserve(el);
    };

    // Fallback for environments without IntersectionObserver.
    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animatedReveal();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    // Safety timeout: if IO hasn't fired after 2 500 ms, show the content.
    timeoutId = setTimeout(reveal, 2500);

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);

  return ref;
}
