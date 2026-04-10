import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../../lib/posts'

export default function BlogIndex({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Tennis Coaching Blog | Aleks Coach</title>
        <meta name="description" content="Biomechanical tennis coaching insights. Fix your forehand, backhand, and serve with frame-by-frame analysis breakdowns." />
      </Head>

      {/* ── NAV ─────────────────────────────── */}
      <nav className="ac-nav">
        <Link className="ac-nav-logo" href="/">ALEKS<span>COACH</span></Link>
        <ul className="ac-nav-links">
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#process">How It Works</Link></li>
          <li><Link href="/#pricing">Pricing</Link></li>
          <li><Link href="/blog" className="nav-active">Blog</Link></li>
        </ul>
        <a className="ac-nav-cta" href="mailto:your@email.com">Start Free Trial</a>
      </nav>

      {/* ── BLOG HERO ───────────────────────── */}
      <div className="blog-hero">
        <div className="blog-hero-grid" aria-hidden="true" />
        <div className="blog-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="blog-hero-eyebrow">Coaching Blog</div>
          <h1 className="blog-hero-heading">
            The mechanics.<br />
            <em>Explained properly.</em>
          </h1>
          <p className="blog-hero-sub">
            Free breakdowns on forehand, backhand, and serve biomechanics. No generic tips. Just the stuff that actually changes how you hit the ball.
          </p>
          <Link href="/#cta" className="btn-primary">Get Personal Coaching →</Link>
        </div>
      </div>

      {/* ── POSTS GRID ──────────────────────── */}
      <div className="posts-section">
        <div className="container">
          <div className="posts-header">
            <div className="ac-tag">All Posts</div>
            <h2 className="posts-heading">{allPostsData.length} Articles</h2>
          </div>
          <div className="posts-grid">
            {allPostsData.map(({ slug, date, title, description, keyword }, i) => (
              <Link key={slug} href={`/blog/${slug}`} className="post-card">
                <div className="post-card-inner">
                  <div className="post-number">0{i + 1}</div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="post-date">{formatDate(date)}</span>
                      {keyword && <span className="post-keyword">{keyword}</span>}
                    </div>
                    <h2 className="post-title">{title}</h2>
                    {description && <p className="post-desc">{description}</p>}
                    <span className="post-read">Read breakdown →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── BLOG CTA ────────────────────────── */}
      <div className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-inner">
            <div className="ac-tag">Want this applied to your game?</div>
            <h2 className="blog-cta-heading">Reading is a start.<br /><span className="accent-text">Coaching is the fix.</span></h2>
            <p className="blog-cta-sub">The blog gives you the framework. A full analysis gives you exactly what&apos;s wrong in your specific swing — and a drill plan to fix it.</p>
            <div className="blog-cta-actions">
              <Link href="/#cta" className="btn-primary">Start Free Week</Link>
              <Link href="/#pricing" className="btn-ghost">See Pricing →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────── */}
      <footer className="ac-footer">
        <div className="ac-footer-logo">ALEKS<span>COACH</span></div>
        <ul className="ac-footer-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#pricing">Pricing</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><a href="https://www.instagram.com/alekscoach" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
        <div className="ac-footer-copy">© {new Date().getFullYear()} Aleks Coach · Good luck, and enjoy your tennis.</div>
      </footer>

      <style jsx global>{`
        .container { max-width:1100px; margin:0 auto; padding:0 28px; }
        /* ── BLOG HERO ─── */
        .blog-hero { min-height:60vh; display:flex; align-items:center; padding:120px 0 80px; position:relative; overflow:hidden; background:var(--bg); }
        .blog-hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px); background-size:60px 60px; pointer-events:none; }
        .blog-hero-glow { position:absolute; top:-100px; right:-100px; width:500px; height:500px; background:radial-gradient(circle,rgba(201,245,62,0.06) 0%,transparent 70%); pointer-events:none; }
        .blog-hero .container { position:relative; z-index:1; }
        .blog-hero-eyebrow { font-family:var(--font-head); font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--accent); margin-bottom:20px; display:flex; align-items:center; gap:10px; }
        .blog-hero-eyebrow::before { content:''; display:inline-block; width:32px; height:2px; background:var(--accent); }
        .blog-hero-heading { font-size:clamp(46px,7vw,80px); color:var(--text); margin-bottom:22px; max-width:680px; }
        .blog-hero-heading em { font-style:normal; color:var(--accent); display:block; }
        .blog-hero-sub { font-size:17px; color:var(--muted); max-width:500px; margin-bottom:38px; font-weight:300; line-height:1.75; }
        /* ── POSTS ─── */
        .posts-section { background:var(--bg2); padding:80px 0; }
        .posts-header { display:flex; align-items:center; gap:20px; margin-bottom:40px; }
        .posts-heading { font-family:var(--font-head); font-size:18px; font-weight:700; color:var(--muted); }
        .posts-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; background:var(--border2); border:1px solid var(--border2); border-radius:var(--radius-lg); overflow:hidden; }
        @media(max-width:700px){.posts-grid{grid-template-columns:1fr;}}
        .post-card { text-decoration:none; background:var(--card); transition:background 0.2s; }
        .post-card:hover { background:var(--bg3); }
        .post-card:hover .post-read { color:var(--accent); }
        .post-card-inner { display:flex; gap:20px; padding:32px 28px; }
        .post-number { font-family:var(--font-head); font-size:48px; font-weight:900; color:rgba(201,245,62,0.1); line-height:1; flex-shrink:0; width:56px; }
        .post-content { flex:1; }
        .post-meta { display:flex; align-items:center; gap:12px; margin-bottom:12px; flex-wrap:wrap; }
        .post-date { font-size:12px; color:var(--muted); font-weight:400; }
        .post-keyword { font-family:var(--font-head); font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--accent); background:rgba(201,245,62,0.08); padding:3px 9px; border-radius:4px; }
        .post-title { font-family:var(--font-head); font-size:22px; font-weight:800; color:var(--text); margin-bottom:10px; line-height:1.15; }
        .post-desc { font-size:13px; color:var(--muted); line-height:1.7; margin-bottom:14px; }
        .post-read { font-family:var(--font-head); font-size:13px; font-weight:700; letter-spacing:0.06em; color:var(--muted); transition:color 0.2s; }
        /* ── BLOG CTA ─── */
        .blog-cta-section { background:var(--bg); padding:80px 0; }
        .blog-cta-inner { background:var(--bg2); border:1px solid var(--border); border-radius:24px; padding:70px 40px; text-align:center; }
        .blog-cta-heading { font-size:clamp(34px,4.5vw,54px); color:var(--text); margin-bottom:16px; }
        .accent-text { color:var(--accent); }
        .blog-cta-sub { font-size:16px; color:var(--muted); max-width:460px; margin:0 auto 36px; line-height:1.75; }
        .blog-cta-actions { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
        /* ── SHARED BUTTONS ─── */
        .btn-primary { display:inline-block; background:var(--accent); color:#070d0a; font-family:var(--font-head); font-size:14px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; text-decoration:none; padding:14px 30px; border-radius:8px; transition:background 0.2s,transform 0.15s; }
        .btn-primary:hover { background:var(--accent2); transform:translateY(-2px); }
        .btn-ghost { display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:500; color:var(--text); text-decoration:none; border-bottom:1px solid var(--border); padding-bottom:2px; transition:color 0.2s,border-color 0.2s; }
        .btn-ghost:hover { color:var(--accent); border-color:var(--accent); }
        .nav-active { color:var(--accent) !important; }
      `}</style>
    </>
  )
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })
}

export async function getStaticProps() {
  const allPostsData = getAllPosts()
  return { props: { allPostsData } }
}