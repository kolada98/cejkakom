import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import panCejka from "@/assets/pan_cejka.jpg";

const stats = [
  { value: "2013", label: "OD ROKU" },
  { value: "RTSC", label: "CERTIFIKÁT" },
  { value: "BRNO", label: "PŮSOBÍME" },
];

export default function About() {
  const ref = useScrollAnimation();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="o-nas"
      className="section-py bg-secondary relative overflow-hidden"
    >
      {/* Gold radial glow — top right */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] opacity-100"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(251,146,60,0.08), transparent 55%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Section header */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-gold mb-3">
            — 02 / O NÁS
          </div>
          <h2 className="section-heading">O Čejkakom</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Portrait with corner frames */}
          <div className="flex items-start justify-center lg:justify-start">
            <div className="relative w-full max-w-sm">
              {/* Gold corner frames */}
              <div
                className="absolute -top-[6px] -left-[6px] w-[28px] h-[28px] pointer-events-none z-10"
                style={{ borderTop: "2px solid #FB923C", borderLeft: "2px solid #FB923C" }}
              />
              <div
                className="absolute -bottom-[6px] -right-[6px] w-[28px] h-[28px] pointer-events-none z-10"
                style={{ borderBottom: "2px solid #FB923C", borderRight: "2px solid #FB923C" }}
              />
              <div
                className="absolute -top-[6px] -right-[6px] w-[28px] h-[28px] pointer-events-none z-10"
                style={{ borderTop: "2px solid rgba(251,146,60,0.35)", borderRight: "2px solid rgba(251,146,60,0.35)" }}
              />
              <div
                className="absolute -bottom-[6px] -left-[6px] w-[28px] h-[28px] pointer-events-none z-10"
                style={{ borderBottom: "2px solid rgba(251,146,60,0.35)", borderLeft: "2px solid rgba(251,146,60,0.35)" }}
              />

              {/* Gold glow behind photo */}
              <div
                className="absolute inset-0 -z-10 rounded-lg"
                style={{
                  background: "radial-gradient(circle at center, rgba(251,146,60,0.15) 0%, transparent 70%)",
                  transform: "scale(1.1)",
                  filter: "blur(16px)",
                }}
              />

              <div className="overflow-hidden rounded-lg border border-border">
                <img
                  src={panCejka}
                  alt="Ing. Roman Čejka — certifikovaný kominík"
                  className="aspect-[3/4] w-full object-cover"
                  style={{ filter: "brightness(0.95)" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Right: Text + stats */}
          <div className="flex flex-col justify-center">
            <span className="text-gold font-semibold text-xs uppercase tracking-wider mb-2">
              CERTIFIKOVANÝ REVIZNÍ TECHNIK SPALINOVÝCH CEST
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mt-1 mb-8 tracking-tight">
              Ing. Roman Čejka
            </h3>

            <p className="text-lg leading-relaxed text-white/80 max-w-prose mb-5">
              Kominictví dělám od roku 2013. Za tu dobu jsem prošel stovky domácností a realizoval
              zakázky od běžného čištění až po výstavbu komínových systémů pro kondenzační kotle a
              dřevostavby.
            </p>
            <p className="text-lg leading-relaxed text-white/80 max-w-prose mb-12">
              Jsem certifikovaný revizní technik spalinových cest — vydávám výchozí i pravidelné
              revizní zprávy v souladu s vyhláškou č. 34/2016 Sb.
            </p>

            {/* Big stat badges */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 divide-x divide-gold/20"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center px-4 first:pl-0 last:pr-0 ${
                    statsVisible ? "animate-fade-up" : "opacity-0"
                  }`}
                  style={statsVisible ? { animationDelay: `${i * 0.15}s` } : {}}
                >
                  <div className="text-5xl md:text-6xl font-bold text-gold leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
