import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import rcOsv2 from "@/assets/certificates/rc_osv2.jpg";
import rcOsv3 from "@/assets/certificates/rc_osv3.jpg";
import rcRevizv from "@/assets/certificates/rc_revizv.jpg";
import ricomRc from "@/assets/certificates/ricom_rc.jpg";
import cikoExpert from "@/assets/certificates/ciko_expert.jpg";

type Cert = { src: string; alt: string; position?: string };

// Ordered by prestige: RTSC revizní technik first (most important), then osvědčení, then trainings
const certificates: Cert[] = [
  { src: rcRevizv, alt: "Osvědčení – Revizní technik spalinových cest" },
  { src: rcOsv2, alt: "Osvědčení – Měření spalin" },
  { src: rcOsv3, alt: "Osvědčení – Montáž komínů a komínových vložek" },
  { src: cikoExpert, alt: "Certifikát – CIKO Expert 2025", position: "object-left" },
  { src: ricomRc, alt: "Certifikát – RICOM gas školení" },
];

export default function Certificates() {
  const ref = useScrollAnimation();
  const gridRef = useStaggerReveal<HTMLDivElement>(80);
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () =>
    setSelected((s) => (s !== null ? (s - 1 + certificates.length) % certificates.length : null));
  const next = () =>
    setSelected((s) => (s !== null ? (s + 1) % certificates.length : null));

  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="certifikaty"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0F2A52" }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(240,160,0,0.06), transparent 65%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Centered header */}
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <div className="eyebrow mb-4">Dokumentace a oprávnění</div>
          <h2 className="section-heading">Certifikáty</h2>
          <span className="section-title-bar center" />
          <p className="section-subtitle mx-auto mt-5" style={{ textAlign: "center" }}>
            Doklad o tom, že víme, co děláme.
          </p>
        </div>

        {/* 5-column grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          style={{ marginTop: "4rem" }}
        >
          {certificates.map((cert, i) => (
            <button
              key={i}
              data-stagger
              onClick={() => setSelected(i)}
              className="group relative block cursor-pointer overflow-hidden transition-all duration-500"
              style={{
                backgroundColor: "#0A1D3A",
                border: "1px solid rgba(240,160,0,0.15)",
                borderRadius: "12px",
                padding: "12px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,160,0,0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 16px 40px -12px rgba(240,160,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,160,0,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label={`Zobrazit ${cert.alt}`}
            >
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className={`w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-[1.05] ${cert.position ?? ""}`}
                  loading="lazy"
                  decoding="async"
                />
                {/* Gold hover overlay with caption */}
                <div
                  className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,29,58,0.92) 30%, transparent)",
                    padding: "1.25rem 0.5rem 0.75rem",
                  }}
                >
                  <span
                    className="text-gold"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Zobrazit celý →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Náhled certifikátu"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Zavřít"
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 md:left-6 text-white/70 hover:text-white transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Předchozí"
          >
            <ChevronLeft size={40} />
          </button>
          <img
            src={certificates[selected].src}
            alt={certificates[selected].alt}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 md:right-6 text-white/70 hover:text-white transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Další"
          >
            <ChevronRight size={40} />
          </button>
          <div className="absolute bottom-4 text-white/70 text-sm select-none text-center px-4">
            {certificates[selected].alt} — {selected + 1} / {certificates.length}
          </div>
        </div>
      )}
    </section>
  );
}
