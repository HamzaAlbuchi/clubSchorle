/* Handwritten-style annotations: intentionally imperfect + tactile. */
'use client'

import { useId, useMemo } from 'react'

const INK_BLUE = '#2E5090'
const GRAPHITE = '#2B2A28'
// primary ink (editorial red marker, slightly faded)
const MUTED_RED = '#7A2A2A'

const STROKE_OPACITY = 0.68

function hashSeed(input: string) {
  // deterministic, tiny hash (no crypto)
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function seeded(seed: number) {
  // xorshift32 → [0,1)
  let x = seed || 1
  x ^= x << 13
  x ^= x >>> 17
  x ^= x << 5
  return ((x >>> 0) % 10000) / 10000
}

function chooseInk(seed: number) {
  const r = seeded(seed)
  // red is primary; graphite + blue are occasional accents
  if (r < 0.72) return MUTED_RED
  if (r < 0.9) return GRAPHITE
  return INK_BLUE
}

function inkOpacity(seed: number) {
  return STROKE_OPACITY - seeded(seed + 77) * 0.18
}

function rotationDeg(seed: number) {
  return (seeded(seed + 13) - 0.5) * 9
}

function microScale(seed: number) {
  return 0.96 + seeded(seed + 19) * 0.08
}

function wobble(seed: number, amount: number) {
  return (seeded(seed) - 0.5) * amount * 2
}

function strokeWidth(seed: number, base: number) {
  return base * (0.85 + seeded(seed + 31) * 0.4)
}

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
  const id = useId()
  const seed = useMemo(() => hashSeed(`${x},${y}:${endX},${endY}`), [x, y, endX, endY])
  const ink = useMemo(() => chooseInk(seed), [seed])
  const opacity = useMemo(() => inkOpacity(seed), [seed])

  const midX = (x + endX) / 2
  const midY = (y + endY) / 2
  const w = wobble(seed, 4.8)
  const rot = rotationDeg(seed)

  return (
    <svg
      style={{
        position: 'absolute',
        left: Math.min(x, endX) - 10,
        top: Math.min(y, endY) - 10,
        width: Math.abs(endX - x) + 20,
        height: Math.abs(endY - y) + 20,
        pointerEvents: 'none',
        transform: `rotate(${rot}deg)`,
        transformOrigin: 'center',
        ...style,
      }}
      viewBox={`0 0 ${Math.abs(endX - x) + 20} ${Math.abs(endY - y) + 20}`}
    >
      <defs>
        <filter id={`ink-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed={seed % 99} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <path
        className="annotation-stroke annotation-draw"
        filter={`url(#ink-${id})`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        d={`M ${x - Math.min(x, endX) + 10} ${y - Math.min(y, endY) + 10} Q ${midX - Math.min(x, endX) + 10 + w} ${midY - Math.min(y, endY) + 10 + w} ${endX - Math.min(x, endX) + 10} ${endY - Math.min(y, endY) + 10}`}
        stroke={ink}
        strokeWidth={strokeWidth(seed, 2.1)}
        fill="none"
        opacity={opacity}
        strokeLinecap="round"
      />
      <path
        className="annotation-stroke annotation-draw"
        filter={`url(#ink-${id})`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        d={`M ${endX - Math.min(x, endX) + 10} ${endY - Math.min(y, endY) + 10} L ${endX - Math.min(x, endX) + 5} ${endY - Math.min(y, endY) + 3} L ${endX - Math.min(x, endX) + 7} ${endY - Math.min(y, endY) + 13}`}
        stroke={ink}
        strokeWidth={strokeWidth(seed + 2, 2.1)}
        fill="none"
        opacity={opacity}
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
  const seed = useMemo(() => hashSeed(`${text}:${x},${y}:${size}`), [text, x, y, size])
  const ink = useMemo(() => chooseInk(seed), [seed])
  const opacity = useMemo(() => inkOpacity(seed), [seed])
  const rot = useMemo(() => rotationDeg(seed), [seed])
  const scale = useMemo(() => microScale(seed), [seed])
  const letter = useMemo(() => `${(seeded(seed + 3) - 0.5) * 0.06}em`, [seed])

  return (
    <div
      className="annotation-text"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontFamily: 'var(--font-hand), var(--font-dm-mono), monospace',
        fontSize: size,
        color: ink,
        opacity,
        pointerEvents: 'none',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        transform: `rotate(${rot}deg) scale(${scale})`,
        transformOrigin: 'left center',
        letterSpacing: letter,
        textShadow: `0.4px 0.3px 0 rgba(0,0,0,0.06)`,
        filter: 'blur(0.12px)',
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
  const id = useId()
  const seed = useMemo(() => hashSeed(`${x},${y}:${width}:${thickness}`), [x, y, width, thickness])
  const ink = useMemo(() => chooseInk(seed), [seed])
  const opacity = useMemo(() => inkOpacity(seed), [seed])

  const steps = Math.max(6, Math.floor(width / 14))
  let pathData = `M ${x} ${y + wobble(seed + 1, 1.6)}`

  for (let i = 0; i <= steps; i++) {
    const xPos = x + (width / steps) * i
    const jitter = Math.sin(i * 0.55) * (1.4 + seeded(seed + i * 9) * 2.2) + wobble(seed + i * 17, 1.3)
    const yPos = y + jitter
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
      <defs>
        <filter id={`ink-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed={seed % 97} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <path
        className="annotation-stroke annotation-draw"
        filter={`url(#ink-${id})`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        d={pathData}
        stroke={ink}
        strokeWidth={strokeWidth(seed, thickness)}
        fill="none"
        opacity={opacity}
        strokeLinecap="round"
      />
      {/* faint second pass (tactile / layered) */}
      <path
        className="annotation-stroke annotation-draw"
        filter={`url(#ink-${id})`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        d={pathData}
        stroke={ink}
        strokeWidth={Math.max(0.9, strokeWidth(seed + 2, thickness) - 0.7)}
        fill="none"
        opacity={Math.max(0.18, opacity - 0.45)}
        strokeLinecap="round"
      />
    </svg>
  )
}

// Imperfect circle around text (quick hand path, not a perfect ellipse)
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
  const id = useId()
  const seed = useMemo(() => hashSeed(`circ:${text}:${x},${y}:${size}`), [text, x, y, size])
  const ink = useMemo(() => chooseInk(seed), [seed])
  const opacity = useMemo(() => inkOpacity(seed), [seed])
  const rot = useMemo(() => rotationDeg(seed), [seed])

  const padding = 10
  const textWidth = text.length * (size * 0.6)
  const textHeight = size
  const w = textWidth + padding * 2 + 4
  const h = textHeight + padding * 2 + 4

  const circlePath = useMemo(() => {
    const cx = w / 2
    const cy = h / 2
    const rx = (textWidth + padding * 2) / 2 + 3
    const ry = (textHeight + padding * 2) / 2 + 3
    const points = 18
    let d = ''
    for (let i = 0; i <= points; i++) {
      const t = (i / points) * Math.PI * 2
      const nx = Math.cos(t)
      const ny = Math.sin(t)
      const jitter = 1.6 + seeded(seed + i * 11) * 2.2
      const px = cx + nx * (rx + wobble(seed + i * 3, jitter))
      const py = cy + ny * (ry + wobble(seed + i * 5, jitter))
      d += i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`
    }
    return d + ' Z'
  }, [seed, textWidth, padding, textHeight, w, h])

  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', ...style }}>
      <svg
        style={{
          position: 'absolute',
          left: -padding - 2,
          top: -padding - 2,
          width: w,
          height: h,
          transform: `rotate(${rot}deg)`,
          transformOrigin: 'center',
        }}
        viewBox={`0 0 ${w} ${h}`}
      >
        <defs>
          <filter id={`ink-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed={seed % 93} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.75" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <path
          className="annotation-stroke annotation-draw"
          filter={`url(#ink-${id})`}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          d={circlePath}
          stroke={ink}
          strokeWidth={strokeWidth(seed, 2.6)}
          fill="none"
          opacity={opacity}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="annotation-stroke annotation-draw"
          filter={`url(#ink-${id})`}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          d={circlePath}
          stroke={ink}
          strokeWidth={Math.max(1.1, strokeWidth(seed + 2, 2.6) - 0.9)}
          fill="none"
          opacity={Math.max(0.18, opacity - 0.5)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        className="annotation-text"
        style={{
          fontFamily: 'var(--font-hand), var(--font-dm-mono), monospace',
          fontSize: size,
          color: ink,
          opacity,
          fontWeight: 400,
          whiteSpace: 'nowrap',
          position: 'relative',
          zIndex: 1,
          letterSpacing: `${(seeded(seed + 7) - 0.5) * 0.06}em`,
          textShadow: `0.4px 0.3px 0 rgba(0,0,0,0.06)`,
          filter: 'blur(0.12px)',
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
  const id = useId()
  const seed = useMemo(() => hashSeed(`strike:${text}:${x},${y}:${size}`), [text, x, y, size])
  const ink = useMemo(() => chooseInk(seed), [seed])
  const opacity = useMemo(() => inkOpacity(seed), [seed])
  const rot = useMemo(() => rotationDeg(seed), [seed])
  const width = text.length * (size * 0.5)

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
        transform: `rotate(${rot}deg)`,
        transformOrigin: 'left center',
        ...style,
      }}
    >
      <div
        className="annotation-text"
        style={{
          fontFamily: 'var(--font-hand), var(--font-dm-mono), monospace',
          fontSize: size,
          color: ink,
          opacity,
          fontWeight: 400,
          position: 'relative',
          letterSpacing: `${(seeded(seed + 9) - 0.5) * 0.06}em`,
          textShadow: `0.4px 0.3px 0 rgba(0,0,0,0.06)`,
          filter: 'blur(0.12px)',
        }}
      >
        {text}
        <svg
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: `${width}px`,
            height: size,
            transform: 'translateY(-50%)',
          }}
          viewBox={`0 0 ${width} ${size}`}
        >
          <defs>
            <filter id={`ink-${id}`} x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed={seed % 91} result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <path
            className="annotation-stroke annotation-draw"
            filter={`url(#ink-${id})`}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            d={`M 0 ${size / 2 + wobble(seed + 1, 1.2)} Q ${width / 2} ${size / 2 - (2 + seeded(seed + 5) * 2.6)} ${width} ${size / 2 + wobble(seed + 7, 1.3)}`}
            stroke={ink}
            strokeWidth={strokeWidth(seed, 2.2)}
            fill="none"
            opacity={opacity}
            strokeLinecap="round"
          />
          {/* occasional crossed-out scribble */}
          {seeded(seed + 222) > 0.72 && (
            <path
              className="annotation-stroke"
              filter={`url(#ink-${id})`}
              d={`M ${width * 0.12} ${size * 0.2} L ${width * 0.86} ${size * 0.86}`}
              stroke={ink}
              strokeWidth={Math.max(1.1, strokeWidth(seed + 4, 1.8))}
              fill="none"
              opacity={Math.max(0.15, opacity - 0.55)}
              strokeLinecap="round"
            />
          )}
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
  const id = useId()
  const seed = useMemo(() => hashSeed(`dot:${x},${y}:${size}`), [x, y, size])
  const ink = useMemo(() => chooseInk(seed), [seed])
  const opacity = useMemo(() => inkOpacity(seed), [seed])

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
      <defs>
        <filter id={`ink-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed={seed % 89} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <path
        className="annotation-stroke"
        filter={`url(#ink-${id})`}
        d={`M ${size * 0.12} ${size * 0.5} C ${size * 0.2} ${size * 0.18}, ${size * 0.8} ${size * 0.18}, ${size * 0.88} ${size * 0.5} C ${size * 0.82} ${size * 0.86}, ${size * 0.18} ${size * 0.86}, ${size * 0.12} ${size * 0.5} Z`}
        stroke={ink}
        strokeWidth={strokeWidth(seed, 1.55)}
        fill="none"
        opacity={opacity}
        strokeLinecap="round"
        strokeLinejoin="round"
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
  const id = useId()
  const seed = useMemo(() => hashSeed(`check:${x},${y}:${size}`), [x, y, size])
  const ink = useMemo(() => chooseInk(seed), [seed])
  const opacity = useMemo(() => inkOpacity(seed), [seed])
  const rot = useMemo(() => rotationDeg(seed), [seed])

  return (
    <svg
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        pointerEvents: 'none',
        transform: `rotate(${rot}deg)`,
        transformOrigin: 'center',
        ...style,
      }}
      viewBox={`0 0 ${size} ${size}`}
    >
      <defs>
        <filter id={`ink-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed={seed % 83} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <path
        className="annotation-stroke annotation-draw"
        filter={`url(#ink-${id})`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        d={`M ${2 + wobble(seed + 1, 0.9)} ${size / 2 + wobble(seed + 2, 1.1)} L ${size / 2 + wobble(seed + 3, 1.2)} ${size - 2 + wobble(seed + 4, 0.9)} L ${size - 2 + wobble(seed + 5, 1.1)} ${2 + wobble(seed + 6, 0.9)}`}
        stroke={ink}
        strokeWidth={strokeWidth(seed, 2.7)}
        fill="none"
        opacity={opacity}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
