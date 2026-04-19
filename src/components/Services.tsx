import { Layers, Wrench, Home, Flame, CheckCircle, Settings, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ChimneyBrushIcon from "@/components/icons/ChimneyBrushIcon";

type ServiceItem = {
  Icon: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  desc: string;
};

const services: ServiceItem[] = [
  {
    Icon: ChimneyBrushIcon,
    title: "Čištění a revize",
    desc: "Vyčistíme komín na tuhá paliva i plyn při každoroční kontrole dle vyhlášky č. 34/2016 Sb. U zákazníka strávíme 30–60 minut podle stupně znečištění — čistíme komín, kouřovod, spalinové hrdlo i část pod deflektorem. Zhodnotíme stav celé spalinové cesty a případné závady rovnou navrhneme k opravě.",
  },
  {
    Icon: Home,
    title: "Výstavba komínů",
    desc: "Stavíme nerezové komíny od různých výrobců — fasádní i vnitřní, v lesklém nerezu, černém matu nebo antracitu. Ročně realizujeme 60–100 nových komínů. Pro dřevostavby zajišťujeme systémové prostupy hořlavými konstrukcemi a certifikované napojení na parotěsné fólie.",
  },
  {
    Icon: Layers,
    title: "Vložkování komínů",
    desc: "Pokud stávající komín přestane bezpečně odvádět spaliny, nejšetrnější řešení je vložkování. Vložkujeme pro tuhá paliva (nerez flexi DN 150–200 mm), kondenzační kotle (plast nebo nerez wrap) i atmosférické plynové kotle. Realizujeme i komplikované zakázky.",
  },
  {
    Icon: CheckCircle,
    title: "Výchozí revize",
    desc: "Revize ke kolaudaci s vypracováním dokumentace. Osobní dohled RTSC. Jako certifikovaný RTSC technik vystavuji revizní zprávy uznávané pojišťovnami i stavebním úřadem.",
  },
  {
    Icon: Wrench,
    title: "Frézování",
    desc: "Frézováním zvětšíme průměr stávajícího průduchu tak, aby bylo možné vložkování. Frézování provádíme vlastní technikou — bez závislosti na subdodavatelích, s rychlejším termínem a přesnější cenou.",
  },
  {
    Icon: Flame,
    title: "Plynové komínky",
    desc: "Výstavba plynových komínků a odkouření, kondenzační kotle, kaskády kotlů. Pracujeme s kvalitními systémovými prvky s platnou certifikací pro každý typ spotřebiče.",
  },
  {
    Icon: Settings,
    title: "Opravy komínů",
    desc: "Opravy nadstřešních částí, výměna dvířek, montáž kouřovodů. Řešíme i komplikované případy — od estetických úprav po kompletní rekonstrukce nadstřešního dílu.",
  },
  {
    Icon: ShieldCheck,
    title: "Požární bezpečnost",
    desc: "Každý komín stavíme s důrazem na požárně bezpečné provedení včetně certifikovaných prostupů hořlavými konstrukcemi. Bezpečnost řešíme nadstandardně — pro váš klid do budoucna.",
  },
];

function ServiceCard({ service }: { service: ServiceItem }) {
  const { Icon } = service;
  return (
    <div
      className="group relative rounded-xl transition-all duration-[400ms] cursor-default flex flex-col"
      style={{
        backgroundColor: "#0F2A52",
        border: "1px solid rgba(232,177,75,0.12)",
        padding: "2rem",
        transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#132F5A";
        e.currentTarget.style.borderColor = "rgba(232,177,75,0.4)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 40px -15px rgba(232,177,75,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#0F2A52";
        e.currentTarget.style.borderColor = "rgba(232,177,75,0.12)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Icon container */}
      <div
        className="flex items-center justify-center transition-transform duration-[400ms] group-hover:scale-110 group-hover:rotate-3"
        style={{
          width: 56,
          height: 56,
          backgroundColor: "rgba(232,177,75,0.08)",
          border: "1px solid rgba(232,177,75,0.25)",
          borderRadius: "12px",
          marginBottom: "1.5rem",
        }}
      >
        <Icon size={28} className="text-gold" />
      </div>

      {/* Title */}
      <h3
        className="text-white"
        style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontWeight: 700,
          fontSize: "1.375rem",
          lineHeight: 1.2,
          marginBottom: "0.75rem",
        }}
      >
        {service.title}
      </h3>

      {/* Description (full text, no clamp) */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "0.95rem",
          color: "#B8C5D9",
          lineHeight: 1.7,
        }}
      >
        {service.desc}
      </p>
    </div>
  );
}

export default function Services() {
  const ref = useScrollAnimation();

  return (
    <section id="sluzby" className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0A1D3A" }}>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse at bottom, rgba(232,177,75,0.06), transparent 70%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Centered header */}
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <div className="eyebrow mb-4">Co pro vás děláme</div>
          <h2 className="section-heading">Kominické služby od A do Z</h2>
          <span className="section-title-bar center" />
          <p className="section-subtitle mx-auto mt-5" style={{ textAlign: "center" }}>
            Výstavba nových komínů, kompletní rekonstrukce, pravidelná údržba i revizní
            dokumentace — vše pod jednou střechou.
          </p>
        </div>

        {/* 4-column grid, variable card heights */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
          style={{ marginTop: "4rem" }}
        >
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
