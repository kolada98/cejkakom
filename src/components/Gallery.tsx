import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── JPG imports ─────────────────────────────────────────────────────────────
import fasadniKomin from "@/assets/gallery/20m_fasadni_komin.jpg";
import cisteni1 from "@/assets/gallery/cisteni1.jpg";
import cisteni2 from "@/assets/gallery/cisteni2.jpg";
import fasadniDrevostavba from "@/assets/gallery/fasadni_komin_na_drevostavbe.jpg";
import fasadniChatka from "@/assets/gallery/fasadni_komin_na_chatce.jpg";
import fasadniPlyn from "@/assets/gallery/fasadni_komin_pro_plyn.jpg";
import fasadniNerezovy from "@/assets/gallery/fasadni_nerezovy_komin.jpg";
import freza from "@/assets/gallery/freza.jpg";
import frezovaniKominu from "@/assets/gallery/frezovani_kominu.jpg";
import kamnaNerezovyKomin from "@/assets/gallery/kamna_nerezovy_komin.jpg";
import kominDoJurty from "@/assets/gallery/komin_do_jurty.jpg";
import kominKPlynovemuKrbu from "@/assets/gallery/komin_k_plynovemu_krbu.jpg";
import komponenty from "@/assets/gallery/komponenty.jpg";
import kondenzacniKotel from "@/assets/gallery/kondenzacni_kotel_kourovod.jpg";
import kondenzacniKominek from "@/assets/gallery/kondenzacni_plynovy_kominek.jpg";
import kourovodFunkce from "@/assets/gallery/kourovod_s_funkci_komina.jpg";
import kourovodPrerusovac from "@/assets/gallery/kourovod_s_prerusovacem_tahu.jpg";
import kourovodKondenzacni from "@/assets/gallery/kourovod_u_kondenzacniho_kotle.jpg";
import kourovodTuha from "@/assets/gallery/kourovod_u_kotle_na_tuha_paliva.jpg";
import kourovod from "@/assets/gallery/kourovod.jpg";
import leseni from "@/assets/gallery/leseni_pri_vystavbe_nerez_kominu.jpg";
import dodavka from "@/assets/gallery/nase_dodavka.jpg";
import maringotka from "@/assets/gallery/nerezovy_komin_na_maringotce.jpg";
import nadstresniKotveni from "@/assets/gallery/nerezovy_komin_nadstresni_cast_a_kotveni.jpg";
import vlozkovaniTeam from "@/assets/gallery/pan_cejka_s_kolegou_vlozkujeme_ja_vpravo.jpg";
import revizniKus from "@/assets/gallery/revizni_kus_na_pude.jpg";
import striskaTurbo from "@/assets/gallery/striska_u_vlozky_pro_turbo_kotel.jpg";
import vlozkaPevna from "@/assets/gallery/vlozka_pevna_paliva.jpg";
import vlozkovaniKominu from "@/assets/gallery/vlozkovani_kominu.jpg";
import vlozkovaniSpolecnehoKominu from "@/assets/gallery/vlozkovani_spolecneho_kominu_pro_plyn.jpg";

// ─── WebP fallback map (auto-populated when WebP files are added) ─────────────
// Drop WebP versions of gallery images into src/assets/gallery-webp/ and
// they will be picked up here automatically. Absent files are silently ignored.
const _webpModules = import.meta.glob<{ default: string }>(
  "../assets/gallery-webp/*.webp",
  { eager: true }
);
const webpMap: Record<string, string> = Object.fromEntries(
  Object.entries(_webpModules).map(([p, m]) => [
    p.split("/").pop()!,   // filename only, e.g. "cisteni1.webp"
    m.default,             // resolved URL after Vite processing
  ])
);

function getWebp(baseFilename: string): string | undefined {
  const webpFilename = baseFilename.replace(/\.jpe?g$/i, ".webp");
  return webpMap[webpFilename];
}

// ─── Gallery item type ────────────────────────────────────────────────────────
interface GalleryItem {
  src: string;
  /** Original filename used to look up the WebP counterpart */
  filename: string;
  label: string;
}

const items: GalleryItem[] = [
  { src: vlozkovaniTeam,           filename: "pan_cejka_s_kolegou_vlozkujeme_ja_vpravo.jpg", label: "Roman Čejka s kolegou" },
  { src: frezovaniKominu,          filename: "frezovani_kominu.jpg",                          label: "Frézování komínu" },
  { src: fasadniDrevostavba,       filename: "fasadni_komin_na_drevostavbe.jpg",              label: "Fasádní komín na dřevostavbě" },
  { src: fasadniKomin,             filename: "20m_fasadni_komin.jpg",                         label: "Fasádní nerezový komín — 20 m" },
  { src: cisteni1,                 filename: "cisteni1.jpg",                                  label: "Čištění komínu" },
  { src: cisteni2,                 filename: "cisteni2.jpg",                                  label: "Čištění komínu — detail" },
  { src: fasadniChatka,            filename: "fasadni_komin_na_chatce.jpg",                   label: "Fasádní komín na chatě" },
  { src: fasadniPlyn,              filename: "fasadni_komin_pro_plyn.jpg",                    label: "Fasádní komín pro plyn" },
  { src: fasadniNerezovy,          filename: "fasadni_nerezovy_komin.jpg",                    label: "Fasádní nerezový komín" },
  { src: freza,                    filename: "freza.jpg",                                     label: "Vlastní profesionální fréza" },
  { src: kamnaNerezovyKomin,       filename: "kamna_nerezovy_komin.jpg",                      label: "Nerezový komín u kamen" },
  { src: kominDoJurty,             filename: "komin_do_jurty.jpg",                            label: "Komín do jurty" },
  { src: kominKPlynovemuKrbu,      filename: "komin_k_plynovemu_krbu.jpg",                   label: "Komín k plynovému krbu" },
  { src: komponenty,               filename: "komponenty.jpg",                                label: "Komponenty nerezového komínu" },
  { src: kondenzacniKotel,         filename: "kondenzacni_kotel_kourovod.jpg",                label: "Kouřovod kondenzačního kotle" },
  { src: kondenzacniKominek,       filename: "kondenzacni_plynovy_kominek.jpg",               label: "Plynový komínek — kondenzační" },
  { src: kourovodFunkce,           filename: "kourovod_s_funkci_komina.jpg",                  label: "Kouřovod s funkcí komína" },
  { src: kourovodPrerusovac,       filename: "kourovod_s_prerusovacem_tahu.jpg",              label: "Kouřovod s přerušovačem tahu" },
  { src: kourovodKondenzacni,      filename: "kourovod_u_kondenzacniho_kotle.jpg",            label: "Kouřovod u kondenzačního kotle" },
  { src: kourovodTuha,             filename: "kourovod_u_kotle_na_tuha_paliva.jpg",           label: "Kouřovod u kotle na tuhá paliva" },
  { src: kourovod,                 filename: "kourovod.jpg",                                  label: "Montáž kouřovodu" },
  { src: leseni,                   filename: "leseni_pri_vystavbe_nerez_kominu.jpg",          label: "Výstavba nerezového komínu" },
  { src: dodavka,                  filename: "nase_dodavka.jpg",                              label: "Naše dodávka" },
  { src: maringotka,               filename: "nerezovy_komin_na_maringotce.jpg",              label: "Nerezový komín na maringotce" },
  { src: nadstresniKotveni,        filename: "nerezovy_komin_nadstresni_cast_a_kotveni.jpg", label: "Nadstřešní část a kotvení komínu" },
  { src: revizniKus,               filename: "revizni_kus_na_pude.jpg",                       label: "Revizní kus na půdě" },
  { src: striskaTurbo,             filename: "striska_u_vlozky_pro_turbo_kotel.jpg",          label: "Stříška u vložky pro turbo kotel" },
  { src: vlozkaPevna,              filename: "vlozka_pevna_paliva.jpg",                       label: "Pevná vložka — tuhá paliva" },
  { src: vlozkovaniKominu,         filename: "vlozkovani_kominu.jpg",                         label: "Vložkování komínu" },
  { src: vlozkovaniSpolecnehoKominu, filename: "vlozkovani_spolecneho_kominu_pro_plyn.jpg",  label: "Vložkování společného komínu pro plyn" },
];

const MOBILE_INITIAL_COUNT = 8;

// ─── Image element with WebP + JPG fallback ───────────────────────────────────
function GalleryImage({
  item,
  index,
}: {
  item: GalleryItem;
  index: number;
}) {
  const webpSrc = getWebp(item.filename);
  const isEager = index < 4;

  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={item.src}
        alt={item.label}
        className="w-full block transition-transform duration-700 group-hover:scale-[1.08]"
        style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
        loading={isEager ? "eager" : "lazy"}
        decoding="async"
        width={600}
        height={400}
      />
    </picture>
  );
}

export default function Gallery() {
  const ref = useScrollAnimation();
  const gridRef = useStaggerReveal<HTMLDivElement>(80);
  const [selected, setSelected] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();

  // Items visible in the grid (all on desktop, capped on mobile until expanded)
  const displayedItems =
    isMobile && !expanded ? items.slice(0, MOBILE_INITIAL_COUNT) : items;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft")
        setSelected((s) =>
          s !== null ? (s - 1 + items.length) % items.length : null
        );
      if (e.key === "ArrowRight")
        setSelected((s) => (s !== null ? (s + 1) % items.length : null));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  // Body scroll lock for lightbox
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="galerie"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0A1D3A" }}
    >
      <div
        className="pointer-events-none absolute top-0 right-0"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle at 100% 0%, rgba(240,160,0,0.06), transparent 55%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Centered header */}
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <div className="eyebrow mb-4">Naše realizace</div>
          <h2 className="section-heading">Galerie prací</h2>
          <span className="section-title-bar center" />
          <p className="section-subtitle mx-auto mt-5" style={{ textAlign: "center" }}>
            Vybrané projekty z posledních let.
          </p>
        </div>

        {/*
          Layout strategy:
          • Mobile (<768 px): 2-column CSS grid — simple, works well at small sizes.
          • Tablet (768 px+): 3 CSS columns — masonry reflow.
          • Desktop (1024 px+): 3-4 CSS columns — full masonry.
        */}
        <div
          ref={gridRef}
          className="md:columns-2 lg:columns-3 xl:columns-4 md:gap-4
                     grid grid-cols-2 gap-2
                     md:grid-cols-none md:block"
          style={{ marginTop: "4rem" }}
        >
          {displayedItems.map((item, i) => (
            <button
              key={item.filename}
              type="button"
              data-stagger
              onClick={() => setSelected(items.indexOf(item))}
              className="group relative block w-full mb-2 md:mb-4 break-inside-avoid overflow-hidden cursor-zoom-in transition-all duration-300"
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(240,160,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,160,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,160,0,0.08)";
              }}
              aria-label={`Zobrazit: ${item.label}`}
            >
              <GalleryImage item={item} index={i} />

              {/* Zoom icon top-right */}
              <div
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ top: "0.75rem", right: "0.75rem" }}
              >
                <Maximize2 size={20} className="text-gold" />
              </div>

              {/* Caption overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,29,58,0.85) 0%, transparent 55%)",
                }}
              >
                <div style={{ padding: "1rem" }}>
                  <span
                    className="block bg-gold"
                    style={{ width: "30px", height: "2px" }}
                  />
                  <span
                    className="text-white block"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Show more / less button — only visible on mobile when there are hidden items */}
        {isMobile && items.length > MOBILE_INITIAL_COUNT && (
          <div style={{ marginTop: "1.5rem" }}>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="w-full transition-all duration-300"
              style={{
                padding: "0.875rem 1.5rem",
                border: "1.5px solid #F0A000",
                borderRadius: "8px",
                color: "#F0A000",
                backgroundColor: "transparent",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: "0.9375rem",
                cursor: "pointer",
                transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F0A000";
                e.currentTarget.style.color = "#0A1D3A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#F0A000";
              }}
            >
              {expanded
                ? `Zobrazit méně`
                : `Zobrazit více (${items.length - MOBILE_INITIAL_COUNT} dalších)`}
            </button>
          </div>
        )}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galerie realizací"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Zavřít"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelected((s) =>
                s !== null ? (s - 1 + items.length) % items.length : null
              );
            }}
            className="absolute left-3 md:left-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-white hover:bg-gold/40 transition-colors"
            aria-label="Předchozí fotografie"
          >
            <ChevronLeft size={34} />
          </button>

          <picture onClick={(e) => e.stopPropagation()}>
            {getWebp(items[selected].filename) && (
              <source
                srcSet={getWebp(items[selected].filename)}
                type="image/webp"
              />
            )}
            <img
              src={items[selected].src}
              alt={items[selected].label}
              className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain"
              decoding="async"
            />
          </picture>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelected((s) =>
                s !== null ? (s + 1) % items.length : null
              );
            }}
            className="absolute right-3 md:right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-white hover:bg-gold/40 transition-colors"
            aria-label="Následující fotografie"
          >
            <ChevronRight size={34} />
          </button>

          <div className="absolute bottom-4 text-sm text-white/70 select-none text-center px-4">
            {items[selected].label} — {selected + 1} / {items.length}
          </div>
        </div>
      )}
    </section>
  );
}
