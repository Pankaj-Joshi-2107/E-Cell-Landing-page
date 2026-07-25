import styles from './EventCard.module.css'

export default function EventCard({ event }) {
  return (
    <article className={`card ${styles.eventCard}`}>
      <div className={styles.top}>
        <span className={styles.tag}>{event.tag}</span>
        <span className={styles.date}>{event.date}</span>
      </div>
      <h3 className={styles.title}>{event.title}</h3>
      <p className={styles.blurb}>{event.blurb}</p>
      <div className={styles.foot}>
        <span className={`${styles.status} ${event.status === 'upcoming' ? styles.statusUpcoming : styles.statusPast}`}>
          {event.status === 'upcoming' ? 'Registrations open' : 'Wrapped'}
        </span>
      </div>
    </article>
  )
}
