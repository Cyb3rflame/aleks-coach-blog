import Head from "next/head";

/* ------------------------------------------------------------------
   Post-payment page. Set this as the Stripe redirect URL:
   https://alekscoach.com/welcome
------------------------------------------------------------------- */

const CONFIG = {
  whatsapp:
    "https://wa.me/447512834077?text=Hi%20Alex%2C%20just%20signed%20up%20for%20the%20programme",
  whatsappDisplay: "+44 7512 834077",
  email: "alex@alekscoach.com", // change if this is wrong
};

const NEXT = [
  {
    n: "01",
    title: "Message me now",
    body:
      "Tap the button below. The message is already written, you just need to send it. That opens our chat and I will know who you are.",
  },
  {
    n: "02",
    title: "Send me a video",
    body:
      "Any video of you playing. Rallying, points, a set, a ball machine, even against a wall. Phone on your bag is fine. Doesn't need to be today.",
  },
  {
    n: "03",
    title: "Your breakdowns land within a few days",
    body:
      "Forehand, backhand and serve, each one 15 to 20 minutes, plus your first focus for each. Then we get to work.",
  },
];

export default function Welcome() {
  return (
    <>
      <Head>
        <title>You're in | Aleks Coach</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <header className="top">
          <span className="mark">ALEKS COACH</span>
          <span className="rule" />
        </header>

        <section className="hero">
          <span className="tick" aria-hidden="true">
            ✓
          </span>
          <h1>You're in.</h1>
          <p className="lede">
            Payment went through. Your receipt is on its way to your inbox from
            Stripe. Six months starts the moment you send me your first video.
          </p>
          <a className="btn" href={CONFIG.whatsapp}>
            Message me on WhatsApp
          </a>
          <p className="fallback">
            Button not working? Save my number and message me directly:{" "}
            <strong>{CONFIG.whatsappDisplay}</strong>
          </p>
        </section>

        <section>
          <h2>What happens next</h2>
          <div className="grid">
            {NEXT.map((s) => (
              <div key={s.n} className="step">
                <span className="n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="assure">
          <h2>If anything goes wrong</h2>
          <p>
            Send me a video within the first 14 days. If the breakdowns are not
            useful to you, tell me and I will refund you in full. No awkward
            conversation needed.
          </p>
          <p>
            If you do not hear from me within a day, chase me. Message{" "}
            <strong>{CONFIG.whatsappDisplay}</strong> or email{" "}
            <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>. I would
            rather be chased than have you sat waiting.
          </p>
        </section>

        <footer className="bottom">
          <span>Aleks Coach</span>
          <span>Aleksandar Pandov, LTA Level 3</span>
        </footer>
      </main>

      <style jsx global>{`
        :root {
          --navy: #0d2137;
          --red: #c0392b;
          --paper: #fbfaf8;
          --line: #e2ddd6;
          --muted: #5d6a78;
          --sans: "Helvetica Neue", Helvetica, Arial, sans-serif;
          --serif: Georgia, "Times New Roman", serif;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          background: var(--paper);
          color: var(--navy);
          font-family: var(--serif);
          font-size: 18px;
          -webkit-font-smoothing: antialiased;
        }
        * {
          box-sizing: border-box;
        }
        a {
          color: var(--red);
        }
      `}</style>

      <style jsx>{`
        main {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }
        .top {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 0 2.5rem;
        }
        .mark {
          font-family: var(--sans);
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.22em;
        }
        .rule {
          flex: 1;
          height: 1px;
          background: var(--line);
        }

        section {
          padding: 2.75rem 0;
          border-bottom: 1px solid var(--line);
        }

        .hero {
          text-align: center;
          padding-top: 0;
        }
        .tick {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--red);
          color: #fff;
          font-size: 1.75rem;
          margin-bottom: 1.25rem;
        }
        h1 {
          font-family: var(--sans);
          font-size: clamp(2.3rem, 7vw, 3.4rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          margin: 0 0 0.85rem;
        }
        .lede {
          font-size: 1.1875rem;
          line-height: 1.5;
          color: var(--muted);
          max-width: 32rem;
          margin: 0 auto 1.75rem;
        }
        .btn {
          display: inline-block;
          background: var(--red);
          color: #fff;
          font-family: var(--sans);
          font-weight: 700;
          font-size: 1.125rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1.1rem 2.75rem;
          border-radius: 2px;
          box-shadow: 0 10px 28px -12px rgba(192, 57, 43, 0.75);
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .btn:hover {
          background: #a93226;
          transform: translateY(-2px);
        }
        .fallback {
          margin: 1rem 0 0;
          font-size: 1rem;
          color: var(--muted);
        }
        .fallback strong {
          font-family: var(--sans);
          color: var(--navy);
          white-space: nowrap;
        }

        h2 {
          font-family: var(--sans);
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--red);
          margin: 0 0 1.5rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .n {
          font-family: var(--sans);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--red);
        }
        .step h3 {
          font-family: var(--sans);
          font-size: 1.1875rem;
          margin: 0.4rem 0 0.35rem;
          line-height: 1.25;
        }
        .step p {
          margin: 0;
          font-size: 1.0625rem;
          line-height: 1.5;
          color: var(--muted);
        }

        .assure p {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0 0 0.9rem;
          max-width: 40rem;
        }
        .assure p:last-child {
          margin-bottom: 0;
        }
        .assure strong {
          font-family: var(--sans);
          color: var(--navy);
          white-space: nowrap;
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1.5rem;
          font-family: var(--sans);
          font-size: 0.8125rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        @media (max-width: 720px) {
          section {
            padding: 2.25rem 0;
          }
          .grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .btn {
            display: block;
            padding: 1.1rem 1rem;
          }
          .bottom {
            flex-direction: column;
            gap: 0.3rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
