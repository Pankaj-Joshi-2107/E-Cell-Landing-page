import styles from './StatStrip.module.css'

export default function StatStrip({ stats }) {
  return (
    <dl className={styles.statStrip}>
      {stats.map((s) => (
        <div key={s.label} className={styles.item}>
          <dt className={styles.label}>{s.label}</dt>
          <dd className={styles.value}>{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}
