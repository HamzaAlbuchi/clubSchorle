interface GlossaryDefinitionProps {
  word: string
  definition: string
  number?: string
  style?: React.CSSProperties
}

export function GlossaryDefinition({ word, definition, number, style }: GlossaryDefinitionProps) {
  return (
    <div
      style={{
        maxWidth: '200px',
        ...style,
      }}
    >
      {number && (
        <div
          style={{
            fontSize: '9px',
            fontFamily: 'var(--font-dm-mono)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(13, 12, 10, 0.5)',
            marginBottom: '8px',
          }}
        >
          {number}
        </div>
      )}
      <div
        style={{
          fontSize: '11px',
          fontFamily: 'var(--font-dm-mono)',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#0D0C0A',
          marginBottom: '8px',
        }}
      >
        {word}
      </div>
      <div
        style={{
          fontSize: '12px',
          fontFamily: 'var(--font-dm-mono)',
          fontWeight: 300,
          lineHeight: '1.5',
          color: 'rgba(13, 12, 10, 0.6)',
        }}
      >
        {definition}
      </div>
    </div>
  )
}
