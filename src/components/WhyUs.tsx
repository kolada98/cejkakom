import { Cog, Clock, FileCheck, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

type Item = {
  num: string;
  Icon: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  desc: string;
};

const items: Item[] = [
  {
    num: "01",
    Icon: Cog,
    title: "Vlastní fréza",
    desc: "Frézování provádíme vlastní technikou — bez závislosti na subdodavatelích a se zárukou kvality.",
  },
  {
    num: "02",
    Icon: Clock,
    title: "Poctivé čištění",
    desc: "U každého zákazníka strávíme tolik času, kolik komín potřebuje. Obvykle kolem 45 minut.",
  },
  {
    num: "03",
    Icon: FileCheck,
    title: "Dokumentace v pořádku",
    desc: "Jako certifikovaný revizní technik spalinových cest vystavuji revizní zprávy uznávané pojišťovnami i stavebním úřadem.",
  },
  {
    num: "04",
    Icon: ShieldCheck,
    title: "Požární bezpečnost",
    desc: "Každý komín stavíme s důrazem na požárně bezpečné provedení včetně certifikovaných prostupů hořlavými konstrukcemi.",
  },
];

export default function WhyUs() {
  const ref = useScrollAnimation();
  const gridRef = useStaggerReveal<HTMLDivElement>(80);

  return (
    <section
      id="proc-my"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0F2A52" }}
    >
      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Centered header */}
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <div className="eyebrow mb-4">Proč ČEJKAKOM</div>
          <h2 className="section-heading">Jak přistupujeme k práci</h2>
          <span className="section-title-bar center" />
          <p className="section-subtitle mx-auto mt-5" style={{ textAlign: "center" }}>
            Čtyři věci, díky kterým naše zakázky stojí za to.
          </p>
        </div>

        {/* 2x2 grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginTop: "4rem" }}>
          {items.map(({ num, Icon, title, desc }) => (
            <div
              key={num}
              data-stagger
              className="group relative overflow-hidden transition-all duration-[400ms]"
              style={{
                background: "linear-gradient(135deg, #0A1D3A 0%, #132F5A 100%)",
                border: "1px solid rgba(249,115,22,0.15)",
                borderRadius: "16px",
                padding: "3rem",
                transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #0C2244 0%, #163563 100%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(249,115,22,0.15)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #0A1D3A 0%, #132F5A 100%)";
              }}
            >
              {/* Ghost number top-right */}
              <span
                className="ghost-number ghost-number-anim absolute"
                style={{
                  fontSize: "8rem",
                  top: "1rem",
                  right: "1.5rem",
                }}
                aria-hidden="true"
              >
                {num}
              </span>

              <div className="relative z-10">
                <Icon size={48} className="text-gold" />
                <h3
                  className="text-white"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.625rem",
                    lineHeight: 1.2,
                    marginTop: "1.5rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    color: "#B8C5D9",
                    lineHeight: 1.75,
                    marginTop: "1rem",
                    maxWidth: "480px",
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
