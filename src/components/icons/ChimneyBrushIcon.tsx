import React from "react";

interface ChimneyBrushIconProps {
  size?: number;
  className?: string;
}

const ChimneyBrushIcon: React.FC<ChimneyBrushIconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Brush bristles - circular fan */}
    <line x1="12" y1="4" x2="12" y2="2" />
    <line x1="8" y1="5" x2="7" y2="3" />
    <line x1="16" y1="5" x2="17" y2="3" />
    <line x1="5.5" y1="8" x2="3.5" y2="7" />
    <line x1="18.5" y1="8" x2="20.5" y2="7" />
    {/* Brush head */}
    <path d="M6 10a6 6 0 0 1 12 0" />
    <line x1="6" y1="10" x2="18" y2="10" />
    {/* Handle */}
    <line x1="12" y1="10" x2="12" y2="22" />
  </svg>
);

export default ChimneyBrushIcon;
