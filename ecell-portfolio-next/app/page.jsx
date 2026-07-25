'use client';
import Link from 'next/link'
import StatStrip from '@/components/StatStrip'
import EventCard from '@/components/EventCard'
import { events } from '@/data/events'
import styles from './page.module.css'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Founders trained', value: '480+' },
  { label: 'Startups launched', value: '62' },
  { label: 'Funding raised', value: '$3.1M' },
  { label: 'Active members', value: '210' }
]

const pillars = [
  {
    title: 'Build',
    copy: 'Weekend sprints and MVP bootcamps that turn a notes-app idea into something you can actually demo.'
  },
  {
    title: 'Fund',
    copy: 'Direct lines to alumni angels and campus-adjacent VCs who write first checks for student teams.'
  },
  {
    title: 'Launch',
    copy: 'A stage at Ignite Summit in front of the investors, press, and customers who decide what happens next.'
  }
]

export default function HomePage() {
  const featured = events.filter((e) => e.status === 'upcoming').slice(0, 3)

  const words = [
    "Fueling",
    "The Next Generation of",
    "Founders."
  ]

  return (
    <>
      {/* Hero */}
      <section className={`ignition-stripe ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>

          <span className="eyebrow">
            Entrepreneurship Cell NIET
          </span>

          <motion.h1 className={styles.heroTitle}>
            {words.map((word, index) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.35,
                  ease: "easeOut",
                }}
              >
                {word === "Founders." ? (
                  <span className={styles.heroTitleAccent}>
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.div>
            ))}
          </motion.h1>

          <motion.p
            className={styles.heroLede}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.6,
            }}
          >
            E-Cell is where student builders get the mentorship,
            capital access, and stage time to turn a weekend idea
            into a company with customers.
          </motion.p>

          <motion.div
            className={styles.heroActions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.45,
              duration: 0.5,
            }}
          >
            <Link href="/contact" className="btn btn-primary">
              Join E-Cell
            </Link>

            <Link href="/events" className="btn btn-ghost">
              See what&rsquo;s next
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Stats */}
      <section className="section container">
        <StatStrip stats={stats} />
      </section>

      {/* Pillars */}
      <section className="section container">
        <div className="section-head">
          <span className="eyebrow">How we work</span>
          <h2 className={styles.sectionTitle}>Three stages, one runway.</h2>
        </div>

        <div className={styles.pillars}>
          {pillars.map((p, i) => (
            <div key={p.title} className={`card ${styles.pillar}`}>
              <span className={styles.pillarIndex}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarCopy}>{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured events */}
      <section className="section container">
        <div className={styles.sectionHeadRow}>
          <div>
            <span className="eyebrow">On the calendar</span>
            <h2 className={styles.sectionTitle}>Upcoming events</h2>
          </div>

          <Link href="/events" className="btn btn-ghost">
            View all
          </Link>
        </div>

        <div className={styles.eventGrid}>
          {featured.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`container ${styles.cta}`}>
        <div className={`card ignition-stripe ${styles.ctaBox}`}>
          <h2 className={styles.ctaTitle}>Got an idea worth building?</h2>
          <p className={styles.ctaCopy}>
            Membership is free. Ambition is the only prerequisite.
          </p>

          <Link href="/contact" className="btn btn-primary">
            Apply to E-Cell
          </Link>
        </div>
      </section>
    </>
  )
}