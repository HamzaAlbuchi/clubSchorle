interface PlaceholderImageProps {
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}

export function PlaceholderImage({ width = '100%', height = '300px', style }: PlaceholderImageProps) {
  return (
    <div
      style={{
        width,
        height,
        background: '#E8E8E8',
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none',
        ...style,
      }}
    />
  )
}
