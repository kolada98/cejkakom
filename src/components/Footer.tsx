import { Instagram } from "lucide-react";
import Logo from "@/components/Logo";

const serviceLinks = [
  { href: "#sluzby", label: "Čištění a revize" },
  { href: "#sluzby", label: "Výstavba komínů" },
  { href: "#sluzby", label: "Vložkování" },
  { href: "#sluzby", label: "Frézování" },
  { href: "#sluzby", label: "Výchozí revize" },
];

const quickLinks = [
  { href: "#o-nas", label: "O nás" },
  { href: "#certifikaty", label: "Certifikáty" },
  { href: "#cenik", label: "Ceník" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-gold/40 relative overflow-hidden">
      {/* Ghost decorative text */}
      <div
        className="pointer-events-none absolute top-0 left-0 text-[8rem] md:text-[12rem] font-black text-white/[0.03] leading-none select-none whitespace-nowrap"
        aria-hidden="true"
      >
        ČEJKAKOM
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Col 1: Brand + contact */}
          <div>
            <Logo className="mb-4" height={52} />
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Komíny stavíme poctivě. Brno a okolí od 2013.
            </p>
            <div className="space-y-1.5 text-sm text-white/60">
              <p>
                <a href="tel:+420776310278" className="hover:text-gold transition-colors">
                  +420 776 310 278
                </a>
              </p>
              <p>
                <a href="mailto:info@cejkakominy.cz" className="hover:text-gold transition-colors">
                  info@cejkakominy.cz
                </a>
              </p>
              <p>K Lipinám 843, Bílovice nad Svitavou</p>
            </div>
            <a
              href="https://instagram.com/cejka_kominy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-white/55 hover:text-gold transition-colors"
            >
              <Instagram size={16} /> @cejka_kominy
            </a>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5">
              Služby
            </h4>
            <div className="space-y-2.5">
              {serviceLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block text-sm text-white/60 hover:text-gold transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5">
              Rychlé odkazy
            </h4>
            <div className="space-y-2.5">
              {quickLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block text-sm text-white/60 hover:text-gold transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5 text-center text-sm text-white/40 relative z-10">
        © 2026 ČEJKAKOM s.r.o. | IČO: 29277469 | Zpracování osobních údajů | Vytvořil{" "}
        <a
          href="https://webyproremeslniky.cz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:opacity-80 transition-opacity"
        >
          webyproremeslniky.cz
        </a>
      </div>
    </footer>
  );
}
