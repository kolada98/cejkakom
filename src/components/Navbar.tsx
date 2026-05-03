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

  // Scroll detection for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection — rootMargin crops top/bottom 40% of viewport
  // so only the section occupying the middle band triggers "active".
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive("#" + entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(10,29,58,0.95)] backdrop-blur-xl border-b border-[rgba(240,160,0,0.08)]"
            : "bg-transparent"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
      >
        <div
          className="container mx-auto flex items-center justify-between px-4"
          style={{ height: "80px" }}
        >
          <a
            href="#"
            className="flex-shrink-0"
            style={{ marginLeft: "-12px" }}
            aria-label="ČEJKAKOM — domů"
          >
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

          {/* Phone pill CTA (desktop) */}
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

          {/* Hamburger (mobile) */}
          <button
            className="lg:hidden text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setOpen(true)}
            aria-label="Otevřít menu"
            aria-expanded={open}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ── Full-screen mobile menu overlay ──────────────────────────────── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 flex flex-col"
          style={{
            zIndex: 100,
            backgroundColor: "#0A1D3A",
            animation: "mobile-menu-in 200ms ease-out both",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigační menu"
        >
          <style>{`
            @keyframes mobile-menu-in {
              from { opacity: 0; transform: translateY(-8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes mobile-link-in {
              from { opacity: 0; transform: translateY(12px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {/* Top bar: logo + close */}
          <div
            className="flex items-center justify-between px-6 flex-shrink-0"
            style={{ height: "80px", borderBottom: "1px solid rgba(240,160,0,0.08)" }}
          >
            <a
              href="#"
              onClick={closeMenu}
              style={{ marginLeft: "-12px" }}
              aria-label="ČEJKAKOM — domů"
            >
              <Logo height={52} />
            </a>
            <button
              onClick={closeMenu}
              className="text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Zavřít menu"
            >
              <X size={26} />
            </button>
          </div>

          {/* Links — vertically & horizontally centred */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <nav className="flex flex-col items-center" style={{ gap: "2rem" }}>
              {links.map((l, i) => {
                const isActive = active === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={closeMenu}
                    className="transition-colors duration-200"
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: isActive ? "#F0A000" : "#FFFFFF",
                      textDecoration: "none",
                      animation: `mobile-link-in 260ms cubic-bezier(0.2, 0.8, 0.2, 1) ${
                        i * 50
                      }ms both`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#F0A000";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#FFFFFF";
                    }}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>

            {/* Phone CTA */}
            <a
              href="tel:+420776310278"
              onClick={closeMenu}
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-extrabold rounded-full transition-all duration-300 hover:brightness-110"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                padding: "1rem 2.5rem",
                marginTop: "2.5rem",
                animation: `mobile-link-in 260ms cubic-bezier(0.2, 0.8, 0.2, 1) ${
                  links.length * 50 + 60
                }ms both`,
              }}
            >
              <Phone size={18} strokeWidth={2.5} />
              +420 776 310 278
            </a>
          </div>
        </div>
      )}
    </>
  );
}
