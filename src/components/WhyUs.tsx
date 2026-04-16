import { Cog, Clock, FileText, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const items = [
  { num: "01", icon: Cog, title: "Vlastní fréza", desc: "Frézování provádíme vlastní technikou — bez závislosti na subdodavatelích." },
  { num: "02", icon: Clock, title: "Poctivé čištění", desc: "U každého zákazníka strávíme tolik času, kolik komín potřebuje. Obvykle kolem 45 minut." },
  { num: "03", icon: FileText, title: "Dokumentace v pořádku", desc: "Jako certifikovaný RTSC technik vystavuji revizní zprávy uznávané pojišťovnami i stavebním úřadem." },
  { num: "04", icon: ShieldCheck, title: "Požární bezpečnost", desc: "Každý komín stavíme s důrazem na požárně bezpečné provedení včetně certifikovaných prostupů hořlavými konstrukcemi." },
];

export default function WhyUs() {
  const ref = useScrollAnimation();
  return (
    <section id="proc-my" className="section-py">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-heading center">Jak pracujeme</h2>
          <p className="section-subtitle mx-auto mt-6">Pár věcí, které o naší práci vědět.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={item.num}
              className="card-base relative overflow-hidden p-8"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="absolute top-4 right-6 text-6xl font-extrabold text-primary/10 select-none">
                {item.num}
              </span>
              <item.icon size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-base md:text-[17px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
