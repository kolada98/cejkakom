import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Reviews() {
  const ref = useScrollAnimation();
  return (
    <section id="recenze" className="section-padding">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-title">Co říkají zákazníci</h2>
          <div className="section-title-bar mx-auto" />
          <p className="section-subtitle mx-auto">Zatím sbíráme recenze — brzy zde uvidíte hodnocení z Google.</p>
        </div>

        <div className="max-w-[560px] mx-auto">
          <div className="card-base border-l-4 border-l-primary" style={{ padding: "28px 32px" }}>
            <div className="text-primary text-xl" style={{ letterSpacing: "4px" }}>★★★★★</div>
            <p className="text-foreground mt-3 leading-[1.7]">
              Profesionálně odvedená práce. Doporučuji.
            </p>
            <div className="font-semibold mt-4">Jana Šťastná</div>
            <div className="text-muted-foreground text-[13px] mt-1">via Mapy.cz · prosinec 2021</div>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">Byli jste se službou spokojeni? Budeme rádi za recenzi.</p>
            <a href="#" className="text-primary font-medium text-sm mt-1 inline-block hover:opacity-80 transition-opacity">
              Zanechat recenzi na Google →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
