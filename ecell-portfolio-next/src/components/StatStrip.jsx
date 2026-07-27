'use client'

import styles from './StatStrip.module.css'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function StatStrip({ stats }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })

  return (
    <dl ref={ref} className={styles.statStrip}>
      {stats.map((s) => (
        <div key={s.label} className={styles.item}>
          <dt className={styles.label}>{s.label}</dt>

          <dd className={styles.value}>
            {s.prefix}

            {inView && (
              <CountUp
                start={0}
                end={s.number}
                duration={2.2}
                decimals={s.decimals || 0}
              />
            )}

            {s.suffix}
          </dd>
        </div>
      ))}
    </dl>
  )
}