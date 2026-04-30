import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="tel:+420776310278"
      className={`lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-center gap-2 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        zIndex: 50,
        height: "60px",
        backgroundColor: "#F0A000",
        color: "#0A1D3A",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontWeight: 800,
        fontSize: "1.125rem",
        boxShadow: "0 -8px 24px -8px rgba(0,0,0,0.4)",
      }}
      aria-label="Zavolat +420 776 310 278"
    >
      <Phone size={20} strokeWidth={2.5} />
      +420 776 310 278
    </a>
  );
}
