import { useState } from "react";
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
  { src: cikoExpert, alt: "Certifikát – CIKO Expert 2025", position: "object-top" },
];

export default function Certificates() {
  const ref = useScrollAnimation();
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () => setSelected((s) => (s !== null ? (s - 1 + certificates.length) % certificates.length : null));
  const next = () => setSelected((s) => (s !== null ? (s + 1) % certificates.length : null));

  return (
    <section id="certifikaty" className="py-20 md:py-28" style={{ backgroundColor: "#0F2748" }}>
      <div className="container mx-auto px-4">
        <div ref={ref} className="text-center mb-12 opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Certifikáty a oprávnění
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-lg">
            Certifikovaný revizní technik spalinových cest (RTSC)
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {certificates.map((cert, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="group block transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "#0B1F3A",
                border: "1px solid rgba(240,165,0,0.15)",
                borderRadius: "8px",
                padding: "6px",
                width: "140px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F0A500")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(240,165,0,0.15)")}
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className={`w-full h-[180px] object-cover rounded ${cert.position ?? ""}`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 text-white/70 hover:text-white transition-colors z-10"
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
            className="absolute right-3 md:right-6 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight size={40} />
          </button>

          <div className="absolute bottom-4 text-white/60 text-sm">
            {selected + 1} / {certificates.length}
          </div>
        </div>
      )}
    </section>
  );
}
