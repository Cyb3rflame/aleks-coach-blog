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

  contact: 'https://wa.me/447512834077', // e.g. 'https://wa.me/447000000000' or 'mailto:you@email.com'
  about: '/about',
  freeAnalysis: '/freeanalysis',

  instagram: { handle: '@aleks_coaches', href: 'https://www.instagram.com/aleks_coaches' },
  youtube: 'https://www.youtube.com/@alekscoaches',
  tiktok: '', // e.g. 'https://tiktok.com/@alekscoach'

  cards: [
    { icon: 'target', title: 'Free analysis', sub: 'Send a clip, get feedback', href: '/freeanalysis', highlight: true },
    { icon: 'calendar', title: 'Coaching programme', sub: '6 months over WhatsApp', href: '/programme', highlight: true },
    { icon: 'play', title: 'One-off breakdowns', sub: 'A stroke or a full match', href: '/offers', highlight: true },
    { icon: 'trophy', title: 'Results', sub: "Players I've worked with", href: '/proof', highlight: true },
    { icon: 'file', title: 'How to beat the pusher', sub: 'Free PDF', href: '' }, // e.g. '/pdfs/how-to-beat-the-pusher.pdf'
    { icon: 'file', title: 'Stroke coaching plan', sub: 'Free PDF', href: '' }, // e.g. '/pdfs/coaching-plan.pdf'
  ],
};
// YouTube card always uses the youtube link above
// (YouTube card removed; YouTube stays in the header)
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
    case 'ig-brand':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="igGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#feda75" />
              <stop offset="0.35" stopColor="#fa7e1e" />
              <stop offset="0.6" stopColor="#d62976" />
              <stop offset="1" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#igGrad)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
        </svg>
      );
    case 'yt-brand':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#ff0000" />
          <path d="M10 8.8l5.6 3.2-5.6 3.2z" fill="#fff" />
        </svg>
      );
    case 'play':
      return (<svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9.5l4.5 2.5-4.5 2.5z" /></svg>);
    case 'wa-brand':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
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

  const cards = CONFIG.cards.filter((c) => c.href && !c.highlight);
  const hlCards = CONFIG.cards.filter((c) => c.href && c.highlight);

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
        .vp-social { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #fff; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.2); border-radius: 999px; padding: 5px 13px 5px 6px; text-decoration: none; white-space: nowrap; transition: background .15s, border-color .15s; }
        .vp-social:hover { background: rgba(255,255,255,.16); border-color: rgba(255,255,255,.4); }
        .vp-social-sub { font-weight: 400; color: #b7c3d4; }
        .vp-soc { color: #9fb0c7; display: inline-flex; }
        .vp-soc:hover { color: #fff; }
        .vp-contact { display: inline-flex; align-items: center; gap: 7px; background: ${RED}; color: #fff; font-size: 13px; padding: 6px 13px 6px 8px; border-radius: 6px; text-decoration: none; white-space: nowrap; }
        .vp-contact:hover { background: #a93226; }
        .vp-card { display: block; border: 1px solid ${BORDER}; border-radius: 8px; padding: 10px 12px; text-decoration: none; transition: border-color .15s, background .15s; }
        .vp-card:hover { border-color: #c5cbd5; background: #fafbfc; }
        .vp-hl-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 10px; }
        .vp-hl { display: flex; align-items: center; gap: 12px; background: ${NAVY}; border-radius: 10px; padding: 14px 16px; text-decoration: none; border-left: 4px solid ${RED}; transition: transform .15s, background .15s, box-shadow .15s; }
        .vp-hl:hover { background: #142e4d; transform: translateY(-2px); box-shadow: 0 8px 20px -10px rgba(13,33,55,.6); }
        .vp-hl-ico { width: 36px; height: 36px; border-radius: 50%; background: ${RED}; color: #fff; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .vp-hl-title { color: #fff; font-size: 15px; font-weight: 600; margin: 0; }
        .vp-hl-sub { color: #b7c3d4; font-size: 12px; margin: 2px 0 0; }
        .vp-hl-arrow { margin-left: auto; color: ${RED_LIGHT}; font-size: 18px; }
        .vp-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #5b6678; background: #fff; border: 1px solid ${BORDER}; border-radius: 6px; padding: 5px 10px; cursor: pointer; font-family: inherit; }
        .vp-btn:hover { border-color: #c5cbd5; }
        @media (max-width: 520px) { .vp-social-sub { display: none; } }
        @media (max-width: 600px) { .vp-hl-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={s.page}>
        <header style={s.header}>
          <div style={s.headerInner}>
            <a href="/" style={s.brand}>
              Aleks <span style={{ color: RED_LIGHT }}>Coach</span>
            </a>
            <div style={s.headerRight}>
              {CONFIG.instagram.href && (
                <a className="vp-social" href={CONFIG.instagram.href} {...ext} aria-label={`Instagram ${CONFIG.instagram.handle}`}>
                  <Icon name="ig-brand" size={22} />
                  <span>Instagram <span className="vp-social-sub">{CONFIG.instagram.handle}</span></span>
                </a>
              )}
              {CONFIG.youtube && (
                <a className="vp-social" href={CONFIG.youtube} {...ext} aria-label="YouTube channel">
                  <Icon name="yt-brand" size={22} />
                  <span>YouTube</span>
                </a>
              )}
              {CONFIG.tiktok && (
                <a className="vp-soc" href={CONFIG.tiktok} {...ext} aria-label="TikTok"><Icon name="tiktok" size={18} /></a>
              )}
              {CONFIG.contact && (
                <a className="vp-contact" href={CONFIG.contact} {...(isExternal(CONFIG.contact) ? ext : {})}>
                  <Icon name="wa-brand" size={18} />
                  Contact me
                </a>
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

          {(cards.length > 0 || hlCards.length > 0) && (
            <>
              <div style={s.divider} />
              <p style={s.sectionLabel}>More from Aleks Coach</p>
              {hlCards.length > 0 && (
                <div className="vp-hl-grid">
                  {hlCards.map((c) => (
                    <a key={c.title} className="vp-hl" href={c.href} {...(isExternal(c.href) ? ext : {})}>
                      <span className="vp-hl-ico"><Icon name={c.icon} size={18} /></span>
                      <span>
                        <p className="vp-hl-title">{c.title}</p>
                        <p className="vp-hl-sub">{c.sub}</p>
                      </span>
                      <span className="vp-hl-arrow" aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              )}
              {cards.length > 0 && <div style={s.grid}>
                {cards.map((c) => (
                  <a key={c.title} className="vp-card" href={c.href} {...(isExternal(c.href) ? ext : {})}>
                    <p style={s.cardTitle}>
                      <span style={{ color: MUTED, display: 'inline-flex' }}><Icon name={c.icon} size={15} /></span>
                      {c.title}
                    </p>
                    <p style={s.cardSub}>{c.sub}</p>
                  </a>
                ))}
              </div>}
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
  playerWrapVertical: { position: 'relative', width: 'min(100%, 420px, calc(80vh * 0.5625))', aspectRatio: '9 / 16', margin: '0 auto', background: '#000', borderRadius: 10, overflow: 'hidden' },
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
