import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function toggleFaq(el) {
    const item = el.parentElement
    const isOpen = item.classList.contains('open')
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'))
    if (!isOpen) item.classList.add('open')
  }

  return (
    <>
      <Head>
        <title>Aleks Coach | Biomechanical Tennis Coaching Online</title>
        <meta name="description" content="Online biomechanical tennis coaching for 4.0–7.0 UTR players. Frame-by-frame stroke analysis, tailored drill plans, and 24/7 direct coach access." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ── NAV ─────────────────────────────── */}
      <nav className="ac-nav">
        <a className="ac-nav-logo" href="/">ALEKS<span>COACH</span></a>
        <ul className="ac-nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#process">How It Works</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>
        <a className="ac-nav-cta" href="#cta">Start Free Trial</a>
      </nav>

      {/* ── HERO ─────────────────────────────── */}
      <section id="hero" className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="hero-eyebrow">Biomechanical Tennis Coaching</div>
          <h1 className="hero-heading">
            Stop Guessing.<br />
            <em>Fix the Mechanics.</em>
          </h1>
          <p className="hero-sub">
            Online stroke analysis for 4.0–7.0 UTR players who are tired of hitting the same wall. I watch the footage, find what&apos;s actually wrong, and give you a specific plan — not a generic one.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#cta">Start Your Free Week</a>
            <a className="btn-ghost" href="#process">See how it works →</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">1<span>-wk</span></div>
              <div className="stat-label">Free trial. No card needed.</div>
            </div>
            <div>
              <div className="stat-num">3</div>
              <div className="stat-label">Full stroke analysis videos at signup</div>
            </div>
            <div>
              <div className="stat-num">24<span>/7</span></div>
              <div className="stat-label">Direct access to me, not a team</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────── */}
      <div className="strip" aria-hidden="true">
        <div className="strip-inner">
          {['Forehand Mechanics','Kinetic Chain Analysis','Serve Biomechanics','Backhand Technique','Court Movement','Tactical Decision-Making','4.0–7.0 UTR Players',
            'Forehand Mechanics','Kinetic Chain Analysis','Serve Biomechanics','Backhand Technique','Court Movement','Tactical Decision-Making','4.0–7.0 UTR Players'
          ].map((t, i) => <span key={i} className="strip-item">{t}</span>)}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────── */}
      <section id="about" className="section-bg2">
        <div className="container">
          <div className="about-inner">
            <div className="about-img-wrap reveal">
              <div className="about-img">
                {/* 📸 REPLACE: drop an <img> tag here with your coaching photo */}
                <div className="about-img-placeholder">
                  <strong>📸 Your Photo Here</strong>
                  Portrait orientation · 3:4 ratio recommended
                </div>
              </div>
              <div className="about-badge">
                <span className="num">7+</span>
                Years Coaching<br />at Elite Level
              </div>
            </div>
            <div className="reveal">
              <div className="ac-tag">About Your Coach</div>
              <h2 className="section-heading">Not Just<br />A Coach.</h2>
              <div className="about-body">
                {/* ✏️ REPLACE: edit this bio */}
                <p>I&apos;ve spent years trying to figure out one thing: <strong>why players stop improving</strong>. Not what shot they&apos;re missing — what&apos;s causing them to miss it.</p>
                <p>Most coaches tell you what to do. I go further back. I want to know why your body is doing what it&apos;s doing, because that&apos;s the only way to actually fix it. Power, spin, consistency — they all come from the same place. Get the mechanics right and the rest follows.</p>
                <p>Every client starts with footage. Everything I recommend comes from what I see in that footage. No guessing, no generic cues you&apos;ve heard a hundred times.</p>
              </div>
              <ul className="credential-list">
                {/* ✏️ REPLACE: your real credentials */}
                <li className="credential-item"><div className="credential-dot" /><span>Specialises in biomechanical stroke analysis for intermediate–advanced players</span></li>
                <li className="credential-item"><div className="credential-dot" /><span>Works with 4.0–7.0 UTR players across the UK and internationally</span></li>
                <li className="credential-item"><div className="credential-dot" /><span>Online-only coaching — built around your schedule, not a court booking</span></li>
                <li className="credential-item"><div className="credential-dot" /><span>Uses OnForm, SwingVision, and frame-by-frame analysis tools</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY BIOMECHANICS ─────────────────── */}
      <section id="why" className="section-bg">
        <div className="container">
          <div className="why-heading-wrap reveal">
            <div className="ac-tag">The Methodology</div>
            <h2 className="section-heading">Why Mechanics<br />Change Everything.</h2>
            <p className="section-sub">Most players are drilling the wrong thing. Here&apos;s what separates biomechanical coaching from a tip you saw on YouTube.</p>
          </div>
          <div className="pillars">
            {[
              { icon:'⚡', title:'Load & Explode', body:"Every shot starts in the legs. Power travels up through the hips, torso, and arm in a specific order. If the load is wrong, the explosion is weak — and no amount of arm swing fixes that." },
              { icon:'🔄', title:'Uncoil Sequencing', body:"Rotation that fires in the wrong order leaks energy before contact. I look at your uncoil frame-by-frame to find exactly where that energy is going — and why your shots feel weaker than they should." },
              { icon:'🎯', title:'One Change at a Time', body:"Changing three things at once means you can't tell what's working. We pick the single highest-leverage flaw, drill it properly, and move on only when it's done." },
              { icon:'🛑', title:'Braking Mechanism', body:"Topspin and control come from the body decelerating correctly after contact. Most players have never been taught this. We build it deliberately, not by accident." },
            ].map((p, i) => (
              <div key={i} className="pillar reveal">
                <span className="pillar-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section id="process" className="section-bg2">
        <div className="container">
          <div className="process-heading-wrap reveal">
            <div className="ac-tag">The Process</div>
            <h2 className="section-heading">Four Steps to<br />Real Progress.</h2>
          </div>
          <div className="steps">
            {[
              { n:'01', title:'Send Your Footage', body:'Upload rally videos, points, and match footage through OnForm. The more I see, the more accurate the picture.' },
              { n:'02', title:'Deep Stroke Analysis', body:"You get three detailed analysis videos — Forehand, Backhand, and Serve. Each one explains the specific mechanical issue, why it's happening, and what the long-term fix looks like." },
              { n:'03', title:'Your Drill Plan', body:"I build a drill file around what you actually have — ball machine, hitting partner, wall, or just your living room. One focus. No list of 15 things to think about." },
              { n:'04', title:'Ongoing Feedback', body:'Send progress clips whenever you want. I watch them, give you corrections, or tell you when you\'re ready to move on. You can also text me directly — any time.' },
            ].map((s, i) => (
              <div key={i} className="step reveal">
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────── */}
      <section id="results" className="section-bg">
        <div className="container">
          <div className="results-heading-wrap reveal">
            <div className="ac-tag">Client Results</div>
            <h2 className="section-heading">Before. After.<br />The Difference is Clear.</h2>
            <p className="section-sub" style={{marginTop:'12px'}}>Side-by-side stills from real client footage. The mechanics don&apos;t lie.</p>
          </div>
          <div className="ba-grid">
            {[
              { name:'Client A — Forehand', detail:'UTR 4.5 → 5.2 · 8 weeks', note:'Elbow tucked → kinetic chain restored' },
              { name:'Client B — Serve',    detail:'UTR 5.0 → 5.8 · 6 weeks', note:'Flat racket drop → topspin serve unlocked' },
              { name:'Client C — Backhand', detail:'UTR 6.0 → 6.5 · 10 weeks', note:'Arm-dominated swing → left-arm drive' },
            ].map((c, i) => (
              <div key={i} className="ba-card reveal">
                <div className="ba-images">
                  <div className="ba-panel">
                    <span className="ba-label before">Before</span>
                    {/* 📸 REPLACE: <img src="..." /> */}
                    <div className="ba-panel-inner">📸<br /><small>Before still</small></div>
                  </div>
                  <div className="ba-panel">
                    <span className="ba-label after">After</span>
                    {/* 📸 REPLACE: <img src="..." /> */}
                    <div className="ba-panel-inner">📸<br /><small>After still</small></div>
                  </div>
                </div>
                <div className="ba-info">
                  <div className="ba-name">{c.name}</div>
                  <div className="ba-detail">{c.detail}</div>
                  <div className="ba-improvement">✓ {c.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────── */}
      <section id="testimonials" className="section-bg2">
        <div className="container">
          <div className="testi-heading-wrap reveal">
            <div className="ac-tag">Testimonials</div>
            <h2 className="section-heading">What Clients<br />Actually Say.</h2>
          </div>
          <div className="testi-grid">
            {[
              { initials:'JR', quote:"The level of detail in the analysis blew me away. He didn't just tell me what was wrong — he explained exactly why my elbow position was killing my topspin. Three weeks in and I can already feel the difference.", name:'James R.', meta:'UTR 5.1 · Monthly Subscription', featured: true },
              { initials:'SK', quote:"I've had five different coaches over the years. None of them caught what this analysis found in the first video. The one-change-at-a-time approach actually works.", name:'Sarah K.', meta:'UTR 4.3 · Monthly Subscription' },
              { initials:'MT', quote:"Didn't think online coaching could be this good. I send a drill video and get specific feedback the same day. Worth every penny.", name:'Mike T.', meta:'UTR 6.0 · Monthly Subscription' },
              { initials:'LP', quote:"The free trial sold me instantly. By the end of the week I had three full analysis videos, a drill plan, and my coach already knew my game better than coaches I'd spent months with.", name:'Lena P.', meta:'UTR 4.8 · Monthly Subscription' },
              { initials:'DH', quote:"The single stroke review at £15 is ridiculous value. I sent my serve and got back a full breakdown with drills. Signed up to the monthly immediately after.", name:'Dan H.', meta:'UTR 5.5 · One-Time → Monthly' },
              { initials:'AN', quote:"No fluff. No filler. Just precise technical feedback and a clear plan. My match results have improved since month one.", name:'Alex N.', meta:'UTR 6.8 · Monthly Subscription' },
            ].map((t, i) => (
              <div key={i} className={`testi-card reveal${t.featured ? ' testi-featured' : ''}`}>
                <div className="testi-stars">★★★★★</div>
                {/* ✏️ REPLACE quotes with real client testimonials */}
                <div className="testi-quote">&ldquo;{t.quote}&rdquo;</div>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name} <span className="placeholder-badge">PLACEHOLDER</span></div>
                    <div className="testi-meta">{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────── */}
      <section id="pricing" className="section-bg">
        <div className="container">
          <div className="pricing-heading-wrap reveal">
            <div className="ac-tag">Pricing</div>
            <h2 className="section-heading">Simple, Transparent<br />Pricing.</h2>
            <p className="section-sub">One-time reviews or a full subscription. Start with the free week if you&apos;re not sure.</p>
          </div>
          <div className="pricing-grid">
            <div className="price-card reveal">
              <div className="price-name">One-Time Services</div>
              <div className="price-amount"><span className="currency">£</span>15<span className="period"> / stroke</span></div>
              <div className="price-desc">Want to test the water first? Send one shot. See exactly what you get before committing to anything.</div>
              <div className="price-divider" />
              <ul className="price-features">
                {['Single Stroke Review — £15','Full Match Review — £20','Bundle discounts available','Delivered within 48 hours','Video breakdown + written notes'].map((f,i)=><li key={i} className="price-feature">{f}</li>)}
              </ul>
              <a className="price-cta" href="mailto:your@email.com">Get a Review</a>
            </div>

            <div className="price-card price-featured reveal">
              <div className="price-tag-badge">Most Popular</div>
              <div className="price-name">Monthly Subscription</div>
              <div className="price-amount price-call">Book a<br />Discovery Call</div>
              <div className="price-desc">Pricing is tailored to your profile. Get on a quick call and I&apos;ll tell you exactly what the programme looks like for you.</div>
              <div className="price-divider" />
              <ul className="price-features">
                {['Forehand, Backhand & Serve analysis videos','Custom drill plan built around your setup','Direct access to me — text anytime','Unlimited progress video feedback','Strategic & movement analysis if you send match footage','One change at a time. No cognitive overload.'].map((f,i)=><li key={i} className="price-feature">{f}</li>)}
              </ul>
              <a className="price-cta price-cta-featured" href="mailto:your@email.com">Book a Free Call</a>
            </div>

            <div className="price-card reveal">
              <div className="price-name">3-Month Upfront</div>
              <div className="price-amount"><span className="currency">£</span>210+</div>
              <div className="price-desc">For players who know they&apos;re in it for the long haul. Paying upfront saves money and gets you priority onboarding.</div>
              <div className="price-divider" />
              <ul className="price-features">
                {['Everything in Monthly Subscription','Better rate vs. paying monthly','Priority onboarding','Quarterly progress review call','Covers at least 3 technical objectives'].map((f,i)=><li key={i} className="price-feature">{f}</li>)}
              </ul>
              <a className="price-cta" href="mailto:your@email.com">Book a Free Call</a>
            </div>
          </div>
          <p className="pricing-note"><strong>1-week free trial included</strong> with all monthly plans. Only one person has ever left during the trial — and they came back.</p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section id="faq" className="section-bg2">
        <div className="container">
          <div className="faq-heading-wrap reveal">
            <div className="ac-tag">FAQ</div>
            <h2 className="section-heading faq-h2">Common Questions.</h2>
          </div>
          <div className="faq-wrap">
            {[
              { q:"What level of player is this for?", a:"This is for intermediate to advanced players — UTR 4.0 to 7.0. Below 4.0, the technical foundation usually isn't there yet to get much out of biomechanical analysis. Above 7.0, get in touch and we'll have a conversation." },
              { q:"How does online coaching actually work?", a:"Everything runs through OnForm — an app built for video-based coaching. You upload your footage, I break it down using slow-motion and frame-by-frame tools, and send back detailed video walkthroughs. You can also text me directly whenever something comes up." },
              { q:"What if I can't train consistently?", a:"The plan adapts to what you actually have. Ball machine, hitting partner, a wall, or shadow swings at home — all of it works. You just need to be willing to put in reps on the right thing." },
              { q:"How fast will I see results?", a:"Most clients spend about two weeks on each focus area before moving on. Mechanical change takes time — and that's deliberate. Trying to rush it just creates new bad habits." },
              { q:"Can I cancel anytime?", a:"Yes. Monthly subscriptions cancel anytime — no lock-in, no awkward conversation. The free trial week also has no commitment." },
              { q:"How many spots are available?", a:"The programme is capped at 20 clients. Once I go beyond that, I can't maintain the quality of feedback that makes this worth paying for. There are very few spots available right now." },
            ].map((f, i) => (
              <div key={i} className="faq-item" id={`faq-${i}`}>
                <div className="faq-q" onClick={() => {
                  const item = document.getElementById(`faq-${i}`)
                  const isOpen = item.classList.contains('open')
                  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'))
                  if (!isOpen) item.classList.add('open')
                }}>
                  {f.q}
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section id="cta" className="section-bg">
        <div className="container">
          <div className="cta-inner reveal">
            <div className="ac-tag">Limited Spots Available</div>
            <h2 className="cta-h2">Ready to Actually<br /><span className="accent-text">Fix Your Game?</span></h2>
            <p className="cta-sub">Start with a free week. No credit card. I&apos;ll watch your footage and tell you exactly what&apos;s going wrong — and what to do about it.</p>
            <div className="cta-actions">
              <a className="btn-primary" href="mailto:your@email.com">Start Free Trial</a>
              <a className="btn-ghost" href="mailto:your@email.com">Book a Discovery Call →</a>
            </div>
            <div className="cta-guarantee">✓ 1-week free trial &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime</div>
            <div className="cta-blog-link">
              Want free coaching content first? <Link href="/blog">Read the blog →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="ac-footer">
        <div className="ac-footer-logo">ALEKS<span>COACH</span></div>
        <ul className="ac-footer-links">
          <li><a href="#about">About</a></li>
          <li><a href="#process">How It Works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><Link href="/blog">Blog</Link></li>
          {/* ✏️ REPLACE: your real Instagram link */}
          <li><a href="https://www.instagram.com/alekscoach" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
        <div className="ac-footer-copy">© {new Date().getFullYear()} Aleks Coach · Good luck, and enjoy your tennis.</div>
      </footer>

      <style jsx global>{`
        /* ── HERO ─────────────────── */
        .hero { min-height:100vh; display:flex; align-items:center; padding-top:68px; position:relative; overflow:hidden; }
        .hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px); background-size:60px 60px; pointer-events:none; }
        .hero-glow { position:absolute; top:-200px; right:-200px; width:700px; height:700px; background:radial-gradient(circle,rgba(201,245,62,0.07) 0%,transparent 70%); pointer-events:none; }
        .hero .container { position:relative; z-index:1; padding-top:60px; padding-bottom:80px; }
        .hero-eyebrow { font-family:var(--font-head); font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--accent); margin-bottom:20px; display:flex; align-items:center; gap:10px; }
        .hero-eyebrow::before { content:''; display:inline-block; width:32px; height:2px; background:var(--accent); }
        .hero-heading { font-size:clamp(52px,8vw,92px); color:var(--text); margin-bottom:24px; max-width:780px; }
        .hero-heading em { font-style:normal; color:var(--accent); display:block; }
        .hero-sub { font-size:18px; color:var(--muted); max-width:520px; margin-bottom:42px; font-weight:300; line-height:1.75; }
        .hero-actions { display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
        .hero-stats { display:flex; gap:48px; margin-top:72px; padding-top:40px; border-top:1px solid var(--border2); }
        .stat-num { font-family:var(--font-head); font-size:42px; font-weight:800; color:var(--text); line-height:1; }
        .stat-num span { color:var(--accent); }
        .stat-label { font-size:12px; color:var(--muted); margin-top:4px; }
        /* ── STRIP ─────────────────── */
        .strip { background:var(--accent); padding:16px 0; overflow:hidden; }
        .strip-inner { display:flex; gap:60px; white-space:nowrap; animation:marquee 22s linear infinite; }
        .strip-item { font-family:var(--font-head); font-size:13px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#070d0a; flex-shrink:0; }
        .strip-item::after { content:'◆'; margin-left:60px; opacity:0.45; }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        /* ── LAYOUT ────────────────── */
        .container { max-width:1100px; margin:0 auto; padding:0 28px; }
        .section-bg  { padding:100px 0; background:var(--bg); }
        .section-bg2 { padding:100px 0; background:var(--bg2); }
        .section-heading { font-size:clamp(38px,5vw,56px); color:var(--text); margin-bottom:20px; }
        .section-sub { font-size:16px; color:var(--muted); line-height:1.8; }
        /* ── ABOUT ─────────────────── */
        .about-inner { display:grid; grid-template-columns:1.1fr 1fr; gap:70px; align-items:center; }
        @media(max-width:800px){.about-inner{grid-template-columns:1fr;}}
        .about-img-wrap { position:relative; }
        .about-img { width:100%; aspect-ratio:3/4; background:var(--bg3); border-radius:var(--radius-lg); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .about-img-placeholder { font-family:var(--font-head); font-size:14px; color:var(--muted); text-align:center; padding:24px; }
        .about-img-placeholder strong { display:block; font-size:11px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:var(--accent); margin-bottom:8px; }
        .about-badge { position:absolute; bottom:24px; right:-20px; background:var(--accent); color:#070d0a; border-radius:10px; padding:16px 20px; font-family:var(--font-head); font-size:13px; font-weight:700; line-height:1.3; max-width:160px; }
        .about-badge .num { font-size:36px; font-weight:900; display:block; line-height:1; margin-bottom:4px; }
        .about-body { font-size:16px; color:var(--muted); line-height:1.8; }
        .about-body p+p { margin-top:16px; }
        .about-body strong { color:var(--text); }
        .credential-list { list-style:none; margin-top:28px; display:flex; flex-direction:column; gap:12px; }
        .credential-item { display:flex; align-items:flex-start; gap:12px; font-size:14px; color:var(--text); }
        .credential-dot { width:8px; height:8px; background:var(--accent); border-radius:50%; flex-shrink:0; margin-top:5px; }
        /* ── PILLARS ───────────────── */
        .why-heading-wrap { max-width:600px; margin-bottom:60px; }
        .pillars { display:grid; grid-template-columns:1fr 1fr; gap:2px; background:var(--border2); border:1px solid var(--border2); border-radius:var(--radius-lg); overflow:hidden; }
        @media(max-width:600px){.pillars{grid-template-columns:1fr;}}
        .pillar { background:var(--card); padding:36px 32px; border-bottom:2px solid transparent; transition:background 0.2s,border-color 0.2s; }
        .pillar:hover { background:var(--bg3); border-bottom-color:var(--accent); }
        .pillar-icon { font-size:26px; margin-bottom:14px; display:block; }
        .pillar h3 { font-size:22px; margin-bottom:10px; color:var(--text); }
        .pillar p { font-size:13px; color:var(--muted); line-height:1.75; }
        /* ── PROCESS ───────────────── */
        .process-heading-wrap { text-align:center; margin-bottom:60px; }
        .steps { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--border2); border:1px solid var(--border2); border-radius:var(--radius-lg); overflow:hidden; }
        @media(max-width:800px){.steps{grid-template-columns:1fr 1fr;}}
        @media(max-width:500px){.steps{grid-template-columns:1fr;}}
        .step { background:var(--card); padding:36px 28px; transition:background 0.2s; }
        .step:hover { background:var(--bg3); }
        .step-num { font-family:var(--font-head); font-size:52px; font-weight:900; color:rgba(201,245,62,0.1); line-height:1; margin-bottom:14px; }
        .step h3 { font-size:20px; font-weight:800; margin-bottom:10px; color:var(--text); }
        .step p { font-size:13px; color:var(--muted); line-height:1.7; }
        /* ── B/A ───────────────────── */
        .results-heading-wrap { text-align:center; margin-bottom:56px; }
        .ba-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        @media(max-width:800px){.ba-grid{grid-template-columns:1fr;}}
        .ba-card { background:var(--card); border:1px solid var(--border2); border-radius:var(--radius-lg); overflow:hidden; }
        .ba-images { display:grid; grid-template-columns:1fr 1fr; }
        .ba-panel { position:relative; aspect-ratio:1; background:var(--bg3); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; }
        .ba-panel-inner { font-size:13px; color:var(--muted); text-align:center; }
        .ba-label { font-family:var(--font-head); font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:4px 10px; position:absolute; top:10px; left:10px; border-radius:4px; }
        .ba-label.before { background:rgba(255,255,255,0.08); color:var(--muted); }
        .ba-label.after  { background:var(--accent); color:#070d0a; }
        .ba-info { padding:18px 20px; }
        .ba-name { font-family:var(--font-head); font-size:18px; font-weight:800; color:var(--text); margin-bottom:4px; }
        .ba-detail { font-size:12px; color:var(--muted); }
        .ba-improvement { display:inline-block; margin-top:10px; font-size:12px; font-weight:500; color:var(--accent); background:rgba(201,245,62,0.08); padding:4px 10px; border-radius:4px; }
        /* ── TESTIMONIALS ──────────── */
        .testi-heading-wrap { text-align:center; margin-bottom:56px; }
        .testi-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; }
        @media(max-width:900px){.testi-grid{grid-template-columns:1fr 1fr;}}
        @media(max-width:600px){.testi-grid{grid-template-columns:1fr;}}
        .testi-card { background:var(--card); border:1px solid var(--border2); border-radius:var(--radius-lg); padding:28px; display:flex; flex-direction:column; gap:16px; transition:border-color 0.2s; }
        .testi-card:hover { border-color:var(--border); }
        .testi-featured { border-color:var(--accent) !important; }
        .testi-stars { color:var(--accent); font-size:14px; letter-spacing:2px; }
        .testi-quote { font-size:14px; color:var(--text); line-height:1.75; flex:1; }
        .testi-author { display:flex; align-items:center; gap:12px; padding-top:14px; border-top:1px solid var(--border2); }
        .testi-avatar { width:40px; height:40px; border-radius:50%; background:var(--bg3); display:flex; align-items:center; justify-content:center; font-family:var(--font-head); font-weight:800; font-size:13px; color:var(--accent); border:1px solid var(--border); flex-shrink:0; }
        .testi-name { font-size:14px; font-weight:500; color:var(--text); }
        .testi-meta { font-size:12px; color:var(--muted); }
        .placeholder-badge { font-family:var(--font-head); font-size:10px; font-weight:700; letter-spacing:0.08em; color:var(--accent); background:rgba(201,245,62,0.1); padding:2px 7px; border-radius:4px; margin-left:4px; }
        /* ── PRICING ───────────────── */
        .pricing-heading-wrap { text-align:center; margin-bottom:56px; }
        .pricing-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; align-items:start; }
        @media(max-width:800px){.pricing-grid{grid-template-columns:1fr;}}
        .price-card { background:var(--card); border:1px solid var(--border2); border-radius:var(--radius-lg); padding:32px 28px; transition:border-color 0.25s; }
        .price-card:hover { border-color:rgba(201,245,62,0.2); }
        .price-featured { border-color:var(--accent); background:rgba(201,245,62,0.04); position:relative; }
        .price-tag-badge { position:absolute; top:-13px; left:50%; transform:translateX(-50%); background:var(--accent); color:#070d0a; font-family:var(--font-head); font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:4px 14px; border-radius:100px; white-space:nowrap; }
        .price-name { font-family:var(--font-head); font-size:13px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted); margin-bottom:10px; }
        .price-amount { font-family:var(--font-head); font-size:50px; font-weight:900; color:var(--text); line-height:1; margin-bottom:4px; }
        .price-call { font-size:30px; padding-top:8px; line-height:1.25; }
        .currency { font-size:22px; vertical-align:top; margin-top:8px; display:inline-block; }
        .period { font-size:16px; font-weight:400; color:var(--muted); }
        .price-desc { font-size:13px; color:var(--muted); margin-bottom:22px; margin-top:8px; line-height:1.65; }
        .price-divider { height:1px; background:var(--border2); margin-bottom:18px; }
        .price-features { list-style:none; display:flex; flex-direction:column; gap:10px; margin-bottom:26px; }
        .price-feature { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:var(--text); }
        .price-feature::before { content:'✓'; color:var(--accent); font-weight:700; flex-shrink:0; margin-top:1px; }
        .price-cta { display:block; text-align:center; text-decoration:none; font-family:var(--font-head); font-size:14px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:13px 20px; border-radius:8px; transition:all 0.2s; border:1px solid var(--border); color:var(--text); }
        .price-cta:hover { border-color:var(--accent); color:var(--accent); }
        .price-cta-featured { background:var(--accent); color:#070d0a; border-color:var(--accent); }
        .price-cta-featured:hover { background:var(--accent2); }
        .pricing-note { text-align:center; margin-top:28px; font-size:13px; color:var(--muted); }
        .pricing-note strong { color:var(--accent); }
        /* ── FAQ ───────────────────── */
        .faq-heading-wrap { text-align:center; margin-bottom:48px; }
        .faq-h2 { text-align:center; }
        .faq-wrap { max-width:680px; margin:0 auto; }
        .faq-item { border-top:1px solid var(--border2); padding:22px 0; }
        .faq-item:last-child { border-bottom:1px solid var(--border2); }
        .faq-q { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; cursor:pointer; font-family:var(--font-head); font-size:20px; font-weight:700; color:var(--text); }
        .faq-toggle { width:24px; height:24px; border:1px solid var(--border); border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--accent); font-size:16px; transition:transform 0.2s; }
        .faq-item.open .faq-toggle { transform:rotate(45deg); }
        .faq-a { display:none; padding-top:12px; font-size:14px; color:var(--muted); line-height:1.8; }
        .faq-item.open .faq-a { display:block; }
        /* ── CTA ───────────────────── */
        .cta-inner { background:var(--bg2); border:1px solid var(--border); border-radius:24px; padding:80px 40px; text-align:center; position:relative; overflow:hidden; }
        .cta-h2 { font-size:clamp(36px,5vw,60px); color:var(--text); margin-bottom:18px; }
        .accent-text { color:var(--accent); }
        .cta-sub { font-size:17px; color:var(--muted); max-width:480px; margin:0 auto 38px; }
        .cta-actions { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
        .cta-guarantee { margin-top:24px; font-size:12px; color:var(--muted); }
        .cta-blog-link { margin-top:20px; font-size:13px; color:var(--muted); }
        .cta-blog-link a { color:var(--accent); text-decoration:none; font-weight:500; }
        .cta-blog-link a:hover { text-decoration:underline; }
        /* ── BUTTONS ───────────────── */
        .btn-primary { display:inline-block; background:var(--accent); color:#070d0a; font-family:var(--font-head); font-size:15px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; text-decoration:none; padding:15px 34px; border-radius:8px; transition:background 0.2s,transform 0.15s; }
        .btn-primary:hover { background:var(--accent2); transform:translateY(-2px); }
        .btn-ghost { display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:500; color:var(--text); text-decoration:none; border-bottom:1px solid var(--border); padding-bottom:2px; transition:color 0.2s,border-color 0.2s; }
        .btn-ghost:hover { color:var(--accent); border-color:var(--accent); }
      `}</style>
    </>
  )
}
