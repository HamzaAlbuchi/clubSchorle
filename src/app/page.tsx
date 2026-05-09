'use client'

import Navigation from '@/components/Navigation'
import { HomeIntroScrollProvider } from '@/components/HomeIntroScrollContext'
import { PageWrapper } from '@/components/PageWrapper'
import { SplitWordmarkLayout } from '@/components/SplitWordmarkLayout'
import { EditorialSection } from '@/components/editorial/EditorialSection'
import { GlossaryDefinition } from '@/components/GlossaryDefinition'
import { HandWrittenText, WobblyUnderline, CircledText, Checkmark, InkCircle } from '@/components/Annotations'

export default function Home() {
  return (
    <HomeIntroScrollProvider>
      <Navigation />
      <PageWrapper disableMountFade>
        <SplitWordmarkLayout cinematicIntro>
          <div style={{ padding: '60px 48px 20px', position: 'relative' }}>
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
              <CircledText text="start here" x={150} y={-40} size={16} />
              <HandWrittenText text="read more →" x={280} y={50} size={15} />
            </div>
          </div>

          <EditorialSection
            variant="hero"
            src="/editorial/hero-vacuum-clubschorle.png"
            alt="Vacuum-sealed ingredients held as an archival specimen with Club Schorle typography"
            label="Specimen 031 · rooted / transformed"
            caption="Preservation as installation — memory compressed under plastic."
            priority
            overlay={
              <>
                <HandWrittenText text="sealed" x={120} y={96} size={18} />
                <InkCircle x={268} y={168} size={14} />
              </>
            }
          />

          <div style={{ padding: '0 48px', position: 'relative' }}>
            <div
              style={{
                maxWidth: '240px',
                marginBottom: 'clamp(64px, 12vw, 140px)',
                marginTop: 'clamp(24px, 5vw, 48px)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-dm-mono)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(13, 12, 10, 0.62)',
                }}
              >
                A collective dedicated to experimental culinary gatherings in Munich. Each event is a carefully curated experience that challenges, surprises, and delights.
              </div>
              <HandWrittenText text="munich only" x={-20} y={88} size={14} />
              <Checkmark x={170} y={108} size={18} />
            </div>
          </div>

          <div
            style={{
              padding: '0 48px',
              position: 'relative',
              minHeight: 'clamp(560px, 85vw, 760px)',
              marginBottom: 'clamp(80px, 14vw, 200px)',
            }}
          >
            <div style={{ position: 'absolute', top: '0', left: '0', zIndex: 1 }}>
              <GlossaryDefinition
                number="02"
                word="ALTARS"
                definition="A gathering exploring themes of death and mourning through shared food. 14 June 2026, 19:00, Akademieviertel."
              />
              <Checkmark x={190} y={-20} size={16} />
            </div>

            <div style={{ position: 'absolute', top: 'clamp(140px, 22vw, 200px)', right: 'clamp(0px, 4vw, 60px)', zIndex: 1 }}>
              <GlossaryDefinition
                number="03"
                word="FETISH"
                definition="An intimate evening celebrating non-traditional practices. 28 June 2026, 18:30, Glockenbachviertel."
              />
              <HandWrittenText text="12 people only" x={-100} y={-35} size={15} />
              <InkCircle x={-45} y={-25} size={10} />
            </div>

            <div style={{ position: 'absolute', bottom: '0', left: 'clamp(80px, 18vw, 240px)', zIndex: 1 }}>
              <GlossaryDefinition
                number="04"
                word="COOKING SATURDAY"
                definition="A communal kitchen experience. We gather to cook, eat, and share stories together. 5 July 2026, 17:00, Haidhausen."
              />
              <WobblyUnderline x={0} y={44} width={160} thickness={2.5} style={{ top: '-25px' }} />
            </div>

            <HandWrittenText text="nov. 2025" x={80} y={30} size={16} />
            <HandWrittenText text="sold out" x={420} y={200} size={15} />
          </div>

          <EditorialSection
            variant="transition"
            src="/editorial/transition-mesh-bread.png"
            alt="Suspended mesh pods with bread and flowers in a gallery-like space"
            label="Installation field notes"
            caption="Gravity, netting, crumb — soft sculpture in mid-air."
            className="editorial-stack-gap"
          />

          <EditorialSection
            variant="poster"
            src="/editorial/poster-damage-control.png"
            alt="Preserving jars with DAMAGE CONTROL typography overlay"
            label="15.02.26 · Sunday · poster layer"
            caption="Documentation that behaves like a printed mistake — repetition as evidence."
            className="editorial-stack-gap"
          />

          <div className="editorial-row-end">
            <EditorialSection
              variant="fragment"
              src="/editorial/fragment-peppers.png"
              alt="Hand holding string with chili peppers and eggplant"
              label="Study · pigment / tension"
              caption="Still life staged like a nervous joke — then held still."
            />
          </div>

          <EditorialSection
            variant="transition"
            src="/editorial/transition-gallery-chain.png"
            alt="Dried bread-like pieces hanging from a metal chain in a gallery"
            label="Chain reaction · vertical slice"
            caption="Industrial hardware meets edible residue."
            className="editorial-stack-gap"
          />

          <EditorialSection
            variant="poster"
            src="/editorial/poster-tonight-balls.png"
            alt="Black and white poster with spheres and tonight 19:00 typography"
            label="@AkademieGalerie · tonight 19:00"
            caption="Exhibition copy treated as rhythm, not explanation."
            className="editorial-stack-gap"
          />

          <EditorialSection
            variant="hero"
            src="/editorial/hero-vacuum-tape.png"
            alt="Vacuum-sealed bag with ingredients and handwritten tape label"
            label="Freshness note · archival sarcasm"
            caption="What preservation promises — and what it refuses to fix."
            overlay={<HandWrittenText text="read the tape" x={40} y={280} size={16} />}
            className="editorial-stack-gap"
          />

          <EditorialSection
            variant="fragment"
            src="/editorial/fragment-gallery-table.png"
            alt="Gallery installation with potatoes, butter, biscuit tower and hanging bread"
            label="Table sequence · potatoes / butter / tower"
            caption="The meal as curated debris."
          />

          <div style={{ padding: 'clamp(80px, 14vw, 160px) 48px 40px', position: 'relative' }}>
            <div style={{ maxWidth: '320px', position: 'relative' }}>
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
                  lineHeight: 1.65,
                  color: 'rgba(13, 12, 10, 0.6)',
                }}
              >
                Through flavor and ritual, we communicate our deepest values, our fears, our dreams.
              </div>
              <WobblyUnderline x={0} y={140} width={200} thickness={2} style={{ top: '-10px' }} />
            </div>
          </div>

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
        </SplitWordmarkLayout>
      </PageWrapper>
    </HomeIntroScrollProvider>
  )
}
