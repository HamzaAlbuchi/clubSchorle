'use client'

import Navigation from '@/components/Navigation'
import { PageWrapper } from '@/components/PageWrapper'
import { GlossaryDefinition } from '@/components/GlossaryDefinition'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { HandWrittenText, WobblyUnderline, CircledText, Checkmark, InkCircle } from '@/components/Annotations'

export default function Home() {
  return (
    <>
      <Navigation />
      <PageWrapper>
        {/* Hero statement - very sparse */}
        <div style={{ padding: '60px 48px', position: 'relative' }}>
          <div
            style={{
              maxWidth: '600px',
              marginBottom: '120px',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.2,
                color: '#0D0C0A',
                marginBottom: '8px',
              }}
            >
              Intimate food experiences for the curious.
            </div>
            <div
              style={{
                fontSize: '9px',
                fontFamily: 'var(--font-dm-mono)',
                fontWeight: 300,
                letterSpacing: '0.08em',
                color: 'rgba(13, 12, 10, 0.5)',
                textTransform: 'uppercase',
              }}
            >
              01
            </div>
            {/* Annotations on hero */}
            <CircledText text="start here" x={150} y={-40} size={16} />
            <HandWrittenText text="read more →" x={280} y={50} size={15} />
          </div>

          {/* Description - very minimal */}
          <div
            style={{
              maxWidth: '220px',
              marginBottom: '180px',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-dm-mono)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'rgba(13, 12, 10, 0.6)',
              }}
            >
              A collective dedicated to experimental culinary gatherings in Munich. Each event is a carefully curated experience that challenges, surprises, and delights.
            </div>
            <HandWrittenText text="munich only" x={-30} y={80} size={14} />
            <Checkmark x={180} y={100} size={18} />
          </div>

          {/* Four upcoming events as glossary definitions scattered across page */}
          <div style={{ position: 'relative', height: '700px', marginBottom: '240px' }}>
            <div style={{ position: 'absolute', top: '0', left: '0' }}>
              <GlossaryDefinition
                number="02"
                word="ALTARS"
                definition="A gathering exploring themes of death and mourning through shared food. 14 June 2026, 19:00, Akademieviertel."
              />
              <Checkmark x={190} y={-20} size={16} />
            </div>

            <div style={{ position: 'absolute', top: '180px', right: '60px', position: 'relative' }}>
              <GlossaryDefinition
                number="03"
                word="FETISH"
                definition="An intimate evening celebrating non-traditional practices. 28 June 2026, 18:30, Glockenbachviertel."
              />
              {/* Annotation: "12 people only" */}
              <HandWrittenText text="12 people only" x={-100} y={-35} size={15} />
              <InkCircle x={-45} y={-25} size={10} />
            </div>

            <div style={{ position: 'absolute', bottom: '0', left: '240px' }}>
              <GlossaryDefinition
                number="04"
                word="COOKING SATURDAY"
                definition="A communal kitchen experience. We gather to cook, eat, and share stories together. 5 July 2026, 17:00, Haidhausen."
              />
              {/* Wobbly underline under event title */}
              <WobblyUnderline x={0} y={44} width={160} thickness={2.5} style={{ top: '-25px' }} />
            </div>

            {/* "nov. 2025" annotation near top */}
            <HandWrittenText text="nov. 2025" x={80} y={30} size={16} />
            <HandWrittenText text="sold out" x={420} y={200} size={15} />
          </div>

          {/* Placeholder for visual */}
          <div style={{ marginBottom: '160px', position: 'relative' }}>
            <div
              style={{
                fontSize: '9px',
                fontFamily: 'var(--font-dm-mono)',
                fontWeight: 300,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(13, 12, 10, 0.5)',
                marginBottom: '16px',
              }}
            >
              05
            </div>
            <PlaceholderImage width="280px" height="280px" />
            <HandWrittenText text="best one yet" x={180} y={260} size={16} />
            <CircledText text="wow" x={260} y={220} size={16} />
          </div>

          {/* Statement about the collective */}
          <div style={{ maxWidth: '300px', position: 'relative' }}>
            <div
              style={{
                fontSize: '24px',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.3,
                color: '#0D0C0A',
                marginBottom: '16px',
              }}
            >
              Food is a language.
            </div>
            <div
              style={{
                fontSize: '9px',
                fontFamily: 'var(--font-dm-mono)',
                fontWeight: 300,
                letterSpacing: '0.08em',
                color: 'rgba(13, 12, 10, 0.5)',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              06
            </div>
            <div
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-dm-mono)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'rgba(13, 12, 10, 0.6)',
              }}
            >
              Through flavor and ritual, we communicate our deepest values, our fears, our dreams.
            </div>
            <WobblyUnderline x={0} y={140} width={200} thickness={2} style={{ top: '-10px' }} />
          </div>
        </div>

        {/* Footer section with breathing room */}
        <div
          style={{
            padding: '120px 48px',
            fontSize: '11px',
            fontFamily: 'var(--font-dm-mono)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: 'rgba(13, 12, 10, 0.4)',
            textTransform: 'uppercase',
            position: 'relative',
          }}
        >
          © 2026 Club Schorle
          <HandWrittenText text="thanks" x={120} y={-20} size={14} />
        </div>
      </PageWrapper>
    </>
  )
}
