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

interface FloatingFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}

function FloatingField({ id, label, type = "text", value, onChange, textarea = false, rows = 4 }: FloatingFieldProps) {
  const baseClass =
    "peer w-full bg-transparent border-b border-white/20 focus:border-white/20 pt-6 pb-2 px-0 text-white placeholder-transparent focus:outline-none transition-colors duration-300 resize-none text-base";
  const labelClass =
    "absolute left-0 top-5 text-white/50 text-base pointer-events-none select-none transition-all duration-300 ease-out " +
    "peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold " +
    "peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-white/60";

  return (
    <div className="relative mt-6">
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          className={baseClass}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={baseClass}
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {/* Animated focus line */}
      <div className="focus-line" />
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
    <section id="kontakt" className="section-py relative overflow-hidden">
      {/* Radial glow left */}
      <div
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px]"
        style={{
          background: "radial-gradient(circle at 0% 50%, rgba(251,146,60,0.06), transparent 60%)",
        }}
      />

      <div className="container mx-auto relative z-10" ref={ref} style={{ opacity: 0 }}>
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-gold mb-3">
            — 07 / KONTAKT
          </div>
          <h2 className="section-heading">Kontaktujte nás</h2>
          <p className="section-subtitle mt-6">
            Popište co potřebujete. Obvykle odpovídáme do 24 hodin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info cards + map */}
          <div className="space-y-4">
            {infoCards.map(({ Icon, label, value, href }) => {
              const inner = (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gold/20">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/50 mb-0.5">{label}</div>
                    <div className="text-base font-semibold text-white leading-snug">{value}</div>
                  </div>
                </div>
              );

              return href ? (
                <a key={label} href={href} className="group block card-base">
                  {inner}
                </a>
              ) : (
                <div key={label} className="group card-base">
                  {inner}
                </div>
              );
            })}

            <div className="aspect-video w-full rounded-lg overflow-hidden ring-1 ring-white/10 mt-4">
              <iframe
                src="https://maps.google.com/maps?q=K+Lipin%C3%A1m+843,+B%C3%ADlovice+nad+Svitavou,+664+01&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa — K Lipinám 843, Bílovice nad Svitavou"
                style={{ border: 0 }}
              />
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="pt-2">
            <FloatingField
              id="name"
              label="Jméno a příjmení *"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <FloatingField
              id="phone"
              label="Telefon *"
              type="tel"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
            <FloatingField
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <FloatingField
              id="message"
              label="Zpráva"
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              textarea
              rows={4}
            />

            <label className="flex items-start gap-3 text-sm text-white/60 cursor-pointer mt-8 mb-6">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-0.5 accent-gold flex-shrink-0"
              />
              Souhlasím se zpracováním osobních údajů
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-3 bg-gold text-navy font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed min-h-[52px]"
              style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Odesílám...
                </>
              ) : (
                <>
                  Odeslat poptávku
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </>
              )}
            </button>

            <p className="text-center text-white/45 text-sm mt-5">
              Nebo zavolejte přímo:{" "}
              <a
                href="tel:+420776310278"
                className="text-gold hover:opacity-80 transition-opacity"
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
