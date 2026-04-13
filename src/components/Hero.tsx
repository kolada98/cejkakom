import { Button } from "@/components/ui/button";
import { Shield, Clock, MapPin } from "lucide-react";

const badges = [
  { icon: Shield, label: "Certifikovaný revizní technik" },
  { icon: Clock, label: "13+ let praxe" },
  { icon: MapPin, label: "Brno a 40 km okolí" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* diagonal texture overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)" }} />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center pt-24 pb-12">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Profesionální kominictví{" "}
            <span className="text-primary">v Brně a okolí</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-lg">
            Výstavba, revize a čištění komínů. Certifikovaný revizní technik s 13 lety praxe.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Button variant="gold" size="lg" asChild>
              <a href="#kontakt">Nezávazná poptávka</a>
            </Button>
            <Button variant="goldOutline" size="lg" asChild>
              <a href="#sluzby">Naše služby ↓</a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6">
            {badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <b.icon size={20} className="text-primary" />
                <span className="text-sm text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="w-full max-w-md aspect-[4/5] rounded-lg bg-secondary border border-border flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield size={32} className="text-primary" />
            </div>
            <span className="text-muted-foreground text-sm">Fotografie komínu</span>
          </div>
        </div>
      </div>
    </section>
  );
}
