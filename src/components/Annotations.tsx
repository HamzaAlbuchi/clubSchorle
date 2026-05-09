// Handwritten-style SVG annotations - inspired by pen markings on a document
const INK_BLUE = '#2E5090'
const STROKE_OPACITY = 0.7

// Hand-drawn arrow (wobbly)
export function HandDrawnArrow({
  x,
  y,
  endX,
  endY,
  style,
}: {
  x: number
  y: number
  endX: number
  endY: number
  style?: React.CSSProperties
}) {
  const midX = (x + endX) / 2
  const midY = (y + endY) / 2
  const wobble = Math.random() * 6 - 3

  return (
    <svg
      style={{
        position: 'absolute',
        left: Math.min(x, endX) - 10,
        top: Math.min(y, endY) - 10,
        width: Math.abs(endX - x) + 20,
        height: Math.abs(endY - y) + 20,
        pointerEvents: 'none',
        ...style,
      }}
      viewBox={`0 0 ${Math.abs(endX - x) + 20} ${Math.abs(endY - y) + 20}`}
    >
      <path
        d={`M ${x - Math.min(x, endX) + 10} ${y - Math.min(y, endY) + 10} Q ${midX - Math.min(x, endX) + 10 + wobble} ${midY - Math.min(y, endY) + 10 + wobble} ${endX - Math.min(x, endX) + 10} ${endY - Math.min(y, endY) + 10}`}
        stroke={INK_BLUE}
        strokeWidth="2"
        fill="none"
        opacity={STROKE_OPACITY}
        strokeLinecap="round"
      />
      <path
        d={`M ${endX - Math.min(x, endX) + 10} ${endY - Math.min(y, endY) + 10} L ${endX - Math.min(x, endX) + 5} ${endY - Math.min(y, endY) + 3} L ${endX - Math.min(x, endX) + 7} ${endY - Math.min(y, endY) + 13}`}
        stroke={INK_BLUE}
        strokeWidth="2"
        fill="none"
        opacity={STROKE_OPACITY}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Hand-written text annotation
export function HandWrittenText({
  text,
  x,
  y,
  style,
  size = 16,
}: {
  text: string
  x: number
  y: number
  style?: React.CSSProperties
  size?: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontFamily: 'var(--font-caveat)',
        fontSize: size,
        color: INK_BLUE,
        opacity: STROKE_OPACITY,
        pointerEvents: 'none',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        transform: `rotate(${Math.random() * 8 - 4}deg)`,
        ...style,
      }}
    >
      {text}
    </div>
  )
}

// Wobbly underline using SVG path
export function WobblyUnderline({
  x,
  y,
  width,
  style,
  thickness = 2,
}: {
  x: number
  y: number
  width: number
  style?: React.CSSProperties
  thickness?: number
}) {
  const steps = Math.floor(width / 15)
  let pathData = `M ${x} ${y}`

  for (let i = 0; i <= steps; i++) {
    const xPos = x + (width / steps) * i
    const yPos = y + (Math.sin(i * 0.4) * 3)
    pathData += ` L ${xPos} ${yPos}`
  }

  return (
    <svg
      style={{
        position: 'absolute',
        left: x - 5,
        top: y - 5,
        width: width + 10,
        height: 20,
        pointerEvents: 'none',
        ...style,
      }}
      viewBox={`${x - 5} ${y - 5} ${width + 10} 20`}
    >
      <path
        d={pathData}
        stroke={INK_BLUE}
        strokeWidth={thickness}
        fill="none"
        opacity={STROKE_OPACITY}
        strokeLinecap="round"
      />
    </svg>
  )
}

// Imperfect circle around text using SVG ellipse
export function CircledText({
  text,
  x,
  y,
  style,
  size = 14,
}: {
  text: string
  x: number
  y: number
  style?: React.CSSProperties
  size?: number
}) {
  const padding = 10
  const textWidth = text.length * (size * 0.6)
  const textHeight = size

  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', ...style }}>
      <svg
        style={{
          position: 'absolute',
          left: -padding - 2,
          top: -padding - 2,
          width: textWidth + padding * 2 + 4,
          height: textHeight + padding * 2 + 4,
        }}
        viewBox={`0 0 ${textWidth + padding * 2 + 4} ${textHeight + padding * 2 + 4}`}
      >
        <ellipse
          cx={(textWidth + padding * 2 + 4) / 2}
          cy={(textHeight + padding * 2 + 4) / 2}
          rx={(textWidth + padding * 2) / 2 + Math.random() * 3}
          ry={(textHeight + padding * 2) / 2 + Math.random() * 3}
          stroke={INK_BLUE}
          strokeWidth="2.5"
          fill="none"
          opacity={STROKE_OPACITY}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          fontFamily: 'var(--font-caveat)',
          fontSize: size,
          color: INK_BLUE,
          opacity: STROKE_OPACITY,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {text}
      </div>
    </div>
  )
}

// Strikethrough text
export function StrikeThroughText({
  text,
  x,
  y,
  style,
  size = 14,
}: {
  text: string
  x: number
  y: number
  style?: React.CSSProperties
  size?: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-caveat)',
          fontSize: size,
          color: INK_BLUE,
          opacity: STROKE_OPACITY,
          fontWeight: 600,
          position: 'relative',
        }}
      >
        {text}
        <svg
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: `${text.length * (size * 0.5)}px`,
            height: size,
            transform: 'translateY(-50%)',
          }}
          viewBox={`0 0 ${text.length * (size * 0.5)} ${size}`}
        >
          <path
            d={`M 0 ${size / 2} Q ${(text.length * (size * 0.5)) / 2} ${size / 2 - 3} ${text.length * (size * 0.5)} ${size / 2}`}
            stroke={INK_BLUE}
            strokeWidth="2"
            fill="none"
            opacity={STROKE_OPACITY}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}

// Simple circle/dot
export function InkCircle({
  x,
  y,
  size = 8,
  style,
}: {
  x: number
  y: number
  size?: number
  style?: React.CSSProperties
}) {
  return (
    <svg
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        pointerEvents: 'none',
        ...style,
      }}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 1}
        stroke={INK_BLUE}
        strokeWidth="1.5"
        fill="none"
        opacity={STROKE_OPACITY}
      />
    </svg>
  )
}

// Checkmark
export function Checkmark({
  x,
  y,
  style,
  size = 20,
}: {
  x: number
  y: number
  style?: React.CSSProperties
  size?: number
}) {
  return (
    <svg
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        pointerEvents: 'none',
        ...style,
      }}
      viewBox={`0 0 ${size} ${size}`}
    >
      <path
        d={`M 2 ${size / 2} L ${size / 2} ${size - 2} L ${size - 2} 2`}
        stroke={INK_BLUE}
        strokeWidth="2.5"
        fill="none"
        opacity={STROKE_OPACITY}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
