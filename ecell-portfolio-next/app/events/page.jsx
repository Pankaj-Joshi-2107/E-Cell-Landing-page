'use client'

import { useMemo, useState } from 'react'
import EventCard from '@/components/EventCard'
import { events } from '@/data/events'
import styles from './events.module.css'

export default function EventsPage() {
  const [filter, setFilter] = useState('upcoming')
  const filtered = useMemo(() => events.filter((e) => e.status === filter), [filter])

  return (
    <>
      <section className={`section container ${styles.hero}`}>
        <span className="eyebrow">Calendar</span>
        <h1 className={styles.heroTitle}>Events</h1>
        <p className={styles.heroLede}>
          Summits, sprints, and the occasional dinner where the real deals get made.
        </p>

        <div className={styles.filterTabs} role="tablist">
          <button
            role="tab"
            type="button"
            className={`${styles.filterBtn} ${filter === 'upcoming' ? styles.filterBtnActive : ''}`}
            aria-selected={filter === 'upcoming'}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            role="tab"
            type="button"
            className={`${styles.filterBtn} ${filter === 'past' ? styles.filterBtnActive : ''}`}
            aria-selected={filter === 'past'}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
        </div>
      </section>

      <section className="section container">
        {filtered.length ? (
          <div className={styles.eventGrid}>
            {filtered.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Nothing here yet — check back soon.</p>
        )}
      </section>
    </>
  )
}
