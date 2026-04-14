import { Instagram } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { href: "#sluzby", label: "Služby" },
  { href: "#o-nas", label: "O nás" },
  { href: "#proc-my", label: "Proč my" },
  { href: "#cenik", label: "Ceník" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Logo className="mb-2" height={52} />
            <p className="text-sm text-muted-foreground">Komíny stavíme poctivě. Brno a okolí od 2013.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Navigace</h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Kontakt</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>+420 776 310 278</p>
              <p>info@cejkakominy.cz</p>
              <p>K Lipinám 843, Bílovice nad Svitavou</p>
            </div>
            <a
              href="https://instagram.com/cejka_kominy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={18} /> @cejka_kominy
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2025 ČEJKAKOM s.r.o. | IČO: 29277469 | Zpracování osobních údajů
      </div>
    </footer>
  );
}
