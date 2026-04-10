import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Blog.module.css'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Aleks Coach</title>
        <meta name="description" content="Privacy Policy for Aleks Coach online tennis coaching." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.logo}>
              ALEKS COACH
            </Link>
            
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
              &larr; Back to blog
            </Link>
            <h1 className={styles.postPageTitle}>Privacy Policy</h1>
            <p className={styles.postPageDesc}>Last updated: April 2026</p>
          </div>

          <article className={styles.postContent}>
            <h2>1. Who We Are</h2>
            <p>Aleks Coach is operated by Aleksandar Pandov, based in the United Kingdom. This policy explains what personal data we collect, how we use it, and your rights under UK GDPR. Contact: alexpandov07@gmail.com</p>

            <h2>2. What Data We Collect</h2>
            <p>We may collect the following personal data:</p>
            <ul>
              <li>Name and email address when you contact us or sign up</li>
              <li>Payment information processed securely through Stripe — we never store your card details directly</li>
              <li>Video footage you submit for coaching analysis</li>
              <li>Usage data from our website collected via analytics tools</li>
              <li>Communications exchanged via email, Instagram, or coaching platforms</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>We use your data to:</p>
            <ul>
              <li>Deliver your coaching service and personalised training plans</li>
              <li>Process payments through Stripe</li>
              <li>Communicate with you about your programme</li>
              <li>Send you our newsletter if you have opted in — you can unsubscribe at any time</li>
              <li>Improve our website and coaching service using anonymised analytics data</li>
            </ul>
            <p>We do not sell your personal data to any third party under any circumstances.</p>

            <h2>4. Third Parties We Work With</h2>
            <p><strong>Stripe</strong> — payment processing. Their privacy policy is available at stripe.com/gb/privacy</p>
            <p><strong>Google Analytics</strong> — anonymised website usage data. You can opt out via your browser settings.</p>
            <p><strong>Email marketing platforms</strong> — if you subscribe to our newsletter your email is stored with our chosen email platform. You can unsubscribe at any time using the link in any email.</p>

            <h2>5. Video Footage</h2>
            <p>Footage you submit for coaching analysis is used solely for the purpose of producing your analysis. We will not share your footage publicly without your explicit written consent. If we wish to use any footage as a testimonial or example we will always ask you first.</p>

            <h2>6. How Long We Keep Your Data</h2>
            <p>We keep your personal data for as long as you are an active client and for up to 12 months after your subscription ends. You may request deletion of your data at any time by emailing alexpandov07@gmail.com</p>

            <h2>7. Your Rights Under UK GDPR</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications at any time</li>
              <li>Lodge a complaint with the Information Commissioner's Office at ico.org.uk</li>
            </ul>

            <h2>8. Cookies</h2>
            <p>Our website may use cookies to improve your browsing experience and collect anonymised analytics data. You can control cookie settings through your browser.</p>

            <h2>9. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Any significant changes will be communicated to active clients by email.</p>

            <h2>10. Contact</h2>
            <p>For any privacy related queries or to exercise your rights contact us at alexpandov07@gmail.com</p>
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