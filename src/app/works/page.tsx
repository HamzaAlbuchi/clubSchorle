'use client'

import Navigation from '@/components/Navigation'
import { PageWrapper } from '@/components/PageWrapper'
import { SplitWordmarkLayout } from '@/components/SplitWordmarkLayout'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { CircledText, HandWrittenText, Checkmark, InkCircle, WobblyUnderline } from '@/components/Annotations'

export default function Works() {
  const works = [
    {
      number: '01',
      title: 'ALTARS',
      year: '2026',
      description: 'A gathering exploring themes of death and mourning through shared food. Participants engaged with uncomfortable conversations over a carefully composed meal.',
    },
    {
      number: '02',
      title: 'FETISH',
      year: '2026',
      description: 'An intimate evening celebrating non-traditional practices and desires. A space to explore what society deems taboo through taste and sensuality.',
    },
    {
      number: '03',
      title: 'COOKING SATURDAY',
      year: '2026',
      description: 'A communal kitchen experience where strangers become collaborators. We gather to cook, share stories, and discover each other through the act of creation.',
    },
    {
      number: '04',
      title: 'FERMENTED',
      year: '2025',
      description: 'An exploration of time, decay, and transformation. How fermentation mirrors human relationships — what breaks down, what preserves, what becomes something entirely new.',
    },
    {
      number: '05',
      title: 'FORAGED',
      year: '2025',
      description: 'Walking through Munich with no destination, foraging not just food but stories. An investigation of abundance and scarcity in urban landscapes.',
    },
  ]

  return (
    <>
      <Navigation />
      <PageWrapper>
        <SplitWordmarkLayout>
        <div style={{ padding: '60px 48px' }}>
          {/* Page title */}
          <div style={{ marginBottom: '120px', position: 'relative' }}>
            <div
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.2,
                color: '#0D0C0A',
                marginBottom: '8px',
              }}
            >
              A catalogue of experiences.
            </div>
            <HandWrittenText text="all events" x={240} y={10} size={16} />
            <Checkmark x={380} y={15} size={18} />
          </div>

          {/* Works grid - scattered layout with breathing room */}
          <div style={{ position: 'relative' }}>
            {works.map((work, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: idx < works.length - 1 ? '200px' : '0',
                  position: 'relative',
                  left: idx % 2 === 0 ? '0' : '200px',
                }}
              >
                {/* Work entry */}
                <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', position: 'relative' }}>
                  {/* Visual placeholder */}
                  <div style={{ flex: '0 0 240px', position: 'relative' }}>
                    <PlaceholderImage width="240px" height="240px" />
                    {idx === 0 && <HandWrittenText text="iconic →" x={160} y={220} size={15} />}
                    {idx === 2 && <CircledText text="best" x={170} y={200} size={14} />}
                  </div>

                  {/* Text content */}
                  <div style={{ flex: '1', maxWidth: '300px', position: 'relative' }}>
                    <div
                      style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        letterSpacing: '0.08em',
                        color: 'rgba(13, 12, 10, 0.5)',
                        textTransform: 'uppercase',
                        marginBottom: '16px',
                      }}
                    >
                      {work.number} · {work.year}
                    </div>

                    <div
                      style={{
                        fontSize: '16px',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 400,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#0D0C0A',
                        marginBottom: '16px',
                        position: 'relative',
                      }}
                    >
                      {work.title}
                      {/* Annotation: circled text on first work */}
                      {idx === 0 && (
                        <CircledText text="favourite" x={120} y={-30} size={14} />
                      )}
                      {/* Underline on second work */}
                      {idx === 1 && (
                        <WobblyUnderline x={0} y={20} width={120} thickness={2} style={{ top: '12px' }} />
                      )}
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
                      {work.description}
                    </div>
                    {idx === 3 && <Checkmark x={270} y={80} size={16} />}
                  </div>
                </div>
                {/* Annotation: "see this" on the third work */}
                {idx === 2 && <HandWrittenText text="must see ↓" x={300} y={220} size={15} />}
                {idx === 4 && <InkCircle x={320} y={180} size={12} />}
              </div>
            ))}
          </div>

          {/* Footer statement */}
          <div style={{ marginTop: '240px', maxWidth: '280px' }}>
            <div
              style={{
                fontSize: '20px',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.3,
                color: '#0D0C0A',
                marginBottom: '24px',
              }}
            >
              Each gathering leaves traces.
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
              The work is not in the event itself, but in how it continues to shape those who attended.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '120px 48px',
            fontSize: '11px',
            fontFamily: 'var(--font-dm-mono)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: 'rgba(13, 12, 10, 0.4)',
            textTransform: 'uppercase',
          }}
        >
          © 2026 Club Schorle
        </div>
        </SplitWordmarkLayout>
      </PageWrapper>
    </>
  )
}
