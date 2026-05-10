import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const TO = 'clubschorle@gmail.com'
const SUBJECT = 'New message — Club Schorle'

const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 5
const hitLog = new Map<string, number[]>()

const MAX_NAME = 180
const MAX_EMAIL = 254
const MAX_MSG = 6000

function clientIp(req: NextRequest): string {
  const xf = req.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0]?.trim() || 'unknown'
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

function allowRate(ip: string): boolean {
  const now = Date.now()
  const stamps = (hitLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (stamps.length >= MAX_PER_WINDOW) return false
  stamps.push(now)
  hitLog.set(ip, stamps)
  if (hitLog.size > 3000) {
    for (const [k, v] of Array.from(hitLog.entries())) {
      const fresh = v.filter((t) => now - t < WINDOW_MS)
      if (fresh.length === 0) hitLog.delete(k)
      else hitLog.set(k, fresh)
    }
  }
  return true
}

function isValidEmail(s: string): boolean {
  if (s.length > MAX_EMAIL) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const o = body as Record<string, unknown>
  const hp = typeof o._hp === 'string' ? o._hp : ''
  if (hp.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = typeof o.name === 'string' ? o.name.trim() : ''
  const email = typeof o.email === 'string' ? o.email.trim() : ''
  const message = typeof o.message === 'string' ? o.message.trim() : ''

  if (!name || !email || !message || name.length > MAX_NAME || message.length > MAX_MSG || !isValidEmail(email)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const ip = clientIp(req)
  if (!allowRate(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('Missing RESEND_API_KEY')
    return NextResponse.json({ ok: false }, { status: 503 })
  }

  const from =
    process.env.RESEND_FROM?.trim() || 'Club Schorle <onboarding@resend.dev>'

  const resend = new Resend(key)

  const text = [`Name: ${name}`, `Email: ${email}`, '', 'Message:', message].join('\n')

  const { error } = await resend.emails.send({
    from,
    to: TO,
    replyTo: email,
    subject: SUBJECT,
    text,
  })

  if (error) {
    console.error('Resend error', error)
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
