'use client'

import Image from 'next/image'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { PageWrapper } from '@/components/PageWrapper'
import { SplitWordmarkLayout } from '@/components/SplitWordmarkLayout'
import { HandWrittenText } from '@/components/Annotations'

const LABEL_UPPER = {
  fontSize: '9px',
  fontFamily: 'var(--font-dm-mono)',
  fontWeight: 300,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'rgba(13, 12, 10, 0.5)',
  display: 'block',
  marginBottom: '8px',
}

const FIELD_LINE = {
  width: '100%',
  maxWidth: '100%',
  padding: '8px 0',
  fontSize: 'clamp(11px, 3.5vw, 12px)',
  fontFamily: 'var(--font-dm-mono)',
  fontWeight: 300,
  border: 'none',
  borderBottom: '1px solid rgba(13, 12, 10, 0.2)',
  background: 'transparent',
  color: '#0D0C0A',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box' as const,
}

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  /** Honeypot — leave empty */
  const [hp, setHp] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<null | 'success' | 'error'>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()
    if (!name || !email || !message) return

    setLoading(true)
    setFeedback(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, _hp: hp }),
      })
      let data: { ok?: boolean } = {}
      try {
        data = (await res.json()) as { ok?: boolean }
      } catch {
        data = {}
      }
      if (res.ok && data.ok) {
        setFormData({ name: '', email: '', message: '' })
        setHp('')
        setFeedback('success')
      } else {
        setFeedback('error')
      }
    } catch {
      setFeedback('error')
    } finally {
      setLoading(false)
    }
  }

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

              {/* 03 · Message */}
              <section className="contact-page__col contact-page__col--form">
                <div style={LABEL_SECTION}>03 · Message</div>

                {feedback === 'success' ? (
                  <div aria-live="polite">
                    <p className="contact-page__feedback" style={{ marginTop: 0 }}>
                      Message sent.
                    </p>
                    <button
                      type="button"
                      className="contact-page__again"
                      onClick={() => setFeedback(null)}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    aria-busy={loading}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                      width: '100%',
                      maxWidth: '100%',
                      minWidth: 0,
                    }}
                  >
                    <div className="contact-page__hp-wrap" aria-hidden="true">
                      <label htmlFor="contact-company">Company</label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={hp}
                        onChange={(e) => setHp(e.target.value)}
                      />
                    </div>

                    <div style={{ width: '100%', minWidth: 0 }}>
                      <label htmlFor="contact-name" style={LABEL_UPPER}>
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="contact-page__field-input"
                        value={formData.name}
                        disabled={loading}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          ...FIELD_LINE,
                          ...(loading ? { opacity: 0.55, cursor: 'not-allowed' } : {}),
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.2)')}
                      />
                    </div>

                    <div style={{ width: '100%', minWidth: 0 }}>
                      <label htmlFor="contact-email" style={LABEL_UPPER}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        className="contact-page__field-input"
                        value={formData.email}
                        disabled={loading}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          ...FIELD_LINE,
                          ...(loading ? { opacity: 0.55, cursor: 'not-allowed' } : {}),
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.2)')}
                      />
                    </div>

                    <div style={{ width: '100%', minWidth: 0 }}>
                      <label htmlFor="contact-message" style={LABEL_UPPER}>
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        className="contact-page__textarea"
                        value={formData.message}
                        disabled={loading}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          ...FIELD_LINE,
                          minHeight: '120px',
                          resize: 'vertical',
                          lineHeight: 1.5,
                          ...(loading ? { opacity: 0.55, cursor: 'not-allowed' } : {}),
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.2)')}
                      />
                    </div>

                    <button
                      type="submit"
                      className="contact-page__submit"
                      disabled={loading}
                      style={{
                        marginTop: '16px',
                        padding: '8px 0',
                        fontSize: '9px',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: loading ? 'rgba(13, 12, 10, 0.45)' : '#0D0C0A',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(13, 12, 10, 0.3)',
                        cursor: loading ? 'wait' : 'pointer',
                        transition: 'color 0.2s, border-color 0.2s, opacity 0.2s',
                        boxSizing: 'border-box',
                        opacity: loading ? 0.65 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (loading) return
                        e.currentTarget.style.color = 'rgba(13, 12, 10, 0.7)'
                        e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.7)'
                      }}
                      onMouseLeave={(e) => {
                        if (loading) return
                        e.currentTarget.style.color = '#0D0C0A'
                        e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.3)'
                      }}
                    >
                      {loading ? 'Sending…' : 'Send'}
                    </button>

                    {feedback === 'error' ? (
                      <p
                        className="contact-page__feedback contact-page__feedback--error"
                        role="status"
                        aria-live="polite"
                        style={{ marginTop: 4 }}
                      >
                        Something went wrong.
                      </p>
                    ) : null}
                  </form>
                )}
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
