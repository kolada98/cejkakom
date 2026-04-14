import logoImg from "@/assets/logo.png";

export default function Logo({ className = "", height = 52 }: { className?: string; height?: number }) {
  return (
    <img
      src={logoImg}
      alt="ČEJKA KOMÍNY"
      className={className}
      style={{ height: `${height}px`, width: "auto" }}
    />
  );
}
