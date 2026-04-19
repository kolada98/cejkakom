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

interface CardProps {
  service: ServiceItem;
  index: number;
  featured?: boolean;
  className?: string;
}

function ServiceCard({ service, index, featured = false, className = "" }: CardProps) {
  const num = String(index + 1).padStart(2, "0");
  const Icon = service.icon;

  return (
    <div
      className={[
        "group relative rounded-xl p-6 transition-all duration-700 cursor-default overflow-hidden",
        featured
          ? "bg-gradient-to-br from-navy-lighter via-navy to-navy-light ring-1 ring-gold/30 shadow-[0_20px_60px_-20px_rgba(251,146,60,0.2)]"
          : "bg-navy-light hover:bg-gradient-to-br hover:from-navy-light hover:to-navy-lighter",
        "hover:ring-1 hover:ring-gold/40 hover:shadow-[0_20px_60px_-20px_rgba(251,146,60,0.3)] hover:-translate-y-1",
        className,
      ].join(" ")}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {/* Card number */}
      <div className="text-gold text-xs font-mono tracking-wider mb-3 select-none">{num}</div>

      {/* Title */}
      <h3 className={`font-bold text-white mb-2 ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
        {service.title}
      </h3>

      {/* Description */}
      <p className={`text-white/60 leading-relaxed ${featured ? "text-base mt-4" : "text-sm"}`}>
        {service.desc}
      </p>

      {/* Decorative icon — bottom right */}
      <div
        className="absolute bottom-4 right-4 text-gold/20 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <Icon size={featured ? 96 : 64} />
      </div>

      {/* Featured gold glow corner */}
      {featured && (
        <div
          className="pointer-events-none absolute top-0 right-0 w-48 h-48 opacity-30"
          style={{
            background: "radial-gradient(circle at top right, rgba(251,146,60,0.4), transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

export default function Services() {
  const ref = useScrollAnimation();

  return (
    <section id="sluzby" className="section-py bg-secondary relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(251,146,60,0.08), transparent 70%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Section header */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-gold mb-3">
            — 01 / SLUŽBY
          </div>
          <h2 className="section-heading">Naše služby</h2>
          <p className="section-subtitle mt-6 max-w-xl">
            Provádíme veškeré kominické práce včetně výchozích revizí a dokumentace ke kolaudaci.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {/* Featured — col-span-2 row-span-2 */}
          <ServiceCard
            service={services[0]}
            index={0}
            featured
            className="lg:col-span-2 lg:row-span-2"
          />

          {/* Medium cards */}
          <ServiceCard service={services[1]} index={1} />
          <ServiceCard service={services[2]} index={2} />
          <ServiceCard service={services[3]} index={3} />

          {/* Small cards */}
          <ServiceCard service={services[4]} index={4} />
          <ServiceCard service={services[5]} index={5} />
          <ServiceCard service={services[6]} index={6} />

          {/* Last small — col-span-2 to fill bento gap */}
          <ServiceCard service={services[7]} index={7} className="lg:col-span-2" />
        </div>
      </div>
    </section>
  );
}
