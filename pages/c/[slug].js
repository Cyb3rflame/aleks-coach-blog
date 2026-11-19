// pages/c/[slug].js
// Client video page: alekscoach.com/c/<slug>
// Upload "matt-serve.mp4" to Bunny Stream and send alekscoach.com/c/matt-serve
// Same Bunny library as /v/, just a cleaner page for paying clients.
// Other videos starting with the same first word (matt-forehand, matt-match) are listed under the player.

import Head from 'next/head';

// ================= CONFIG =================
const CONFIG = {
  heading: 'Your breakdown',
  contact: 'https://wa.me/447512834077',
  contactText: 'Any questions, just message me on',
};
// ==========================================

const NAVY = '#0d2137';
const RED = '#c0392b';
const RED_LIGHT = '#e0584a';
const MUTED = '#8a93a3';

const LIBRARY_ID = process.env.BUNNY_LIBRARY_ID;
const API_KEY = process.env.BUNNY_API_KEY;

function cleanTitle(title) {
  return (title || '').trim().toLowerCase().replace(/\.[a-z0-9]{2,4}$/, '');
}

// Random code on the end of a link (e.g. "k7x2" in matt-serve-k7x2) is hidden from labels.
// Counts as a code if the last part is 3-8 characters with at least one number.
function stripCode(slug) {
  const parts = slug.split(/[-_]+/);
  const last = parts[parts.length - 1] || '';
  if (parts.length > 1 && /^[a-z0-9]{3,8}$/.test(last) && /\d/.test(last)) parts.pop();
  return parts.join('-');
}

// "matt-serve-k7x2" -> "Matt · Serve"
function prettySlug(slug) {
  return stripCode(slug)
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' · ');
}

// "matt-match-analysis" with prefix "matt" -> "Match analysis"
function restLabel(title, prefix) {
  const rest = stripCode(title).slice(prefix.length + 1).replace(/[-_]+/g, ' ').trim();
  return rest ? rest.charAt(0).toUpperCase() + rest.slice(1) : title;
}

function shortDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return '';
  }
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

    // Other breakdowns for the same client: same first word, e.g. matt-serve, matt-forehand
    const prefix = slug.split(/[-_]/)[0];
    let others = [];
    if (prefix && prefix !== slug) {
      try {
        const r2 = await fetch(
          `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos` +
            `?search=${encodeURIComponent(prefix)}&itemsPerPage=100&orderBy=date`,
          { headers: { AccessKey: API_KEY, accept: 'application/json' } }
        );
        if (r2.ok) {
          const d2 = await r2.json();
          others = (d2.items || [])
            .map((v) => ({ title: cleanTitle(v.title), date: v.dateUploaded, status: v.status }))
            .filter((v) => v.title !== slug && v.title.startsWith(prefix + '-') && v.status === 4)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((v) => ({ slug: v.title, label: restLabel(v.title, prefix), date: shortDate(v.date) }));
        }
      } catch (e) {}
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return {
      props: {
        videoId: video.guid,
        libraryId: LIBRARY_ID,
        isVertical: Number(video.height) > Number(video.width),
        label: prettySlug(slug),
        others,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}

export default function ClientVideoPage({ videoId, libraryId, isVertical, label, others = [] }) {
  const embed =
    `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}` +
    `?autoplay=false&preload=true&responsive=true`;

  return (
    <>
      <Head>
        <title>{`${CONFIG.heading} | Aleks Coach`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${CONFIG.heading} | Aleks Coach`} />
        <meta property="og:description" content={label} />
        <meta property="og:image" content={`https://vz-${libraryId}.b-cdn.net/${videoId}/thumbnail.jpg`} />
      </Head>

      <style>{`
        .cp-btn { background: ${RED}; color: #fff; font-size: 13px; padding: 7px 14px; border-radius: 6px; text-decoration: none; white-space: nowrap; }
        .cp-btn:hover { background: #a93226; }
        .cp-link { color: ${RED}; text-decoration: none; }
        .cp-link:hover { text-decoration: underline; }
        .cp-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 12px; border: 1px solid #e1e4ea; border-radius: 8px; text-decoration: none; color: ${NAVY}; transition: border-color .15s, background .15s; }
        .cp-item:hover { border-color: #c5cbd5; background: #fafbfc; }
      `}</style>

      <div style={s.page}>
        <header style={s.header}>
          <div style={s.headerInner}>
            <a href="/" style={s.brand}>
              Aleks <span style={{ color: RED_LIGHT }}>Coach</span>
            </a>
            {CONFIG.contact && (
              <a className="cp-btn" href={CONFIG.contact} target="_blank" rel="noopener noreferrer">
                Message me
              </a>
            )}
          </div>
        </header>

        <main style={s.main}>
          <h1 style={s.h1}>{CONFIG.heading}</h1>
          {label && <p style={s.sub}>{label}</p>}

          <div style={isVertical ? s.playerWrapVertical : s.playerWrap}>
            <iframe
              src={embed}
              style={s.iframe}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              title={CONFIG.heading}
            />
          </div>

          {CONFIG.contact && (
            <p style={s.note}>
              {CONFIG.contactText}{' '}
              <a className="cp-link" href={CONFIG.contact} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
            </p>
          )}

          {others.length > 0 && (
            <section style={s.others}>
              <p style={s.othersLabel}>Your other breakdowns</p>
              <div style={s.list}>
                {others.map((o) => (
                  <a key={o.slug} className="cp-item" href={`/c/${o.slug}`}>
                    <span style={s.itemLeft}>
                      <span style={s.play} aria-hidden="true">
                        <svg width="10" height="10" viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="#fff" /></svg>
                      </span>
                      {o.label}
                    </span>
                    <span style={s.itemDate}>{o.date}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
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
  headerInner: { maxWidth: 960, margin: '0 auto', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  brand: { color: '#ffffff', textDecoration: 'none', fontFamily: 'Georgia, serif', fontSize: 22 },
  main: { flex: 1, width: '100%', maxWidth: 960, margin: '0 auto', padding: '24px 16px 32px', boxSizing: 'border-box' },
  h1: { fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 'normal', margin: '0 0 4px' },
  sub: { fontSize: 14, color: '#6b7585', margin: '0 0 16px' },
  playerWrap: { position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000', borderRadius: 10, overflow: 'hidden' },
  playerWrapVertical: { position: 'relative', width: 'min(100%, 420px, calc(80vh * 0.5625))', aspectRatio: '9 / 16', margin: '0 auto', background: '#000', borderRadius: 10, overflow: 'hidden' },
  iframe: { position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 },
  note: { fontSize: 14, color: '#6b7585', margin: '14px 0 0' },
  others: { borderTop: '1px solid #eceef2', marginTop: 28, paddingTop: 18 },
  othersLabel: { fontSize: 12, color: MUTED, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' },
  list: { display: 'grid', gap: 8 },
  itemLeft: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 15 },
  play: { width: 24, height: 24, borderRadius: '50%', background: RED, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, paddingLeft: 2, boxSizing: 'border-box' },
  itemDate: { fontSize: 13, color: MUTED, whiteSpace: 'nowrap' },
  footer: { borderTop: '1px solid #eceef2' },
  footerInner: { maxWidth: 960, margin: '0 auto', padding: '14px 16px', fontSize: 12, color: MUTED },
};
