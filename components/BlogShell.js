// components/BlogShell.js
// Header, footer and shared styles for the blog. Same navy and red look as the homepage.

import { INSTAGRAM, YOUTUBE } from '../lib/site'

export default function BlogShell({ children }) {
  return (
    <>
      <style>{`
        html, body { background: #f5f6f8; color: #1c1f24; }
        .acb { --navy:#0f2341; --navy-light:#1b3560; --red:#c8102e; --red-dark:#a00d25; --bg:#f5f6f8; --text:#1c1f24; --muted:#5b6472; --line:#dde1e7;
          font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: var(--text); background: var(--bg); min-height: 100vh; }
        .acb h1, .acb h2, .acb h3, .acb h4 { font-family: Georgia, "Times New Roman", serif; font-weight: normal; letter-spacing: 0; text-transform: none; color: inherit; line-height: 1.2; }
        .acb a { color: inherit; }
        .acb .wrap { max-width: 1040px; margin: 0 auto; }
        .acb .narrow { max-width: 760px; margin: 0 auto; }

        .acb header.top { background: var(--navy); color: #fff; padding: 14px 24px; }
        .acb header.top .wrap { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        .acb .logo { font-family: Georgia, serif; font-size: 22px; text-decoration: none; }
        .acb .logo span { color: var(--red); }
        .acb header.top nav a { text-decoration: none; font-size: 15px; opacity: .85; margin-left: 20px; }
        .acb header.top nav a:hover, .acb header.top nav a.on { opacity: 1; }
        .acb header.top nav a.on { border-bottom: 2px solid var(--red); padding-bottom: 2px; }

        .acb .btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .acb .btn { display: inline-block; text-decoration: none; padding: 13px 24px; border-radius: 6px; font-weight: bold; font-size: 15px; text-align: center; }
        .acb .btn-red { background: var(--red); color: #fff; }
        .acb .btn-red:hover { background: var(--red-dark); }
        .acb .btn-ghost { border: 1px solid rgba(255,255,255,.35); color: #fff; }
        .acb .btn-ghost:hover { background: rgba(255,255,255,.08); }
        .acb .btn-navy { background: var(--navy); color: #fff; }
        .acb .btn-navy:hover { background: var(--navy-light); }

        .acb .tag { display: inline-block; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: var(--red); font-weight: bold; }

        .acb .cta { background: var(--navy); color: #fff; border-radius: 10px; padding: 34px 28px; text-align: center; }
        .acb .cta h2 { font-size: 28px; margin-bottom: 8px; color: #fff; }
        .acb .cta p { opacity: .9; margin-bottom: 20px; }
        .acb .cta .btns { justify-content: center; }

        .acb footer.bottom { text-align: center; color: var(--muted); font-size: 14px; padding: 44px 24px 40px; }
        .acb footer.bottom a { text-decoration: none; }

        @media (max-width: 820px) {
          .acb header.top nav { display: none; }
        }
      `}</style>

      <div className="acb">
        <header className="top">
          <div className="wrap">
            <a className="logo" href="/">Aleks <span>Coach</span></a>
            <nav>
              <a href="/programme">Programme</a>
              <a href="/offers">One-off breakdowns</a>
              <a href="/proof">Results</a>
              <a href="/freeanalysis">Free analysis</a>
              <a href="/blog" className="on">Blog</a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bottom">
          Good luck, and enjoy your tennis.<br />
          &copy; {new Date().getFullYear()} Aleks Coach &middot; <a href="/">Home</a> &middot; <a href="/blog">Blog</a> &middot; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a> &middot;{' '}
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a> &middot;{' '}
          <a href={YOUTUBE} target="_blank" rel="noopener noreferrer">YouTube</a>
        </footer>
      </div>
    </>
  )
}
