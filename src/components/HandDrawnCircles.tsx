// Hand-drawn bubble SVG paths - exact shapes from brand identity
const bubblePaths = [
  // Perfect circle (slightly thick stroke)
  "M50,8 C76,8 92,24 92,50 C92,76 76,92 50,92 C24,92 8,76 8,50 C8,24 24,8 50,8Z",
  // Organic wobbly shape (top-left irregular)
  "M45,12 C72,10 90,30 88,55 C86,80 68,92 48,91 C26,90 8,72 10,50 C12,28 25,14 45,12Z",
  // Slightly squeezed oval
  "M48,10 C74,12 90,28 90,52 C90,78 72,92 50,92 C28,92 10,76 10,50 C10,26 28,8 48,10Z",
  // Perfect circle variant
  "M50,8 C76,8 92,24 92,50 C92,76 76,92 50,92 C24,92 8,76 8,50 C8,24 24,8 50,8Z",
];

interface HandDrawnCircleProps {
  size?: number;
  pathIndex?: number;
  opacity?: number;
  className?: string;
  animate?: boolean;
}

export function HandDrawnCircle({ size = 100, pathIndex = 0, opacity = 1, className = "", animate = false }: HandDrawnCircleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={{ 
        opacity,
        animation: animate ? `floatingBubble 6s ease-in-out infinite` : undefined
      }}
    >
      <path
        d={bubblePaths[pathIndex % bubblePaths.length]}
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Logo version with circle in the middle
export function LogoWithCircle() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-dm-mono)" }}>
      <span style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        CLUB SCH
      </span>
      <HandDrawnCircle size={14} pathIndex={0} opacity={1} />
      <span style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        RLE
      </span>
    </div>
  );
}
