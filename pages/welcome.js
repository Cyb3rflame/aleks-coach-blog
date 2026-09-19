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

const FIRST_48 = [
  {
    when: "Right now",
    body:
      "Message me on WhatsApp. The text is already written, you just need to send it. That opens our chat and I will know who you are.",
  },
  {
    when: "Today",
    body:
      "I reply with a few questions about your game, your schedule, what you are working towards and what kit you have access to. That is what makes the plan yours rather than generic.",
  },
  {
    when: "Within 48 hours",
    body:
      "You send a video whenever suits. Rallying, points, a set, a ball machine, even against a wall. As soon as it lands I start on your forehand, backhand and serve breakdowns.",
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
        </header>

        <section className="intro">
          <p className="eyebrow">Payment received</p>
          <h1>You're in.</h1>
          <p className="lede">
            Stripe has sent your receipt by email. Six months starts the moment
            you send me your first video, so let's get you set up.
          </p>

          <a className="btn" href={CONFIG.whatsapp}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2"
              />
            </svg>
            Message me on WhatsApp
          </a>

          <p className="fallback">
            Or save my number and message me directly:{" "}
            <strong>{CONFIG.whatsappDisplay}</strong>
          </p>
        </section>

        <section>
          <h2>Your first 48 hours</h2>
          <ol className="timeline">
            {FIRST_48.map((f) => (
              <li key={f.when}>
                <h3>{f.when}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2>The first week guarantee</h2>
          <p className="lead-p">
            Send me a video in your first week and you get your forehand,
            backhand and serve breakdowns plus your first plan. Look at all of
            it. If you don't think it's worth the money, say so and I refund you
            in full.
          </p>
          <p>
            No forms, no back and forth, no awkward conversation. I would rather
            refund you than have you six months into something you're not into.
          </p>
        </section>

        <section className="last">
          <h2>If you don't hear from me</h2>
          <p>
            Chase me. Message <strong>{CONFIG.whatsappDisplay}</strong> or email{" "}
            <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>. I'd rather be
            chased than have you sat waiting.
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
          --line: #e6e1da;
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
          color: var(--navy);
        }
      `}</style>

      <style jsx>{`
        main {
          max-width: 620px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }

        .top {
          padding: 2rem 0 3.5rem;
        }
        .mark {
          font-family: var(--sans);
          font-weight: 700;
          font-size: 0.8125rem;
          letter-spacing: 0.22em;
          color: var(--muted);
        }

        section {
          padding: 2.5rem 0;
          border-top: 1px solid var(--line);
        }
        .intro {
          padding-top: 0;
          border-top: 0;
        }
        .last {
          padding-bottom: 2.5rem;
        }

        .eyebrow {
          font-family: var(--sans);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .eyebrow:before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #2f8f46;
        }

        h1 {
          font-family: var(--sans);
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin: 0 0 1rem;
        }
        .lede {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0 0 2rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: var(--navy);
          color: #fff;
          font-family: var(--sans);
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          padding: 0.95rem 1.6rem;
          border-radius: 6px;
          transition: background 0.15s ease;
        }
        .btn:hover {
          background: #16324d;
        }
        .btn svg {
          width: 20px;
          height: 20px;
          flex: none;
        }

        .fallback {
          margin: 1rem 0 0;
          font-size: 0.9375rem;
          color: var(--muted);
        }
        .fallback strong {
          font-family: var(--sans);
          font-weight: 600;
          color: var(--navy);
          white-space: nowrap;
        }

        h2 {
          font-family: var(--sans);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 1.5rem;
        }

        .timeline {
          list-style: none;
          margin: 0;
          padding: 0 0 0 1.5rem;
          border-left: 1px solid var(--line);
        }
        .timeline li {
          position: relative;
          padding-bottom: 1.6rem;
        }
        .timeline li:last-child {
          padding-bottom: 0;
        }
        .timeline li:before {
          content: "";
          position: absolute;
          left: -1.5rem;
          top: 0.5rem;
          transform: translateX(-50%);
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--navy);
        }
        .timeline h3 {
          font-family: var(--sans);
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.3rem;
        }
        .timeline p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--muted);
        }

        section p {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0 0 0.9rem;
        }
        section p:last-child {
          margin-bottom: 0;
        }
        .lead-p {
          color: var(--navy);
        }
        section strong {
          font-family: var(--sans);
          font-weight: 600;
          font-size: 0.9375rem;
          color: var(--navy);
          white-space: nowrap;
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--line);
          font-family: var(--sans);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        @media (max-width: 600px) {
          h1 {
            font-size: 2.125rem;
          }
          section {
            padding: 2rem 0;
          }
          .btn {
            width: 100%;
            justify-content: center;
          }
          .bottom {
            flex-direction: column;
            gap: 0.3rem;
          }
        }
      `}</style>
    </>
  );
}