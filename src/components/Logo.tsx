export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start leading-none select-none ${className}`}>
      <div className="relative">
        {/* Gold swoosh arcs - positioned above K area (top-right) */}
        <svg
          className="absolute"
          style={{ top: "-10px", right: "-2px" }}
          width="28"
          height="16"
          viewBox="0 0 28 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 14C12 4 20 1 26 3"
            stroke="#F0A500"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M12 13C15 5 21 3 25 5"
            stroke="#F0A500"
            strokeWidth="2"
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
      {/* Gold horizontal line - aligned right under KA */}
      <div className="flex justify-end w-full" style={{ marginTop: "1px" }}>
        <div
          style={{
            height: "1.5px",
            width: "58%",
            backgroundColor: "#FFFFFF",
          }}
        />
      </div>
      {/* KOMÍNY text - right aligned */}
      <div className="flex justify-end w-full">
        <span
          style={{
            color: "#F0A500",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "3px",
            marginTop: "2px",
          }}
        >
          KOMÍNY
        </span>
      </div>
    </div>
  );
}
