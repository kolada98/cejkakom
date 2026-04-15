import { Button } from "@/components/ui/button";
import { Shield, Clock, MapPin } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const badges = [
  { icon: Shield, label: "Certifikovaný RTSC technik" },
  { icon: Clock, label: "Brno a okolí od 2013" },
  { icon: MapPin, label: "Revizní zpráva na místě" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)" }}
      />

      <div className="relative z-10 container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center pt-24 pb-12">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Kominictví —{" "}
            <span className="text-primary">poctivě a podle předpisů.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-lg">
            Výstavba, vložkování, čištění a revize komínů v Brně a okolí. Certifikovaný kominík s 13 lety praxe.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-base px-8 py-3 hover:opacity-90 transition-opacity"
            >
              Nezávazná poptávka
            </button>
            <button
              onClick={() => document.getElementById('sluzby')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center rounded-md border-2 border-primary text-primary font-bold text-base px-8 py-3 hover:bg-primary/10 transition-colors"
            >
              Naše služby ↓
            </button>
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
          <img
            src={heroIllustration}
            alt="Ilustrace komínu"
            className="w-full max-w-lg aspect-square object-contain"
          />
        </div>
      </div>
    </section>
  );
}
