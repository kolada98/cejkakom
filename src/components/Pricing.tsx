import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface PriceItem { name: string; price: string }

const col1: PriceItem[] = [
  { name: "Vyčištění komínu + kontrola dle vyhl. 34/2016 Sb.", price: "od 1 050 Kč" },
  { name: "Jen kontrola (musí být vyčištěno)", price: "700 Kč" },
  { name: "Čištění na pevná paliva (aktuální cena)", price: "od 1 400 Kč" },
  { name: "Čištění na plyn (aktuální cena)", price: "od 900 Kč" },
  { name: "Strojové čištění dehtu (frézování)", price: "850 Kč/m" },
];

const col2: PriceItem[] = [
  { name: "Nový komín nerezový třísložkový (montáž bez mat.)", price: "od 12 500 Kč" },
  { name: "Nový komín zděný systémový (montáž bez mat.)", price: "od 15 000 Kč" },
  { name: "Vložkování – tuhá paliva DN150 (mat. + montáž)", price: "od 35 000 Kč" },
  { name: "Vložkování – kondenzační kotel (mat. + montáž)", price: "od 18 000 Kč" },
  { name: "Frézování komínu", price: "od 2 000 Kč/m" },
];

const col3: PriceItem[] = [
  { name: "Výchozí revize ke kolaudaci", price: "od 3 000 Kč" },
  { name: "Výchozí revize s osobním dohledem RTSC", price: "do 15 000 Kč" },
  { name: "Výměna komínových dvířek", price: "3 500 Kč" },
  { name: "Montáž kouřovodu / koaxiální systém", price: "od 7 000 Kč" },
  { name: "Montáž nerezové komínové stříšky", price: "od 2 500 Kč" },
  { name: "Komínové poradenství", price: "ZDARMA" },
  { name: "Cestovné", price: "15 Kč/km" },
  { name: "Hodinová sazba víceprací", price: "950 Kč/h" },
];

function PriceColumn({ title, items }: { title: string; items: PriceItem[] }) {
  return (
    <div className="card-base">
      <h3 className="text-lg font-bold text-primary mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.name} className="flex justify-between gap-4 text-sm border-b border-border pb-2 last:border-0">
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-semibold whitespace-nowrap">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Pricing() {
  const ref = useScrollAnimation();
  return (
    <section id="cenik" className="section-padding bg-secondary">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-title">Orientační ceník</h2>
          <div className="section-title-bar mx-auto" />
          <p className="section-subtitle mx-auto">
            Ceny jsou orientační. Konečnou cenu vždy sdělíme předem — ještě před zahájením práce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <PriceColumn title="Čištění a revize" items={col1} />
          <PriceColumn title="Výstavba a vložkování" items={col2} />
          <PriceColumn title="Revize a ostatní" items={col3} />
        </div>

        <p className="text-center text-sm text-muted-foreground mb-6">
          Expresní výjezd mimo pracovní dobu (do 10 km): od 3 000 Kč
        </p>

        <div className="text-center">
          <Button variant="gold" size="lg" asChild>
            <a href="#kontakt">Nezávazná poptávka</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
