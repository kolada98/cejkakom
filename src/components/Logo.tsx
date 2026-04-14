export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 90"
      width="140"
      height="63"
      className={className}
    >
      {/* ČEJKA text */}
      <text
        x="0"
        y="62"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="62"
        fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="2"
      >
        ČEJKA
      </text>

      {/* Horizontal gold line — right half only */}
      <line
        x1="80"
        y1="68"
        x2="195"
        y2="68"
        stroke="#F0A500"
        strokeWidth="2"
      />

      {/* KOMÍNY text — right aligned under line */}
      <text
        x="195"
        y="84"
        fontFamily="Arial, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#F0A500"
        letterSpacing="4"
        textAnchor="end"
      >
        KOMÍNY
      </text>

      {/* Swoosh — two curves, top right above KA */}
      <path
        d="M 118,8 Q 148,0 178,18"
        stroke="#F0A500"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 125,14 Q 152,6 180,22"
        stroke="#F0A500"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
