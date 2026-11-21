// pages/blog/[slug].js
// A single blog post. Posts live in /posts as markdown files.
// SEO bits (meta, share image, schema for Google and AI search) are generated from the post's frontmatter.

import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import BlogShell from '../../components/BlogShell'
import { mdxComponents, Video, FreeAnalysis } from '../../components/MdxComponents'
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '../../lib/posts'
import { SITE_URL, SITE_NAME, AUTHOR, WHATSAPP, bunnyEmbed, bunnyThumb } from '../../lib/site'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function absolute(url) {
  if (!url) return null
  return url.startsWith('http') ? url : `${SITE_URL}${url}`
}

function buildSchema(post, url, shareImage) {
  const author = {
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    url: SITE_URL,
    sameAs: AUTHOR.sameAs,
  }

  const graph = [
    {
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: [shareImage],
      datePublished: post.date,
      dateModified: post.updated,
      author,
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      keywords: post.keyword || undefined,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ]

  if (post.video) {
    graph.push({
      '@type': 'VideoObject',
      name: post.videoTitle || post.title,
      description: post.description || post.title,
      thumbnailUrl: [bunnyThumb(post.video) || shareImage],
      uploadDate: post.date,
      embedUrl: bunnyEmbed(post.video),
    })
  }

  if (post.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: post.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

export default function BlogPost({ post, mdxSource, related }) {
  const url = `${SITE_URL}/blog/${post.slug}`
  const shareImage = absolute(post.image) || `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`
  const schema = buildSchema(post, url, shareImage)
  const initials = AUTHOR.name.split(' ').map((n) => n[0]).join('')

  return (
    <BlogShell>
      <Head>
        <title>{`${post.title} | ${SITE_NAME}`}</title>
        <meta name="description" content={post.description || post.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        {post.draft && <meta name="robots" content="noindex" />}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || post.title} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={shareImage} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.updated} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description || post.title} />
        <meta name="twitter:image" content={shareImage} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <style>{`
        .acb .post-hero { background: var(--navy); color: #fff; padding: 30px 24px 44px; }
        .acb .crumbs { font-size: 13px; opacity: .7; margin-bottom: 18px; }
        .acb .crumbs a { text-decoration: none; }
        .acb .crumbs a:hover { text-decoration: underline; }
        .acb .post-hero .tag { color: #ff8a9b; margin-bottom: 10px; }
        .acb .post-hero h1 { font-size: 40px; color: #fff; margin-bottom: 14px; }
        .acb .post-hero .lede { font-size: 18px; opacity: .9; max-width: 680px; margin-bottom: 18px; }
        .acb .byline { font-size: 14px; opacity: .75; }

        .acb .post-main { padding: 36px 24px 0; }
        .acb .layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 40px; align-items: start; }

        .acb .article { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 32px 36px; }
        .acb .article h2 { font-size: 28px; color: var(--navy); margin: 34px 0 12px; }
        .acb .article h2:first-child { margin-top: 0; }
        .acb .article h3 { font-size: 21px; color: var(--navy); margin: 26px 0 10px; }
        .acb .article p { font-size: 17px; color: #2b2f36; margin-bottom: 16px; }
        .acb .article strong { color: var(--text); }
        .acb .article ul, .acb .article ol { margin: 0 0 18px 22px; color: #2b2f36; font-size: 17px; }
        .acb .article li { margin-bottom: 6px; }
        .acb .article li::marker { color: var(--red); }
        .acb .article a { color: var(--red); }
        .acb .article blockquote { border-left: 3px solid var(--red); padding: 12px 18px; background: #f8f9fb; margin: 22px 0; border-radius: 0 6px 6px 0; }
        .acb .article blockquote p { margin: 0; }
        .acb .article hr { border: none; border-top: 1px solid var(--line); margin: 30px 0; }
        .acb .article code { background: #f1f3f6; padding: 2px 6px; border-radius: 4px; font-size: 15px; }

        .acb .post-video { margin: 0 0 24px; }
        .acb .post-video .frame { position: relative; aspect-ratio: 16 / 9; background: #08162b; border-radius: 10px; overflow: hidden; }
        .acb .post-video.vert .frame { aspect-ratio: 9 / 16; max-width: 340px; margin: 0 auto; }
        .acb .post-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
        .acb figcaption { font-size: 14px; color: var(--muted); text-align: center; margin-top: 8px; }
        .acb .post-img { margin: 22px 0; }
        .acb .post-img img { width: 100%; height: auto; border-radius: 8px; display: block; }

        .acb .tip { background: #fdf2f4; border-left: 3px solid var(--red); padding: 14px 18px; border-radius: 0 6px 6px 0; margin: 22px 0; font-size: 17px; }
        .acb .inline-cta { display: flex; gap: 20px; align-items: center; justify-content: space-between; border: 2px solid var(--red); border-radius: 10px; padding: 20px 22px; margin: 28px 0; background: #fff; }
        .acb .inline-cta strong { font-family: Georgia, serif; font-weight: normal; font-size: 20px; color: var(--navy); display: block; margin-bottom: 4px; }
        .acb .inline-cta p { font-size: 15px !important; color: var(--muted) !important; margin: 0 !important; }
        .acb .inline-cta .btn { white-space: nowrap; color: #fff !important; }

        .acb .sidebar { position: sticky; top: 20px; }
        .acb .side-card { background: #fff; border: 2px solid var(--red); border-radius: 10px; padding: 24px 22px; }
        .acb .side-card h3 { font-size: 22px; color: var(--navy); margin: 6px 0 8px; }
        .acb .side-card p { font-size: 15px; color: var(--muted); margin-bottom: 14px; }
        .acb .side-card ul { list-style: none; margin-bottom: 18px; }
        .acb .side-card li { font-size: 14px; padding-left: 22px; position: relative; margin-bottom: 6px; }
        .acb .side-card li::before { content: '✓'; color: var(--red); font-weight: bold; position: absolute; left: 0; }
        .acb .side-card .btn { display: block; }
        .acb .side-card .alt { display: block; text-align: center; font-size: 14px; color: var(--muted); margin-top: 10px; text-decoration: none; }

        .acb .author { display: flex; gap: 18px; align-items: flex-start; background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 22px 24px; margin-top: 24px; }
        .acb .avatar { width: 64px; height: 64px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; align-items: center; justify-content: center; font-family: Georgia, serif; font-size: 22px; flex-shrink: 0; overflow: hidden; }
        .acb .avatar img { width: 100%; height: 100%; object-fit: cover; }
        .acb .author h3 { font-size: 20px; color: var(--navy); }
        .acb .author .role { font-size: 13px; color: var(--red); font-weight: bold; margin-bottom: 6px; }
        .acb .author p { font-size: 15px; color: #2b2f36; }

        .acb .related { padding: 48px 24px 0; }
        .acb .related h2 { font-size: 28px; color: var(--navy); text-align: center; margin-bottom: 22px; }
        .acb .rel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .acb .rel { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 20px; text-decoration: none; display: block; }
        .acb .rel:hover { border-color: var(--navy); }
        .acb .rel h3 { font-size: 19px; color: var(--navy); margin: 6px 0; }
        .acb .rel p { font-size: 14px; color: var(--muted); }

        .acb .end-cta { padding: 48px 24px 0; }

        @media (max-width: 900px) {
          .acb .layout { grid-template-columns: 1fr; }
          .acb .sidebar { display: none; }
        }
        @media (max-width: 700px) {
          .acb .post-hero h1 { font-size: 30px; }
          .acb .article { padding: 22px 18px; }
          .acb .article p, .acb .article ul, .acb .article ol { font-size: 16px; }
          .acb .inline-cta { flex-direction: column; align-items: stretch; }
          .acb .rel-grid { grid-template-columns: 1fr; }
          .acb .author { flex-direction: column; }
        }
      `}</style>

      <section className="post-hero">
        <div className="wrap">
          <div className="crumbs">
            <a href="/">Home</a> › <a href="/blog">Blog</a>
          </div>
          {post.keyword && <div className="tag">{post.keyword}</div>}
          <h1>{post.title}</h1>
          {post.description && <p className="lede">{post.description}</p>}
          <div className="byline">
            By {AUTHOR.name} · {formatDate(post.date)}
            {post.updated && post.updated !== post.date ? ` · Updated ${formatDate(post.updated)}` : ''} · {post.readingTime} min read
          </div>
        </div>
      </section>

      <section className="post-main">
        <div className="wrap layout">
          <div>
            <article className="article">
              {post.video && <Video id={post.video} caption={post.videoTitle} />}
              <MDXRemote {...mdxSource} components={mdxComponents} />
              <FreeAnalysis />
            </article>

            <div className="author">
              <div className="avatar">
                {AUTHOR.photo ? <img src={AUTHOR.photo} alt={AUTHOR.name} /> : initials}
              </div>
              <div>
                <h3>{AUTHOR.name}</h3>
                <div className="role">{AUTHOR.role}</div>
                <p>{AUTHOR.bio}</p>
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="side-card">
              <div className="tag">Free</div>
              <h3>Want this applied to your game?</h3>
              <p>Send a clip of one stroke. Get a 5 minute breakdown of what is going wrong and what to fix first.</p>
              <ul>
                <li>Forehand, backhand or serve</li>
                <li>Real footage, not generic tips</li>
                <li>One clear thing to work on</li>
              </ul>
              <a className="btn btn-red" href="/freeanalysis">Get my free analysis</a>
              <a className="alt" href={WHATSAPP} target="_blank" rel="noopener noreferrer">or message me on WhatsApp →</a>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related">
          <div className="wrap">
            <h2>Keep reading</h2>
            <div className="rel-grid">
              {related.map((r) => (
                <a key={r.slug} className="rel" href={`/blog/${r.slug}`}>
                  {r.keyword && <div className="tag">{r.keyword}</div>}
                  <h3>{r.title}</h3>
                  {r.description && <p>{r.description}</p>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="end-cta">
        <div className="wrap">
          <div className="cta">
            <h2>Reading about it is one thing. Fixing it is another.</h2>
            <p>Send me a clip for a free analysis, or see how the coaching programme works.</p>
            <div className="btns">
              <a className="btn btn-red" href="/freeanalysis">Get a free analysis</a>
              <a className="btn btn-ghost" href="/programme">See the programme</a>
            </div>
          </div>
        </div>
      </section>
    </BlogShell>
  )
}

export async function getStaticPaths() {
  return { paths: getAllSlugs(), fallback: false }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const { content, ...meta } = post
  const mdxSource = await serialize(content)
  const related = getRelatedPosts(post.slug, post.topic)
  return { props: { post: meta, mdxSource, related } }
}
