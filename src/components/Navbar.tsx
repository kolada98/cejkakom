import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#sluzby", label: "Služby" },
  { href: "#o-nas", label: "O nás" },
  { href: "#proc-my", label: "Proč my" },
  { href: "#cenik", label: "Ceník" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <a href="#" className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-primary tracking-wide">ČEJKAKOM</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">kominictví</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                active === l.href ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              {l.label}
            </a>
          ))}
          <Button variant="gold" size="lg" asChild>
            <a href="#kontakt">Nezávazná poptávka</a>
          </Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border px-4 pb-6 pt-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button variant="gold" size="lg" className="w-full mt-4" asChild>
            <a href="#kontakt">Nezávazná poptávka</a>
          </Button>
        </div>
      )}
    </nav>
  );
}
