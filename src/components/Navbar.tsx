import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { href: "#sluzby", label: "Služby" },
  { href: "#proc-my", label: "Proč my" },
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
          ? "bg-[rgba(10,29,58,0.95)] backdrop-blur-xl border-b border-[rgba(249,115,22,0.08)]"
          : "bg-transparent"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
    >
      <div
        className="container mx-auto flex items-center justify-between px-4"
        style={{ height: "80px" }}
      >
        <a href="#" className="flex-shrink-0" style={{ marginLeft: "-12px" }} aria-label="ČEJKAKOM — domů">
          <Logo height={60} />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`group relative inline-flex items-center gap-1.5 transition-colors duration-300 min-h-[44px] ${
                  isActive ? "text-gold" : "text-white/75 hover:text-white"
                }`}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  letterSpacing: "0.01em",
                }}
              >
                <span
                  className={`inline-block w-1 h-1 rounded-full bg-gold transition-all duration-300 ease-out ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                  }`}
                />
                {l.label}
              </a>
            );
          })}
        </div>

        {/* Phone pill CTA */}
        <a
          href="tel:+420776310278"
          className="hidden lg:inline-flex items-center gap-2 flex-shrink-0 bg-gold text-navy font-extrabold rounded-full px-5 py-2.5 transition-all duration-300 hover:brightness-110 hover:scale-[1.03]"
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 800,
            fontSize: "14px",
            transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <Phone size={16} strokeWidth={2.5} />
          +420 776 310 278
        </a>

        {/* Hamburger */}
        <button
          className="lg:hidden text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 top-[80px] bg-navy/98 backdrop-blur-xl px-6 pt-10"
          style={{ backgroundColor: "rgba(10,29,58,0.98)" }}
        >
          <div className="flex flex-col items-center gap-6">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`animate-fade-up text-2xl font-semibold transition-colors duration-200 ${
                  active === l.href ? "text-gold" : "text-white hover:text-gold"
                }`}
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+420776310278"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 mt-6 bg-gold text-navy font-extrabold rounded-full px-8 py-4 animate-fade-up"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: "16px",
                animationDelay: `${links.length * 60 + 60}ms`,
              }}
            >
              <Phone size={18} strokeWidth={2.5} />
              +420 776 310 278
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
