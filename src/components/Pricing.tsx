import { PhoneCall } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

interface PriceItem { label: string; price: string }

const col1: PriceItem[] = [
  { label: "Vyčištění komínu + kontrola dle vyhl. 34/2016 Sb.", price: "od 1 050 Kč" },
  { label: "Jen kontrola (musí být vyčištěno)", price: "700 Kč" },
  { label: "Čištění na pevná paliva (aktuální cena)", price: "od 1 400 Kč" },
  { label: "Čištění na plyn (aktuální cena)", price: "od 900 Kč" },
  { label: "Strojové čištění dehtu (frézování)", price: "850 Kč/m" },
  { label: "Výchozí revize ke kolaudaci", price: "od 3 000 Kč" },
  { label: "Výchozí revize s osobním dohledem RTSC", price: "do 15 000 Kč" },
];

const col2: PriceItem[] = [
  { label: "Nový komín nerezový třísložkový (montáž bez mat.)", price: "od 12 500 Kč" },
  { label: "Nový komín zděný systémový (montáž bez mat.)", price: "od 15 000 Kč" },
  { label: "Vložkování – tuhá paliva DN150 (mat. + montáž)", price: "od 35 000 Kč" },
  { label: "Vložkování – kondenzační kotel (mat. + montáž)", price: "od 18 000 Kč" },
  { label: "Frézování komínu", price: "od 2 000 Kč/m" },
  { label: "Montáž kouřovodu / koaxiální systém", price: "od 7 000 Kč" },
  { label: "Montáž nerezové komínové stříšky", price: "od 2 500 Kč" },
  { label: "Výměna komínových dvířek", price: "3 500 Kč" },
];

const col3: PriceItem[] = [
  { label: "Cestovné", price: "15 Kč/km" },
  { label: "Hodinová sazba víceprací", price: "950 Kč/h" },
  { label: "Oprava nadstřešní části a pasportizace komínů", price: "na dotaz" },
  { label: "Komínové poradenství", price: "ZDARMA" },
  { label: "Expresní výjezd mimo pracovní dobu (do 10 km)", price: "od 4 000 Kč" },
];

const columns = [
  { title: "Čištění a revize", items: col1 },
  { title: "Výstavba a vložkování", items: col2 },
  { title: "Ostatní služby a poplatky", items: col3 },
];

function PriceLine({ item, last }: { item: PriceItem; last: boolean }) {
  return (
    <li
      className="flex items-baseline justify-between"
      style={{
        padding: "0.625rem 0",
        borderBottom: last ? "none" : "1px solid rgba(232,177,75,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "0.875rem",
          color: "#B8C5D9",
          flex: 1,
          paddingRight: "0.75rem",
          lineHeight: 1.45,
        }}
      >
        {item.label}
      </span>
      <span
        className="text-gold whitespace-nowrap"
        style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontWeight: 700,
          fontSize: "0.875rem",
        }}
      >
        {item.price}
      </span>
    </li>
  );
}

export default function Pricing() {
  const ref = useScrollAnimation();
  const gridRef = useStaggerReveal<HTMLDivElement>(80);
  const scrollToContact = () =>
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="cenik"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0F2A52" }}
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse at bottom, rgba(232,177,75,0.07), transparent 70%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Centered header */}
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <div className="eyebrow mb-4">Ceny a podmínky</div>
          <h2 className="section-heading">Orientační ceník</h2>
          <span className="section-title-bar center" />
          <p className="section-subtitle mx-auto mt-5" style={{ textAlign: "center" }}>
            Ceny jsou orientační. Konečnou cenu vždy sdělíme předem — ještě před zahájením práce.
          </p>
        </div>

        {/* 4-column grid (3 price columns + 1 CTA card) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start"
          style={{ marginTop: "4rem" }}
        >
          {columns.map((col) => (
            <div
              key={col.title}
              data-stagger
              className="flex flex-col"
              style={{
                backgroundColor: "#0A1D3A",
                border: "1px solid rgba(232,177,75,0.12)",
                borderRadius: "12px",
                padding: "1.75rem",
              }}
            >
              <h3
                className="text-gold"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  marginBottom: "1.5rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid rgba(232,177,75,0.2)",
                }}
              >
                {col.title}
              </h3>
              <ul>
                {col.items.map((item, idx) => (
                  <PriceLine key={item.label} item={item} last={idx === col.items.length - 1} />
                ))}
              </ul>
            </div>
          ))}

          {/* CTA card (4th column) */}
          <div
            data-stagger
            className="flex flex-col justify-center text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,177,75,0.12) 0%, transparent 100%)",
              border: "1px solid rgba(232,177,75,0.4)",
              borderRadius: "12px",
              padding: "1.75rem",
            }}
          >
            <PhoneCall size={48} className="text-gold mx-auto" />
            <h3
              className="text-white"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "1.25rem",
                marginTop: "1.25rem",
              }}
            >
              Nezávazná konzultace
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                color: "#B8C5D9",
                lineHeight: 1.7,
                marginTop: "0.75rem",
              }}
            >
              Napište nebo zavolejte. Poradíme s výběrem služby i odhadneme cenu přímo u vás.
            </p>
            <a
              href="tel:+420776310278"
              className="text-gold transition-all duration-300 hover:brightness-125 hover:underline"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "1.5rem",
                marginTop: "1.5rem",
                textUnderlineOffset: "4px",
                display: "inline-block",
              }}
            >
              +420 776 310 278
            </a>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center justify-center gap-2 mx-auto transition-all duration-300"
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1.5rem",
                border: "1.5px solid #E8B14B",
                borderRadius: "8px",
                color: "#E8B14B",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E8B14B";
                e.currentTarget.style.color = "#0A1D3A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#E8B14B";
              }}
            >
              Poslat poptávku
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
