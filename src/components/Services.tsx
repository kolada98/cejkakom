import { Layers, Wrench, Home, Flame, CheckCircle, Settings, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ChimneyBrushIcon from "@/components/icons/ChimneyBrushIcon";

type ServiceItem = {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  desc: string;
};

const services: ServiceItem[] = [
  { icon: ChimneyBrushIcon, title: "Čištění a revize", desc: "Vyčistíme komín na tuhá paliva i plyn při každoroční kontrole dle vyhlášky č. 34/2016 Sb. U zákazníka strávíme 30–60 minut podle stupně znečištění — čistíme komín, kouřovod, spalinové hrdlo i část pod deflektorem. Zhodnotíme stav celé spalinové cesty a případné závady rovnou navrhneme k opravě. Na přání vyčistíme i krbová kamna, krbovou vložku nebo kotel. U každého zákazníka strávíme tolik času, kolik komín potřebuje — obvykle kolem 45 minut." },
  { icon: Home, title: "Výstavba komínů", desc: "Stavíme nerezové komíny od různých výrobců — fasádní i vnitřní, v lesklém nerezu, černém matu nebo antracitu. Ročně realizujeme 60–100 nových komínů. Pro dřevostavby zajišťujeme systémové prostupy hořlavými konstrukcemi a certifikované napojení na parotěsné fólie. Díky nízké hmotnosti nerezu lze komín instalovat i dodatečně, tam kde se s ním původně nepočítalo. Montáž většinou zabere jeden den." },
  { icon: Layers, title: "Vložkování komínů", desc: "Pokud stávající komín přestane bezpečně odvádět spaliny, nejšetrnější řešení je vložkování — do původního průduchu vložíme vložku z vhodného materiálu pro daný spotřebič. Vznikne komín vícevrstevný, bariérový, vhodný i pro mokrý provoz nebo přetlakový spotřebič. Vložkujeme pro tuhá paliva (nerez flexi DN 150–200 mm), kondenzační kotle (plast nebo nerez wrap) i atmosférické plynové kotle. Realizujeme i komplikované zakázky, zkušenosti od roku 2013." },
  { icon: CheckCircle, title: "Výchozí revize", desc: "Revize ke kolaudaci s vypracováním dokumentace. Osobní dohled RTSC. Jako certifikovaný RTSC technik vystavuji revizní zprávy uznávané pojišťovnami i stavebním úřadem." },
  { icon: Settings, title: "Frézování", desc: "Frézováním zvětšíme průměr stávajícího průduchu tak, aby bylo možné vložkování. Frézování provádíme vlastní technikou — bez závislosti na subdodavatelích, s rychlejším termínem a přesnější cenou." },
  { icon: Flame, title: "Plynové komínky", desc: "Výstavba plynových komínků a odkouření, kondenzační kotle, kaskády kotlů." },
  { icon: Wrench, title: "Opravy komínů", desc: "Opravy nadstřešních částí, výměna dvířek, montáž kouřovodů. Řešíme i komplikované případy." },
  { icon: ShieldCheck, title: "Požární bezpečnost", desc: "Každý komín stavíme s důrazem na požárně bezpečné provedení včetně certifikovaných prostupů hořlavými konstrukcemi." },
];

export default function Services() {
  const ref = useScrollAnimation();
  return (
    <section id="sluzby" className="section-padding bg-secondary">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-title">Naše služby</h2>
          <div className="section-title-bar mx-auto" />
          <p className="section-subtitle mx-auto">Provádíme veškeré kominické práce včetně výchozích revizí a dokumentace ke kolaudaci.</p>
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
