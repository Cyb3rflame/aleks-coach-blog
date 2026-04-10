import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { getAllSlugs, getPostBySlug } from '../../lib/posts'

export default function BlogPost({ post, mdxSource }) {
  return (
    <>
      <Head>
        <title>{post.title} | Aleks Coach</title>
        <meta name="description" content={post.description || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || post.title} />
        <link rel="canonical" href={`https://www.alekscoach.com/blog/${post.slug}`} />
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

      {/* ── POST HEADER ─────────────────────── */}
      <div className="post-header">
        <div className="post-header-grid" aria-hidden="true" />
        <div className="container">
          <Link href="/blog" className="back-link">← All posts</Link>
          <div className="post-meta-row">
            <span className="post-date">{formatDate(post.date)}</span>
            {post.keyword && <span className="post-keyword">{post.keyword}</span>}
          </div>
          <h1 className="post-heading">{post.title}</h1>
          {post.description && <p className="post-description">{post.description}</p>}
        </div>
      </div>

      {/* ── POST BODY ───────────────────────── */}
      <div className="post-body-section">
        <div className="container">
          <div className="post-layout">

            {/* Article */}
            <article className="post-article">
              <MDXRemote {...mdxSource} />
            </article>

            {/* Sticky sidebar CTA */}
            <aside className="post-sidebar">
              <div className="sidebar-cta">
                <div className="sidebar-cta-tag">Free Trial</div>
                <h3 className="sidebar-cta-heading">Want this applied to your game?</h3>
                <p className="sidebar-cta-body">I&apos;ll analyse your footage frame-by-frame and tell you exactly what&apos;s wrong with your mechanics — not a generic assessment.</p>
                <ul className="sidebar-cta-list">
                  <li>Forehand, Backhand & Serve analysis</li>
                  <li>Custom drill plan for your setup</li>
                  <li>Direct access, text me anytime</li>
                  <li>First week free</li>
                </ul>
                <a href="mailto:your@email.com" className="sidebar-cta-btn">Start Free Trial</a>
                <a href="mailto:your@email.com" className="sidebar-cta-link">or book a discovery call →</a>
              </div>
            </aside>

          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ──────────────────────── */}
      <div className="post-bottom-cta">
        <div className="container">
          <div className="bottom-cta-inner">
            <div className="ac-tag">Take the next step</div>
            <h2 className="bottom-cta-heading">Reading about it is one thing.<br /><span className="accent-text">Fixing it is another.</span></h2>
            <p className="bottom-cta-sub">Start with a free week. Send me your footage and I&apos;ll tell you exactly what&apos;s happening in your mechanics — and what to work on first.</p>
            <div className="bottom-cta-actions">
              <a href="mailto:your@email.com" className="btn-primary">Start Free Week</a>
              <Link href="/blog" className="btn-ghost">More Articles →</Link>
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
        /* ── POST HEADER ─── */
        .post-header { padding:130px 0 60px; background:var(--bg); position:relative; overflow:hidden; border-bottom:1px solid var(--border2); }
        .post-header-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px); background-size:60px 60px; pointer-events:none; }
        .post-header .container { position:relative; z-index:1; max-width:860px; }
        .back-link { display:inline-flex; align-items:center; gap:6px; font-size:13px; color:var(--muted); text-decoration:none; margin-bottom:28px; transition:color 0.2s; font-weight:500; }
        .back-link:hover { color:var(--accent); }
        .post-meta-row { display:flex; align-items:center; gap:14px; margin-bottom:20px; flex-wrap:wrap; }
        .post-date { font-size:13px; color:var(--muted); }
        .post-keyword { font-family:var(--font-head); font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--accent); background:rgba(201,245,62,0.08); padding:3px 10px; border-radius:4px; }
        .post-heading { font-family:var(--font-head); font-size:clamp(38px,5.5vw,66px); font-weight:900; color:var(--text); line-height:1.05; margin-bottom:20px; }
        .post-description { font-size:18px; color:var(--muted); line-height:1.7; font-weight:300; max-width:620px; }
        /* ── POST LAYOUT ─── */
        .post-body-section { background:var(--bg2); padding:60px 0 80px; }
        .post-layout { display:grid; grid-template-columns:1fr 320px; gap:48px; align-items:start; }
        @media(max-width:900px){.post-layout{grid-template-columns:1fr;}}
        /* ── ARTICLE CONTENT ─── */
        .post-article { min-width:0; }
        .post-article h2 { font-family:var(--font-head); font-size:30px; font-weight:800; color:var(--text); margin:40px 0 16px; padding-bottom:10px; border-bottom:1px solid var(--border2); }
        .post-article h3 { font-family:var(--font-head); font-size:22px; font-weight:700; color:var(--text); margin:28px 0 12px; }
        .post-article p { font-size:16px; color:var(--muted); line-height:1.85; margin-bottom:20px; }
        .post-article strong { color:var(--text); font-weight:600; }
        .post-article em { color:var(--accent); font-style:normal; }
        .post-article ul, .post-article ol { margin:0 0 20px 20px; color:var(--muted); }
        .post-article li { font-size:15px; line-height:1.8; margin-bottom:8px; }
        .post-article li::marker { color:var(--accent); }
        .post-article blockquote { border-left:3px solid var(--accent); padding:16px 20px; background:rgba(201,245,62,0.04); border-radius:0 8px 8px 0; margin:28px 0; }
        .post-article blockquote p { color:var(--text); font-size:15px; margin:0; }
        .post-article code { background:var(--bg3); color:var(--accent); font-size:13px; padding:2px 7px; border-radius:4px; font-family:monospace; }
        .post-article hr { border:none; border-top:1px solid var(--border2); margin:36px 0; }
        /* ── SIDEBAR ─── */
        .post-sidebar { position:sticky; top:88px; }
        @media(max-width:900px){ .post-sidebar { position:static; } }
        .sidebar-cta { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-lg); padding:28px; }
        .sidebar-cta-tag { font-family:var(--font-head); font-size:10px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--accent); border:1px solid var(--border); padding:3px 10px; border-radius:100px; display:inline-block; margin-bottom:16px; }
        .sidebar-cta-heading { font-family:var(--font-head); font-size:22px; font-weight:800; color:var(--text); margin-bottom:12px; line-height:1.15; }
        .sidebar-cta-body { font-size:13px; color:var(--muted); line-height:1.7; margin-bottom:18px; }
        .sidebar-cta-list { list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:22px; }
        .sidebar-cta-list li { font-size:12px; color:var(--text); display:flex; align-items:flex-start; gap:8px; }
        .sidebar-cta-list li::before { content:'✓'; color:var(--accent); font-weight:700; flex-shrink:0; }
        .sidebar-cta-btn { display:block; text-align:center; background:var(--accent); color:#070d0a; font-family:var(--font-head); font-size:13px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none; padding:12px 16px; border-radius:8px; transition:background 0.2s; margin-bottom:10px; }
        .sidebar-cta-btn:hover { background:var(--accent2); }
        .sidebar-cta-link { display:block; text-align:center; font-size:12px; color:var(--muted); text-decoration:none; transition:color 0.2s; }
        .sidebar-cta-link:hover { color:var(--accent); }
        /* ── BOTTOM CTA ─── */
        .post-bottom-cta { background:var(--bg); padding:80px 0; }
        .bottom-cta-inner { background:var(--bg2); border:1px solid var(--border); border-radius:24px; padding:70px 40px; text-align:center; }
        .bottom-cta-heading { font-size:clamp(32px,4vw,50px); color:var(--text); margin-bottom:16px; }
        .accent-text { color:var(--accent); }
        .bottom-cta-sub { font-size:16px; color:var(--muted); max-width:460px; margin:0 auto 34px; line-height:1.75; }
        .bottom-cta-actions { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
        /* ── BUTTONS ─── */
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

export async function getStaticPaths() {
  return { paths: getAllSlugs(), fallback: false }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const mdxSource = await serialize(post.content)
  return { props: { post, mdxSource } }
}
