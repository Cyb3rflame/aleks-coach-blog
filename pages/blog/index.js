import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../../lib/posts'
import styles from '../../styles/Blog.module.css'

export default function BlogIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Tennis Coaching Blog | Aleks Coach</title>
        <meta
          name="description"
          content="Biomechanical tennis coaching breakdowns. Fix your forehand, backhand, and serve with real mechanical analysis."
        />
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

        <main className={styles.main}>
          <div className={styles.hero}>
            <p className={styles.heroLabel}>TENNIS BIOMECHANICS BLOG</p>
            <h1 className={styles.heroTitle}>
              Fix the mechanics.<br />Understand the why.
            </h1>
            <p className={styles.heroSub}>
              No generic tips. No fluff. Just real mechanical breakdowns for 4.0 to 5.0 players who want to actually improve.
            </p>
          </div>

          <div className={styles.postGrid}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={styles.postCard}
              >
                <span className={styles.postDate}>{formatDate(post.date)}</span>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDescription}>{post.description}</p>
                <span className={styles.readMore}>Read breakdown &rarr;</span>
              </Link>
            ))}
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

export async function getStaticProps() {
  const posts = getAllPosts()
  return {
    props: {
      posts,
    },
  }
}
