import { Flame, Layers, Wrench, Home, Zap, CheckCircle, Settings, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  { icon: Flame, title: "Čištění a revize", desc: "Poctivé čištění komínu cca 45 minut u zákazníka. Roční kontrola dle vyhlášky č. 34/2016 Sb." },
  { icon: Layers, title: "Vložkování komínů", desc: "Vložkování pro tuhá paliva, kondenzační kotle i plynové spotřebiče. Nerez i plastové vložky." },
  { icon: Settings, title: "Frézování", desc: "Vlastní profesionální fréza. Zvětšení průměru průduchu pro vložkování." },
  { icon: Home, title: "Výstavba komínů", desc: "Nerezové i zděné systémové komíny. Vnitřní i fasádní provedení. Montáž za 1 den." },
  { icon: Zap, title: "Plynové komínky", desc: "Výstavba plynových komínků a odkouření, kondenzační kotle, kaskády kotlů." },
  { icon: CheckCircle, title: "Výchozí revize", desc: "Revize ke kolaudaci s vypracováním dokumentace. Osobní dohled RTSC." },
  { icon: Wrench, title: "Opravy komínů", desc: "Opravy nadstřešních částí, výměna dvířek, montáž kouřovodů. Řešíme i komplikované případy." },
  { icon: ShieldCheck, title: "Požární bezpečnost", desc: "Stavíme komíny s důrazem na požární bezpečnost. Certifikované systémové prostupy hořlavými konstrukcemi." },
];

export default function Services() {
  const ref = useScrollAnimation();
  return (
    <section id="sluzby" className="section-padding bg-secondary">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-title">Naše služby</h2>
          <div className="section-title-bar mx-auto" />
          <p className="section-subtitle mx-auto">Kompletní péče o váš komín od A do Z</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div key={s.title} className="card-base group hover:border-l-4 hover:border-l-primary">
              <s.icon size={28} className="text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
