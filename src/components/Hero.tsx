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

// ─── Smoke puff configs ─────────────────────────────────────────────────────
// 5 puffs, staggered delays for a continuous plume.
// Size (40px) and gradient live in .pipe-smoke-puff CSS class;
// leftOff offsets within the 120px container so puffs spread naturally.
const SMOKE_PUFFS = [
  { id: 0, delay: "0s",   drift: "15px",  duration: "6s",   leftOff: 40 },
  { id: 1, delay: "1.2s", drift: "-20px", duration: "7s",   leftOff: 52 },
  { id: 2, delay: "2.5s", drift: "12px",  duration: "5.5s", leftOff: 35 },
  { id: 3, delay: "3.8s", drift: "-10px", duration: "6.5s", leftOff: 48 },
  { id: 4, delay: "5s",   drift: "18px",  duration: "5s",   leftOff: 42 },
] as const;

// ─── Pipe spark types ──────────────────────────────────────────────────────
type PipeVariant = "A" | "B" | "C" | "D";

type PipeSparkConfig =
  | { id: number; variant: "A"; left: number; bottom: number; width: number; height: number; duration: number; delay: number; driftX: number; rotStart: number; rotMid: number; rotEnd: number }
  | { id: number; variant: "B"; left: number; bottom: number; size: number;  duration: number; delay: number; driftX: number; rotStart: number; rotMid: number; rotEnd: number }
  | { id: number; variant: "C"; left: number; bottom: number; duration: number; delay: number; driftX: number; rotStart: number; rotMid: number; rotEnd: number }
  | { id: number; variant: "D"; left: number; bottom: number; duration: number; delay: number; driftX: number; rotStart: number; rotMid: number; rotEnd: number };

// ─── Helpers ────────────────────────────────────────────────────────────────
function _r(min: number, max: number) { return Math.random() * (max - min) + min; }

// ─── Pipe spark configs (randomised on module load) ─────────────────────────
// 4 × Variant A (classic streak), 2 × B (round glow),
// 2 × C (tiny), 1 × D (splitting).
// left/bottom are pixels within the 120px plume container.
const PIPE_SPARKS: PipeSparkConfig[] = [
  // ── Variant A (4)
  ...Array.from({ length: 4 }, (_, i): PipeSparkConfig => ({
    id: i, variant: "A",
    left: _r(20, 80), bottom: _r(0, 18),
    width:  _r(1.2, 2.2), height: _r(6, 11),
    duration: _r(3, 6),   delay: -_r(0, 5),
    driftX: _r(-22, 22),  rotStart: _r(-8, 8), rotMid: _r(-12, 12), rotEnd: _r(-20, 20),
  })),
  // ── Variant B (2)
  ...Array.from({ length: 2 }, (_, i): PipeSparkConfig => ({
    id: 4 + i, variant: "B",
    left: _r(25, 75), bottom: _r(0, 15),
    size: _r(3, 5),
    duration: _r(3.5, 6), delay: -_r(0, 5),
    driftX: _r(-18, 18),  rotStart: _r(-5, 5), rotMid: _r(-8, 8), rotEnd: _r(-15, 15),
  })),
  // ── Variant C (2)
  ...Array.from({ length: 2 }, (_, i): PipeSparkConfig => ({
    id: 6 + i, variant: "C",
    left: _r(20, 80), bottom: _r(0, 20),
    duration: _r(2.5, 4), delay: -_r(0, 5),
    driftX: _r(-25, 25),  rotStart: _r(-5, 5), rotMid: _r(-10, 10), rotEnd: _r(-18, 18),
  })),
  // ── Variant D (1)
  {
    id: 8, variant: "D" as const,
    left: _r(30, 70), bottom: _r(0, 15),
    duration: _r(4, 6), delay: -_r(0, 4),
    driftX: _r(-15, 15), rotStart: _r(-5, 5), rotMid: _r(-8, 8), rotEnd: _r(-12, 12),
  },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#0A1D3A" }}
    >
      {/* Subtle warmth at top-right — very low opacity */}
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
            /* ── Smoke puff rise ───────────────────────────────────────────
               scale 0.4→3.0 grows the 40px element from 16px→120px visual.
               Drift sine is approximated with a 3-stop keyframe.           */
            @keyframes smoke-rise {
              0%   { transform: translate3d(0, 0, 0) scale(0.4); opacity: 0; }
              10%  { opacity: 0.6; }
              30%  { transform: translate3d(var(--smoke-drift, 0px), -75px, 0) scale(1.2); opacity: 0.8; }
              65%  { transform: translate3d(calc(var(--smoke-drift, 0px) * -0.4), -165px, 0) scale(2.1); opacity: 0.4; }
              100% { transform: translate3d(var(--smoke-drift, 0px), -250px, 0) scale(3.0); opacity: 0; }
            }

            /* ── Pipe spark (variants A / B / C) ──────────────────────────  */
            @keyframes pipe-spark-rise {
              0%   { transform: translate3d(0,0,0) rotate(var(--rot-start,0deg)) scaleY(0.5); opacity: 0; }
              10%  { opacity: 1; transform: translate3d(0,-15px,0) rotate(var(--rot-mid,0deg)) scaleY(1); }
              60%  { opacity: 0.85; }
              100% { transform: translate3d(var(--drift-x,0px),-220px,0) rotate(var(--rot-end,0deg)) scaleY(0.5); opacity: 0; }
            }

            /* ── Pipe spark variant D (splitting) ─────────────────────────  */
            @keyframes pipe-split-rise {
              0%   { transform: translate3d(0,0,0) rotate(var(--rot-start,0deg)); opacity: 0; }
              8%   { opacity: 1; }
              100% { transform: translate3d(var(--drift-x,0px),-200px,0) rotate(var(--rot-end,0deg)); opacity: 1; }
            }
            @keyframes pipe-split-streak {
              0%  { opacity: 0; }
              8%  { opacity: 1; }
              50% { opacity: 1; }
              65% { opacity: 0; }
              100%{ opacity: 0; }
            }
            @keyframes pipe-split-child-1 {
              0%  { transform: translate3d(0,0,0) scale(0); opacity: 0; }
              50% { transform: translate3d(0,0,0) scale(1); opacity: 1; }
              100%{ transform: translate3d(-16px,-55px,0) scale(0.3); opacity: 0; }
            }
            @keyframes pipe-split-child-2 {
              0%  { transform: translate3d(0,0,0) scale(0); opacity: 0; }
              50% { transform: translate3d(0,0,0) scale(1); opacity: 1; }
              100%{ transform: translate3d(3px,-70px,0) scale(0.3); opacity: 0; }
            }
            @keyframes pipe-split-child-3 {
              0%  { transform: translate3d(0,0,0) scale(0); opacity: 0; }
              50% { transform: translate3d(0,0,0) scale(1); opacity: 1; }
              100%{ transform: translate3d(18px,-52px,0) scale(0.3); opacity: 0; }
            }

            /* ── Smoke puff ────────────────────────────────────────────────  */
            .pipe-smoke-puff {
              position: absolute;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              filter: blur(12px);
              will-change: transform, opacity;
              mix-blend-mode: screen;
              background: radial-gradient(
                ellipse at center,
                rgba(200, 200, 210, 0.45)  0%,
                rgba(180, 180, 190, 0.30) 30%,
                rgba(150, 150, 160, 0.15) 60%,
                transparent               85%
              );
            }

            /* ── Pipe spark variant A — classic streak ─────────────────────  */
            .pipe-spark-v-a {
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

            /* ── Pipe spark variant B — round glow ─────────────────────────  */
            .pipe-spark-v-b {
              position: absolute;
              border-radius: 50%;
              will-change: transform, opacity;
              mix-blend-mode: screen;
              background: radial-gradient(circle,
                rgba(255, 255, 220, 1)   0%,
                rgba(255, 200,  80, 0.9) 35%,
                rgba(240, 140,   0, 0.5) 65%,
                transparent             100%
              );
              box-shadow:
                0 0 6px 2px rgba(255, 200, 80, 0.7),
                0 0 12px 4px rgba(240, 140,  0, 0.3);
            }

            /* ── Pipe spark variant C — tiny ───────────────────────────────  */
            .pipe-spark-v-c {
              position: absolute;
              width: 1px;
              height: 3px;
              border-radius: 50%;
              will-change: transform, opacity;
              mix-blend-mode: screen;
              background: rgba(255, 200, 100, 0.85);
            }

            /* ── Pipe spark variant D — split mover ────────────────────────  */
            .pipe-spark-v-d {
              position: absolute;
              width: 0;
              height: 0;
              will-change: transform, opacity;
            }
            .pipe-spark-d-streak {
              position: absolute;
              border-radius: 50%;
              mix-blend-mode: screen;
              background: linear-gradient(to top,
                rgba(255, 120,   0, 0.9)  0%,
                rgba(255, 220,  80, 1)   60%,
                rgba(255, 255, 200, 1)  100%
              );
              box-shadow: 0 0 5px 1px rgba(255, 180, 50, 0.9);
              transform: translateX(-50%);
            }
            .pipe-spark-d-child {
              position: absolute;
              border-radius: 50%;
              mix-blend-mode: screen;
              background: radial-gradient(circle,
                rgba(255, 255, 180, 1)   0%,
                rgba(255, 160,  30, 0.8) 50%,
                transparent 100%
              );
              box-shadow: 0 0 3px 1px rgba(255, 160, 30, 0.6);
              transform: translate(-50%, -50%);
            }
          `}</style>

          {/* Floating wrapper — float animation moves photo + plume together */}
          <div
            className="relative animate-hero-float max-w-lg w-full"
            style={{ zIndex: 3 }}
          >
            {/*
              Smoke + spark plume — positioned relative to floating wrapper.
              Chimney pipe exits photo at ~52% from LEFT edge of photo.
              Container is 120px wide, centered on that point:
                left = 52% of photo width − 60px (half container)
            */}
            <div
              className="pointer-events-none absolute"
              style={{
                bottom: "100%",
                left: "calc(52% - 60px)",
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
                    left:   `${puff.leftOff}px`,
                    bottom: "0",
                    ["--smoke-drift" as string]: puff.drift,
                    animation: `smoke-rise ${puff.duration} ease-out ${puff.delay} infinite`,
                  }}
                />
              ))}

              {/* Pipe sparks — 4 visual variants */}
              {PIPE_SPARKS.map((s) => {
                const dur = `${s.duration}s`;
                const del = `${s.delay}s`;

                if (s.variant === "A") return (
                  <span
                    key={s.id}
                    className="pipe-spark-v-a"
                    style={{
                      left:   `${s.left}px`,
                      bottom: `${s.bottom}px`,
                      ["--drift-x"   as string]: `${s.driftX}px`,
                      ["--rot-start" as string]: `${s.rotStart}deg`,
                      ["--rot-mid"   as string]: `${s.rotMid}deg`,
                      ["--rot-end"   as string]: `${s.rotEnd}deg`,
                      width:  `${s.width}px`,
                      height: `${s.height}px`,
                      animation: `pipe-spark-rise ${dur} ease-in-out ${del} infinite`,
                    }}
                  />
                );

                if (s.variant === "B") return (
                  <span
                    key={s.id}
                    className="pipe-spark-v-b"
                    style={{
                      left:   `${s.left}px`,
                      bottom: `${s.bottom}px`,
                      ["--drift-x"   as string]: `${s.driftX}px`,
                      ["--rot-start" as string]: `${s.rotStart}deg`,
                      ["--rot-mid"   as string]: `${s.rotMid}deg`,
                      ["--rot-end"   as string]: `${s.rotEnd}deg`,
                      width:  `${s.size}px`,
                      height: `${s.size}px`,
                      animation: `pipe-spark-rise ${dur} ease-in-out ${del} infinite`,
                    }}
                  />
                );

                if (s.variant === "C") return (
                  <span
                    key={s.id}
                    className="pipe-spark-v-c"
                    style={{
                      left:   `${s.left}px`,
                      bottom: `${s.bottom}px`,
                      ["--drift-x"   as string]: `${s.driftX}px`,
                      ["--rot-start" as string]: `${s.rotStart}deg`,
                      ["--rot-mid"   as string]: `${s.rotMid}deg`,
                      ["--rot-end"   as string]: `${s.rotEnd}deg`,
                      animation: `pipe-spark-rise ${dur} ease-in-out ${del} infinite`,
                    }}
                  />
                );

                /* Variant D — splitting ember */
                return (
                  <div
                    key={s.id}
                    className="pipe-spark-v-d"
                    style={{
                      left:   `${s.left}px`,
                      bottom: `${s.bottom}px`,
                      ["--drift-x"   as string]: `${s.driftX}px`,
                      ["--rot-start" as string]: `${s.rotStart}deg`,
                      ["--rot-end"   as string]: `${s.rotEnd}deg`,
                      animation: `pipe-split-rise ${dur} ease-in-out ${del} infinite`,
                    }}
                  >
                    <span
                      className="pipe-spark-d-streak"
                      style={{
                        width: "2px", height: "10px",
                        bottom: "0", left: "0",
                        animation: `pipe-split-streak ${dur} ease-in-out ${del} infinite`,
                      }}
                    />
                    <span
                      className="pipe-spark-d-child"
                      style={{
                        width: "3px", height: "3px", bottom: "0", left: "0",
                        animation: `pipe-split-child-1 ${dur} ease-out ${del} infinite`,
                      }}
                    />
                    <span
                      className="pipe-spark-d-child"
                      style={{
                        width: "2px", height: "2px", bottom: "0", left: "0",
                        animation: `pipe-split-child-2 ${dur} ease-out ${del} infinite`,
                      }}
                    />
                    <span
                      className="pipe-spark-d-child"
                      style={{
                        width: "3px", height: "3px", bottom: "0", left: "0",
                        animation: `pipe-split-child-3 ${dur} ease-out ${del} infinite`,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Photo + gradient overlays — overflow:hidden clips to rounded corners */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "3 / 4",
                maxHeight: "70vh",
                /*
                  1px white at 4% opacity eliminates GPU anti-aliasing
                  flicker on the rounded corner edge during float animation.
                  No gold border — only a static dark drop shadow.
                */
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 25px 70px -20px rgba(0,0,0,0.7)",
                /* Navy placeholder while the JPG streams in — no blank/white flash */
                backgroundColor: "#0A1D3A",
              }}
            >
              <img
                src={heroPhotoStove}
                alt="Moderní krbová kamna s nerezovým komínovým průduchem"
                className="w-full h-full object-cover"
                style={{ display: "block", objectPosition: "center" }}
                loading="eager"
                fetchPriority="high"
                decoding="sync"
              />

              {/*
                Horizontal gradient — blends left edge into navy background.
                Softer falloff: lower starting opacity (0.65), transparent by 80%.
              */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(
                    to right,
                    rgba(10, 29, 58, 0.65)  0%,
                    rgba(10, 29, 58, 0.35) 20%,
                    rgba(10, 29, 58, 0.15) 40%,
                    rgba(10, 29, 58, 0.05) 60%,
                    transparent            80%
                  )`,
                  zIndex: 10,
                }}
                aria-hidden="true"
              />

              {/* Vertical gradient — cinematic top/bottom depth */}
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
