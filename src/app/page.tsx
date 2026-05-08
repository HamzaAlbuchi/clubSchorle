'use client'

/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */

import { useState, useEffect, useRef } from "react";

const CREAM = "#F5F0E8";
const DARK_BROWN = "#1A1208";
const ORANGE = "#E85A2A";
const GREEN = "#4A7C59";
const YELLOW = "#C9A84C";

const events = [
  { id: 1, title: "ALTARS", emoji: "🥂", number: "01", subtitle: "Der Tod und die Trauer sind zentrale Themen", date: "14 Juni 2026", time: "19:00", location: "Akademieviertel", price: "€55", color: ORANGE },
  { id: 2, title: "FETISH", emoji: "🫙", number: "02", subtitle: "Nicht-traditionellen Praktiken die Vorstellung", date: "28 Juni 2026", time: "18:30", location: "Glockenbachviertel", price: "€48", color: GREEN },
  { id: 3, title: "COOKING SATURDAY", emoji: "🌿", number: "03", subtitle: "We are for — a smoky communal kitchen", date: "5 Juli 2026", time: "17:00", location: "Haidhausen", price: "€42", color: YELLOW },
];

const circlePaths = [
  "M50,8 C76,6 94,24 92,50 C90,76 72,94 50,92 C28,90 6,72 8,50 C10,26 24,10 50,8Z",
  "M50,10 C78,8 93,28 90,52 C87,76 68,93 46,90 C24,87 7,68 10,48 C13,26 26,12 50,10Z",
  "M52,8 C80,10 94,30 91,54 C88,78 70,93 48,91 C26,89 7,70 10,50 C13,28 28,6 52,8Z",
];

const ImperfectCircle = ({ size = 60, stroke = 2, path = 0, color = DARK_BROWN, style = {} }: { size?: number; stroke?: number; path?: number; color?: string; style?: any }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={style}>
    <path d={circlePaths[path % 3]} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
  </svg>
);

const BlobShape = ({ size, color, delay, duration, top, left }: { size: number; color: string; delay: number; duration: number; top: string; left: string }) => (
  <div style={{
    position: "absolute",
    width: size,
    height: size,
    background: color,
    borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
    opacity: 0.15,
    animation: `blobRotate ${duration}s linear infinite`,
    animationDelay: `${delay}s`,
    pointerEvents: "none",
    filter: "blur(2px)",
    top,
    left,
  }} />
);

const FloatingEmoji = ({ emoji, size, top, left, delay, duration }: { emoji: string; size: number; top: string; left: string; delay: number; duration: number }) => (
  <div style={{
    position: "absolute",
    fontSize: size,
    top,
    left,
    animation: `emojiFloat ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    pointerEvents: "none",
  }}>
    {emoji}
  </div>
);

export default function ClubSchorle() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingEvent, setBookingEvent] = useState<typeof events[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", guests: "1" });
  const [submitted, setSubmitted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      rx += (mouseRef.current.x - rx) * 0.12;
      ry += (mouseRef.current.y - ry) * 0.12;
      if (dotRef.current) { dotRef.current.style.left = mouseRef.current.x + "px"; dotRef.current.style.top = mouseRef.current.y + "px"; }
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const handleBook = (event: typeof events[0]) => { setBookingEvent(event); setBookingOpen(true); setSubmitted(false); setFormData({ name: "", email: "", guests: "1" }); };
  const handleSubmit = () => { if (formData.name && formData.email) setSubmitted(true); };

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: DARK_BROWN, cursor: "none", overflowX: "hidden" }}>
      {/* Cursor */}
      <div ref={dotRef} style={{ position:"fixed", width:10, height:10, background:ORANGE, borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9999, mixBlendMode:"multiply" }} />
      <div ref={ringRef} style={{ position:"fixed", width:36, height:36, border:`2px solid ${ORANGE}`, borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9998, opacity:0.3 }} />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"24px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", background:`rgba(245,240,232,0.95)`, backdropFilter:"blur(20px)", borderBottom:`1px solid rgba(26,18,8,0.08)` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontFamily:"var(--font-space-mono), monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:DARK_BROWN }}>CLUB</span>
          <ImperfectCircle size={14} stroke={2} path={1} color={DARK_BROWN} />
          <span style={{ fontFamily:"var(--font-space-mono), monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:DARK_BROWN }}>SCHORLE</span>
        </div>
        <div style={{ display:"flex", gap:40 }}>
          {["Events","About","Contact"].map(i => <span key={i} className="nav-link">{i}</span>)}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"flex-start", padding:"0 48px", paddingTop:80 }}>
        {/* Blobs */}
        <BlobShape size={500} color={ORANGE} delay={0} duration={35} top="5%" left="-8%" />
        <BlobShape size={400} color={GREEN} delay={2} duration={42} top="35%" left="60%" />
        <BlobShape size={450} color={YELLOW} delay={1} duration={38} top="55%" left="10%" />

        {/* Floating Emojis */}
        <FloatingEmoji emoji="🥂" size={48} top="10%" left="15%" delay={0} duration={6} />
        <FloatingEmoji emoji="🫙" size={56} top="20%" left="70%" delay={0.5} duration={7} />
        <FloatingEmoji emoji="🌿" size={44} top="60%" left="10%" delay={1} duration={8} />
        <FloatingEmoji emoji="🧅" size={52} top="70%" left="80%" delay={0.3} duration={6.5} />
        <FloatingEmoji emoji="🍋" size={50} top="40%" left="85%" delay={1.5} duration={7.5} />
        <FloatingEmoji emoji="🍆" size={46} top="15%" left="5%" delay={0.8} duration={6.2} />
        <FloatingEmoji emoji="🫚" size={54} top="75%" left="40%" delay={1.2} duration={8} />

        {/* Text Content */}
        <div style={{ position:"relative", zIndex:3, maxWidth:900, animation: "slideUp 1.2s ease forwards" }}>
          <h1 style={{ fontFamily:"var(--font-playfair), serif", fontSize:"clamp(100px, 16vw, 220px)", fontWeight:900, letterSpacing:"-0.02em", lineHeight:0.95, color:DARK_BROWN, marginBottom:20 }}>
            CLUB
          </h1>
          <h1 style={{ fontFamily:"var(--font-playfair), serif", fontSize:"clamp(100px, 16vw, 220px)", fontWeight:900, letterSpacing:"-0.02em", lineHeight:0.95, color:DARK_BROWN, display:"flex", alignItems:"center", gap:16 }}>
            SCH
            <span style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center", width:"1.15em", height:"1.15em" }}>
              <ImperfectCircle size={240} stroke={3.5} path={1} color={DARK_BROWN} />
            </span>
            RLE
          </h1>

          <p style={{ fontFamily:"var(--font-playfair), serif", fontStyle:"italic", fontSize:"clamp(18px, 2.2vw, 28px)", color:DARK_BROWN, maxWidth:600, marginTop:48, lineHeight:1.6, opacity:0.8 }}>
            Intimate food experiences for the curious, the hungry, and the slightly weird.
          </p>

          <div style={{ display:"flex", gap:24, marginTop:56, flexWrap:"wrap" }}>
            <button className="book-btn" onClick={() => document.getElementById('events')?.scrollIntoView({ behavior:'smooth' })}>See Events</button>
            <button className="outline-btn">Join Waitlist</button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background:DARK_BROWN, padding:"16px 0", overflow:"hidden", marginTop:80 }}>
        <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee 30s linear infinite" }}>
          {Array(12).fill("FERMENTED · FORAGED · COMMUNAL · CONCEPTUAL · MÜNCHEN · INTIMATE · ARTSY · EDGY · ").map((t,i) => (
            <span key={i} style={{ fontFamily:"var(--font-space-mono), monospace", fontSize:12, letterSpacing:"0.08em", color:CREAM, textTransform:"uppercase" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* EVENTS */}
      <section id="events" style={{ padding:"120px 48px", background:CREAM }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"var(--font-playfair), serif", fontSize:"clamp(48px, 8vw, 80px)", fontWeight:900, marginBottom:80, color:DARK_BROWN }}>Upcoming Events</h2>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:48 }}>
            {events.map((event, idx) => (
              <div key={event.id} style={{
                transform: idx % 2 === 0 ? "rotate(-1.8deg)" : "rotate(1.8deg)",
                transition: "all 0.3s",
              }}>
                <div style={{
                  background: event.color,
                  padding:40,
                  borderRadius:8,
                  cursor:"none",
                  position:"relative",
                  overflow:"hidden",
                  display:"flex",
                  flexDirection:"column",
                  minHeight:420,
                }}>
                  <div style={{ opacity:0.2, position:"absolute", top:-40, right:-40, fontSize:160, lineHeight:1 }}>{event.emoji}</div>

                  <div style={{ position:"relative", zIndex:2 }}>
                    <div style={{ fontFamily:"var(--font-space-mono), monospace", fontSize:10, fontWeight:700, letterSpacing:"0.15em", color:CREAM, opacity:0.8, marginBottom:16, textTransform:"uppercase" }}>
                      {event.number}
                    </div>

                    <h3 style={{ fontFamily:"var(--font-playfair), serif", fontSize:"clamp(32px, 5vw, 52px)", fontWeight:900, color:CREAM, lineHeight:1.1, marginBottom:12 }}>
                      {event.title}
                    </h3>

                    <p style={{ fontFamily:"var(--font-playfair), serif", fontStyle:"italic", fontSize:"clamp(14px, 1.8vw, 18px)", color:CREAM, opacity:0.85, marginBottom:32, lineHeight:1.4 }}>
                      {event.subtitle}
                    </p>

                    <div style={{ fontFamily:"var(--font-space-mono), monospace", fontSize:11, color:CREAM, opacity:0.7, lineHeight:1.8, marginBottom:32, flexGrow:1 }}>
                      <div>{event.date}</div>
                      <div>{event.time} · {event.location}</div>
                    </div>

                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ fontFamily:"var(--font-playfair), serif", fontSize:24, fontWeight:900, color:CREAM }}>
                        {event.price}
                      </div>
                      <button className="e-book" onClick={() => handleBook(event)} style={{ background:CREAM, color:event.color, border:`1px solid ${CREAM}` }}>
                        BOOK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ background:DARK_BROWN, color:CREAM, padding:"120px 48px", position:"relative", overflow:"hidden" }}>
        {/* Watermark O */}
        <div style={{ position:"absolute", right:-100, top:"50%", transform:"translateY(-50%)", opacity:0.08, pointerEvents:"none" }}>
          <ImperfectCircle size={700} stroke={2} path={0} color={CREAM} />
        </div>

        <div style={{ maxWidth:1000, margin:"0 auto", position:"relative", zIndex:2 }}>
          <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:60 }}>
            <ImperfectCircle size={32} stroke={2.5} path={1} color={CREAM} />
            <span style={{ fontFamily:"var(--font-space-mono), monospace", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>Club Schorle</span>
          </div>

          <p style={{ fontFamily:"var(--font-playfair), serif", fontStyle:"italic", fontSize:"clamp(24px, 4vw, 42px)", lineHeight:1.6, marginBottom:80, maxWidth:700 }}>
            "We believe in the power of food to bring people together in meaningful, unexpected ways. Every experience is carefully crafted to surprise, delight, and challenge."
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:60 }}>
            {[
              { number: "150+", label: "Events Hosted" },
              { number: "3K+", label: "Community Members" },
              { number: "5", label: "Years in Munich" }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontFamily:"var(--font-playfair), serif", fontSize:"clamp(36px, 6vw, 64px)", fontWeight:900, marginBottom:8 }}>{stat.number}</div>
                <div style={{ fontFamily:"var(--font-space-mono), monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", opacity:0.6, textTransform:"uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:DARK_BROWN, color:CREAM, padding:"48px", textAlign:"center", borderTop:`1px solid rgba(245,240,232,0.1)` }}>
        <div style={{ fontFamily:"var(--font-space-mono), monospace", fontSize:11, fontWeight:700, letterSpacing:"0.1em", opacity:0.5 }}>
          © 2026 Club Schorle. All rights reserved.
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div style={{ position:"fixed", inset:0, background:`rgba(26,18,8,0.6)`, backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10000, animation:"fadeIn 0.3s ease" }}>
          <div style={{ background:CREAM, padding:60, borderRadius:8, maxWidth:500, width:"90%", position:"relative", color:DARK_BROWN, maxHeight:"90vh", overflowY:"auto" }}>
            <button onClick={() => setBookingOpen(false)} style={{ position:"absolute", top:24, right:24, background:"none", border:"none", fontSize:24, cursor:"none", color:DARK_BROWN }}>×</button>

            {!submitted ? (
              <>
                <h3 style={{ fontFamily:"var(--font-playfair), serif", fontSize:32, fontWeight:900, marginBottom:12 }}>{bookingEvent?.title}</h3>
                <p style={{ fontFamily:"var(--font-playfair), serif", fontStyle:"italic", color:DARK_BROWN, opacity:0.7, marginBottom:32 }}>{bookingEvent?.date} at {bookingEvent?.time}</p>

                <form style={{ display:"flex", flexDirection:"column", gap:24 }}>
                  <div>
                    <label className="lbl">Name</label>
                    <input type="text" className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="lbl">Email</label>
                    <input type="email" className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="lbl">Number of Guests</label>
                    <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} style={{ padding:"12px 0", border:"none", borderBottom:`1px solid rgba(26,18,8,0.2)`, background:"transparent", fontFamily:"var(--font-playfair), serif", fontSize:14, color:DARK_BROWN }}>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                    </select>
                  </div>
                  <button type="button" onClick={handleSubmit} className="book-btn" style={{ marginTop:24 }}>Confirm Booking</button>
                </form>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:20 }}>
                <div style={{ fontSize:64, marginBottom:24 }}>✓</div>
                <h3 style={{ fontFamily:"var(--font-playfair), serif", fontSize:24, fontWeight:900, marginBottom:12 }}>Booking Confirmed!</h3>
                <p style={{ opacity:0.7, marginBottom:24 }}>We've sent a confirmation email to {formData.email}</p>
                <button onClick={() => setBookingOpen(false)} className="outline-btn">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
