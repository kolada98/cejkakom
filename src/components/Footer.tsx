import { Instagram } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { href: "#sluzby", label: "Služby" },
  { href: "#o-nas", label: "O nás" },
  { href: "#cenik", label: "Ceník" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-gold/40">
      <div className="container mx-auto px-4 py-12 mt-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Logo className="mb-3" height={52} />
            <p className="text-sm text-white/70">
              Komíny stavíme poctivě. Brno a okolí od 2013.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold/80 mb-4">
              Navigace
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold/80 mb-4">
              Kontakt
            </h4>
            <div className="space-y-1 text-sm text-white/70">
              <p>+420 776 310 278</p>
              <p>info@cejkakominy.cz</p>
              <p>K Lipinám 843, Bílovice nad Svitavou</p>
            </div>
            <a
              href="https://instagram.com/cejka_kominy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-white/70 hover:text-gold transition-colors"
            >
              <Instagram size={18} /> @cejka_kominy
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 pb-6 mt-0 text-center text-sm text-white/50">
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
