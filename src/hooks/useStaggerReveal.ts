import { useEffect, useRef } from "react";

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
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition =
        "opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        items.forEach((el, i) => {
          const delay = i * staggerMs;
          window.setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
        });
        observer.unobserve(container);
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}
