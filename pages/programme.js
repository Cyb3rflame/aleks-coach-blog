/* app/programme/page.js
   App Router version. Server component, no client JS needed.
   If you are on the Pages Router, use programme.js instead. */

/* ------------------------------------------------------------------
   EDIT EVERYTHING IN THIS BLOCK. NOTHING ELSE NEEDS TOUCHING.
------------------------------------------------------------------- */

const CONFIG = {
  // Stripe payment link. Set the success redirect inside Stripe to the
  // WHATSAPP url below so they land in your chat the second they pay.
  stripeLink: "https://buy.stripe.com/REPLACE_ME",

  // Your WhatsApp, international format, no plus, no spaces.
  whatsapp:
    "https://wa.me/447000000000?text=Hi%20Alex%2C%20I%20have%20a%20question%20about%20the%20programme",

  // The 11 character YouTube ID from the unlisted video URL.
  // youtube.com/watch?v=THIS_BIT
  mainVideoId: "REPLACE_ME",

  price: "£300",
  period: "for 6 months",
};

const BREAKDOWNS = [
  { id: "REPLACE_ME", label: "Forehand breakdown" },
  { id: "REPLACE_ME", label: "Backhand breakdown" },
  { id: "REPLACE_ME", label: "Serve breakdown" },
];

const TESTIMONIALS = [
  {
    quote:
      "Replace this with a real review. Two or three sentences is plenty. Specific beats glowing.",
    name: "Name",
    detail: "Club player, London",
  },
  {
    quote:
      "Replace this with a real review. Two or three sentences is plenty. Specific beats glowing.",
    name: "Name",
    detail: "4.0 NTRP, remote",
  },
  {
    quote:
      "Replace this with a real review. Two or three sentences is plenty. Specific beats glowing.",
    name: "Name",
    detail: "County league",
  },
  {
    quote:
      "Replace this with a real review. Two or three sentences is plenty. Specific beats glowing.",
    name: "Name",
    detail: "Returning after a long break",
  },
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

export const metadata = {
  title: "The Programme | Aleks Coach",
  description:
    "Six months of online tennis coaching. Full technical breakdowns, unlimited video reviews and match preparation, all through WhatsApp.",
  robots: { index: false, follow: false },
};

function Video({ id, title }) {
  return (
    <div className="ac-frame">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

function Cta({ note = true }) {
  return (
    <div className="ac-cta">
      <a className="ac-btn" href={CONFIG.stripeLink}>
        Start the programme
      </a>
      <p className="ac-price">
        <strong>{CONFIG.price}</strong> {CONFIG.period}. Pause it any time.
      </p>
      {note && (
        <p className="ac-alt">
          Questions first? <a href={CONFIG.whatsapp}>Message me on WhatsApp</a>
        </p>
      )}
    </div>
  );
}

export default function Programme() {
  return (
    <div className="ac-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main>
        <header className="ac-top">
          <span className="ac-mark">ALEKS COACH</span>
          <span className="ac-rule" />
          <span className="ac-tag">Online tennis coaching</span>
        </header>

        <section className="ac-hero">
          <h1>
            Whatever training you already do,
            <br />
            <em>I make it better.</em>
          </h1>
          <p className="ac-lede">
            Six months of coaching that fits around the tennis you already play.
            Watch the video, it goes through the whole thing.
          </p>
        </section>

        <section className="ac-video">
          <Video id={CONFIG.mainVideoId} title="The Aleks Coach programme" />
        </section>

        <section className="ac-ctablock">
          <Cta />
        </section>

        <section>
          <h2>How it works</h2>
          <div className="ac-grid-3">
            {STEPS.map((s) => (
              <div key={s.n} className="ac-step">
                <span className="ac-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>What you get</h2>
          <div className="ac-grid-2">
            {INCLUDED.map((i) => (
              <div key={i.title} className="ac-inc">
                <h3>{i.title}</h3>
                <p>{i.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Example breakdowns</h2>
          <p className="ac-sub">
            This is what lands in your WhatsApp after you send a video.
          </p>
          <div className="ac-grid-3">
            {BREAKDOWNS.map((b, idx) => (
              <figure key={idx}>
                <Video id={b.id} title={b.label} />
                <figcaption>{b.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section>
          <h2>What players say</h2>
          <div className="ac-grid-2 ac-revs">
            {TESTIMONIALS.map((t, idx) => (
              <blockquote key={idx}>
                <p>{t.quote}</p>
                <footer>
                  <span className="ac-name">{t.name}</span>
                  <span className="ac-detail">{t.detail}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="ac-faq">
          <h2>Questions</h2>
          <div className="ac-faqlist">
            {FAQS.map((f, idx) => (
              <details key={idx}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="ac-final">
          <h2>Ready to start?</h2>
          <p className="ac-sub">
            Pay below and you land straight in my WhatsApp. Send me a video and
            I will get your first breakdowns built.
          </p>
          <Cta note={false} />
        </section>

        <footer className="ac-bottom">
          <span>Aleks Coach</span>
          <span>Aleksandar Pandov, LTA Level 3</span>
        </footer>
      </main>
    </div>
  );
}

const CSS = `
.ac-page{
  --navy:#0d2137; --red:#c0392b; --paper:#fbfaf8; --line:#e2ddd6; --muted:#6b7784;
  --sans:"Helvetica Neue",Helvetica,Arial,sans-serif;
  --serif:Georgia,"Times New Roman",serif;
  background:var(--paper); color:var(--navy); font-family:var(--serif);
  min-height:100vh; -webkit-font-smoothing:antialiased;
}
.ac-page *{box-sizing:border-box;}
.ac-page a{color:var(--red);}
.ac-page main{max-width:860px; margin:0 auto; padding:0 1.5rem 5rem;}

.ac-page h2{
  font-family:var(--sans); font-size:.8125rem; font-weight:700;
  letter-spacing:.18em; text-transform:uppercase; color:var(--red); margin:0 0 2rem;
}
.ac-page section{padding:4.5rem 0; border-bottom:1px solid var(--line);}

.ac-top{display:flex; align-items:center; gap:1rem; padding:2.25rem 0 3.5rem;}
.ac-mark{font-family:var(--sans); font-weight:700; font-size:.8125rem; letter-spacing:.22em;}
.ac-rule{flex:1; height:1px; background:var(--line);}
.ac-tag{font-size:.875rem; color:var(--muted);}

.ac-hero{text-align:center; margin-bottom:2.75rem; padding:0 !important; border-bottom:0 !important;}
.ac-page h1{
  font-family:var(--sans); font-size:clamp(2rem,5.5vw,3.15rem); line-height:1.08;
  font-weight:700; letter-spacing:-.02em; margin:0 0 1.25rem;
}
.ac-page h1 em{font-family:var(--serif); font-style:italic; font-weight:400; color:var(--red);}
.ac-lede{font-size:1.125rem; line-height:1.6; color:var(--muted); max-width:34rem; margin:0 auto;}

.ac-video{padding:0 !important; border-bottom:0 !important; margin-bottom:2.75rem;}
.ac-ctablock{padding:0 0 4.5rem !important;}

.ac-frame{
  position:relative; width:100%; padding-top:56.25%; background:#0d2137;
  border-radius:4px; overflow:hidden; box-shadow:0 24px 60px -24px rgba(13,33,55,.45);
}
.ac-frame iframe{position:absolute; inset:0; width:100%; height:100%; border:0;}

.ac-cta{text-align:center;}
.ac-btn{
  display:inline-block; background:var(--red); color:#fff; font-family:var(--sans);
  font-weight:700; font-size:1.0625rem; letter-spacing:.04em; text-transform:uppercase;
  text-decoration:none; padding:1.15rem 3rem; border-radius:2px;
  box-shadow:0 10px 28px -12px rgba(192,57,43,.75);
  transition:transform .15s ease, box-shadow .15s ease, background .15s ease;
}
.ac-btn:hover{background:#a93226; transform:translateY(-2px); box-shadow:0 16px 34px -12px rgba(192,57,43,.8);}
.ac-price{margin:1.1rem 0 0; font-size:1.0625rem; color:var(--navy);}
.ac-price strong{font-family:var(--sans); letter-spacing:.01em;}
.ac-alt{margin:.4rem 0 0; font-size:.9375rem; color:var(--muted);}
.ac-alt a{color:var(--muted);}

.ac-grid-3{display:grid; grid-template-columns:repeat(3,1fr); gap:2.25rem;}
.ac-grid-2{display:grid; grid-template-columns:1fr 1fr; gap:2.25rem 2.75rem;}

.ac-n{font-family:var(--sans); font-size:.75rem; font-weight:700; letter-spacing:.15em; color:var(--red);}
.ac-step h3{font-family:var(--sans); font-size:1.0625rem; margin:.55rem 0 .5rem;}
.ac-step p{margin:0; font-size:.9375rem; line-height:1.6; color:var(--muted);}

.ac-inc h3{
  font-family:var(--sans); font-size:1.0625rem; margin:0 0 .5rem;
  padding-top:.9rem; border-top:2px solid var(--navy);
}
.ac-inc p{margin:0; font-size:.9375rem; line-height:1.65; color:var(--muted);}

.ac-sub{margin:-1.4rem 0 2rem; color:var(--muted); font-size:1rem;}
.ac-page figure{margin:0;}
.ac-page figcaption{font-family:var(--sans); font-size:.8125rem; color:var(--muted); margin-top:.7rem;}

.ac-revs blockquote{margin:0; padding-left:1.25rem; border-left:2px solid var(--red);}
.ac-revs blockquote p{margin:0 0 .85rem; font-size:1.0625rem; line-height:1.6;}
.ac-revs blockquote footer{font-family:var(--sans); font-size:.8125rem;}
.ac-name{font-weight:700;}
.ac-detail{color:var(--muted);}
.ac-detail:before{content:" / "; color:var(--line);}

.ac-faqlist{border-top:1px solid var(--line);}
.ac-faqlist details{border-bottom:1px solid var(--line);}
.ac-faqlist summary{
  list-style:none; cursor:pointer; padding:1.15rem 0;
  font-family:var(--sans); font-size:1rem; font-weight:700; color:var(--navy);
  display:flex; align-items:center; justify-content:space-between; gap:1rem;
}
.ac-faqlist summary::-webkit-details-marker{display:none;}
.ac-faqlist summary:after{
  content:""; flex:none; width:11px; height:11px;
  border-right:2px solid var(--red); border-bottom:2px solid var(--red);
  transform:rotate(45deg) translate(-3px,-3px); transition:transform .2s ease;
}
.ac-faqlist details[open] summary:after{transform:rotate(225deg) translate(-3px,-3px);}
.ac-faqlist details p{
  margin:-.3rem 0 1.3rem; font-size:.9375rem; line-height:1.65;
  color:var(--muted); max-width:46rem;
}

.ac-final{text-align:center; border-bottom:0 !important; padding-bottom:3rem !important;}
.ac-final .ac-sub{margin:-1.4rem auto 2.25rem; max-width:30rem;}

.ac-bottom{
  display:flex; justify-content:space-between; gap:1rem; padding-top:2rem;
  border-top:1px solid var(--line); font-family:var(--sans); font-size:.75rem;
  letter-spacing:.08em; text-transform:uppercase; color:var(--muted);
}

@media (max-width:720px){
  .ac-page main{padding-bottom:3.5rem;}
  .ac-page section{padding:3.25rem 0;}
  .ac-ctablock{padding-bottom:3.25rem !important;}
  .ac-grid-3,.ac-grid-2{grid-template-columns:1fr; gap:1.75rem;}
  .ac-tag{display:none;}
  .ac-bottom{flex-direction:column; gap:.4rem; text-align:center;}
}
`;