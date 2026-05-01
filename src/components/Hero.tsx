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

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#0A1D3A" }}
    >
      {/* Layer 2: radial top-right gold halo */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 85% 15%, rgba(240,160,0,0.18) 0%, transparent 60%)",
        }}
      />
      {/* Layer 3: radial bottom-left navy depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 10% 90%, rgba(15,42,82,0.6) 0%, transparent 70%)",
        }}
      />
      {/* Layer 4: subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' /></filter><rect width='240' height='240' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />
      {/* Layer 5: rising embers */}
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

          {/* Headline with word-by-word stagger */}
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

        {/* RIGHT — photo */}
        <div className="hidden lg:flex items-center justify-center relative">
          {/* Floating wrapper — max-w-lg, float animation applied here */}
          <div
            className="relative animate-hero-float max-w-lg w-full"
            style={{ zIndex: 3 }}
          >
            {/* Photo container — overflow:hidden clips img and overlays to rounded corners */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "3 / 4",
                maxHeight: "70vh",
                border: "1px solid rgba(240,160,0,0.2)",
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
              {/* Horizontal gradient: strong left-to-right blend into navy */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(
                    to right,
                    rgb(10, 29, 58) 0%,
                    rgba(10, 29, 58, 0.85) 15%,
                    rgba(10, 29, 58, 0.5) 35%,
                    rgba(10, 29, 58, 0.15) 60%,
                    transparent 100%
                  )`,
                  zIndex: 10,
                }}
                aria-hidden="true"
              />
              {/* Vertical gradient: cinematic top/bottom depth fade */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(
                    to bottom,
                    rgba(10, 29, 58, 0.3) 0%,
                    transparent 30%,
                    transparent 70%,
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
