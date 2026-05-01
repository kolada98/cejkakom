import { Shield, MapPin, FileCheck } from "lucide-react";
import heroPhotoStove from "@/assets/hero-photo-stove.jpg";
import HeroEmbers from "@/components/HeroEmbers";

const headlineWords = [
  { text: "Kominictví —", gold: false },
  { text: "poctivě", gold: true },
  { text: "a podle", gold: false },
  { text: "předpisů", gold: false },
];

const badges = [
  { Icon: Shield, label: "Revizní technik spalinových cest" },
  { Icon: MapPin, label: "Brno a okolí od 2013" },
  { Icon: FileCheck, label: "Revizní zpráva na místě" },
];

// ─── Smoke puff configs (static, randomised on module load) ────────────────
const SMOKE_PUFFS = [
  { id: 0, size: 30, left: 45, delay: "0s",   drift: "8px",   duration: "5s"   },
  { id: 1, size: 55, left: 60, delay: "1.5s", drift: "-14px", duration: "6.5s" },
  { id: 2, size: 42, left: 35, delay: "3s",   drift: "18px",  duration: "4.5s" },
  { id: 3, size: 38, left: 52, delay: "4.5s", drift: "-9px",  duration: "7s"   },
] as const;

// ─── Pipe spark configs (randomised on module load) ───────────────────────
function _r(min: number, max: number) { return Math.random() * (max - min) + min; }

const PIPE_SPARKS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  left:     _r(20, 80),
  bottom:   _r(0, 20),
  width:    _r(1.2, 2.2),
  height:   _r(6, 11),
  duration: _r(2, 4),
  delay:    -_r(0, 4),
  driftX:   _r(-22, 22),
  rotStart: _r(-8, 8),
  rotMid:   _r(-12, 12),
  rotEnd:   _r(-20, 20),
}));

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#0A1D3A" }}
    >
      {/* Subtle warmth at top-right — very low opacity so it doesn't create a halo */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(240,160,0,0.04) 0%, transparent 50%)",
        }}
      />
      {/* Radial bottom-left navy depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 10% 90%, rgba(15,42,82,0.6) 0%, transparent 70%)",
        }}
      />
      {/* Subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /></filter><rect width='240' height='240' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />
      {/* Rising ember particles */}
      <HeroEmbers />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 grid lg:grid-cols-[60fr_40fr] gap-12 items-center">
        {/* LEFT — text */}
        <div className="max-w-3xl">
          {/* Gold accent line + eyebrow */}
          <div className="flex items-center gap-4 mb-6 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <span className="block bg-gold" style={{ width: "40px", height: "4px" }} />
            <span
              className="eyebrow"
              style={{ fontSize: "13px", letterSpacing: "0.3em", fontWeight: 600 }}
            >
              Kominictví od roku 2013
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-black animate-fade-up lg:whitespace-nowrap"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 2.5vw, 2.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              animationDelay: "0.15s",
            }}
          >
            {headlineWords[0].text}{" "}
            <span className="text-gold">{headlineWords[1].text}</span>{" "}
            {headlineWords[2].text} {headlineWords[3].text}
          </h1>

          {/* Subheadline */}
          <p
            className="animate-fade-up mt-8"
            style={{
              animationDelay: "0.65s",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "1.125rem",
              color: "#B8C5D9",
              maxWidth: "560px",
              lineHeight: 1.7,
            }}
          >
            Výstavba, vložkování, čištění a revize komínů v Brně a okolí.
            Certifikovaný kominík s 13 lety praxe.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ marginTop: "3rem", animationDelay: "0.85s" }}
          >
            <button onClick={() => scrollTo("kontakt")} className="btn-primary group">
              Nezávazná poptávka
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            <button onClick={() => scrollTo("sluzby")} className="btn-secondary group">
              Naše služby
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap gap-6 animate-fade-up"
            style={{ marginTop: "4rem", animationDelay: "1.05s" }}
          >
            {badges.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span
                  className="inline-flex items-center justify-center rounded-lg"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "rgba(240,160,0,0.1)",
                    border: "1px solid rgba(240,160,0,0.2)",
                  }}
                >
                  <Icon size={20} className="text-gold" />
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#B8C5D9",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — photo, pushed to right edge */}
        <div className="hidden lg:flex items-center justify-end relative">
          <style>{`
            @keyframes smoke-rise {
              0%   { transform: translate3d(0, 0, 0) scale(0.5); opacity: 0; }
              20%  { opacity: 0.4; }
              80%  { opacity: 0.12; }
              100% { transform: translate3d(var(--smoke-drift, 0px), -180px, 0) scale(2.5); opacity: 0; }
            }
            @keyframes pipe-spark-rise {
              0%   { transform: translate3d(0, 0, 0) rotate(var(--rot-start, 0deg)) scaleY(0.5); opacity: 0; }
              10%  { opacity: 1; transform: translate3d(0, -15px, 0) rotate(var(--rot-mid, 0deg)) scaleY(1); }
              60%  { opacity: 0.85; }
              100% { transform: translate3d(var(--drift-x, 0px), -220px, 0) rotate(var(--rot-end, 0deg)) scaleY(0.5); opacity: 0; }
            }
            .pipe-smoke-puff {
              position: absolute;
              border-radius: 50%;
              filter: blur(8px);
              will-change: transform, opacity;
              background: radial-gradient(
                ellipse at center,
                rgba(180, 180, 180, 0.25) 0%,
                rgba(150, 150, 150, 0.15) 40%,
                rgba(120, 120, 120, 0.05) 70%,
                transparent 100%
              );
            }
            .pipe-spark-el {
              position: absolute;
              border-radius: 50%;
              will-change: transform, opacity;
              mix-blend-mode: screen;
              background: linear-gradient(to top,
                rgba(255, 100,   0, 0.9)  0%,
                rgba(255, 180,  50, 1)   40%,
                rgba(255, 240, 180, 1)   80%,
                rgba(255, 255, 220, 1)  100%
              );
              box-shadow:
                0 0 4px 1px rgba(255, 180, 50, 0.8),
                0 0 8px 2px rgba(255, 120,  0, 0.4);
            }
          `}</style>

          {/* Floating wrapper — animation moves photo + plume together */}
          <div
            className="relative animate-hero-float max-w-lg w-full"
            style={{ zIndex: 3 }}
          >
            {/* Smoke + pipe-spark plume — sits above the photo, at pipe position (~45% from left) */}
            <div
              className="pointer-events-none absolute"
              style={{
                bottom: "100%",
                left: "calc(45% - 60px)",
                width: "120px",
                height: "200px",
                zIndex: 4,
              }}
              aria-hidden="true"
            >
              {/* Smoke puffs */}
              {SMOKE_PUFFS.map((puff) => (
                <div
                  key={puff.id}
                  className="pipe-smoke-puff"
                  style={{
                    width:    `${puff.size}px`,
                    height:   `${puff.size}px`,
                    left:     `${puff.left}px`,
                    bottom:   "0",
                    ["--smoke-drift" as string]: puff.drift,
                    animation: `smoke-rise ${puff.duration} ease-out ${puff.delay} infinite`,
                  }}
                />
              ))}

              {/* Pipe sparks */}
              {PIPE_SPARKS.map((s) => (
                <span
                  key={s.id}
                  className="pipe-spark-el"
                  style={{
                    width:    `${s.width}px`,
                    height:   `${s.height}px`,
                    left:     `${s.left}px`,
                    bottom:   `${s.bottom}px`,
                    ["--drift-x"   as string]: `${s.driftX}px`,
                    ["--rot-start" as string]: `${s.rotStart}deg`,
                    ["--rot-mid"   as string]: `${s.rotMid}deg`,
                    ["--rot-end"   as string]: `${s.rotEnd}deg`,
                    animation: `pipe-spark-rise ${s.duration}s ease-in-out ${s.delay}s infinite`,
                  }}
                />
              ))}
            </div>

            {/* Photo + gradient overlays — overflow:hidden clips to rounded corners */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "3 / 4",
                maxHeight: "70vh",
                boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={heroPhotoStove}
                alt="Moderní krbová kamna s nerezovým komínovým průduchem"
                className="w-full h-full object-cover"
                style={{ display: "block", objectPosition: "center" }}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              {/* Horizontal gradient: blends left edge into navy */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(
                    to right,
                    rgb(10, 29, 58)          0%,
                    rgba(10, 29, 58, 0.92)  10%,
                    rgba(10, 29, 58, 0.6)   25%,
                    rgba(10, 29, 58, 0.2)   50%,
                    transparent             75%
                  )`,
                  zIndex: 10,
                }}
                aria-hidden="true"
              />
              {/* Vertical gradient: cinematic top/bottom depth */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(
                    to bottom,
                    rgba(10, 29, 58, 0.3)  0%,
                    transparent            30%,
                    transparent            70%,
                    rgba(10, 29, 58, 0.4) 100%
                  )`,
                  zIndex: 11,
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-fade-up"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="animate-scroll-bounce flex flex-col items-center gap-1">
          <span
            className="select-none"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "rgba(184,197,217,0.55)",
            }}
          >
            Posun
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold/70">
            <path
              d="M12 5v14M5 15l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
