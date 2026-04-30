import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

const serviceLinks = [
  { href: "#sluzby", label: "Čištění a revize" },
  { href: "#sluzby", label: "Výstavba komínů" },
  { href: "#sluzby", label: "Vložkování" },
  { href: "#sluzby", label: "Frézování" },
  { href: "#sluzby", label: "Výchozí revize" },
];

const navLinks = [
  { href: "#o-nas", label: "O nás" },
  { href: "#proc-my", label: "Proč my" },
  { href: "#certifikaty", label: "Certifikáty" },
  { href: "#cenik", label: "Ceník" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
];

const colHeadingStyle: React.CSSProperties = {
  fontFamily: "Plus Jakarta Sans, sans-serif",
  fontWeight: 800,
  fontSize: "0.8125rem",
  textTransform: "uppercase",
  letterSpacing: "0.22em",
  marginBottom: "1.5rem",
};

const linkStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.9rem",
  color: "#B8C5D9",
  display: "block",
  marginBottom: "0.75rem",
  transition: "color 220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
};

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#050F1E",
        borderTop: "1px solid rgba(240,160,0,0.2)",
      }}
    >
      {/* Ghost decorative text */}
      <div
        className="pointer-events-none absolute top-0 left-0 leading-none select-none whitespace-nowrap"
        style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: "clamp(6rem, 14vw, 14rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.025)",
          letterSpacing: "-0.04em",
        }}
        aria-hidden="true"
      >
        ČEJKAKOM
      </div>

      <div className="container mx-auto px-4 relative z-10" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand + tagline + Instagram */}
          <div>
            <Logo className="mb-5" height={48} />
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9375rem",
                color: "#B8C5D9",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
                maxWidth: "260px",
              }}
            >
              Komíny stavíme poctivě. Brno a okolí od 2013 — certifikovaný revizní
              technik spalinových cest.
            </p>
            <a
              href="https://instagram.com/cejka_kominy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-all duration-300"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#B8C5D9",
                padding: "0.5rem 1rem",
                border: "1px solid rgba(240,160,0,0.2)",
                borderRadius: "999px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,160,0,0.5)";
                e.currentTarget.style.color = "#F0A000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,160,0,0.2)";
                e.currentTarget.style.color = "#B8C5D9";
              }}
            >
              <Instagram size={16} />
              @cejka_kominy
            </a>
          </div>

          {/* Col 2: Služby */}
          <div>
            <h4 className="text-gold" style={colHeadingStyle}>
              Služby
            </h4>
            {serviceLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={linkStyle}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F0A000")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#B8C5D9")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Col 3: Navigace */}
          <div>
            <h4 className="text-gold" style={colHeadingStyle}>
              Navigace
            </h4>
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={linkStyle}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F0A000")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#B8C5D9")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Col 4: Kontakt */}
          <div>
            <h4 className="text-gold" style={colHeadingStyle}>
              Kontakt
            </h4>
            <a
              href="tel:+420776310278"
              className="flex items-start gap-3 transition-colors duration-300"
              style={{ ...linkStyle, marginBottom: "1rem" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F0A000")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#B8C5D9")}
            >
              <Phone size={16} className="text-gold flex-shrink-0" style={{ marginTop: "0.2rem" }} />
              <span>+420 776 310 278</span>
            </a>
            <a
              href="mailto:info@cejkakominy.cz"
              className="flex items-start gap-3 transition-colors duration-300"
              style={{ ...linkStyle, marginBottom: "1rem" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F0A000")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#B8C5D9")}
            >
              <Mail size={16} className="text-gold flex-shrink-0" style={{ marginTop: "0.2rem" }} />
              <span>info@cejkakominy.cz</span>
            </a>
            <div className="flex items-start gap-3" style={linkStyle}>
              <MapPin size={16} className="text-gold flex-shrink-0" style={{ marginTop: "0.2rem" }} />
              <span>
                K Lipinám 843
                <br />
                Bílovice nad Svitavou
                <br />
                664 01
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-10"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8125rem",
            color: "#7A8AA3",
          }}
        >
          <div>
            © 2026 ČEJKAKOM s.r.o. · IČO: 29277469 · Zpracování osobních údajů
          </div>
          <div>
            Vytvořil{" "}
            <a
              href="https://webyproremeslniky.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-all duration-300 hover:brightness-125"
              style={{ fontWeight: 600 }}
            >
              webyproremeslniky.cz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
