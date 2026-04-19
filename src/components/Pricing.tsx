import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface PriceItem { label: string; price: string }

const col1Items: PriceItem[] = [
  { label: "Vyčištění komínu + kontrola dle vyhl. 34/2016 Sb.", price: "od 1 050 Kč" },
  { label: "Jen kontrola (musí být vyčištěno)", price: "700 Kč" },
  { label: "Čištění na pevná paliva (aktuální cena)", price: "od 1 400 Kč" },
  { label: "Čištění na plyn (aktuální cena)", price: "od 900 Kč" },
  { label: "Strojové čištění dehtu (frézování)", price: "850 Kč/m" },
];

const col2Items: PriceItem[] = [
  { label: "Nový komín nerezový třísložkový (montáž bez mat.)", price: "od 12 500 Kč" },
  { label: "Nový komín zděný systémový (montáž bez mat.)", price: "od 15 000 Kč" },
  { label: "Vložkování – tuhá paliva DN150 (mat. + montáž)", price: "od 35 000 Kč" },
  { label: "Vložkování – kondenzační kotel (mat. + montáž)", price: "od 18 000 Kč" },
  { label: "Frézování komínu", price: "od 2 000 Kč/m" },
];

const col3Items: PriceItem[] = [
  { label: "Výchozí revize ke kolaudaci", price: "od 3 000 Kč" },
  { label: "Výchozí revize s osobním dohledem RTSC", price: "do 15 000 Kč" },
  { label: "Výměna komínových dvířek", price: "3 500 Kč" },
  { label: "Montáž kouřovodu / koaxiální systém", price: "od 7 000 Kč" },
  { label: "Montáž nerezové komínové stříšky", price: "od 2 500 Kč" },
  { label: "Komínové poradenství", price: "ZDARMA" },
  { label: "Cestovné", price: "15 Kč/km" },
  { label: "Hodinová sazba víceprací", price: "950 Kč/h" },
];

const columns = [
  { title: "Čištění a revize", items: col1Items },
  { title: "Výstavba a vložkování", items: col2Items },
  { title: "Revize a ostatní", items: col3Items },
];

function PriceRow({ item, last }: { item: PriceItem; last: boolean }) {
  return (
    <div
      className="flex justify-between items-baseline"
      style={{
        padding: "0.5rem 0",
        borderBottom: last ? "none" : "1px solid rgba(251,146,60,0.08)",
      }}
    >
      <span
        className="text-muted-foreground flex-1 leading-snug"
        style={{ fontSize: "0.9rem", paddingRight: "0.75rem" }}
      >
        {item.label}
      </span>
      <span
        className="text-primary font-bold whitespace-nowrap flex-shrink-0"
        style={{ fontSize: "0.9rem" }}
      >
        {item.price}
      </span>
    </div>
  );
}

export default function Pricing() {
  const ref = useScrollAnimation();

  const scrollToContact = () =>
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="cenik" className="section-padding bg-secondary relative overflow-hidden">
      {/* Radial glow bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(251,146,60,0.07), transparent 70%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Section header */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-gold mb-3">
            — 05 / CENÍK
          </div>
          <h2 className="section-heading">Orientační ceník</h2>
          <p className="section-subtitle mt-6">
            Ceny jsou orientační. Konečnou cenu vždy sdělíme předem — ještě před zahájením práce.
          </p>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-start">
          {columns.map((col) => (
            <div key={col.title} className="card-base">
              <h3
                className="text-primary font-bold"
                style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}
              >
                {col.title}
              </h3>
              <div>
                {col.items.map((item, idx) => (
                  <PriceRow
                    key={item.label}
                    item={item}
                    last={idx === col.items.length - 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote + CTA */}
        <div className="text-center" style={{ marginTop: "2rem" }}>
          <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>
            Expresní výjezd mimo pracovní dobu (do 10 km): od 3 000 Kč
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 bg-gold text-navy font-bold text-base px-8 py-4 rounded-md hover:opacity-90 transition-all duration-300"
            >
              Nezávazná poptávka
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
