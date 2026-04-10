import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Blog.module.css'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Aleks Coach</title>
        <meta name="description" content="Terms of Service for Aleks Coach online tennis coaching." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.logo}>
              ALEKS COACH
            </Link>
            <a href="https://www.instagram.com/alekscoach" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              Send Me Your Footage
            </a>
          </div>
        </header>

        <main className={styles.postMain}>
          <div className={styles.postHeader}>
            <Link href="/blog" className={styles.backLink}>Back to blog</Link>
            <h1 className={styles.postPageTitle}>Terms of Service</h1>
            <p className={styles.postPageDesc}>Last updated: April 2026</p>
          </div>

          <article className={styles.postContent}>
            <h2>1. Who We Are</h2>
            <p>Aleks Coach is an online tennis coaching service operated by Aleksandar Pandov, based in the United Kingdom. By using our services you agree to these terms. Contact: alexpandov07@gmail.com</p>

            <h2>2. Services Provided</h2>
            <p>Aleks Coach provides online biomechanical tennis coaching including video analysis, personalised training plans, ongoing video feedback, and direct communication support. Services are delivered remotely via digital platforms.</p>

            <h2>3. Payments</h2>
            <p>Payments are processed securely through Stripe. By purchasing a subscription or one-time service you authorise Aleks Coach to charge the agreed amount to your chosen payment method.</p>
            <p>Monthly subscriptions are billed on a recurring basis. You may cancel at any time. Cancellation takes effect at the end of your current billing period. No refunds are issued for partial months already paid.</p>
            <p>One-time services including stroke reviews and match reviews are non-refundable once the analysis has been delivered.</p>
            <p>The free one-week trial requires no payment. If you choose to continue after the trial period you will be moved to a paid subscription at the agreed rate.</p>

            <h2>4. Your Responsibilities</h2>
            <p>You agree to provide accurate footage and information to enable effective coaching. You agree to use the coaching content, training plans, and analysis videos for your own personal development only. You may not share, resell, or distribute any materials provided by Aleks Coach without written permission.</p>

            <h2>5. Intellectual Property</h2>
            <p>All coaching content, analysis videos, training plans, drill templates, and written materials produced by Aleks Coach remain the intellectual property of Aleksandar Pandov. You are granted a personal, non-transferable licence to use these materials for your own tennis development.</p>

            <h2>6. Limitation of Liability</h2>
            <p>Aleks Coach provides coaching guidance and analysis only. We are not liable for any physical injury sustained during training. You accept full responsibility for your own physical wellbeing when performing any drills or exercises recommended by Aleks Coach.</p>

            <h2>7. Changes to Terms</h2>
            <p>Aleks Coach reserves the right to update these terms at any time. Continued use of our services after any changes constitutes your acceptance of the updated terms. We will notify active clients of any material changes via email.</p>

            <h2>8. Governing Law</h2>
            <p>These terms are governed by the laws of England and Wales.</p>

            <h2>9. Contact</h2>
            <p>For any questions regarding these terms contact us at alexpandov07@gmail.com</p>
          </article>
        </main>

        <footer className={styles.footer}>
          <p>Aleks Coach | Online Biomechanical Tennis Coaching</p>
          <p>Good luck, and enjoy your tennis.</p>
        </footer>
      </div>
    </>
  )
}