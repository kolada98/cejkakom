import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const certificates = [
  "https://drive.google.com/uc?export=view&id=1jZ-EUNXXnzU2Md1YjvlR23AgjlZKYv9m",
  "https://drive.google.com/uc?export=view&id=1MxoYvUBUNhlm230pXl4c3uXXaZEr0Fk_",
  "https://drive.google.com/uc?export=view&id=1rw3_jFqgMvD7MK6OdGBbRoC0rNUReXx7",
  "https://drive.google.com/uc?export=view&id=1_DINoz9vIKkGTxqCFfF5VMed4JtwTwHX",
];

export default function Certificates() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="certifikaty" className="py-20 md:py-28" style={{ backgroundColor: "#0F2748" }}>
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Certifikáty a oprávnění
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-lg">
            Certifikovaný revizní technik spalinových cest (RTSC)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {certificates.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg p-2 transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "#0B1F3A",
                border: "1px solid rgba(240,165,0,0.15)",
                borderRadius: "8px",
                padding: "8px",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F0A500")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(240,165,0,0.15)")}
            >
              <img
                src={url}
                alt={`Certifikát ${i + 1}`}
                className="w-full h-auto rounded"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        <div className="text-center">
          <Button variant="goldOutline" size="lg" asChild>
            <a
              href="https://drive.google.com/uc?export=download&id=1_wJm_yGZnu4ovkkuJID___byx9E7B2VB"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stáhnout certifikát RTSC (PDF) →
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
