import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import panCejka from "@/assets/pan_cejka.jpg";

const stats = [
  { value: "2013", label: "rok vzniku" },
  { value: "RTSC", label: "certifikace" },
  { value: "~40 km", label: "servisní oblast" },
];

export default function About() {
  const ref = useScrollAnimation();
  return (
    <section id="o-nas" className="section-padding bg-secondary">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm overflow-hidden rounded-lg border border-border bg-background">
              <img
                src={panCejka}
                alt="Ing. Roman Čejka"
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">CERTIFIKOVANÝ REVIZNÍ TECHNIK SPALINOVÝCH CEST</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-2">Ing. Roman Čejka</h2>
            <p className="text-sm text-muted-foreground mb-6">okolí Brna</p>

            <p className="text-muted-foreground mb-4">
              Kominictví dělám od roku 2013. Za tu dobu jsem prošel stovky domácností a realizoval zakázky od běžného čištění až po výstavbu komínových systémů pro kondenzační kotle a dřevostavby.
            </p>
            <p className="text-muted-foreground mb-8">
              Jsem certifikovaný revizní technik spalinových cest — vydávám výchozí i pravidelné revizní zprávy v souladu s vyhláškou č. 34/2016 Sb.
            </p>

            <div className="flex gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-extrabold text-primary">{s.value}</div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
