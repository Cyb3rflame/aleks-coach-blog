// pages/blog/index.js
// Blog home: alekscoach.com/blog

import Head from 'next/head'
import BlogShell from '../../components/BlogShell'
import { getAllPosts } from '../../lib/posts'
import { SITE_URL, SITE_NAME } from '../../lib/site'

const TITLE = 'Tennis Coaching Blog | Aleks Coach'
const DESCRIPTION = 'Tennis technique breakdowns for club players. Fix your serve, forehand and backhand with real video analysis, clear cues and drills.'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogIndex({ posts }) {
  const url = `${SITE_URL}/blog`
  const shareImage = `${SITE_URL}/api/og?title=${encodeURIComponent('Tennis technique, explained properly')}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Aleks Coach Blog',
    url,
    description: DESCRIPTION,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  }

  return (
    <BlogShell>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={shareImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <style>{`
        .acb .blog-hero { background: var(--navy); color: #fff; padding: 40px 24px 52px; }
        .acb .blog-hero h1 { font-size: 40px; color: #fff; margin-bottom: 12px; }
        .acb .blog-hero p { font-size: 18px; opacity: .9; max-width: 620px; margin-bottom: 24px; }

        .acb .posts { padding: 44px 24px 0; }
        .acb .posts-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 18px; }
        .acb .posts-head h2 { font-size: 26px; color: var(--navy); }
        .acb .posts-head span { color: var(--muted); font-size: 14px; }
        .acb .post-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .acb .card { background: #fff; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; text-decoration: none; display: flex; flex-direction: column; transition: border-color .15s; }
        .acb .card:hover { border-color: var(--navy); }
        .acb .card img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
        .acb .card .body { padding: 20px 22px 22px; display: flex; flex-direction: column; flex-grow: 1; }
        .acb .card h3 { font-size: 22px; color: var(--navy); margin: 6px 0 8px; }
        .acb .card p { color: var(--muted); font-size: 15px; flex-grow: 1; margin-bottom: 14px; }
        .acb .card .meta { font-size: 13px; color: var(--muted); display: flex; justify-content: space-between; }
        .acb .card .read { color: var(--red); font-weight: bold; }
        .acb .empty { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 30px; text-align: center; color: var(--muted); }

        .acb .end-cta { padding: 48px 24px 0; }

        @media (max-width: 760px) {
          .acb .blog-hero h1 { font-size: 30px; }
          .acb .post-list { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="blog-hero">
        <div className="wrap">
          <div className="tag" style={{ color: '#ff8a9b', marginBottom: 10 }}>Coaching blog</div>
          <h1>Tennis technique, explained properly.</h1>
          <p>Breakdowns on the serve, forehand and backhand for club players. What is actually going wrong, why, and the drills that fix it.</p>
          <div className="btns">
            <a className="btn btn-red" href="/freeanalysis">Get a free analysis</a>
            <a className="btn btn-ghost" href="/programme">See the programme</a>
          </div>
        </div>
      </section>

      <section className="posts">
        <div className="wrap">
          <div className="posts-head">
            <h2>Latest posts</h2>
            <span>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span>
          </div>

          {posts.length === 0 ? (
            <div className="empty">First posts coming soon.</div>
          ) : (
            <div className="post-list">
              {posts.map((p) => (
                <a key={p.slug} className="card" href={`/blog/${p.slug}`}>
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.imageAlt} loading="lazy" />
                  )}
                  <div className="body">
                    {p.keyword && <div className="tag">{p.keyword}</div>}
                    <h3>{p.title}</h3>
                    {p.description && <p>{p.description}</p>}
                    <div className="meta">
                      <span>{formatDate(p.date)} · {p.readingTime} min read</span>
                      <span className="read">Read →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="end-cta">
        <div className="wrap">
          <div className="cta">
            <h2>Want this applied to your own game?</h2>
            <p>Send me a clip of one stroke and get a free 5 minute breakdown.</p>
            <div className="btns">
              <a className="btn btn-red" href="/freeanalysis">Get my free analysis</a>
            </div>
          </div>
        </div>
      </section>
    </BlogShell>
  )
}

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } }
}
