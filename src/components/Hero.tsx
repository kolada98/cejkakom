import { Shield, MapPin, FileCheck } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";
import HeroEmbers from "@/components/HeroEmbers";

const headlineWords = [
  { text: "Kominictví —", gold: false },
  { text: "poctivě", gold: true },
  { text: "a podle", gold: false },
  { text: "předpisů.", gold: false },
];

const badges = [
  { Icon: Shield, label: "Certifikovaný RTSC technik" },
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
            "radial-gradient(circle at 85% 15%, rgba(232,177,75,0.18) 0%, transparent 60%)",
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
            className="font-black"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            <span className="block animate-fade-up" style={{ animationDelay: "0.15s" }}>
              {headlineWords[0].text}
            </span>
            <span className="block animate-fade-up" style={{ animationDelay: "0.30s" }}>
              <span className="text-gold">{headlineWords[1].text}</span>{" "}
              {headlineWords[2].text}
            </span>
            <span className="block animate-fade-up" style={{ animationDelay: "0.45s" }}>
              {headlineWords[3].text}
            </span>
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
                    backgroundColor: "rgba(232,177,75,0.1)",
                    border: "1px solid rgba(232,177,75,0.2)",
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

        {/* RIGHT — illustration */}
        <div className="hidden lg:flex items-center justify-center relative">
          {/* Warm glow behind chimney */}
          <div
            className="pointer-events-none absolute"
            style={{
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(255,150,50,0.28) 0%, rgba(232,177,75,0.1) 35%, transparent 70%)",
              filter: "blur(20px)",
              borderRadius: "50%",
              zIndex: 1,
            }}
          />

          {/* Heat shimmer near top of chimney */}
          <div
            className="pointer-events-none absolute animate-heat-shimmer"
            style={{
              top: "12%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "40px",
              background:
                "radial-gradient(ellipse, rgba(255,200,130,0.35) 0%, transparent 70%)",
              zIndex: 2,
            }}
          />

          <img
            src={heroIllustration}
            alt="Ilustrace nerezového komínu"
            className="w-full max-w-2xl aspect-square object-contain relative animate-chimney-float"
            style={{ zIndex: 3 }}
            loading="eager"
            fetchPriority="high"
          />
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
