import { Phone, ClipboardCheck, Wrench, FileCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

type Step = {
  num: string;
  Icon: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    num: "01",
    Icon: Phone,
    title: "Poptávka",
    desc: "Zavolejte nebo napište. Řekneme vám, co váš komín potřebuje, a domluvíme termín.",
  },
  {
    num: "02",
    Icon: ClipboardCheck,
    title: "Konzultace",
    desc: "Přijedeme na místo, posoudíme stav komínu a navrhneme nejvhodnější řešení včetně ceny.",
  },
  {
    num: "03",
    Icon: Wrench,
    title: "Realizace",
    desc: "Provedeme práci precizně a v dohodnutém termínu. Materiál zajišťujeme sami.",
  },
  {
    num: "04",
    Icon: FileCheck,
    title: "Předání a revize",
    desc: "Předáme vám hotové dílo a vystavíme revizní zprávu platnou pro pojišťovny i stavební úřad.",
  },
];

export default function Process() {
  const ref = useScrollAnimation();
  const gridRef = useStaggerReveal<HTMLDivElement>(100);
  const scrollToContact = () =>
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="proces"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0A1D3A" }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(232,177,75,0.05), transparent 65%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Centered header */}
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <div className="eyebrow mb-4">Spolupráce</div>
          <h2 className="section-heading">Jak to probíhá</h2>
          <span className="section-title-bar center" />
          <p className="section-subtitle mx-auto mt-5" style={{ textAlign: "center" }}>
            Od prvního kontaktu po hotový komín — čtyři jednoduché kroky.
          </p>
        </div>

        {/* Timeline grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
          style={{ marginTop: "4rem" }}
        >
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              top: "calc(3.5rem / 2 + 0.5rem)",
              left: "12.5%",
              right: "12.5%",
              height: "2px",
              backgroundColor: "rgba(232,177,75,0.3)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {steps.map(({ num, Icon, title, desc }) => (
            <div
              key={num}
              data-stagger
              className="relative flex flex-col items-center text-center md:items-start md:text-left"
              style={{ zIndex: 1 }}
            >
              <div
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 900,
                  fontSize: "3.5rem",
                  lineHeight: 1,
                  color: "#E8B14B",
                  opacity: 0.9,
                  letterSpacing: "-0.02em",
                  backgroundColor: "#0A1D3A",
                  paddingRight: "0.5rem",
                  paddingLeft: "0.5rem",
                }}
              >
                {num}
              </div>
              <Icon size={32} className="text-gold" style={{ marginTop: "1rem" }} />
              <h3
                className="text-white"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: 1.2,
                  marginTop: "1rem",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                  color: "#B8C5D9",
                  lineHeight: 1.65,
                  marginTop: "0.75rem",
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center" style={{ marginTop: "4rem" }}>
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              padding: "0.875rem 2rem",
              border: "1.5px solid #E8B14B",
              borderRadius: "8px",
              color: "#E8B14B",
              backgroundColor: "transparent",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: "0.9375rem",
              transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
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
            Nezávazná poptávka
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
