'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { PageWrapper } from '@/components/PageWrapper'
import { HandWrittenText } from '@/components/Annotations'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <>
      <Navigation />
      <PageWrapper>
        <div style={{ padding: '60px 48px' }}>
          {/* Main heading */}
          <div style={{ marginBottom: '120px', maxWidth: '480px', position: 'relative' }}>
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
            {/* Annotation: "reply soon" */}
            <HandWrittenText text="reply soon" x={200} y={60} size={14} />
          </div>

          {/* Contact info and form side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '120px', maxWidth: '900px', marginBottom: '180px' }}>
            {/* Contact details */}
            <div>
              <div
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-dm-mono)',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(13, 12, 10, 0.5)',
                  marginBottom: '32px',
                }}
              >
                02 · Direct
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '200px' }}>
                <div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-dm-mono)',
                      fontWeight: 400,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#0D0C0A',
                      marginBottom: '6px',
                    }}
                  >
                    Email
                  </div>
                  <a
                    href="mailto:hello@clubschorle.de"
                    style={{
                      fontSize: '12px',
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
                    hello@clubschorle.de
                  </a>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-dm-mono)',
                      fontWeight: 400,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#0D0C0A',
                      marginBottom: '6px',
                    }}
                  >
                    Instagram
                  </div>
                  <a
                    href="https://instagram.com/clubschorle"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
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
                  <div
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-dm-mono)',
                      fontWeight: 400,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#0D0C0A',
                      marginBottom: '6px',
                    }}
                  >
                    Location
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
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
            </div>

            {/* Contact form */}
            <div>
              <div
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-dm-mono)',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(13, 12, 10, 0.5)',
                  marginBottom: '32px',
                }}
              >
                03 · Message
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label
                      style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(13, 12, 10, 0.5)',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 0',
                        fontSize: '12px',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        border: 'none',
                        borderBottom: '1px solid rgba(13, 12, 10, 0.2)',
                        background: 'transparent',
                        color: '#0D0C0A',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.2)')}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(13, 12, 10, 0.5)',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 0',
                        fontSize: '12px',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        border: 'none',
                        borderBottom: '1px solid rgba(13, 12, 10, 0.2)',
                        background: 'transparent',
                        color: '#0D0C0A',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.2)')}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(13, 12, 10, 0.5)',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '8px 0',
                        fontSize: '12px',
                        fontFamily: 'var(--font-dm-mono)',
                        fontWeight: 300,
                        border: 'none',
                        borderBottom: '1px solid rgba(13, 12, 10, 0.2)',
                        background: 'transparent',
                        color: '#0D0C0A',
                        outline: 'none',
                        resize: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.2)')}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '16px',
                      padding: '8px 0',
                      fontSize: '9px',
                      fontFamily: 'var(--font-dm-mono)',
                      fontWeight: 300,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#0D0C0A',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(13, 12, 10, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'rgba(13, 12, 10, 0.7)'
                      e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.7)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#0D0C0A'
                      e.currentTarget.style.borderBottomColor = 'rgba(13, 12, 10, 0.3)'
                    }}
                  >
                    Send
                  </button>
                </form>
              ) : (
                <div
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-dm-mono)',
                    fontWeight: 300,
                    color: 'rgba(13, 12, 10, 0.7)',
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ marginBottom: '12px' }}>✓</div>
                  <div>Message received. We'll be in touch soon.</div>
                </div>
              )}
            </div>
          </div>

          {/* Closing statement */}
          <div style={{ maxWidth: '320px' }}>
            <div
              style={{
                fontSize: '20px',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.3,
                color: '#0D0C0A',
                marginBottom: '16px',
              }}
            >
              We're always listening.
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
              04
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
