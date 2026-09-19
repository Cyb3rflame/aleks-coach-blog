import Head from "next/head";
import { useState } from "react";

/* ------------------------------------------------------------------
   EDIT EVERYTHING IN THIS BLOCK. NOTHING ELSE NEEDS TOUCHING.
------------------------------------------------------------------- */

const CONFIG = {
  stripeLink: "https://buy.stripe.com/dRm5kCgMD2bn0SU1mcenS0D",

  whatsapp:
    "https://wa.me/447512834077?text=Hi%20Alex%2C%20I%20have%20a%20question%20about%20the%20programme",

  mainVideoId: "zjgIpx-UJdc",

  price: "£300",
  period: "for 6 months",
};

const STEPS = [
  {
    n: "01",
    title: "Send a video",
    body:
      "Rallying, points, a set, a ball machine, even against a wall. Phone propped on your bag is fine.",
  },
  {
    n: "02",
    title: "Get your breakdowns",
    body:
      "Forehand, backhand and serve, each broken down properly, with one clear focus to take on court.",
  },
  {
    n: "03",
    title: "Keep sending, keep changing",
    body:
      "You train, you film, I review. We hold each focus until it survives a real match, then move to the next one.",
  },
];

// Vertical Shorts.
const VIDEO_TESTIMONIALS = [
  { id: "5GEh3TWnh_g", name: "", detail: "" },
  { id: "3OWSd3whlNk", name: "", detail: "" },
  { id: "2XLLqCL_qoY", name: "", detail: "" },
];

// vertical: true for Shorts, false for normal landscape videos.
const BEFORE_AFTERS = [
  { id: "Cfe3_X385yM", label: "", vertical: true },
  { id: "DMGCSDou58g", label: "", vertical: true },
  { id: "9n6oPAJkAko", label: "", vertical: false },
];

// Wrap any phrase in **double asterisks** to highlight it in red.
const TESTIMONIALS = [
  {
    quote:
      "Wow, thank you so much! This was helpful. **Hadn't noticed that I wasn't using my hips properly**, as well as my wrist pronation occurring prior to uncoiling. Gonna try to keep those in mind.",
    name: "Luis Moore",
    detail: "Club player",
  },
  {
    quote:
      "The tips you gave me were excellent. Went to the court to work on opening my body earlier instead of all at once. **Felt a lot more power in my shots.**",
    name: "Dimi Petrov",
    detail: "Club player",
  },
  {
    quote:
      "Bro thank you for this! I already **watched this like 3 times** to take some notes. This is definitely gonna help me a ton. Thank you so much coach.",
    name: "Gavin Mens",
    detail: "Club player",
  },
  {
    quote:
      "That was very detailed feedback. I have listed these points to change. **I will change one at a time** when I practice.",
    name: "Martin Gerard",
    detail: "Club player",
  },
];

const BREAKDOWNS = [
  { id: "rU2BJA_pkoA", label: "Forehand breakdown" },
  { id: "STXDn7y5P7Y", label: "Backhand breakdown" },
  { id: "NELe2pN8D0w", label: "Serve breakdown" },
];

const INCLUDED = [
  {
    title: "Full technical breakdowns",
    body:
      "You send a video of you playing. I build a 15 to 20 minute breakdown of your forehand, your backhand and your serve. What is happening now, what it should look like, and how to get there.",
  },
  {
    title: "One focus at a time",
    body:
      "One focus on the forehand, one on the backhand, one on the serve. Trying to change more than one thing at once never works. We hold a focus until it holds up in a match, then move on.",
  },
  {
    title: "Unlimited video reviews",
    body:
      "Send as many videos as you want. Rallying, points, a tiebreak, a full set, ball machine, drills, off court work. You get a voiceover back going through exactly what happened.",
  },
  {
    title: "Everything beyond technique",
    body:
      "Movement, positioning, footwork, decision making, patterns and the mental side. The best technique in the world does not help if you are late to the ball or picking the wrong shot.",
  },
  {
    title: "Off court work built around you",
    body:
      "Mobility, plyometrics, strength work and a nutrition guide, all mirroring whatever we are working on that week. Built around the gym access and time you actually have. Short sessions, not two hour blocks.",
  },
  {
    title: "Match and tournament prep",
    body:
      "We build a plan A and a plan B before you compete, then review what happened afterwards. No technical rebuilds right before a tournament. The goal is closing the gap between practice and match play.",
  },
  {
    title: "Live 1 to 1 calls",
    body:
      "For resetting the plan when your schedule or goals change, and for going through a filmed match together so you get my read and I get yours.",
  },
  {
    title: "Replies that actually come back",
    body:
      "Quick question before you go on court, you get an answer the same day. Longer video reviews come back within two days. Everything runs through WhatsApp.",
  },
];

const FIRST_48 = [
  {
    when: "The moment you pay",
    body:
      "You land on a page with my WhatsApp on it. One tap, the message is already written, you just send it. Takes about five seconds.",
  },
  {
    when: "Same day",
    body:
      "I reply. A few questions about your game, your schedule, what you are working towards and what kit you have access to. That is what makes everything custom rather than generic.",
  },
  {
    when: "Within 48 hours",
    body:
      "You send me a video whenever suits you. The second it lands I start building your forehand, backhand and serve breakdowns.",
  },
];

const FAQS = [
  {
    q: "What level is this for?",
    a: "Anyone playing regularly who wants to actually improve rather than just log hours. I have worked with players picking the sport back up and with players competing in county leagues and national tournaments.",
  },
  {
    q: "Do I need a coach or a court booked already?",
    a: "No. The whole premise is that I make whatever training you already do a bit better. Hitting with a friend, a ball machine, a wall, playing points, it all works.",
  },
  {
    q: "How do I film myself?",
    a: "A phone against the fence or on top of your bag is enough. It does not need to be a good camera or a good angle. I will tell you if I need something different.",
  },
  {
    q: "How quickly do you reply?",
    a: "Quick questions, usually the same day. Longer video reviews, within two days.",
  },
  {
    q: "What if I go away, get injured, or it rains for a month?",
    a: "You can freeze the membership. The time is not wasted, it just pauses until you are back on court.",
  },
  {
    q: "How do we communicate?",
    a: "WhatsApp. Videos in, breakdowns and voice notes back. Nothing to download, no app to learn.",
  },
];

/* ------------------------------------------------------------------ */

function Highlight({ text }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="hl">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
      <style jsx>{`
        .hl {
          color: var(--red);
          font-weight: 700;
        }
      `}</style>
    </>
  );
}

function Stars() {
  return (
    <div className="stars" aria-label="5 out of 5">
      {"\u2605\u2605\u2605\u2605\u2605"}
      <style jsx>{`
        .stars {
          color: var(--red);
          font-size: 1rem;
          letter-spacing: 0.15em;
          margin-bottom: 0.6rem;
        }
      `}</style>
    </div>
  );
}

function Video({ id, title, vertical = false }) {
  return (
    <div className={vertical ? "frame tall" : "frame"}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
      <style jsx>{`
        .frame {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          background: #0d2137;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 18px 44px -22px rgba(13, 33, 55, 0.45);
        }
        .frame.tall {
          padding-top: 177.78%;
        }
        .frame :global(iframe) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>
    </div>
  );
}

export default function Programme() {
  const [open, setOpen] = useState(null);

  const baVertical = BEFORE_AFTERS.filter((b) => b.vertical);
  const baWide = BEFORE_AFTERS.filter((b) => !b.vertical);

  return (
    <>
      <Head>
        <title>The Programme | Aleks Coach</title>
        <meta
          name="description"
          content="Six months of online tennis coaching. Full technical breakdowns, unlimited video reviews and match preparation, all through WhatsApp."
        />
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <header className="top">
          <span className="mark">ALEKS COACH</span>
          <span className="rule" />
          <span className="tag">Online tennis coaching</span>
        </header>

        {/* 1. HERO + VIDEO */}
        <section className="hero">
          <h1>
            Whatever training you already do,
            <br />
            <em>I make it better.</em>
          </h1>
          <p className="lede">
            Six months of coaching that fits around the tennis you already play.
            Watch the video, it goes through the whole thing.
          </p>
        </section>

        <section className="video-wrap">
          <Video id={CONFIG.mainVideoId} title="The Aleks Coach programme" />
        </section>

        {/* 2. HOW IT WORKS */}
        <section>
          <h2>How it works</h2>
          <div className="grid-3">
            {STEPS.map((s) => (
              <div key={s.n} className="step">
                <span className="n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. VIDEO TESTIMONIALS */}
        <section>
          <h2>Players in their own words</h2>
          <div className="grid-3 shorts">
            {VIDEO_TESTIMONIALS.map((v, idx) => (
              <figure key={idx}>
                <Video id={v.id} title="Player testimonial" vertical />
                {(v.name || v.detail) && (
                  <figcaption>
                    {v.name && <span className="name">{v.name}</span>}
                    {v.detail && <span className="detail">{v.detail}</span>}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>

        {/* 4. BEFORE AND AFTERS */}
        <section>
          <h2>Before and after</h2>
          <p className="sub">Same player, same shot, a few weeks apart.</p>
          <div className="grid-3 shorts">
            {baVertical.map((b, idx) => (
              <figure key={idx}>
                <Video id={b.id} title={b.label || "Before and after"} vertical />
                {b.label && <figcaption>{b.label}</figcaption>}
              </figure>
            ))}
          </div>
          {baWide.map((b, idx) => (
            <figure key={idx} className="wide">
              <Video id={b.id} title={b.label || "Before and after"} />
              {b.label && <figcaption>{b.label}</figcaption>}
            </figure>
          ))}
        </section>

        {/* 5. WRITTEN REVIEWS */}
        <section>
          <h2>Reviews</h2>
          <p className="sub">
            Sent straight after players got their first breakdowns and plans.
          </p>
          <div className="grid-2 revs">
            {TESTIMONIALS.map((t, idx) => (
              <blockquote key={idx}>
                <Stars />
                <p>
                  <Highlight text={t.quote} />
                </p>
                <footer>
                  <span className="name">{t.name}</span>
                  <span className="detail">{t.detail}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* 6. TASTER BREAKDOWNS */}
        <section>
          <h2>Example breakdowns</h2>
          <p className="sub">
            This is what lands in your WhatsApp after you send a video.
          </p>
          <div className="grid-3">
            {BREAKDOWNS.map((b, idx) => (
              <figure key={idx}>
                <Video id={b.id} title={b.label} />
                <figcaption>{b.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 7. WHAT YOU GET */}
        <section>
          <h2>What you get</h2>
          <div className="grid-2">
            {INCLUDED.map((i) => (
              <div key={i.title} className="inc">
                <h3>{i.title}</h3>
                <p>{i.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FIRST 48 HOURS */}
        <section>
          <h2>Your first 48 hours</h2>
          <div className="grid-3">
            {FIRST_48.map((f) => (
              <div key={f.when} className="step">
                <span className="n">{f.when.toUpperCase()}</span>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. GUARANTEE */}
        <section className="guarantee">
          <div className="gbox">
            <h2>The first week guarantee</h2>
            <p className="big">
              Send me a video in your first week. You get your forehand,
              backhand and serve breakdowns and your first plan. Look at all of
              it. If you do not think it is worth the money, say so and I refund
              you in full.
            </p>
            <p>
              No forms, no back and forth, no awkward conversation. You keep the
              breakdowns either way. I would rather refund you than have you six
              months into something you are not into.
            </p>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="faq">
          <h2>Questions</h2>
          <ul>
            {FAQS.map((f, idx) => (
              <li key={idx} className={open === idx ? "open" : ""}>
                <button
                  onClick={() => setOpen(open === idx ? null : idx)}
                  aria-expanded={open === idx}
                >
                  <span>{f.q}</span>
                  <i />
                </button>
                {open === idx && <p>{f.a}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section className="final">
          <h2>Ready to start?</h2>
          <p className="sub">
            Pay below and you land straight in my WhatsApp. Send me a video and
            I will get your first breakdowns built.
          </p>
          <a className="btn big" href={CONFIG.stripeLink}>
            Start the programme
          </a>
          <p className="price">
            <strong>{CONFIG.price}</strong> {CONFIG.period}. Pause it any time.
          </p>
          <p className="secure">
            Secure payment by Stripe. Refundable in the first week.
          </p>
          <p className="alt">
            Questions first? <a href={CONFIG.whatsapp}>Message me on WhatsApp</a>
          </p>
        </section>

        <footer className="bottom">
          <span>Aleks Coach</span>
          <span>Aleksandar Pandov, LTA Level 3</span>
        </footer>
      </main>

      {/* STICKY CTA */}
      <div className="bar">
        <div className="bar-in">
          <span className="bar-price">
            <strong>{CONFIG.price}</strong>
            <em>{CONFIG.period}</em>
            <em className="bar-note">Refundable first week</em>
          </span>
          <a className="btn" href={CONFIG.stripeLink}>
            Start the programme
          </a>
        </div>
      </div>

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
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.5rem 7rem;
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

        section {
          padding: 2.75rem 0;
          border-bottom: 1px solid var(--line);
        }

        .top {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 0 2rem;
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
        .tag {
          font-size: 0.9375rem;
          color: var(--muted);
        }

        .hero {
          text-align: center;
          padding: 0 0 1.75rem;
          border-bottom: 0;
        }
        h1 {
          font-family: var(--sans);
          font-size: clamp(2.3rem, 6vw, 3.6rem);
          line-height: 1.05;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin: 0 0 1rem;
        }
        h1 em {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          color: var(--red);
        }
        .lede {
          font-size: 1.25rem;
          line-height: 1.5;
          color: var(--muted);
          max-width: 36rem;
          margin: 0 auto;
        }

        .video-wrap {
          padding: 0;
          border-bottom: 0;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem 2.25rem;
        }
        .shorts {
          gap: 1rem;
        }
        .wide {
          margin-top: 1.75rem;
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
          font-size: 1.25rem;
          margin: 0.4rem 0 0.35rem;
        }
        .step p {
          margin: 0;
          font-size: 1.0625rem;
          line-height: 1.5;
          color: var(--muted);
        }

        figure {
          margin: 0;
        }
        figcaption {
          font-family: var(--sans);
          font-size: 0.9375rem;
          color: var(--muted);
          margin-top: 0.55rem;
        }
        .name {
          font-weight: 700;
          color: var(--navy);
        }
        .detail {
          color: var(--muted);
        }

        .revs blockquote {
          margin: 0;
          padding-left: 1.15rem;
          border-left: 2px solid var(--line);
        }
        .revs blockquote p {
          margin: 0 0 0.7rem;
          font-size: 1.125rem;
          line-height: 1.5;
        }
        .revs blockquote footer {
          font-family: var(--sans);
          font-size: 0.9375rem;
          line-height: 1.35;
        }
        .revs .name {
          display: block;
        }
        .revs .detail {
          display: block;
          font-size: 0.875rem;
        }

        .guarantee {
          padding-top: 2.75rem;
        }
        .gbox {
          border: 2px solid var(--navy);
          border-radius: 4px;
          padding: 1.75rem 2rem;
        }
        .gbox h2 {
          margin-bottom: 1rem;
        }
        .gbox p {
          margin: 0 0 0.8rem;
          font-size: 1.0625rem;
          line-height: 1.55;
          color: var(--muted);
        }
        .gbox p.big {
          font-size: 1.25rem;
          line-height: 1.45;
          color: var(--navy);
        }
        .gbox p:last-child {
          margin-bottom: 0;
        }
        .secure {
          margin: 0.5rem 0 0;
          font-family: var(--sans);
          font-size: 0.875rem;
          color: var(--muted);
        }
        .bar-note {
          color: var(--muted);
        }
        .bar-note:before {
          content: "/ ";
          color: var(--line);
        }

        .sub {
          margin: -1rem 0 1.5rem;
          color: var(--muted);
          font-size: 1.125rem;
        }

        .inc h3 {
          font-family: var(--sans);
          font-size: 1.25rem;
          margin: 0 0 0.4rem;
          padding-top: 0.75rem;
          border-top: 2px solid var(--navy);
        }
        .inc p {
          margin: 0;
          font-size: 1.0625rem;
          line-height: 1.55;
          color: var(--muted);
        }

        .faq ul {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid var(--line);
        }
        .faq li {
          border-bottom: 1px solid var(--line);
        }
        .faq button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: none;
          border: 0;
          padding: 0.95rem 0;
          cursor: pointer;
          text-align: left;
          font-family: var(--sans);
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--navy);
        }
        .faq i {
          flex: none;
          width: 11px;
          height: 11px;
          border-right: 2px solid var(--red);
          border-bottom: 2px solid var(--red);
          transform: rotate(45deg) translate(-3px, -3px);
          transition: transform 0.2s ease;
        }
        .faq li.open i {
          transform: rotate(225deg) translate(-3px, -3px);
        }
        .faq li p {
          margin: -0.2rem 0 1rem;
          font-size: 1.0625rem;
          line-height: 1.55;
          color: var(--muted);
          max-width: 48rem;
        }

        .final {
          text-align: center;
          border-bottom: 0;
          padding-bottom: 2rem;
        }
        .final .sub {
          margin: -1rem auto 1.5rem;
          max-width: 32rem;
        }
        .btn {
          display: inline-block;
          background: var(--red);
          color: #fff;
          font-family: var(--sans);
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .btn.big {
          font-size: 1.125rem;
          padding: 1.1rem 3rem;
          box-shadow: 0 10px 28px -12px rgba(192, 57, 43, 0.75);
        }
        .btn:hover {
          background: #a93226;
          transform: translateY(-2px);
        }
        .price {
          margin: 1rem 0 0;
          font-size: 1.125rem;
        }
        .price strong {
          font-family: var(--sans);
        }
        .alt {
          margin: 0.35rem 0 0;
          font-size: 1rem;
          color: var(--muted);
        }
        .alt a {
          color: var(--muted);
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--line);
          font-family: var(--sans);
          font-size: 0.8125rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .bar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          background: rgba(251, 250, 248, 0.94);
          backdrop-filter: blur(8px);
          border-top: 1px solid var(--line);
          box-shadow: 0 -8px 24px -16px rgba(13, 33, 55, 0.35);
        }
        .bar-in {
          max-width: 900px;
          margin: 0 auto;
          padding: 0.7rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .bar-price {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          font-family: var(--sans);
          white-space: nowrap;
        }
        .bar-price strong {
          font-size: 1.375rem;
          font-weight: 700;
        }
        .bar-price em {
          font-style: normal;
          font-size: 0.9375rem;
          color: var(--muted);
        }
        .bar .btn {
          font-size: 1rem;
          padding: 0.85rem 2rem;
        }

        @media (max-width: 720px) {
          main {
            padding-bottom: 6rem;
          }
          section {
            padding: 2.25rem 0;
          }
          .grid-3,
          .grid-2 {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .shorts {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          .tag {
            display: none;
          }
          .bottom {
            flex-direction: column;
            gap: 0.3rem;
            text-align: center;
          }
          .bar-in {
            padding: 0.6rem 1rem;
            gap: 0.75rem;
          }
          .bar-price strong {
            font-size: 1.25rem;
          }
          .bar-price em {
            display: none;
          }
          .gbox {
            padding: 1.25rem 1.25rem;
          }
          .gbox p.big {
            font-size: 1.125rem;
          }
          .bar .btn {
            flex: 1;
            text-align: center;
            font-size: 0.9375rem;
            padding: 0.85rem 1rem;
          }
        }
      `}</style>
    </>
  );
}