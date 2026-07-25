import Link from 'next/link'
import StatStrip from '@/components/StatStrip'
import EventCard from '@/components/EventCard'
import { events } from '@/data/events'
import styles from './page.module.css'

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

  return (
    <>
      {/* Hero */}
      <section className={`ignition-stripe ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>
          <span className="eyebrow">Entrepreneurship Cell</span>
          <h1 className={styles.heroTitle}>
            Ideas don&rsquo;t need
            <br />
            permission. <span className={styles.heroTitleAccent}>They need ignition.</span>
          </h1>
          <p className={styles.heroLede}>
            E-Cell is where student builders get the mentorship, capital access, and stage time
            to turn a weekend idea into a company with customers.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className="btn btn-primary">
              Join E-Cell
            </Link>
            <Link href="/events" className="btn btn-ghost">
              See what&rsquo;s next
            </Link>
          </div>
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
              <span className={styles.pillarIndex}>{String(i + 1).padStart(2, '0')}</span>
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
          <p className={styles.ctaCopy}>Membership is free. Ambition is the only prerequisite.</p>
          <Link href="/contact" className="btn btn-primary">
            Apply to E-Cell
          </Link>
        </div>
      </section>
    </>
  )
}
