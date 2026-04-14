import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X } from "lucide-react";

import rcOsv2 from "@/assets/certificates/rc_osv2.jpg";
import rcOsv3 from "@/assets/certificates/rc_osv3.jpg";
import rcRevizv from "@/assets/certificates/rc_revizv.jpg";
import ricomRc from "@/assets/certificates/ricom_rc.jpg";
import cikoExpert from "@/assets/certificates/ciko_expert.jpg";

const certificates = [
  { src: rcRevizv, alt: "Osvědčení – Revizní technik spalinových cest" },
  { src: rcOsv2, alt: "Osvědčení – Měření spalin" },
  { src: rcOsv3, alt: "Osvědčení – Montáž komínů a komínových vložek" },
  { src: ricomRc, alt: "Certifikát – RICOM gas školení" },
  { src: cikoExpert, alt: "Certifikát – CIKO Expert 2025" },
];

export default function Certificates() {
  const ref = useScrollAnimation();
  const [selected, setSelected] = useState<number | null>(null);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="block rounded-lg transition-all duration-200 cursor-pointer text-left"
              style={{
                backgroundColor: "#0B1F3A",
                border: "1px solid rgba(240,165,0,0.15)",
                borderRadius: "8px",
                padding: "8px",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F0A500")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(240,165,0,0.15)")}
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className="w-full h-auto rounded"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          <img
            src={certificates[selected].src}
            alt={certificates[selected].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
