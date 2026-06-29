import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Proof.module.css'

const clientTestimonials = [
  {
    quote: "Today was my best day at the tournament. I won 3/6 games. My forehand felt great and much more natural. I was aggressive as I always try to be but much more consistent and it made me win more games.",
    name: "Elior C.",
    tag: "Active Client"
  },
  {
    quote: "A friend of mine saw my progress and asked me about you. He wants your contact.",
    name: "Elior C.",
    tag: "Active Client"
  },
  {
    quote: "Really blown away by the job you're doing for me here already.",
    name: "Max M.",
    tag: "Active Client"
  },
  {
    quote: "First small breakthrough in how it felt. I played more freely and without overthinking. Double fault rate went down which is a big plus.",
    name: "Max M.",
    tag: "Active Client"
  },
  {
    quote: "Impressive how you're able to analyse so many small little details.",
    name: "Max M.",
    tag: "Active Client"
  },
  {
    quote: "Played a tiebreak against my brother and almost beat him so your advice is definitely working.",
    name: "Jacob T.",
    tag: "Active Client"
  },
  {
    quote: "The advice has been really helpful. I serve a lot faster when my timing is right.",
    name: "Jacob T.",
    tag: "Active Client"
  },
  {
    quote: "Stability on returns has been a huge inconsistency and you explained it so simply. Going to keep staying low, transferring weight forward, and proactive movement in mind for the next matches.",
    name: "Noah S.",
    tag: "Active Client"
  },
  {
    quote: "My strokes are coming together. When footwork is on point I feel like I can play at a really high level.",
    name: "Gabe T.",
    tag: "Active Client"
  },
  {
    quote: "Can even feel it just with shadow swings. It feels much smoother and isn't requiring so much active shoulder strength.",
    name: "Luis C.",
    tag: "Active Client"
  },
  {
    quote: "Felt a lot more powerful.",
    name: "Whye K.",
    tag: "Active Client"
  },
  {
    quote: "My wife seems to be interested too after seeing my progress.",
    name: "Whye K.",
    tag: "Active Client"
  },
  {
    quote: "That is so amazing, I tried correcting it as you said and it actually clicked so quickly. Cannot thank you enough!",
    name: "Active Client",
    tag: "Programme Member"
  },
  {
    quote: "Much appreciated for creating the training plan and going into so much detail on my technique.",
    name: "Active Client",
    tag: "Programme Member"
  },
  {
    quote: "I really appreciate your analysis. It makes so much sense when you point it out. I was having very bad pain a week ago where I wasn't allowed to serve. I clearly was doing the motion wrong.",
    name: "Austin M.",
    tag: "Active Client"
  },
]

const communityReactions = [
  { quote: "Whoa that was insanely helpful. Do you do this as a job?", tag: "Club Player, Philippines" },
  { quote: "Dude are you kidding? This is awesome. Those are also great tips, especially with the visual comparisons.", tag: "Club Player, USA" },
  { quote: "Bro this is actually so great. I'm a visual learner so for you to break my own video down with annotations really clicks for me.", tag: "Club Player, USA" },
  { quote: "Second set was a lot better and I ended up winning. First time I beat him in months and only third time ever.", tag: "Club Player, USA" },
  { quote: "Wow, it makes perfect sense brother. Too good.", tag: "Club Player, USA" },
  { quote: "Wow thank you so much for taking the time. Both pieces of feedback make sense to me.", tag: "Club Player, Canada" },
  { quote: "Your analysis is very interesting and reveals a lot of weaknesses in my movement.", tag: "Club Player, USA" },
  { quote: "I tried working on the knee bend today and it completely changed my rhythm.", tag: "Club Player, USA" },
  { quote: "Visual analysis and pointing out exactly in video where I am making mistakes is really helpful.", tag: "Club Player, India" },
  { quote: "Thank you for your detailed and informative response. I really appreciate the effort you put in.", tag: "Club Player, USA" },
  { quote: "Awesome breakdown, really appreciate you taking the time to do this.", tag: "Club Player, Australia" },
  { quote: "Agreed with your points. There are so many small details to the serve and I miss even the most simplest things.", tag: "Club Player, USA" },
  { quote: "Thank you so much for taking the time to come up with this training plan for me.", tag: "Club Player, UK" },
  { quote: "Thank you so much for taking the time. I won't mess with anything right now but after the tournament I'll definitely start tweaking everything.", tag: "Club Player, USA" },
]

const clubs = [
  // United Kingdom
  { name: "Nottingham Tennis Centre", logo: "/logos/nottingham-tennis-centre.png", region: "United Kingdom" },
  { name: "Activeaway", logo: "/logos/activeaway.png", region: "United Kingdom" },
  { name: "Hazelwood Lawn Tennis Club", logo: "/logos/hazelwood.png", region: "United Kingdom" },
  { name: "Georginas Tennis Academy", logo: "/logos/georginas.png", region: "United Kingdom" },
  { name: "Waterfall Tennis Club", logo: "/logos/waterfall.png", region: "United Kingdom" },
  { name: "David Lloyd Nottingham", logo: "/logos/david-lloyd.png", region: "United Kingdom" },
  { name: "David Lloyd Finchley", logo: "/logos/david-lloyd.png", region: "United Kingdom" },
  { name: "David Lloyd West Bridgford", logo: "/logos/david-lloyd.png", region: "United Kingdom" },
  { name: "David Lloyd Kensington", logo: "/logos/david-lloyd.png", region: "United Kingdom" },
  // United States
  { name: "Sutton East Tennis Club", logo: "/logos/sutton-east.png", region: "United States" },
  { name: "Rolling Hills Estates Tennis Club", logo: "/logos/rolling-hills.png", region: "United States" },
  { name: "Broomfield Swim and Tennis Club", logo: "/logos/broomfield.png", region: "United States" },
  { name: "Eastmoor Swim and Tennis Club", logo: "/logos/eastmoor.png", region: "United States" },
  { name: "Templeton Tennis Ranch", logo: "/logos/templeton.png", region: "United States" },
  { name: "CityView Racquet Club", logo: "/logos/cityview.png", region: "United States" },
]

const stories = [
  {
    name: "Luis C.",
    location: "New York, USA",
    level: "UTR 6 — USTA Tournament Competitor",
    background: "Luis picked up tennis as a teenager, put the racket down, and came back to the sport at 28 with serious intentions. Within two years he was competing in USTA tournaments at UTR 6 to 7 level. The results were decent. But something was always slightly off. He was athletic. He had solid fundamentals. He understood the game tactically. But he kept losing points he felt he should be winning, and he could not figure out why.",
    problem: "The footage told the story immediately. Luis was late to almost every ball. Not by a lot. Just enough. His preparation was happening a fraction of a second too late on nearly every shot, which forced his body into a chain of compensations that cost him power, consistency, and most critically, performance under pressure. The deeper issue was his kinetic chain sequence. In practice against slower balls it was manageable. In a tournament against better players hitting harder and deeper, the cracks showed immediately. He had tried to fix it the way most players do. More court time. YouTube videos. Tips from hitting partners. None of it moved the needle. If anything it reinforced the habits making the problem worse.",
    process: "We started with the forehand and the serve — the foundation of his aggressive playstyle. The first objective was simple: fix the timing of his preparation so he was fully set up before the ball bounced. One cue. Two weeks of focused practice. The second objective was the kinetic chain. Teaching his body to initiate the swing from the ground up rather than from the arm required both on court drill work and off court shadow swings to build the correct muscle memory.",
    result: "The turning point came in a USTA tournament. Practice had been going well but the real test is whether the changes hold under match pressure. They held. Luis executed the technique under pressure, timed the ball cleanly, and felt the difference between playing from a position of preparation versus playing catch-up on every shot. He went on to win a USTA tournament and continues to compete in ongoing club leagues. More power. Less effort. Results that hold.",
    quote: "I'm liking how some shots feel a lot easier on both wings. Def plan to stick with it."
  },
  {
    name: "Jared",
    location: "San Francisco, USA",
    level: "UTR 7 — College Team Competitor",
    background: "Jared grew up around tennis but never committed to it consistently. When he came back to it seriously, the goal was clear. He wanted to compete for his college team, climb the ranking within it, and prove he belonged at that level. At UTR 7 he had the athleticism and the competitive instinct. What he needed was a game that could hold up when it mattered.",
    problem: "The power was never the issue. Jared could hit the ball hard. The problem was that he could not do it twice in a row with any certainty. His contact point on both groundstrokes was inconsistent — mechanically caused by a swing path that produced different results depending on pace, time, and pressure. In practice it worked often enough to feel fine. In matches against college level opponents it fell apart completely. He had tried more repetitions and mental coaching. The mental work helped him manage the frustration but it could not fix a mechanical problem. The bad habits were not just staying, they were solidifying with every additional hour of practice done incorrectly.",
    process: "We started with both groundstrokes. The priority was a repeatable, consistent swing path that Jared could trust under pressure without thinking about it. The swing path correction required unlearning patterns that had been practiced for years. There was a dip in level during the transition — completely normal, and something we prepared him for from the start. New mechanics feel foreign before they feel natural. One adjustment at a time. Isolation drills to build muscle memory. Shadow swings off court to reinforce the pattern.",
    result: "The shift happened gradually and then suddenly. Jared was mid-match when he noticed something. He was hitting his groundstrokes correctly without thinking about them. The new technique had stopped being a conscious instruction and had become an automatic response. He was not managing his swing path anymore. He was just playing tennis. He continues to rise in his college ranking. The pressure of college competition never disappears. But now his technique is not adding to that pressure. It is one less thing that can go wrong.",
    quote: "Once it clicked, all the initial problems were solved."
  }
]

export default function Proof() {
  return (
    <>
      <Head>
        <title>Results and Reviews | Aleks Coach</title>
        <meta name="description" content="Real results from real players. See what clients and the tennis community say about Aleks Coach biomechanical tennis coaching." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.logo}>ALEKS COACH</Link>
            <a href="mailto:alexpandov07@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              Send Me Your Footage
            </a>
          </div>
        </header>

        <main className={styles.main}>

          {/* HERO */}
          <div className={styles.hero}>
            <p className={styles.heroLabel}>PROOF</p>
            <h1 className={styles.heroTitle}>Real players.<br />Real results.</h1>
            <p className={styles.heroSub}>Every review below is from a real player. No paid testimonials. No staged results. Just footage, analysis, and measurable improvement.</p>
          </div>

          {/* CLIENT RESULTS */}
          <section className={styles.section}>
            <p className={styles.sectionLabel}>FROM INSIDE THE PROGRAMME</p>
            <h2 className={styles.sectionTitle}>What clients say</h2>
            <div className={styles.grid}>
              {clientTestimonials.map((t, i) => (
                <div key={i} className={styles.card}>
                  <p className={styles.quote}>"{t.quote}"</p>
                  <p className={styles.author}>{t.name} <span className={styles.tag}>{t.tag}</span></p>
                </div>
              ))}
            </div>
          </section>

          {/* VIDEO TESTIMONIALS */}
          <section className={styles.section}>
            <p className={styles.sectionLabel}>VIDEO TESTIMONIALS</p>
            <h2 className={styles.sectionTitle}>Hear it directly</h2>
            <div className={styles.videoGrid}>
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/2XLLqCL_qoY"
                  title="Client Video Testimonial 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.video}
                />
              </div>
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/pNjmZObJz4E"
                  title="Client Video Testimonial 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.video}
                />
              </div>
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/5k_lW5VloM0"
                  title="Client Video Testimonial 3"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.video}
                />
              </div>
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.loom.com/embed/bf02d6b4d5c24e14a7a28aa7a042776b"
                  title="Client Video Testimonial 4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.video}
                />
              </div>
            </div>
          </section>

          {/* BEFORE AND AFTER */}
          <section className={styles.section}>
            <p className={styles.sectionLabel}>VISUAL PROOF</p>
            <h2 className={styles.sectionTitle}>Before and after</h2>
            <p className={styles.sectionSub}>Same player. Same stroke. Weeks apart. One change at a time.</p>
            <div className={styles.videoGrid}>
              <div>
                <div className={styles.videoWrapper}>
                  <iframe
                    width="100%"
                    height="280"
                    src="https://www.youtube.com/embed/Wy8Dx6EuvCM"
                    title="Before and After Forehand Player 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.video}
                  />
                </div>
                <p className={styles.videoLabel}>Player 1 — Forehand unit turn</p>
              </div>
              <div>
                <div className={styles.videoWrapper}>
                  <iframe
                    width="100%"
                    height="280"
                    src="https://www.youtube.com/embed/4KiWqXDLj9E"
                    title="Before and After Player 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.video}
                  />
                </div>
                <p className={styles.videoLabel}>Player 2 — Mechanical correction</p>
              </div>
            </div>
          </section>

          {/* CLIENT STORIES */}
          <section className={styles.section}>
            <p className={styles.sectionLabel}>CLIENT STORIES</p>
            <h2 className={styles.sectionTitle}>The full journey</h2>
            <div className={styles.stories}>
              {stories.map((s, i) => (
                <div key={i} className={styles.story}>
                  <div className={styles.storyHeader}>
                    <h3 className={styles.storyName}>{s.name}</h3>
                    <p className={styles.storyMeta}>{s.location} — {s.level}</p>
                  </div>

                  <div className={styles.storySection}>
                    <p className={styles.storySectionLabel}>THE BACKGROUND</p>
                    <p className={styles.storyText}>{s.background}</p>
                  </div>

                  <div className={styles.storySection}>
                    <p className={styles.storySectionLabel}>THE PROBLEM</p>
                    <p className={styles.storyText}>{s.problem}</p>
                  </div>

                  <div className={styles.storySection}>
                    <p className={styles.storySectionLabel}>THE PROCESS</p>
                    <p className={styles.storyText}>{s.process}</p>
                  </div>

                  <div className={styles.storySection}>
                    <p className={styles.storySectionLabel}>THE RESULT</p>
                    <p className={styles.storyText}>{s.result}</p>
                  </div>

                  <div className={styles.storyQuote}>
                    <p>"{s.quote}"</p>
                    <span>{s.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COMMUNITY REACTIONS */}
          <section className={styles.section}>
            <p className={styles.sectionLabel}>FROM THE TENNIS COMMUNITY</p>
            <h2 className={styles.sectionTitle}>What players are saying</h2>
            <div className={styles.grid}>
              {communityReactions.map((t, i) => (
                <div key={i} className={`${styles.card} ${styles.cardDim}`}>
                  <p className={styles.quote}>"{t.quote}"</p>
                  <p className={styles.author}><span className={styles.tag}>{t.tag}</span></p>
                </div>
              ))}
            </div>
          </section>

          {/* CLUBS WORKED WITH */}
          <section className={styles.section}>
            <p className={styles.sectionLabel}>CLUBS AND ACADEMIES</p>
            <h2 className={styles.sectionTitle}>Worked with</h2>
            <div className={styles.clubsGrid}>
              {["United Kingdom", "United States"].map((region) => (
                <div key={region} className={styles.clubsColumn}>
                  <p className={styles.clubsRegion}>{region}</p>
                  <div className={styles.logosGrid}>
                    {clubs.filter((c) => c.region === region).map((club, i) => (
                      <div key={i} className={styles.logoItem} title={club.name}>
                        <img
                          src={club.logo}
                          alt={club.name}
                          className={styles.logoImg}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BOTTOM CTA */}
          <div className={styles.bottomCta}>
            <h2 className={styles.ctaTitle}>Want results like these?</h2>
            <p className={styles.ctaSub}>Send me your footage on Instagram. I will give you a personal breakdown of exactly what is happening mechanically and what to fix first.</p>
            <a href="mailto:alexpandov07@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonLarge}>
              Send Me Your Footage
            </a>
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