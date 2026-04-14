export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center leading-none select-none ${className}`}>
      <div className="relative">
        {/* Gold swoosh arc above Č */}
        <svg
          className="absolute -top-3 -right-1"
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 10C6 2 14 0 18 2"
            stroke="#F0A500"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M4 8C7 3 13 2 16 4"
            stroke="#F0A500"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <span
          style={{
            color: "#FFFFFF",
            fontWeight: 900,
            fontSize: "28px",
            letterSpacing: "-0.5px",
          }}
        >
          ČEJKA
        </span>
      </div>
      {/* Gold horizontal line */}
      <div
        style={{
          height: "1.5px",
          width: "100%",
          backgroundColor: "#F0A500",
          marginTop: "2px",
        }}
      />
      {/* KOMÍNY text */}
      <span
        style={{
          color: "#F0A500",
          fontWeight: 700,
          fontSize: "11px",
          letterSpacing: "3px",
          textAlign: "center",
          marginTop: "3px",
        }}
      >
        KOMÍNY
      </span>
    </div>
  );
}
