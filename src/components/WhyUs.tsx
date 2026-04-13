import { Cog, Sparkles, Puzzle, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const items = [
  { num: "01", icon: Cog, title: "Vlastní profesionální fréza", desc: "Frézujeme vlastní technikou — rychleji, levněji, bez čekání na subdodavatele." },
  { num: "02", icon: Sparkles, title: "Poctivé čištění", desc: "U zákazníka jsme průměrně 45 minut. Čistíme i to, co před námi nikdo nečistil." },
  { num: "03", icon: Puzzle, title: "Řešíme komplikované případy", desc: "Hledáme řešení i tam, kde jiní kominíci selhali. Každý komín má svou cestu." },
  { num: "04", icon: Award, title: "Certifikovaná kvalita", desc: "Certifikovaný revizní technik spalinových cest (RTSC). Práce v souladu s normami a předpisy." },
];

export default function WhyUs() {
  const ref = useScrollAnimation();
  return (
    <section id="proc-my" className="section-padding">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-title">Proč Čejka Komíny?</h2>
          <div className="section-title-bar mx-auto" />
          <p className="section-subtitle mx-auto">Nejsme jen kominíci. Jsme specialisté, kteří hledají řešení tam, kde jiní vzdají.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.num} className="card-base relative overflow-hidden p-8">
              <span className="absolute top-4 right-6 text-6xl font-extrabold text-primary/10 select-none">{item.num}</span>
              <item.icon size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
