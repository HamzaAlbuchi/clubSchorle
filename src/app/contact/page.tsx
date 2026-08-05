'use client'

import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { PageWrapper } from '@/components/PageWrapper'
import { SplitWordmarkLayout } from '@/components/SplitWordmarkLayout'
import { HandWrittenText } from '@/components/Annotations'

const LABEL_SECTION = {
  fontSize: '9px',
  fontFamily: 'var(--font-dm-mono)',
  fontWeight: 300,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'rgba(13, 12, 10, 0.5)',
  marginBottom: '32px',
}

const CONTACT_ROW_LABEL = {
  fontSize: '10px',
  fontFamily: 'var(--font-dm-mono)',
  fontWeight: 400,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#0D0C0A',
  marginBottom: '6px',
}

export default function Contact() {
  return (
    <>
      <Navigation />
      <PageWrapper>
        <SplitWordmarkLayout contactPage>
          <div className="contact-page">
            {/* Mobile / tablet: CLUB in flow — desktop rails handle typography */}
            <div className="contact-page__rail contact-page__rail--club" aria-hidden="true">
              <Image
                className="contact-page__wordmark-img"
                src="/brand/club.png"
                alt=""
                width={900}
                height={260}
                priority
              />
            </div>

            {/* Desktop: hero + annotation (absolute OK — hidden on narrow via CSS) */}
            <header
              className="contact-page__intro--desktop"
              style={{ marginBottom: '120px', maxWidth: '480px', position: 'relative' }}
            >
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
                Get in touch.
              </div>
              <div style={{ ...LABEL_SECTION, marginBottom: '8px' }}>01</div>
              <HandWrittenText text="reply soon" x={200} y={60} size={14} />
            </header>

            <div className="contact-page__two-col">
              {/* 02 · Direct */}
              <section className="contact-page__col contact-page__col--direct">
                <div style={LABEL_SECTION}>02 · Direct</div>

                <div className="contact-page__detail-stack">
                  <div>
                    <div style={CONTACT_ROW_LABEL}>Email</div>
                    <a
                      className="contact-page__mailto"
                      href="mailto:clubschorle@gmail.com"
                      style={{
                        fontSize: 'clamp(11px, 3.5vw, 12px)',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        color: 'rgba(13, 12, 10, 0.7)',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(13, 12, 10, 0.3)',
                        paddingBottom: '4px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#0D0C0A')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(13, 12, 10, 0.7)')}
                    >
                      clubschorle@gmail.com
                    </a>
                  </div>

                  <div>
                    <div style={CONTACT_ROW_LABEL}>Instagram</div>
                    <a
                      href="https://instagram.com/clubschorle"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 'clamp(11px, 3.5vw, 12px)',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        color: 'rgba(13, 12, 10, 0.7)',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(13, 12, 10, 0.3)',
                        paddingBottom: '4px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#0D0C0A')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(13, 12, 10, 0.7)')}
                    >
                      @clubschorle
                    </a>
                  </div>

                  <div>
                    <div style={CONTACT_ROW_LABEL}>Location</div>
                    <div
                      style={{
                        fontSize: 'clamp(11px, 3.5vw, 12px)',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        color: 'rgba(13, 12, 10, 0.6)',
                        lineHeight: 1.6,
                      }}
                    >
                      Munich, Germany
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* SCHORLE in flow on narrow screens */}
            <div className="contact-page__rail contact-page__rail--schorle" aria-hidden="true">
              <Image
                className="contact-page__wordmark-img"
                src="/brand/schorle.png"
                alt=""
                width={1400}
                height={260}
                priority
              />
            </div>

            <section className="contact-page__outro" style={{ maxWidth: '320px' }}>
              <div
                style={{
                  fontSize: 'clamp(18px, 5vw, 20px)',
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.35,
                  color: '#0D0C0A',
                  marginBottom: '16px',
                }}
              >
                We&apos;re always listening.
              </div>
              <div style={LABEL_SECTION}>04</div>
            </section>

            <footer
              className="contact-page__footer"
              style={{
                padding: '120px 0 0',
                fontSize: '11px',
                fontFamily: 'var(--font-dm-mono)',
                fontWeight: 300,
                letterSpacing: '0.08em',
                color: 'rgba(13, 12, 10, 0.4)',
                textTransform: 'uppercase',
              }}
            >
              © 2026 Club Schorle
            </footer>
          </div>
        </SplitWordmarkLayout>
      </PageWrapper>
    </>
  )
}
