import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import rcOsv2 from "@/assets/certificates/rc_osv2.jpg";
import rcOsv3 from "@/assets/certificates/rc_osv3.jpg";
import rcRevizv from "@/assets/certificates/rc_revizv.jpg";
import ricomRc from "@/assets/certificates/ricom_rc.jpg";
import cikoExpert from "@/assets/certificates/ciko_expert.jpg";

const certificates: { src: string; alt: string; position?: string }[] = [
  { src: rcRevizv, alt: "Osvědčení – Revizní technik spalinových cest" },
  { src: rcOsv2, alt: "Osvědčení – Měření spalin" },
  { src: rcOsv3, alt: "Osvědčení – Montáž komínů a komínových vložek" },
  { src: ricomRc, alt: "Certifikát – RICOM gas školení" },
  { src: cikoExpert, alt: "Certifikát – CIKO Expert 2025", position: "object-left" },
];

export default function Certificates() {
  const ref = useScrollAnimation();
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () =>
    setSelected((s) => (s !== null ? (s - 1 + certificates.length) % certificates.length : null));
  const next = () =>
    setSelected((s) => (s !== null ? (s + 1) % certificates.length : null));

  // Keyboard navigation for lightbox
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

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="certifikaty" className="section-py" style={{ backgroundColor: "#0F2748" }}>
      <div className="container mx-auto px-4">
        <div ref={ref} className="text-center mb-12 opacity-0">
          <h2 className="section-heading center text-foreground">
            Certifikáty a oprávnění
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            Certifikovaný revizní technik spalinových cest (RTSC)
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {certificates.map((cert, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="group block transition-all duration-500 cursor-pointer hover:scale-105 hover:ring-2 hover:ring-gold/50 rounded-lg"
              style={{
                backgroundColor: "#0B1F3A",
                border: "1px solid rgba(251,146,60,0.15)",
                borderRadius: "8px",
                padding: "6px",
                width: "140px",
              }}
              aria-label={`Zobrazit ${cert.alt}`}
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className={`w-full h-[180px] object-cover rounded ${cert.position ?? ""}`}
                loading="lazy"
                decoding="async"
              />
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
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
            onClick={(e) => { e.stopPropagation(); prev(); }}
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
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 text-white/70 hover:text-white transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Další"
          >
            <ChevronRight size={40} />
          </button>

          <div className="absolute bottom-4 text-white/60 text-sm select-none">
            {selected + 1} / {certificates.length}
          </div>
        </div>
      )}
    </section>
  );
}
