import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import panCejka from "@/assets/pan_cejka.jpg";

export default function About() {
  const ref = useScrollAnimation();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsEnabled, setStatsEnabled] = useState(false);

  // IntersectionObserver on stats block (threshold 0.3, once)
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsEnabled(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Count-up: 2000 → 2013 over 1800ms
  const yearCount = useCountUp(2013, 1800, statsEnabled, 2000);

  return (
    <section
      id="o-nas"
      className="section-py bg-secondary relative overflow-hidden"
    >
      {/* Subtle radial gradient texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(251,146,60,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm overflow-hidden rounded-lg border border-border bg-background">
              <img
                src={panCejka}
                alt="Ing. Roman Čejka — certifikovaný kominík"
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              CERTIFIKOVANÝ REVIZNÍ TECHNIK SPALINOVÝCH CEST
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Ing. Roman Čejka</h2>

            <p className="text-muted-foreground mb-4 text-base md:text-[17px] leading-relaxed">
              Kominictví dělám od roku 2013. Za tu dobu jsem prošel stovky domácností a realizoval
              zakázky od běžného čištění až po výstavbu komínových systémů pro kondenzační kotle a
              dřevostavby.
            </p>
            <p className="text-muted-foreground mb-8 text-base md:text-[17px] leading-relaxed">
              Jsem certifikovaný revizní technik spalinových cest — vydávám výchozí i pravidelné
              revizní zprávy v souladu s vyhláškou č. 34/2016 Sb.
            </p>

            <div ref={statsRef} className="flex gap-8">
              {/* 2013 — animated count-up */}
              <div className="text-center">
                <div className="text-3xl font-extrabold text-primary">
                  {statsEnabled ? yearCount : 2013}
                </div>
                <div className="text-sm text-muted-foreground">rok vzniku</div>
              </div>

              {/* RTSC — fade-up on trigger */}
              <div
                className={`text-center ${statsEnabled ? "animate-fade-up" : ""}`}
                style={statsEnabled ? { animationDelay: "0.2s" } : {}}
              >
                <div className="text-3xl font-extrabold text-primary">RTSC</div>
                <div className="text-sm text-muted-foreground">certifikace</div>
              </div>

              {/* Brno a okolí — fade-up on trigger */}
              <div
                className={`text-center ${statsEnabled ? "animate-fade-up" : ""}`}
                style={statsEnabled ? { animationDelay: "0.4s" } : {}}
              >
                <div className="text-3xl font-extrabold text-primary whitespace-nowrap">
                  Brno a okolí
                </div>
                <div className="text-sm text-muted-foreground">servisní oblast</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
