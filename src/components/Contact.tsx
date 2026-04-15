import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const ref = useScrollAnimation();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", consent: false });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Vyplňte prosím povinná pole", variant: "destructive" });
      return;
    }
    if (!form.consent) {
      toast({ title: "Musíte souhlasit se zpracováním osobních údajů", variant: "destructive" });
      return;
    }
    toast({ title: "Poptávka odeslána!", description: "Odpovíme vám do 24 hodin." });
    setForm({ name: "", phone: "", email: "", message: "", consent: false });
  };

  const inputClass = "w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm";

  return (
    <section id="kontakt" className="section-padding">
      <div className="container mx-auto" ref={ref} style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="section-title">Kontaktujte nás</h2>
          <div className="section-title-bar mx-auto" />
          <p className="section-subtitle mx-auto">Popište co potřebujete. Obvykle odpovídáme do 24 hodin.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <a href="tel:+420776310278" className="flex items-center gap-4 card-base">
              <Phone className="text-primary" size={24} />
              <div>
                <div className="text-xs text-muted-foreground uppercase">Telefon</div>
                <div className="text-xl font-bold text-primary">+420 776 310 278</div>
              </div>
            </a>
            <a href="mailto:info@cejkakominy.cz" className="flex items-center gap-4 card-base">
              <Mail className="text-primary" size={24} />
              <div>
                <div className="text-xs text-muted-foreground uppercase">Email</div>
                <div className="font-semibold">info@cejkakominy.cz</div>
              </div>
            </a>
            <div className="flex items-center gap-4 card-base">
              <MapPin className="text-primary" size={24} />
              <div>
                <div className="text-xs text-muted-foreground uppercase">Adresa</div>
                <div className="font-semibold">K Lipinám 843, Bílovice nad Svitavou, 664 01</div>
              </div>
            </div>
            <div className="flex items-center gap-4 card-base">
              <Clock className="text-primary" size={24} />
              <div>
                <div className="text-xs text-muted-foreground uppercase">Otevírací doba</div>
                <div className="font-semibold">Po–Pá 8:00–18:00</div>
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.5!2d16.6738!3d49.2347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47129574e5f1c0e7%3A0x2e0c5a4e8b0f2a5e!2sK%20Lipin%C3%A1m%20843%2C%20664%2001%20B%C3%ADlovice%20nad%20Svitavou!5e0!3m2!1scs!2scz!4v1700000000000"
              className="aspect-video w-full rounded-lg border border-border"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa — K Lipinám 843, Bílovice nad Svitavou"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Jméno a příjmení *</label>
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Telefon *</label>
              <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Zpráva</label>
              <textarea rows={4} className={inputClass} placeholder="Popište co potřebujete..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-1 accent-primary"
              />
              Souhlasím se zpracováním osobních údajů
            </label>
            <Button type="submit" variant="gold" size="lg" className="w-full">
              Odeslat poptávku →
            </Button>
            <p className="text-center text-muted-foreground text-sm mt-4">
              Nebo zavolejte přímo: <a href="tel:+420776310278" className="text-primary hover:opacity-80 transition-opacity">+420 776 310 278</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
