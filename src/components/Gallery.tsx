import { useState } from "react";
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

const items: { src: string; label: string }[] = [
  { src: fasadniKomin, label: "Fasádní nerezový komín — 20 m" },
  { src: cisteni1, label: "Čištění komínu" },
  { src: cisteni2, label: "Čištění komínu — detail" },
  { src: fasadniDrevostavba, label: "Fasádní komín na dřevostavbě" },
  { src: fasadniChatka, label: "Fasádní komín na chatě" },
  { src: fasadniPlyn, label: "Fasádní komín pro plyn" },
  { src: fasadniNerezovy, label: "Fasádní nerezový komín" },
  { src: freza, label: "Vlastní profesionální fréza" },
  { src: frezovaniKominu, label: "Frézování komínu" },
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
  { src: vlozkovaniTeam, label: "Vložkování — Roman Čejka s kolegou" },
];

export default function Gallery() {
  const ref = useScrollAnimation();
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () => setSelected((s) => (s !== null ? (s - 1 + items.length) % items.length : null));
  const next = () => setSelected((s) => (s !== null ? (s + 1) % items.length : null));

  return (
    <section id="galerie" className="section-padding">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-title">Galerie realizací</h2>
          <div className="section-title-bar mx-auto" />
          <p className="section-subtitle mx-auto">Ukázka naší práce</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="aspect-[4/3] rounded-lg overflow-hidden relative group cursor-pointer border border-border"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
                <ZoomIn size={32} className="text-primary" />
                <span className="text-white text-sm font-medium px-3 text-center">{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelected(null)}
        >
          <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white/80 hover:text-white z-10">
            <X size={32} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 md:left-6 text-white/70 hover:text-white z-10">
            <ChevronLeft size={40} />
          </button>
          <img
            src={items[selected].src}
            alt={items[selected].label}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 md:right-6 text-white/70 hover:text-white z-10">
            <ChevronRight size={40} />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {items[selected].label} — {selected + 1} / {items.length}
          </div>
        </div>
      )}
    </section>
  );
}
