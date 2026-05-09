'use client'

import Navigation from '@/components/Navigation'
import { PageWrapper } from '@/components/PageWrapper'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { HandWrittenText, StrikeThroughText } from '@/components/Annotations'

export default function About() {
  return (
    <>
      <Navigation />
      <PageWrapper>
        <div style={{ padding: '60px 48px' }}>
          {/* Main statement */}
          <div style={{ marginBottom: '140px', maxWidth: '580px', position: 'relative' }}>
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
              Club Schorle is a collective that believes food is a vehicle for transformation.
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
            {/* Annotation: "not just" struck through with "always" as correction */}
            <StrikeThroughText text="just food" x={245} y={55} size={32} />
            <HandWrittenText text="everything" x={340} y={58} size={20} />
          </div>

          {/* Content sections scattered */}
          <div style={{ position: 'relative', marginBottom: '180px' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', maxWidth: '240px' }}>
              <div
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-dm-mono)',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(13, 12, 10, 0.5)',
                  marginBottom: '12px',
                }}
              >
                02
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                  color: '#0D0C0A',
                  marginBottom: '16px',
                }}
              >
                Founded in Munich in 2021.
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
                Born from a desire to create spaces where the uncomfortable is welcomed, where the taboo becomes sacred, and where strangers become collaborators.
              </div>
            </div>

            <div style={{ position: 'absolute', top: '220px', right: '0', maxWidth: '240px' }}>
              <PlaceholderImage width="240px" height="240px" />
            </div>
          </div>

          {/* Values section */}
          <div style={{ marginBottom: '180px', maxWidth: '600px' }}>
            <div
              style={{
                fontSize: '9px',
                fontFamily: 'var(--font-dm-mono)',
                fontWeight: 300,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(13, 12, 10, 0.5)',
                marginBottom: '24px',
              }}
            >
              03 · Values
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '60px',
              }}
            >
              {[
                { word: 'Intimate', desc: 'Small groups. Personal connections. No spectators.' },
                { word: 'Experimental', desc: 'Pushing boundaries. Testing what food can do.' },
                { word: 'Communal', desc: 'Shared experiences. Collective meaning-making.' },
                { word: 'Conceptual', desc: 'Every detail serves an idea. Nothing is accidental.' },
              ].map((value, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-dm-mono)',
                      fontWeight: 400,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#0D0C0A',
                      marginBottom: '8px',
                    }}
                  >
                    {value.word}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontFamily: 'var(--font-dm-mono)',
                      fontWeight: 300,
                      lineHeight: 1.5,
                      color: 'rgba(13, 12, 10, 0.6)',
                    }}
                  >
                    {value.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collective members */}
          <div style={{ marginBottom: '240px' }}>
            <div
              style={{
                fontSize: '9px',
                fontFamily: 'var(--font-dm-mono)',
                fontWeight: 300,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(13, 12, 10, 0.5)',
                marginBottom: '24px',
              }}
            >
              04 · The collective
            </div>

            <div style={{ maxWidth: '320px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-dm-mono)',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: 'rgba(13, 12, 10, 0.6)',
                  marginBottom: '24px',
                }}
              >
                Club Schorle is a rotating collective of chefs, artists, philosophers, and provocateurs. We come together around shared values and dissolve once the experience is complete.
              </div>

              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-dm-mono)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: 'rgba(13, 12, 10, 0.5)',
                }}
              >
                Interested in collaborating? We&apos;re always looking for co-conspirators.
              </div>
            </div>
          </div>

          {/* Closing statement */}
          <div style={{ maxWidth: '300px' }}>
            <div
              style={{
                fontSize: '22px',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.3,
                color: '#0D0C0A',
                marginBottom: '20px',
              }}
            >
              Food is language.
            </div>
            <div
              style={{
                fontSize: '9px',
                fontFamily: 'var(--font-dm-mono)',
                fontWeight: 300,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(13, 12, 10, 0.5)',
                marginBottom: '12px',
              }}
            >
              05
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
                Through flavor and ritual, we communicate what words cannot.
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
      </PageWrapper>
    </>
  )
}
