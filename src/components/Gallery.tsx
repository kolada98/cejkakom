import { useRef, useState, useEffect } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

const items: { src: string; label: string }[] = [
  { src: vlozkovaniTeam, label: "Roman Čejka s kolegou" },
  { src: frezovaniKominu, label: "Frézování komínu" },
  { src: fasadniDrevostavba, label: "Fasádní komín na dřevostavbě" },
  { src: fasadniKomin, label: "Fasádní nerezový komín — 20 m" },
  { src: cisteni1, label: "Čištění komínu" },
  { src: cisteni2, label: "Čištění komínu — detail" },
  { src: fasadniChatka, label: "Fasádní komín na chatě" },
  { src: fasadniPlyn, label: "Fasádní komín pro plyn" },
  { src: fasadniNerezovy, label: "Fasádní nerezový komín" },
  { src: freza, label: "Vlastní profesionální fréza" },
  { src: kamnaNerezovyKomin, label: "Nerezový komín u kamen" },
  { src: kominDoJurty, label: "Komín do jurty" },
  { src: kominKPlynovemuKrbu, label: "Komín k plynovému krbu" },
  { src: komponenty, label: "Komponenty nerezového komínu" },
  { src: kondenzacniKotel, label: "Kouřovod kondenzačního kotle" },
  { src: kondenzacniKominek, label: "Plynový komínek — kondenzační" },
  { src: kourovodFunkce, label: "Kouřovod s funkcí komína" },
  { src: kourovodPrerusovac, label: "Kouřovod s přerušovačem tahu" },
  { src: kourovodKondenzacni, label: "Kouřovod u kondenzačního kotle" },
  { src: kourovodTuha, label: "Kouřovod u kotle na tuhá paliva" },
  { src: kourovod, label: "Montáž kouřovodu" },
  { src: leseni, label: "Výstavba nerezového komínu" },
  { src: dodavka, label: "Naše dodávka" },
  { src: maringotka, label: "Nerezový komín na maringotce" },
  { src: nadstresniKotveni, label: "Nadstřešní část a kotvení komínu" },
  { src: revizniKus, label: "Revizní kus na půdě" },
  { src: striskaTurbo, label: "Stříška u vložky pro turbo kotel" },
  { src: vlozkaPevna, label: "Pevná vložka — tuhá paliva" },
  { src: vlozkovaniKominu, label: "Vložkování komínu" },
  { src: vlozkovaniSpolecnehoKominu, label: "Vložkování společného komínu pro plyn" },
];

export default function Gallery() {
  const ref = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () =>
    setSelected((s) => (s !== null ? (s - 1 + items.length) % items.length : null));
  const next = () =>
    setSelected((s) => (s !== null ? (s + 1) % items.length : null));

  const scrollGallery = (direction: number) => {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  // Keyboard navigation
  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="galerie" className="section-py">
      <div className="container mx-auto px-4" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-heading center">Galerie realizací</h2>
          <p className="section-subtitle mx-auto mt-6">Ukázka naší práce</p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scrollGallery(-1)}
            className="absolute left-0 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:flex min-h-[44px] min-w-[44px]"
            aria-label="Posunout galerii doleva"
          >
            <ChevronLeft size={34} />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-1 pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-10"
          >
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                className="group relative block w-[140px] shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-primary/20 bg-card p-1.5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg min-h-[44px]"
                aria-label={`Zobrazit: ${item.label}`}
              >
                <div className="overflow-hidden rounded relative">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-[180px] w-full rounded object-cover transition-transform duration-500 ease-smooth-out group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
                </div>
                <div className="absolute inset-x-1.5 bottom-1.5 flex min-h-14 items-center justify-between gap-2 rounded-b bg-background/88 px-2.5 py-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="line-clamp-2 text-xs font-semibold text-foreground">
                    {item.label}
                  </span>
                  <ZoomIn size={18} className="shrink-0 text-primary" />
                </div>
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scrollGallery(1)}
            className="absolute right-0 top-1/2 z-10 hidden h-14 w-14 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:flex min-h-[44px] min-w-[44px]"
            aria-label="Posunout galerii doprava"
          >
            <ChevronRight size={34} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galerie realizací"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 z-10 text-white/80 transition-colors hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Zavřít"
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 md:left-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 min-h-[44px] min-w-[44px]"
            aria-label="Předchozí fotografie"
          >
            <ChevronLeft size={34} />
          </button>
          <img
            src={items[selected].src}
            alt={items[selected].label}
            className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 md:right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 min-h-[44px] min-w-[44px]"
            aria-label="Následující fotografie"
          >
            <ChevronRight size={34} />
          </button>
          <div className="absolute bottom-4 text-sm text-white/70 select-none">
            {items[selected].label} — {selected + 1} / {items.length}
          </div>
        </div>
      )}
    </section>
  );
}
