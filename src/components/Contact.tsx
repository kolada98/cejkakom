import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";

const infoCards = [
  {
    Icon: Phone,
    label: "Telefon",
    value: "+420 776 310 278",
    href: "tel:+420776310278",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "info@cejkakominy.cz",
    href: "mailto:info@cejkakominy.cz",
  },
  {
    Icon: MapPin,
    label: "Adresa",
    value: "K Lipinám 843, Bílovice nad Svitavou, 664 01",
    href: undefined,
  },
  {
    Icon: Clock,
    label: "Otevírací doba",
    value: "Po–Pá 8:00–18:00",
    href: undefined,
  },
];

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}

function Field({ id, label, type = "text", value, onChange, required, textarea, rows = 5 }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#050F1E",
    border: focused
      ? "1.5px solid #E8B14B"
      : "1px solid rgba(232,177,75,0.15)",
    borderRadius: "8px",
    padding: "0.875rem 1rem",
    color: "#FFFFFF",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.9375rem",
    lineHeight: 1.5,
    outline: "none",
    transition: "border-color 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
    boxShadow: focused ? "0 0 0 4px rgba(232,177,75,0.1)" : "none",
    resize: textarea ? "vertical" : undefined,
  };

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "#B8C5D9",
          marginBottom: "0.5rem",
          letterSpacing: "0.02em",
        }}
      >
        {label}
        {required && <span className="text-gold" style={{ marginLeft: "0.25rem" }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
          required={required}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const ref = useScrollAnimation();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Vyplňte prosím povinná pole", variant: "destructive" });
      return;
    }
    if (!form.consent) {
      toast({
        title: "Musíte souhlasit se zpracováním osobních údajů",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      toast({ title: "Poptávka odeslána!", description: "Odpovíme vám do 24 hodin." });
      setForm({ name: "", phone: "", email: "", message: "", consent: false });
      setIsLoading(false);
    }, 500);
  };

  return (
    <section
      id="kontakt"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#0F2A52" }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle at 0% 50%, rgba(232,177,75,0.07), transparent 60%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        {/* Centered header */}
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <div className="eyebrow mb-4">Spojte se s námi</div>
          <h2 className="section-heading">Kontaktujte nás</h2>
          <span className="section-title-bar center" />
          <p className="section-subtitle mx-auto mt-5" style={{ textAlign: "center" }}>
            Popište co potřebujete. Obvykle odpovídáme do 24 hodin.
          </p>
        </div>

        {/* Two-column grid */}
        <div
          className="grid lg:grid-cols-2 gap-16 items-start"
          style={{ marginTop: "4rem" }}
        >
          {/* LEFT — info cards + map */}
          <div>
            <div className="space-y-4">
              {infoCards.map(({ Icon, label, value, href }) => {
                const cardContent = (
                  <div className="flex items-center gap-4">
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-300"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "rgba(232,177,75,0.12)",
                      }}
                    >
                      <Icon size={20} className="text-gold" />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#7A8AA3",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#FFFFFF",
                          lineHeight: 1.4,
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  </div>
                );

                const cardStyle: React.CSSProperties = {
                  backgroundColor: "#0A1D3A",
                  border: "1px solid rgba(232,177,75,0.15)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  transition: "border-color 300ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                  display: "block",
                };

                const onEnter = (e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.borderColor = "rgba(232,177,75,0.4)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                };
                const onLeave = (e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.borderColor = "rgba(232,177,75,0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                };

                return href ? (
                  <a
                    key={label}
                    href={href}
                    style={cardStyle}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div
                    key={label}
                    style={cardStyle}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>

            {/* Map */}
            <div
              className="overflow-hidden"
              style={{
                marginTop: "1.5rem",
                borderRadius: "12px",
                border: "1px solid rgba(232,177,75,0.15)",
                aspectRatio: "16 / 10",
              }}
            >
              <iframe
                src="https://maps.google.com/maps?q=K+Lipin%C3%A1m+843,+B%C3%ADlovice+nad+Svitavou,+664+01&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa — K Lipinám 843, Bílovice nad Svitavou"
                style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
              />
            </div>
          </div>

          {/* RIGHT — form */}
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#0A1D3A",
              border: "1px solid rgba(232,177,75,0.2)",
              borderRadius: "16px",
              padding: "2.5rem",
            }}
          >
            <h3
              className="text-white"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              Napište nám
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9375rem",
                color: "#B8C5D9",
                marginBottom: "2rem",
              }}
            >
              Vyplníme vám nezávaznou kalkulaci na míru.
            </p>

            <Field
              id="name"
              label="Jméno a příjmení"
              required
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <Field
              id="phone"
              label="Telefon"
              type="tel"
              required
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <Field
              id="message"
              label="Zpráva"
              textarea
              rows={5}
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
            />

            <label
              className="flex items-start gap-3 cursor-pointer"
              style={{
                marginTop: "0.5rem",
                marginBottom: "1.5rem",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8125rem",
                color: "#B8C5D9",
                lineHeight: 1.6,
              }}
            >
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="accent-gold flex-shrink-0"
                style={{ marginTop: "0.2rem", width: "16px", height: "16px" }}
              />
              <span>
                Souhlasím se zpracováním osobních údajů pro účely vyřízení poptávky.
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-3 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #E8B14B 0%, #F5C668 100%)",
                color: "#0A1D3A",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "0.9375rem",
                letterSpacing: "0.02em",
                padding: "1rem 1.5rem",
                borderRadius: "10px",
                minHeight: "52px",
                boxShadow: "0 8px 24px -8px rgba(232,177,75,0.5)",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 14px 32px -10px rgba(232,177,75,0.7)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px -8px rgba(232,177,75,0.5)";
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Odesílám...
                </>
              ) : (
                <>
                  Odeslat poptávku
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </button>

            <p
              className="text-center"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8125rem",
                color: "#7A8AA3",
                marginTop: "1.25rem",
              }}
            >
              Nebo zavolejte přímo:{" "}
              <a
                href="tel:+420776310278"
                className="text-gold hover:brightness-125 transition-all"
                style={{ fontWeight: 700 }}
              >
                +420 776 310 278
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
