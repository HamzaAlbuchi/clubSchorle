'use client'

/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */

import { useState, useEffect, useRef } from "react";

const RED = "#E8230A";
const CREAM = "#F0EBE1";
const INK = "#0D0C0A";
const MUTED = "rgba(13,12,10,0.38)";

const events = [
  { id: 1, title: "ALTARS", number: "01", subtitle: "Der Tod und die Trauer sind zentrale Themen", date: "14 Juni 2026", time: "19:00", location: "Akademieviertel", price: "€55" },
  { id: 2, title: "FETISH", number: "02", subtitle: "Nicht-traditionellen Praktiken die Vorstellung", date: "28 Juni 2026", time: "18:30", location: "Glockenbachviertel", price: "€48" },
  { id: 3, title: "COOKING SATURDAY", number: "03", subtitle: "We are for — a smoky communal kitchen", date: "5 Juli 2026", time: "17:00", location: "Haidhausen", price: "€42" },
];

const circlePaths = [
  "M50,8 C76,6 94,24 92,50 C90,76 72,94 50,92 C28,90 6,72 8,50 C10,26 24,10 50,8Z",
  "M50,10 C78,8 93,28 90,52 C87,76 68,93 46,90 C24,87 7,68 10,48 C13,26 26,12 50,10Z",
  "M52,8 C80,10 94,30 91,54 C88,78 70,93 48,91 C26,89 7,70 10,50 C13,28 28,6 52,8Z",
];

const ImperfectCircle = ({ size = 60, stroke = 2, path = 0, color = INK, style = {} }: { size?: number; stroke?: number; path?: number; color?: string; style?: any }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={style}>
    <path d={circlePaths[path % 3]} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
  </svg>
);

const FloatingCircle = ({ size, opacity, delay, duration, path, style, parallaxOffset = 0 }: { size: number; opacity: number; delay: number; duration: number; path: number; style: any; parallaxOffset?: number }) => (
  <div style={{
    position: "absolute",
    opacity,
    animation: `float ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    transform: `translateY(${parallaxOffset}px)`,
    transition: `transform 0.1s ease-out`,
    ...style,
  }}>
    <ImperfectCircle size={size} stroke={1.5} path={path} color={INK} />
  </div>
);

export default function ClubSchorle() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingEvent, setBookingEvent] = useState<typeof events[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", guests: "1" });
  const [submitted, setSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onScroll = () => { setScrollY(window.scrollY); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBook = (event: typeof events[0]) => { setBookingEvent(event); setBookingOpen(true); setSubmitted(false); setFormData({ name: "", email: "", guests: "1" }); };
  const handleSubmit = () => { if (formData.name && formData.email) setSubmitted(true); };

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK, cursor: "none", overflowX: "hidden" }}>
      {/* Cursor */}
      <div ref={dotRef} style={{ position:"fixed", width:8, height:8, background:RED, borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9999, mixBlendMode:"multiply", animation: "cursorGlow 2.5s ease-in-out infinite" }} />
      <div ref={ringRef} style={{ position:"fixed", width:34, height:34, border:`1.5px solid ${INK}`, borderRadius:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9998, opacity:0.25 }} />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"22px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", background:`rgba(240,235,225,0.9)`, backdropFilter:"blur(20px)", borderBottom:`1px solid rgba(13,12,10,0.06)` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:12, fontWeight:300, letterSpacing:"0.22em", color:INK }}>CLUB</span>
          <ImperfectCircle size={16} stroke={2.5} path={1} color={INK} />
          <span style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:12, fontWeight:300, letterSpacing:"0.22em", color:INK }}>SCHORLE</span>
        </div>
        <div style={{ display:"flex", gap:36 }}>
          {["Events","About","Contact"].map(i => <span key={i} className="nav-link">{i}</span>)}
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", alignItems:"flex-end", padding:"0 48px 80px", paddingTop:80 }}>
        {/* Floating background circles with parallax */}
        <FloatingCircle size={700} opacity={0.08} delay={0} duration={28} path={0} parallaxOffset={scrollY * 0.15} style={{ top: "-10%", right: "-15%", pointerEvents: "none" }} />
        <FloatingCircle size={600} opacity={0.06} delay={2} duration={32} path={1} parallaxOffset={scrollY * 0.08} style={{ bottom: "-18%", left: "-12%", pointerEvents: "none" }} />
        <FloatingCircle size={750} opacity={0.1} delay={1} duration={30} path={2} parallaxOffset={scrollY * 0.12} style={{ top: "20%", right: "-18%", pointerEvents: "none" }} />
        <FloatingCircle size={550} opacity={0.07} delay={3} duration={26} path={0} parallaxOffset={scrollY * 0.1} style={{ bottom: "15%", left: "8%", pointerEvents: "none" }} />
        <FloatingCircle size={680} opacity={0.09} delay={1.5} duration={34} path={1} parallaxOffset={scrollY * 0.18} style={{ top: "50%", right: "0%", transform: `translateY(calc(-50% + ${scrollY * 0.18}px))`, pointerEvents: "none" }} />

        {/* Grain */}
        <div style={{ position:"absolute", inset:0, zIndex:2, pointerEvents:"none", opacity:0.025, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        {/* Text */}
        <div style={{ position:"relative", zIndex:3, maxWidth:1000 }}>
          <div style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:9, letterSpacing:"0.28em", color:RED, textTransform:"uppercase", marginBottom:36, display:"flex", alignItems:"center", gap:12, animation:"heroFadeIn 1.2s ease forwards", opacity: Math.max(0, 1 - scrollY / 300) }}>
            <div style={{ width:24, height:1, background:RED }} />
            München · Artsy Food Events
          </div>

          <h1 style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:"clamp(80px, 14vw, 200px)", fontWeight:200, letterSpacing:"-0.025em", lineHeight:0.86, color:INK, mixBlendMode:"multiply" }}>
            <div style={{ animation:"heroLineSlideUp 0.8s ease forwards" }}>CLUB</div>
            <div style={{ display:"flex", alignItems:"center", animation:"heroLineSlideUp 0.8s ease forwards 0.15s both" }}>
              SCH
              <span style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
                <svg style={{ position:"absolute", width:"1em", height:"1em", top:0, left:0 }} viewBox="0 0 100 100" fill="none">
                  <path d={circlePaths[1]} stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
                <span style={{ visibility:"hidden" }}>O</span>
              </span>
              RLE
            </div>
          </h1>

          <div style={{ marginTop:48, display:"flex", gap:48, alignItems:"center", flexWrap:"wrap", animation:"heroFadeIn 1s ease forwards 0.3s both" }}>
            <p style={{ fontFamily:"var(--font-dm-serif), serif", fontStyle:"italic", fontSize:"clamp(16px,1.8vw,22px)", color:MUTED, maxWidth:380, lineHeight:1.75 }}>
              Intimate food experiences for the curious, the hungry, and the slightly weird.
            </p>
            <div style={{ display:"flex", gap:12 }}>
              <button className="book-btn" onClick={() => document.getElementById('events')?.scrollIntoView({ behavior:'smooth' })}>See Events</button>
              <button className="outline-btn">Join Waitlist</button>
            </div>
          </div>
        </div>

        <div style={{ position:"absolute", bottom:40, right:48, zIndex:3, display:"flex", flexDirection:"column", alignItems:"center", gap:10, opacity: Math.max(0, 0.25 - scrollY / 400), transition:"opacity 0.3s ease" }}>
          <div style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:9, letterSpacing:"0.25em", writingMode:"vertical-rl", color:INK }}>SCROLL</div>
          <div style={{ width:1, height:48, background:INK }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background:INK, padding:"13px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee 24s linear infinite" }}>
          {Array(10).fill("FERMENTED · FORAGED · COMMUNAL · CONCEPTUAL · MÜNCHEN · INTIMATE · ARTSY · EDGY · ").map((t,i) => (
            <span key={i} style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:10, letterSpacing:"0.28em", color:RED, textTransform:"uppercase" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* EVENTS */}
      <section id="events" style={{ padding:"100px 48px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:64, flexWrap:"wrap", gap:24 }}>
            <div>
              <span className="lbl" style={{ marginBottom:16 }}>Upcoming</span>
              <h2 style={{ fontFamily:"var(--font-dm-serif), serif", fontSize:"clamp(40px,6vw,72px)", fontWeight:400, lineHeight:0.95, color:INK }}>
                What's<br /><em>cooking.</em>
              </h2>
            </div>
            <p style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:13, fontWeight:300, color:MUTED, maxWidth:240, lineHeight:2 }}>
              Max 20 people.<br />Always a concept.<br />Always sold out.
            </p>
          </div>

          <div style={{ borderTop:"1px solid rgba(13,12,10,0.1)" }}>
            {events.map(event => (
              <div key={event.id} className="event-row">
                <div style={{ display:"grid", gridTemplateColumns:"48px 1fr auto", gap:"16px 32px", alignItems:"center" }}>
                  <span style={{ fontFamily:"var(--font-dm-serif), serif", fontSize:12, fontStyle:"italic", color:MUTED }}>
                    {event.number}
                  </span>
                  <div style={{ display:"flex", gap:40, alignItems:"center", flexWrap:"wrap" }}>
                    <div>
                      <h3 className="e-title" style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:"clamp(20px,3vw,38px)", fontWeight:300, letterSpacing:"0.07em", color:INK, marginBottom:6, transition:"color 0.35s" }}>{event.title}</h3>
                      <p className="e-sub" style={{ fontFamily:"var(--font-dm-serif), serif", fontStyle:"italic", fontSize:13, color:MUTED, transition:"color 0.35s" }}>{event.subtitle}</p>
                    </div>
                    <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
                      {[[event.date,"Date"],[event.time,"Time"],[event.location,"Location"]].map(([v,l]) => (
                        <div key={l}>
                          <div className="e-lbl lbl" style={{ transition:"color 0.35s" }}>{l}</div>
                          <div className="e-val" style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:12, fontWeight:300, color:INK, letterSpacing:"0.03em", transition:"color 0.35s" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:20 }}>
                    <span className="e-price" style={{ fontFamily:"var(--font-dm-serif), serif", fontSize:22, fontStyle:"italic", color:INK, transition:"color 0.35s" }}>{event.price}</span>
                    <button className="e-book" onClick={(e) => { e.stopPropagation(); handleBook(event); }}>Book →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section style={{ background:INK, padding:"120px 48px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", right:"-6%", transform:"translateY(-50%)", opacity:0.05, pointerEvents:"none" }}>
          <ImperfectCircle size={480} stroke={1.5} path={0} color={CREAM} />
        </div>
        <div style={{ maxWidth:780, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <ImperfectCircle size={52} stroke={2} path={2} color={RED} style={{ margin:"0 auto 48px", display:"block" }} />
          <h2 style={{ fontFamily:"var(--font-dm-serif), serif", fontSize:"clamp(30px,5vw,56px)", fontWeight:400, lineHeight:1.15, color:CREAM, marginBottom:36 }}>
            Food is the medium.<br /><em style={{ color:RED }}>People are the art.</em>
          </h2>
          <p style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:15, fontWeight:300, color:"rgba(240,235,225,0.38)", lineHeight:2.1, maxWidth:480, margin:"0 auto 56px" }}>
            Club Schorle hosts intimate dinners and tastings in unexpected spaces across Munich. Each event is built around a single obsession — a flavor, a concept, a provocation.
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:64, flexWrap:"wrap" }}>
            {[["12","avg. guests"],["100%","sold out"],["3+","years"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"var(--font-dm-serif), serif", fontSize:48, fontStyle:"italic", color:RED }}>{n}</div>
                <div style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:9, letterSpacing:"0.25em", color:"rgba(240,235,225,0.22)", textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"40px 48px", borderTop:"1px solid rgba(13,12,10,0.08)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:11, fontWeight:300, letterSpacing:"0.22em", color:INK }}>CLUB</span>
          <ImperfectCircle size={14} stroke={2} path={1} color={INK} />
          <span style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:11, fontWeight:300, letterSpacing:"0.22em", color:INK }}>SCHORLE</span>
        </div>
        <div style={{ display:"flex", gap:40 }}>
          {["Instagram","hello@clubschorle.de","München"].map(i => (
            <span key={i} style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:11, color:MUTED, letterSpacing:"0.08em" }}>{i}</span>
          ))}
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div onClick={(e) => { if(e.target===e.currentTarget) setBookingOpen(false); }} style={{ position:"fixed", inset:0, zIndex:500, background:"rgba(13,12,10,0.72)", backdropFilter:"blur(14px)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, animation:"fadeIn 0.25s ease forwards" }}>
          <div style={{ background:CREAM, maxWidth:460, width:"100%", padding:"52px 48px", position:"relative", borderTop:`4px solid ${RED}` }}>
            <button onClick={() => setBookingOpen(false)} style={{ position:"absolute", top:20, right:24, background:"none", border:"none", fontFamily:"var(--font-dm-sans), sans-serif", fontSize:10, letterSpacing:"0.2em", color:MUTED, cursor:"none", textTransform:"uppercase" }}>Close ×</button>
            {!submitted ? (
              <>
                <span className="lbl" style={{ marginBottom:20 }}>Reserve Your Spot</span>
                <h3 style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:28, fontWeight:300, letterSpacing:"0.1em", color:INK, marginBottom:6 }}>{bookingEvent?.title}</h3>
                <p style={{ fontFamily:"var(--font-dm-serif), serif", fontStyle:"italic", fontSize:13, color:MUTED, marginBottom:44 }}>{bookingEvent?.date} · {bookingEvent?.location} · {bookingEvent?.price} p.p.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
                  {[["Your Name","name","text","Anna Müller"],["Email","email","email","you@email.com"]].map(([label,key,type,ph]) => (
                    <div key={key}>
                      <label className="lbl">{label}</label>
                      <input className="input-field" type={type} placeholder={ph} value={formData[key as keyof typeof formData]} onChange={e => setFormData({...formData,[key]:e.target.value})} />
                    </div>
                  ))}
                  <div>
                    <label className="lbl">Guests</label>
                    <select className="input-field" value={formData.guests} onChange={e => setFormData({...formData,guests:e.target.value})} style={{ appearance:"none", cursor:"none" }}>
                      {[1,2,3,4].map(n => <option key={n} value={n}>{n} {n===1?"person":"people"}</option>)}
                    </select>
                  </div>
                  <button className="book-btn" onClick={handleSubmit} style={{ marginTop:8 }}>Confirm Reservation</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"32px 0" }}>
                <ImperfectCircle size={60} stroke={2.5} path={0} color={RED} style={{ margin:"0 auto 28px", display:"block" }} />
                <h3 style={{ fontFamily:"var(--font-dm-serif), serif", fontSize:30, fontStyle:"italic", color:INK, marginBottom:14 }}>You're in.</h3>
                <p style={{ fontFamily:"var(--font-dm-sans), sans-serif", fontSize:13, fontWeight:300, color:MUTED, lineHeight:2, marginBottom:36 }}>
                  Confirmation coming to {formData.email}.<br />See you at <em>{bookingEvent?.title}</em>.
                </p>
                <button className="book-btn" onClick={() => setBookingOpen(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
