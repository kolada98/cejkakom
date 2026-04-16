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

const columns = [
  { title: "Čištění a revize", eyebrow: "ZÁKLADNÍ SLUŽBY", items: col1 },
  { title: "Výstavba a vložkování", eyebrow: "INSTALACE", items: col2 },
  { title: "Ostatní služby a poplatky", eyebrow: "DOPLŇKOVÉ", items: col3 },
];

function PriceRow({ item }: { item: PriceItem }) {
  return (
    <li className="flex items-baseline gap-2 py-3 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/85 flex-1 leading-snug">{item.name}</span>
      {/* Dotted leader */}
      <span
        className="flex-shrink-0 mx-1 mb-[3px]"
        style={{
          flex: "0 1 32px",
          borderBottom: "2px dotted rgba(255,255,255,0.12)",
          alignSelf: "flex-end",
        }}
      />
      <span className="text-sm font-bold text-gold font-mono whitespace-nowrap flex-shrink-0">
        {item.price}
      </span>
    </li>
  );
}

export default function Pricing() {
  const ref = useScrollAnimation();

  return (
    <section id="cenik" className="section-py bg-secondary relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {columns.map((col, colIdx) => {
            const isMiddle = colIdx === 1;
            return (
              <div
                key={col.title}
                className={[
                  "rounded-xl overflow-hidden border transition-all duration-700",
                  isMiddle
                    ? "border-gold/40 shadow-[0_0_0_1px_rgba(251,146,60,0.15),0_24px_60px_-16px_rgba(251,146,60,0.25)] lg:scale-105"
                    : "border-white/10",
                ].join(" ")}
                style={{ animationDelay: `${colIdx * 80}ms` }}
              >
                {/* Card header */}
                <div
                  className={[
                    "px-6 py-7 border-t-4 border-gold",
                    isMiddle
                      ? "bg-gradient-to-b from-navy-lighter to-navy-light"
                      : "bg-gradient-to-b from-navy-lighter to-navy",
                  ].join(" ")}
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2 font-mono">
                    {col.eyebrow}
                  </div>
                  <h3 className="text-xl font-bold text-white">{col.title}</h3>
                </div>

                {/* Price rows */}
                <div className="bg-navy-light px-6 py-4">
                  <ul>
                    {col.items.map((item) => (
                      <PriceRow key={item.name} item={item} />
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-navy-light px-6 pb-6">
                  <a
                    href="#kontakt"
                    className="group block w-full text-center border border-gold text-gold font-semibold py-3 px-4 rounded-lg hover:bg-gold hover:text-navy transition-all duration-300"
                    style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                  >
                    Nezávazná poptávka
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
