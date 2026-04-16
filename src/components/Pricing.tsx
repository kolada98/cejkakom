import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface PriceItem { name: string; price: string }

const col1: PriceItem[] = [
  { name: "Vyčištění komínu + kontrola dle vyhl. 34/2016 Sb.", price: "od 1 050 Kč" },
  { name: "Jen kontrola (musí být vyčištěno)", price: "700 Kč" },
  { name: "Čištění na pevná paliva (aktuální cena)", price: "od 1 400 Kč" },
  { name: "Čištění na plyn (aktuální cena)", price: "od 900 Kč" },
  { name: "Strojové čištění dehtu (frézování)", price: "850 Kč/m" },
  { name: "Výchozí revize ke kolaudaci", price: "od 3 000 Kč" },
  { name: "Výchozí revize s osobním dohledem RTSC", price: "do 15 000 Kč" },
];

const col2: PriceItem[] = [
  { name: "Nový komín nerezový třísložkový (montáž bez mat.)", price: "od 12 500 Kč" },
  { name: "Nový komín zděný systémový (montáž bez mat.)", price: "od 15 000 Kč" },
  { name: "Vložkování – tuhá paliva DN150 (mat. + montáž)", price: "od 35 000 Kč" },
  { name: "Vložkování – kondenzační kotel (mat. + montáž)", price: "od 18 000 Kč" },
  { name: "Frézování komínu", price: "od 2 000 Kč/m" },
  { name: "Montáž kouřovodu / koaxiální systém", price: "od 7 000 Kč" },
  { name: "Montáž nerezové komínové stříšky", price: "od 2 500 Kč" },
  { name: "Výměna komínových dvířek", price: "3 500 Kč" },
];

const col3: PriceItem[] = [
  { name: "Cestovné", price: "15 Kč/km" },
  { name: "Hodinová sazba víceprací", price: "950 Kč/h" },
  { name: "Oprava nadstřešní části a pasportizace komínů", price: "na dotaz" },
];

function PriceColumn({
  title,
  items,
  delay,
}: {
  title: string;
  items: PriceItem[];
  delay: number;
}) {
  return (
    <div
      className="rounded-lg overflow-hidden border border-border"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Column header */}
      <div
        className="border-t-2 border-gold py-6 px-6"
        style={{
          background: "linear-gradient(to bottom, #1a2535, #141d2b)",
        }}
      >
        <h3 className="text-xl font-bold text-gold">{title}</h3>
      </div>

      {/* Items */}
      <div className="bg-card p-6">
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.name}
              className="flex justify-between gap-4 text-sm border-b border-border pb-2 last:border-0"
            >
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-semibold whitespace-nowrap">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Pricing() {
  const ref = useScrollAnimation();
  return (
    <section id="cenik" className="section-py bg-secondary">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-heading center">Orientační ceník</h2>
          <p className="section-subtitle mx-auto mt-6">
            Ceny jsou orientační. Konečnou cenu vždy sdělíme předem — ještě před zahájením práce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <PriceColumn title="Čištění a revize" items={col1} delay={0} />
          <PriceColumn title="Výstavba a vložkování" items={col2} delay={80} />
          <PriceColumn title="Ostatní služby a poplatky" items={col3} delay={160} />
        </div>

        <div className="text-center">
          <Button variant="gold" size="lg" asChild>
            <a href="#kontakt">Nezávazná poptávka</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
