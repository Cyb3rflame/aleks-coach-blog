// pages/v/[slug].js
// Branded video page: alekscoach.com/v/<slug>
// Upload "tom-serve.mp4" to Bunny Stream and it plays at alekscoach.com/v/tom-serve
// Edit the CONFIG block below. Any link left as '' is hidden.

import Head from 'next/head';
import { useState } from 'react';

// ================= CONFIG =================
const CONFIG = {
  pageTitle: 'Quick breakdown',
  subtitle: 'Video breakdown by Aleks · LTA tennis coach',

  coachName: 'Aleks Pandov',
  coachRole: 'LTA tennis coach',
  initials: 'AP',
  photo: '', // e.g. '/images/aleks.jpg' (leave '' to show initials)

  contact: '', // e.g. 'https://wa.me/447000000000' or 'mailto:you@email.com'
  about: '/about',
  freeAnalysis: '/freeanalysis',

  instagram: { handle: '@alekscoach', href: '' }, // e.g. 'https://instagram.com/alekscoach'
  youtube: '', // e.g. 'https://youtube.com/@alekscoach'
  tiktok: '', // e.g. 'https://tiktok.com/@alekscoach'

  cards: [
    { icon: 'target', title: 'Free analysis', sub: 'Send a clip, get feedback', href: '/freeanalysis' },
    { icon: 'calendar', title: 'Coaching programme', sub: '6 months over WhatsApp', href: '/programme' },
    { icon: 'trophy', title: 'Results', sub: "Players I've worked with", href: '/proof' },
    { icon: 'file', title: 'How to beat the pusher', sub: 'Free PDF', href: '' }, // e.g. '/pdfs/how-to-beat-the-pusher.pdf'
    { icon: 'file', title: 'Stroke coaching plan', sub: 'Free PDF', href: '' }, // e.g. '/pdfs/coaching-plan.pdf'
    { icon: 'youtube', title: 'More breakdowns', sub: 'YouTube channel', href: '' }, // same as your YouTube link
  ],
};
// ==========================================

const NAVY = '#0d2137';
const RED = '#c0392b';
const RED_LIGHT = '#e0584a';
const MUTED = '#8a93a3';
const BORDER = '#e1e4ea';

const LIBRARY_ID = process.env.BUNNY_LIBRARY_ID;
const API_KEY = process.env.BUNNY_API_KEY;

function cleanTitle(title) {
  return (title || '').trim().toLowerCase().replace(/\.[a-z0-9]{2,4}$/, '');
}

export async function getServerSideProps({ params, res }) {
  const slug = String(params.slug || '').toLowerCase().trim();
  if (!LIBRARY_ID || !API_KEY || !slug) return { notFound: true };

  try {
    const url =
      `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos` +
      `?search=${encodeURIComponent(slug)}&itemsPerPage=50`;
    const r = await fetch(url, { headers: { AccessKey: API_KEY, accept: 'application/json' } });
    if (!r.ok) return { notFound: true };

    const data = await r.json();
    const video = (data.items || []).find((v) => cleanTitle(v.title) === slug);
    if (!video) return { notFound: true };

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return {
      props: {
        videoId: video.guid,
        libraryId: LIBRARY_ID,
        isVertical: Number(video.height) > Number(video.width),
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}

// Inline SVG icons, no extra packages needed
function Icon({ name, size = 16 }) {
  const p = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  switch (name) {
    case 'target':
      return (<svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>);
    case 'calendar':
      return (<svg {...p}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M16 3v4M8 3v4M4 11h16" /></svg>);
    case 'trophy':
      return (<svg {...p}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M5 9a2 2 0 0 1 0-4h2M19 9a2 2 0 0 0 0-4h-2" /></svg>);
    case 'file':
      return (<svg {...p}><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /><path d="M9 13h6M9 17h6" /></svg>);
    case 'youtube':
      return (<svg {...p}><rect x="3" y="5" width="18" height="14" rx="4" /><path d="M10 9l5 3-5 3z" /></svg>);
    case 'instagram':
      return (<svg {...p}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.5" /><circle cx="16.5" cy="7.5" r="0.5" /></svg>);
    case 'tiktok':
      return (<svg {...p}><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 4a5 5 0 0 0 5 5" /></svg>);
    case 'copy':
      return (<svg {...p}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>);
    case 'check':
      return (<svg {...p}><path d="M5 12l5 5L20 7" /></svg>);
    default:
      return null;
  }
}

const ext = { target: '_blank', rel: 'noopener noreferrer' };
const isExternal = (href) => /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.endsWith('.pdf');

export default function VideoPage({ videoId, libraryId, isVertical }) {
  const [copied, setCopied] = useState(false);

  const embed =
    `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}` +
    `?autoplay=false&preload=true&responsive=true`;

  const cards = CONFIG.cards.filter((c) => c.href);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  }

  return (
    <>
      <Head>
        <title>{`${CONFIG.pageTitle} | Aleks Coach`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${CONFIG.pageTitle} | Aleks Coach`} />
        <meta property="og:description" content={CONFIG.subtitle} />
        <meta property="og:image" content={`https://vz-${libraryId}.b-cdn.net/${videoId}/thumbnail.jpg`} />
      </Head>

      <style>{`
        .vp-link { color: ${RED}; text-decoration: none; }
        .vp-link:hover { text-decoration: underline; }
        .vp-ig { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #fff; border: 1px solid #3a4d66; border-radius: 999px; padding: 5px 12px; text-decoration: none; }
        .vp-ig:hover { border-color: #6b7f99; }
        .vp-soc { color: #9fb0c7; display: inline-flex; }
        .vp-soc:hover { color: #fff; }
        .vp-contact { background: ${RED}; color: #fff; font-size: 13px; padding: 7px 14px; border-radius: 6px; text-decoration: none; white-space: nowrap; }
        .vp-contact:hover { background: #a93226; }
        .vp-card { display: block; border: 1px solid ${BORDER}; border-radius: 8px; padding: 10px 12px; text-decoration: none; transition: border-color .15s, background .15s; }
        .vp-card:hover { border-color: #c5cbd5; background: #fafbfc; }
        .vp-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #5b6678; background: #fff; border: 1px solid ${BORDER}; border-radius: 6px; padding: 5px 10px; cursor: pointer; font-family: inherit; }
        .vp-btn:hover { border-color: #c5cbd5; }
        @media (max-width: 480px) { .vp-ig-handle { display: none; } }
      `}</style>

      <div style={s.page}>
        <header style={s.header}>
          <div style={s.headerInner}>
            <a href="/" style={s.brand}>
              Aleks <span style={{ color: RED_LIGHT }}>Coach</span>
            </a>
            <div style={s.headerRight}>
              {CONFIG.instagram.href && (
                <a className="vp-ig" href={CONFIG.instagram.href} {...ext} aria-label="Instagram">
                  <Icon name="instagram" size={16} />
                  <span className="vp-ig-handle">{CONFIG.instagram.handle}</span>
                </a>
              )}
              {CONFIG.youtube && (
                <a className="vp-soc" href={CONFIG.youtube} {...ext} aria-label="YouTube"><Icon name="youtube" size={18} /></a>
              )}
              {CONFIG.tiktok && (
                <a className="vp-soc" href={CONFIG.tiktok} {...ext} aria-label="TikTok"><Icon name="tiktok" size={18} /></a>
              )}
              {CONFIG.contact && (
                <a className="vp-contact" href={CONFIG.contact} {...(isExternal(CONFIG.contact) ? ext : {})}>Contact me</a>
              )}
            </div>
          </div>
        </header>

        <main style={s.main}>
          <h1 style={s.h1}>{CONFIG.pageTitle}</h1>
          <p style={s.sub}>{CONFIG.subtitle}</p>

          <div style={isVertical ? s.playerWrapVertical : s.playerWrap}>
            <iframe
              src={embed}
              loading="lazy"
              style={s.iframe}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              title={CONFIG.pageTitle}
            />
          </div>

          <div style={s.underVideo}>
            {CONFIG.freeAnalysis ? (
              <span style={s.small}>
                Want your own stroke looked at?{' '}
                <a className="vp-link" href={CONFIG.freeAnalysis}>Get a free analysis</a>
              </span>
            ) : <span />}
            <button className="vp-btn" onClick={copyLink} type="button">
              <Icon name={copied ? 'check' : 'copy'} size={14} />
              {copied ? 'Copied' : 'Copy link'}
            </button>
          </div>

          {cards.length > 0 && (
            <>
              <div style={s.divider} />
              <p style={s.sectionLabel}>More from Aleks Coach</p>
              <div style={s.grid}>
                {cards.map((c) => (
                  <a key={c.title} className="vp-card" href={c.href} {...(isExternal(c.href) ? ext : {})}>
                    <p style={s.cardTitle}>
                      <span style={{ color: MUTED, display: 'inline-flex' }}><Icon name={c.icon} size={15} /></span>
                      {c.title}
                    </p>
                    <p style={s.cardSub}>{c.sub}</p>
                  </a>
                ))}
              </div>
            </>
          )}

          <div style={s.bio}>
            <div style={s.bioLeft}>
              {CONFIG.photo ? (
                <img src={CONFIG.photo} alt={CONFIG.coachName} style={s.avatarImg} />
              ) : (
                <div style={s.avatar}>{CONFIG.initials}</div>
              )}
              <p style={s.bioText}>{CONFIG.coachName} · {CONFIG.coachRole}</p>
            </div>
            <p style={s.bioLinks}>
              {CONFIG.about && <a className="vp-link" href={CONFIG.about}>About me</a>}
              {CONFIG.about && CONFIG.contact && <span style={{ color: MUTED }}> · </span>}
              {CONFIG.contact && (
                <a className="vp-link" href={CONFIG.contact} {...(isExternal(CONFIG.contact) ? ext : {})}>Contact me</a>
              )}
            </p>
          </div>
        </main>

        <footer style={s.footer}>
          <div style={s.footerInner}>© Aleks Coach</div>
        </footer>
      </div>
    </>
  );
}

const s = {
  page: { minHeight: '100vh', background: '#ffffff', color: NAVY, fontFamily: 'Helvetica, Arial, sans-serif', display: 'flex', flexDirection: 'column' },
  header: { background: NAVY },
  headerInner: { maxWidth: 960, margin: '0 auto', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  brand: { color: '#ffffff', textDecoration: 'none', fontFamily: 'Georgia, serif', fontSize: 22 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 12 },
  main: { flex: 1, width: '100%', maxWidth: 960, margin: '0 auto', padding: '24px 16px 32px', boxSizing: 'border-box' },
  h1: { fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 'normal', margin: '0 0 4px' },
  sub: { fontSize: 14, color: '#6b7585', margin: '0 0 16px' },
  playerWrap: { position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000', borderRadius: 10, overflow: 'hidden' },
  playerWrapVertical: { position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto', paddingTop: 'min(177.78%, 80vh)', background: '#000', borderRadius: 10, overflow: 'hidden' },
  iframe: { position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 },
  underVideo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 12 },
  small: { fontSize: 14, color: '#6b7585' },
  divider: { borderTop: '1px solid #eceef2', margin: '32px 0 16px' },
  sectionLabel: { fontSize: 12, color: MUTED, margin: '0 0 10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 },
  cardTitle: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, margin: 0, color: NAVY },
  cardSub: { fontSize: 12, margin: '2px 0 0 21px', color: MUTED },
  bio: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 24, padding: 12, background: '#f6f7f9', borderRadius: 8 },
  bioLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  avatar: { width: 40, height: 40, flexShrink: 0, borderRadius: '50%', background: '#dfe4ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: NAVY },
  avatarImg: { width: 40, height: 40, flexShrink: 0, borderRadius: '50%', objectFit: 'cover' },
  bioText: { fontSize: 14, margin: 0, color: '#5b6678' },
  bioLinks: { fontSize: 14, margin: 0 },
  footer: { borderTop: '1px solid #eceef2' },
  footerInner: { maxWidth: 960, margin: '0 auto', padding: '14px 16px', fontSize: 12, color: MUTED },
};
