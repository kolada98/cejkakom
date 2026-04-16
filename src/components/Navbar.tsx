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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <div
        className="container mx-auto flex items-center justify-between px-4"
        style={{ height: "72px" }}
      >
        <a href="#" className="flex-shrink-0" style={{ marginLeft: "-12px" }}>
          <Logo height={72} />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm font-medium transition-colors duration-300 min-h-[44px] inline-flex items-center gap-1.5 ${
                active === l.href
                  ? "text-gold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {active === l.href && (
                <span className="text-gold text-[8px]">•</span>
              )}
              {l.label}
            </a>
          ))}
        </div>

        {/* Phone CTA */}
        <div className="hidden lg:block flex-shrink-0">
          <a
            href="tel:+420776310278"
            className="inline-flex items-center bg-gold text-navy font-bold text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity min-h-[40px]"
          >
            +420 776 310 278
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-navy/95 backdrop-blur-md border-t border-white/10 px-4 pb-6 pt-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center min-h-[44px] text-sm font-medium transition-colors ${
                active === l.href ? "text-gold" : "text-white/75 hover:text-white"
              }`}
            >
              {active === l.href && <span className="mr-2 text-gold text-[8px]">•</span>}
              {l.label}
            </a>
          ))}
          <a
            href="tel:+420776310278"
            className="flex items-center justify-center min-h-[44px] w-full mt-5 bg-gold text-navy font-bold rounded-md text-base"
          >
            +420 776 310 278
          </a>
        </div>
      )}
    </nav>
  );
}
