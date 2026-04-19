import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
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
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () =>
    setSelected((s) => (s !== null ? (s - 1 + items.length) % items.length : null));
  const next = () =>
    setSelected((s) => (s !== null ? (s + 1) % items.length : null));

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
            "radial-gradient(circle at 100% 0%, rgba(232,177,75,0.06), transparent 55%)",
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

        {/* Masonry grid via CSS columns */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
          style={{ marginTop: "4rem" }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className="group relative block w-full mb-4 break-inside-avoid overflow-hidden cursor-zoom-in transition-all duration-300"
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(232,177,75,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,177,75,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,177,75,0.08)";
              }}
              aria-label={`Zobrazit: ${item.label}`}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full block transition-transform duration-700 group-hover:scale-[1.08]"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
                loading="lazy"
                decoding="async"
              />

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
      </div>

      {/* Lightbox */}
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
              prev();
            }}
            className="absolute left-3 md:left-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-white hover:bg-gold/40 transition-colors"
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
