import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { getAllSlugs, getPostBySlug } from '../../lib/posts'
import styles from '../../styles/Blog.module.css'

export default function BlogPost({ post, mdxSource }) {
  const fullUrl = `https://alekscoach.com/blog/${post.slug}`

  return (
    <>
      <Head>
        <title>{post.title} | Aleks Coach</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keyword} />
        <link rel="canonical" href={fullUrl} />

        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.logo}>
              ALEKS COACH
            </Link>
            <a
              href="https://www.instagram.com/alekscoach"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              Send Me Your Footage
            </a>
          </div>
        </header>

        <main className={styles.postMain}>
          <div className={styles.postHeader}>
            <Link href="/blog" className={styles.backLink}>
              &larr; All posts
            </Link>
            <p className={styles.postDate}>{formatDate(post.date)}</p>
            <h1 className={styles.postPageTitle}>{post.title}</h1>
            <p className={styles.postPageDesc}>{post.description}</p>
          </div>

          <article className={styles.postContent}>
            <MDXRemote {...mdxSource} />
          </article>

          <div className={styles.postCta}>
            <p className={styles.ctaText}>
              If you want me to take a look at your specific game, film yourself from the side and from behind and send it to me on Instagram.
            </p>
            <p className={styles.ctaSubText}>
              I will give you a personal breakdown of exactly what is happening mechanically and what to fix first.
            </p>
            <a
              href="https://www.instagram.com/alekscoach"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButtonLarge}
            >
              Send Me Your Footage
            </a>
          </div>

          <div className={styles.backLinkBottom}>
            <Link href="/blog" className={styles.backLink}>
              &larr; Back to all posts
            </Link>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>Aleks Coach | Online Biomechanical Tennis Coaching</p>
          <p>Good luck, and enjoy your tennis.</p>
        </footer>
      </div>
    </>
  )
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function getStaticPaths() {
  const paths = getAllSlugs()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const mdxSource = await serialize(post.content)

  return {
    props: {
      post,
      mdxSource,
    },
  }
}
