import { User } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  { value: "13+", label: "let praxe" },
  { value: "Stovky", label: "realizací" },
  { value: "40 km", label: "servisní oblast" },
];

export default function About() {
  const ref = useScrollAnimation();
  return (
    <section id="o-nas" className="section-padding bg-secondary">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm aspect-[3/4] rounded-lg bg-background border border-border flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={40} className="text-primary" />
              </div>
              <span className="text-muted-foreground text-sm">Foto Romana Čejky</span>
            </div>
          </div>

          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Certifikovaný revizní technik</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Ing. Roman Čejka</h2>

            <p className="text-muted-foreground mb-4">
              Kominictví je moje profese i vášeň. Od roku 2013 jsem s kolegy postavil a opravil stovky komínů po celé jižní Moravě — od jednoduchých čištění až po technicky náročné výstavby komínových systémů pro kondenzační kotle a dřevostavby.
            </p>
            <p className="text-muted-foreground mb-8">
              Firma ČEJKAKOM s.r.o. působí z Bílovic nad Svitavou a obsluhujeme celé Brno a okolí do cca 40 km. V případě výstavby nových komínů vyjíždíme i na větší vzdálenosti.
            </p>

            <div className="flex gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-extrabold text-primary">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
