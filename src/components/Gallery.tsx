import { ZoomIn } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const items = [
  "Nerezový komín — Brno", "Vložkování", "Frézování", "Revize",
  "Výstavba", "Montáž kouřovodu", "Komín fasádní", "Systémový komín",
  "Oprava nadstřešní části", "Komínová stříška", "Revizní zpráva", "Kondenzační kotel",
];

export default function Gallery() {
  const ref = useScrollAnimation();
  return (
    <section id="galerie" className="section-padding">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-title">Galerie realizací</h2>
          <div className="section-title-bar mx-auto" />
          <p className="section-subtitle mx-auto">Ukázka naší práce</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((label) => (
            <div
              key={label}
              className="aspect-[4/3] rounded-lg bg-secondary border border-border flex items-center justify-center relative group cursor-pointer overflow-hidden"
            >
              <span className="text-sm text-muted-foreground">{label}</span>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <ZoomIn size={32} className="text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
