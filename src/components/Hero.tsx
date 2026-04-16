import heroIllustration from "@/assets/hero-illustration.png";
import HeroEmbers from "@/components/HeroEmbers";

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      <HeroEmbers />

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)",
        }}
      />

      {/* Large gold radial halo behind illustration */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: "0%",
          right: "-2%",
          width: "820px",
          height: "820px",
          background:
            "radial-gradient(circle, rgba(251,146,60,0.35) 0%, rgba(251,146,60,0.10) 30%, transparent 65%)",
          filter: "blur(40px)",
          borderRadius: "50%",
        }}
      />

      {/* Subtle bottom-left darkness */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          bottom: "-8%",
          left: "-8%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(6,13,24,0.8) 0%, rgba(6,13,24,0.2) 50%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Main content grid */}
      <div className="relative z-10 container mx-auto px-4 flex-1 grid lg:grid-cols-[1fr_0.75fr] gap-8 items-center pt-32 pb-20">
        {/* Left: Text column */}
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div
            className="text-xs uppercase tracking-[0.3em] text-gold mb-7 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            — REVIZE · ČIŠTĚNÍ · FRÉZOVÁNÍ ·
          </div>

          {/* Headline */}
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tight mb-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Kominické
            <br />
            <span className="text-gold">služby,</span>
            <br />
            na které
            <br />
            je spoleh.
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-10 animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            Výstavba, vložkování, čištění a revize komínů v Brně a okolí.
            Certifikovaný kominík s 13 lety praxe.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-6 mb-12 animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            <button
              onClick={() => scrollTo("kontakt")}
              className="group inline-flex items-center gap-3 bg-gold text-navy font-bold text-base px-8 py-4 rounded-md hover:opacity-90 transition-all duration-300 min-h-[52px]"
            >
              Nezávazná poptávka
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            <button
              onClick={() => scrollTo("sluzby")}
              className="group inline-flex items-center gap-2 text-white/75 font-medium hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-white/25 hover:decoration-gold/60"
            >
              Naše služby
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>

          {/* Trust badges strip */}
          <div
            className="flex flex-wrap items-center gap-x-0 gap-y-2 text-[11px] uppercase tracking-wider text-white/45 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <span>Certifikovaný RTSC technik</span>
            <span className="mx-3 text-gold/35">·</span>
            <span>Revizní zpráva na místě</span>
            <span className="mx-3 text-gold/35">·</span>
            <span>Od roku 2013</span>
            <span className="mx-3 text-gold/35">·</span>
            <span>Brno a okolí</span>
          </div>
        </div>

        {/* Right: Illustration */}
        <div
          className="hidden lg:flex items-center justify-center relative animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <img
            src={heroIllustration}
            alt="Ilustrace nerezového komínu"
            className="w-full max-w-[480px] aspect-square object-contain relative z-10"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="relative z-10 flex flex-col items-center gap-2 pb-10 animate-fade-up"
        style={{ animationDelay: "1.1s" }}
      >
        <div className="animate-scroll-bounce flex flex-col items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 select-none">
            POSUN
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gold/65"
          >
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

      {/* Gradient divider bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background: "linear-gradient(90deg, transparent, #FB923C, transparent)",
          backgroundSize: "200% 100%",
          animation: "gradient-flow 4s ease-in-out infinite",
        }}
      />
    </section>
  );
}
