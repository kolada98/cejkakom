import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { href: "#sluzby", label: "Služby" },
  { href: "#o-nas", label: "O nás" },
  { href: "#certifikaty", label: "Certifikáty" },
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
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div
        className="container mx-auto flex items-center justify-between px-4"
        style={{ height: "72px" }}
      >
        <a href="#" className="flex-shrink-0" style={{ marginLeft: "-12px" }}>
          <Logo height={72} />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-200 min-h-[44px] inline-flex items-center ${
                active === l.href
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Phone CTA */}
        <div className="hidden lg:block flex-shrink-0">
          <a
            href="tel:+420776310278"
            className="text-primary font-extrabold text-xl hover:opacity-80 transition-opacity min-h-[44px] inline-flex items-center"
          >
            +420 776 310 278
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border px-4 pb-6 pt-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center min-h-[44px] text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+420776310278"
            className="flex items-center justify-center min-h-[44px] w-full mt-4 text-center text-primary font-extrabold text-xl"
          >
            +420 776 310 278
          </a>
        </div>
      )}
    </nav>
  );
}
