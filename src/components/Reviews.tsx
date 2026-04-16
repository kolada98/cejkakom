import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Reviews() {
  const ref = useScrollAnimation();

  return (
    <section id="recenze" className="section-py relative overflow-hidden">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(251,146,60,0.05), transparent 65%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-gold mb-3">
            — 04 / RECENZE
          </div>
          <h2 className="section-heading">Co říkají zákazníci</h2>
        </div>

        <div className="max-w-[600px]">
          <div
            className="relative bg-navy-light rounded-xl p-8 md:p-10 border-l-[3px] border-gold shadow-[0_20px_60px_-20px_rgba(251,146,60,0.15)]"
          >
            {/* Decorative large quotation mark */}
            <div
              className="absolute top-4 left-6 text-gold/25 select-none pointer-events-none leading-none"
              style={{ fontSize: "7rem", fontFamily: "Georgia, serif", lineHeight: 1 }}
              aria-hidden="true"
            >
              "
            </div>

            <div className="relative z-10">
              <div className="text-gold text-lg mb-5" style={{ letterSpacing: "4px" }} aria-label="5 hvězd">
                ★★★★★
              </div>

              <p className="text-xl md:text-2xl font-medium italic text-white/90 leading-relaxed mb-6">
                Profesionálně odvedená práce. Doporučuji.
              </p>

              <div>
                <div className="font-semibold text-white">Jana Šťastná</div>
                <div className="text-muted-foreground text-[13px] mt-1">
                  via Mapy.cz · prosinec 2021
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-muted-foreground text-sm mb-2">
              Byli jste se službou spokojeni? Budeme rádi za hodnocení.
            </p>
            <a
              href="https://www.firmy.cz/detail/13280804-ing-roman-cejka-kominictvi-bilovice-nad-svitavou.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-gold font-medium text-sm hover:opacity-80 transition-opacity"
            >
              Ohodnotit na Firmy.cz
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
