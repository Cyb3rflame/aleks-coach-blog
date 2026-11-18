// pages/index.js
// Homepage: alekscoach.com
// Same navy and red style as /programme, /offers, /proof and /freeanalysis.
// Videos are on Bunny: paste the ID from a Bunny play link.

import Head from 'next/head'

const BUNNY_LIBRARY = '788439'
const bunny = (id) =>
  `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY}/${id}?autoplay=false&preload=false&responsive=true`

// ================= CONFIG =================
const HERO_VIDEO = { id: 'eb2ef0e1-f462-41a1-9166-ef66398e4ba3', caption: 'A real forehand breakdown' }

const WAYS = [
  { title: 'Free analysis', price: 'Free', body: 'Send a clip of one stroke. Get a 5 minute breakdown of what is going wrong and the couple of changes that fix it.', cta: 'Get my free analysis', href: '/freeanalysis', main: false },
  { title: 'One-off breakdowns', price: 'Pay once', body: 'A full breakdown of a stroke or a whole match, with a plan for how to work on it.', cta: 'See the options', href: '/offers', main: false },
  { title: 'Coaching programme', price: '6 months', body: 'Ongoing coaching over WhatsApp. Unlimited video reviews, one focus at a time, match prep and off-court work.', cta: 'See the programme', href: '/programme', main: true },
]

const BEFORE_AFTERS = [
  { id: 'b3bda0f2-8711-403e-bf3c-d0f664cc56a1', title: 'Serve rebuild', body: 'Better load on the back leg. A real explode up to contact.' },
  { id: 'f4b39aaa-b2b7-4a73-94f9-890b3cb90dfa', title: 'Rally, Elior', body: 'Earlier turn, better base, accelerating through the ball.' },
  { id: 'b4cfc211-0bf0-47c7-9efa-924a4e4cbf13', title: 'Rally, Gabe', body: 'Heavier ball, held position, no getting pushed back.' },
]

const TESTIMONIALS = [
  { id: '67932339-c26d-4a5d-bd2a-928db146224a', name: 'Elior' },
  { id: '3a13ccee-766d-438a-8d8e-bb76d757ba53', name: 'Ludovico' },
  { id: '12e697c1-a98c-4be1-ba45-fe6dff9b507e', name: 'Jacob' },
  { id: '74e833cd-465d-4655-95dc-6c96dfbaadbd', name: 'Tristan' },
]

const WHATSAPP = 'https://wa.me/447512834077'
const INSTAGRAM = 'https://www.instagram.com/aleks_coaches/'
const YOUTUBE = 'https://www.youtube.com/@alekscoaches'
// ==========================================

const ALLOW = 'accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen'

export default function Home() {
  return (
    <>
      <Head>
        <title>Aleks Coach | Online tennis coaching and video analysis</title>
        <meta name="description" content="Online tennis coaching and video analysis. Send your footage, find out what is holding you back, and fix it one change at a time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        :root { --navy:#0f2341; --navy-light:#1b3560; --red:#c8102e; --red-dark:#a00d25; --bg:#f5f6f8; --text:#1c1f24; --muted:#5b6472; --line:#dde1e7; }
        html, body { background: var(--bg); color: var(--text); }
        .home { font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); background: var(--bg); min-height: 100vh; }
        .home h1, .home h2, .home h3 { font-family: Georgia, "Times New Roman", serif; font-weight: normal; letter-spacing: 0; text-transform: none; color: inherit; }
        .home a { color: inherit; }
        .home .wrap { max-width: 1040px; margin: 0 auto; }

        .home header { background: var(--navy); color: #fff; padding: 14px 24px; }
        .home header .wrap { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        .home .logo { font-family: Georgia, serif; font-size: 22px; text-decoration: none; }
        .home .logo span { color: var(--red); }
        .home nav a { text-decoration: none; font-size: 15px; opacity: .85; margin-left: 20px; }
        .home nav a:hover { opacity: 1; }

        .home .hero { background: var(--navy); color: #fff; padding: 36px 24px 52px; }
        .home .hero .wrap { display: grid; grid-template-columns: 1fr 1.15fr; gap: 40px; align-items: center; }
        .home .hero h1 { font-size: 40px; line-height: 1.15; margin-bottom: 14px; color: #fff; }
        .home .hero p { font-size: 18px; opacity: .9; margin-bottom: 24px; }
        .home .btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .home .btn { display: inline-block; text-decoration: none; padding: 13px 24px; border-radius: 6px; font-weight: bold; font-size: 15px; }
        .home .btn-red { background: var(--red); color: #fff; }
        .home .btn-red:hover { background: var(--red-dark); }
        .home .btn-ghost { border: 1px solid rgba(255,255,255,.35); color: #fff; }
        .home .btn-ghost:hover { background: rgba(255,255,255,.08); }
        .home .btn-navy { background: var(--navy); color: #fff; }
        .home .btn-navy:hover { background: var(--navy-light); }
        .home .hero-cap { font-size: 13px; opacity: .7; margin-top: 8px; text-align: center; }

        .home .bunny { position: relative; aspect-ratio: 16 / 9; background: #08162b; border-radius: 10px; overflow: hidden; }
        .home .vert { position: relative; aspect-ratio: 9 / 16; background: var(--navy); border-radius: 10px; overflow: hidden; }
        .home .bunny iframe, .home .vert iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

        .home section.block { padding: 56px 24px 0; }
        .home section.block h2 { font-size: 30px; color: var(--navy); text-align: center; margin-bottom: 8px; }
        .home .sub { text-align: center; color: var(--muted); margin: 0 auto 28px; max-width: 580px; }

        .home .ways { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .home .way { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 24px 22px; display: flex; flex-direction: column; }
        .home .way.main { border: 2px solid var(--red); }
        .home .way .tag { font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: var(--red); font-weight: bold; margin-bottom: 6px; }
        .home .way h3 { font-size: 22px; color: var(--navy); margin-bottom: 8px; }
        .home .way p { color: var(--muted); font-size: 15px; flex-grow: 1; margin-bottom: 18px; }
        .home .way .btn { text-align: center; }

        .home .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .home .card { background: #fff; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
        .home .card .bunny { border-radius: 0; }
        .home .cap { padding: 14px 16px 16px; }
        .home .cap h3 { font-size: 18px; color: var(--navy); margin-bottom: 2px; }
        .home .cap p { color: var(--muted); font-size: 14px; }

        .home .testis { display: flex; flex-wrap: wrap; justify-content: center; gap: 18px; }
        .home .testi { width: 200px; }
        .home .testi p { text-align: center; font-family: Georgia, serif; color: var(--navy); margin-top: 8px; font-size: 17px; }
        .home .more { text-align: center; margin-top: 22px; }
        .home .more a { color: var(--red); text-decoration: none; font-weight: bold; }

        .home .about { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 28px; max-width: 760px; margin: 0 auto; }
        .home .about p { color: #2b2f36; margin-bottom: 12px; }
        .home .about p:last-child { margin-bottom: 0; }
        .home .stats { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; margin-top: 28px; }
        .home .stat { text-align: center; }
        .home .stat b { display: block; font-family: Georgia, serif; font-weight: normal; font-size: 32px; color: var(--navy); }
        .home .stat span { font-size: 13px; color: var(--muted); }

        .home .cta { background: var(--navy); color: #fff; border-radius: 10px; padding: 38px 28px; text-align: center; margin: 56px 24px 0; }
        .home .cta h2 { font-size: 28px; margin-bottom: 8px; color: #fff; }
        .home .cta p { opacity: .9; margin-bottom: 20px; }
        .home .cta .btns { justify-content: center; }

        .home footer { text-align: center; color: var(--muted); font-size: 14px; padding: 44px 24px 40px; }
        .home footer a { text-decoration: none; }

        @media (max-width: 820px) {
          .home .hero .wrap { grid-template-columns: 1fr; gap: 24px; }
          .home .hero h1 { font-size: 30px; }
          .home .ways, .home .grid3 { grid-template-columns: 1fr; }
          .home nav { display: none; }
          .home .testi { width: 160px; }
        }
      `}</style>

      <div className="home">
        <header>
          <div className="wrap">
            <a className="logo" href="/">Aleks <span>Coach</span></a>
            <nav>
              <a href="/programme">Programme</a>
              <a href="/offers">One-off breakdowns</a>
              <a href="/proof">Results</a>
              <a href="/freeanalysis">Free analysis</a>
              <a href="/blog">Blog</a>
            </nav>
          </div>
        </header>

        <section className="hero">
          <div className="wrap">
            <div>
              <h1>Fix the mechanics. One change at a time.</h1>
              <p>Online tennis coaching and video analysis. Send me your footage, I find what is actually holding you back, and give you a clear plan to fix it.</p>
              <div className="btns">
                <a className="btn btn-red" href="/freeanalysis">Get a free analysis</a>
                <a className="btn btn-ghost" href="/programme">See the programme</a>
              </div>
            </div>
            <div>
              <div className="bunny">
                <iframe src={bunny(HERO_VIDEO.id).replace('preload=false', 'preload=true')} allow={ALLOW} allowFullScreen title={HERO_VIDEO.caption} />
              </div>
              <p className="hero-cap">{HERO_VIDEO.caption}</p>
            </div>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <h2>How we can work together</h2>
            <p className="sub">Start free, pay for a one-off, or go all in.</p>
            <div className="ways">
              {WAYS.map((w) => (
                <div key={w.title} className={w.main ? 'way main' : 'way'}>
                  <div className="tag">{w.price}</div>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                  <a className={w.main ? 'btn btn-red' : 'btn btn-navy'} href={w.href}>{w.cta}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <h2>Before and after</h2>
            <p className="sub">Real players. Watch the mechanics change.</p>
            <div className="grid3">
              {BEFORE_AFTERS.map((v) => (
                <div key={v.id} className="card">
                  <div className="bunny"><iframe src={bunny(v.id)} loading="lazy" allow={ALLOW} allowFullScreen title={v.title} /></div>
                  <div className="cap"><h3>{v.title}</h3><p>{v.body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <h2>Hear it from them</h2>
            <p className="sub">Short clips. No script.</p>
            <div className="testis">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="testi">
                  <div className="vert"><iframe src={bunny(t.id)} loading="lazy" allow={ALLOW} allowFullScreen title={`${t.name} testimonial`} /></div>
                  <p>{t.name}</p>
                </div>
              ))}
            </div>
            <div className="more"><a href="/proof">See all results and reviews →</a></div>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <h2>A quick word on me</h2>
            <p className="sub">Aleks Pandov · LTA qualified tennis coach</p>
            <div className="about">
              <p>I care about the part most coaches skip: the mechanics. The load, the turn, the uncoil. The reason a stroke holds up under pressure or falls apart.</p>
              <p>Everything starts with your footage. I find the fault that matters most, fix one thing, and let it settle. Then we move to the next. No long lists of fixes, no generic drills.</p>
            </div>
            <div className="stats">
              <div className="stat"><b>200+</b><span>Players analysed</span></div>
              <div className="stat"><b>10+</b><span>Clubs worked with</span></div>
              <div className="stat"><b>6+</b><span>Years coaching</span></div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="cta">
            <h2>Not sure where to start?</h2>
            <p>Send a clip for a free analysis, or message me with any questions.</p>
            <div className="btns">
              <a className="btn btn-red" href="/freeanalysis">Get a free analysis</a>
              <a className="btn btn-ghost" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Message me on WhatsApp</a>
            </div>
          </div>
        </div>

        <footer>
          Good luck, and enjoy your tennis.<br />
          &copy; 2026 Aleks Coach &middot; <a href="/blog">Blog</a> &middot; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a> &middot;{' '}
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a> &middot;{' '}
          <a href={YOUTUBE} target="_blank" rel="noopener noreferrer">YouTube</a>
        </footer>
      </div>
    </>
  )
}
