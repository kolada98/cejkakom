import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Reviews() {
  const ref = useScrollAnimation();
  return (
    <section id="recenze" className="section-padding">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-title">Co říkají zákazníci</h2>
          <div className="section-title-bar mx-auto" />
          
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
            <p className="text-muted-foreground text-sm">Byli jste se službou spokojeni? Budeme rádi za hodnocení.</p>
            <a href="https://www.firmy.cz/detail/13280804-ing-roman-cejka-kominictvi-bilovice-nad-svitavou.html" target="_blank" rel="noopener noreferrer" className="text-primary font-medium text-sm mt-1 inline-block hover:opacity-80 transition-opacity">
              Ohodnotit na Firmy.cz →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
