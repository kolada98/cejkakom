import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Reviews() {
  const ref = useScrollAnimation();

  return (
    <section
      id="recenze"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0A1D3A" }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(240,160,0,0.05), transparent 65%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Centered header */}
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <div className="eyebrow mb-4">Reference</div>
          <h2 className="section-heading">Co říkají naši zákazníci</h2>
          <span className="section-title-bar center" />
        </div>

        {/* Review card */}
        <div className="mx-auto relative" style={{ maxWidth: "640px", marginTop: "4rem" }}>
          <div
            className="relative"
            style={{
              backgroundColor: "#0F2A52",
              borderLeft: "4px solid #F0A000",
              borderRadius: "12px",
              padding: "2.5rem",
            }}
          >
            {/* Decorative quote icon */}
            <Quote
              size={48}
              className="absolute pointer-events-none"
              style={{
                top: "-1rem",
                left: "-0.5rem",
                color: "rgba(240,160,0,0.25)",
              }}
              aria-hidden="true"
            />

            {/* 5 gold stars */}
            <div
              className="text-gold"
              style={{
                fontSize: "1.25rem",
                letterSpacing: "0.15em",
                marginTop: "1rem",
              }}
              aria-label="5 hvězd"
            >
              ★★★★★
            </div>

            {/* Quote */}
            <p
              className="text-white italic"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "1.25rem",
                lineHeight: 1.6,
                marginTop: "1rem",
              }}
            >
              Profesionálně odvedená práce. Doporučuji.
            </p>

            {/* Gold divider */}
            <div
              className="bg-gold"
              style={{ width: "32px", height: "2px", margin: "1.5rem 0" }}
            />

            {/* Author */}
            <div
              className="text-white"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              Jana Šťastná
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8125rem",
                color: "#7A8AA3",
                marginTop: "0.25rem",
              }}
            >
              via Mapy.cz · prosinec 2021
            </div>
          </div>

          {/* Below card */}
          <div className="text-center" style={{ marginTop: "3rem" }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9375rem",
                color: "#B8C5D9",
              }}
            >
              Byli jste se službou spokojeni? Budeme rádi za hodnocení.
            </p>
            <div className="flex flex-col items-center gap-2" style={{ marginTop: "0.5rem" }}>
              <a
                href="https://www.firmy.cz/detail/13280804-ing-roman-cejka-kominictvi-bilovice-nad-svitavou.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-gold transition-all duration-300 hover:brightness-125 hover:underline"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  textUnderlineOffset: "4px",
                }}
              >
                Ohodnotit na Firmy.cz
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              {/* TODO: replace with real Google review URL from client */}
              <a
                href="#"
                className="group inline-flex items-center gap-2 text-gold transition-all duration-300 hover:brightness-125 hover:underline"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  textUnderlineOffset: "4px",
                }}
              >
                Ohodnotit na Google
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
