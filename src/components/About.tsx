import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import panCejka from "@/assets/pan_cejka.jpg";

type Stat = { value: string; label: string; counter?: { to: number; suffix?: string } };

const stats: Stat[] = [
  { value: "2013", label: "ROK VZNIKU" },
  { value: "13+", label: "LET PRAXE", counter: { to: 13, suffix: "+" } },
  { value: "tisíce", label: "DOMÁCNOSTÍ" },
];

export default function About() {
  const ref = useScrollAnimation();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counter, setCounter] = useState(0);

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

  useEffect(() => {
    if (!statsVisible) return;
    const target = 13;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounter(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [statsVisible]);

  return (
    <section
      id="o-nas"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0A1D3A" }}
    >
      <div
        className="pointer-events-none absolute top-0 right-0"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle at 100% 0%, rgba(240,165,0,0.08), transparent 55%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — portrait with premium frame */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative" style={{ maxWidth: "440px", width: "100%" }}>
              {/* Gold glow behind photo */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(240,165,0,0.22) 0%, transparent 70%)",
                  transform: "scale(1.2)",
                  filter: "blur(24px)",
                }}
              />

              {/* L-shaped corner accents */}
              <div
                className="absolute -top-3 -left-3 pointer-events-none"
                style={{
                  width: 32,
                  height: 32,
                  borderTop: "3px solid #F0A500",
                  borderLeft: "3px solid #F0A500",
                  borderTopLeftRadius: "4px",
                  zIndex: 10,
                }}
              />
              <div
                className="absolute -bottom-3 -right-3 pointer-events-none"
                style={{
                  width: 32,
                  height: 32,
                  borderBottom: "3px solid #F0A500",
                  borderRight: "3px solid #F0A500",
                  borderBottomRightRadius: "4px",
                  zIndex: 10,
                }}
              />

              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(240,165,0,0.2)",
                }}
              >
                <img
                  src={panCejka}
                  alt="Ing. Roman Čejka — certifikovaný kominík"
                  className="aspect-[3/4] w-full object-cover"
                  style={{ filter: "brightness(0.96)" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — text + stats */}
          <div>
            <div
              className="eyebrow"
              style={{ fontSize: "13px", letterSpacing: "0.3em", fontWeight: 700 }}
            >
              Certifikovaný revizní technik
            </div>

            <h2
              className="text-white"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              Ing. Roman Čejka
            </h2>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "1.0625rem",
                color: "#B8C5D9",
                lineHeight: 1.75,
              }}
            >
              Kominictví dělám od roku 2013. Za tu dobu jsem prošel tisíce
              domácností a realizoval zakázky od běžného čištění až po výstavbu
              komínových systémů pro všechny druhy paliv. Realizujeme komíny pro
              kamna, krby a kotle na dřevo, pelety a topné oleje, stejně jako
              komíny pro kondenzační kotle. Kromě nových komínů opravujeme i
              původní komíny vložkováním tak, aby byly použitelné dle aktuálních
              norem. Jsem certifikovaný revizní technik spalinových cest —
              vydávám výchozí revize ke kolaudaci i pravidelné roční zprávy
              v souladu s vyhláškou č. 34/2016 Sb.
            </p>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="flex flex-wrap gap-8"
              style={{
                marginTop: "3rem",
                borderLeft: "0",
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={statsVisible ? "animate-fade-up" : "opacity-0"}
                  style={{
                    animationDelay: `${i * 120}ms`,
                    paddingLeft: i === 0 ? 0 : "2rem",
                    borderLeft: i === 0 ? "none" : "1px solid rgba(240,165,0,0.25)",
                  }}
                >
                  <div
                    className="text-gold"
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: 800,
                      fontSize: "2.5rem",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.counter
                      ? `${counter}${stat.counter.suffix ?? ""}`
                      : stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      color: "#7A8AA3",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      marginTop: "0.5rem",
                    }}
                  >
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
