'use client'

import { forwardRef, useRef, useImperativeHandle } from 'react'
import styles from './StartupCard.module.css'

// Exposes { rootEl, statEl } to the parent — rootEl for the fade/slide-in
// animation, statEl for the count-up. Equivalent to the Vue version's
// defineExpose({ statEl }) plus its automatically-available $el.
const StartupCard = forwardRef(function StartupCard({ startup }, ref) {
  const rootRef = useRef(null)
  const statRef = useRef(null)

  useImperativeHandle(ref, () => ({
    rootEl: rootRef.current,
    statEl: statRef.current
  }))

  return (
    <article ref={rootRef} className={`card ${styles.startupCard}`}>
      <div className={styles.top}>
        <span className={styles.category}>{startup.category}</span>
      </div>
      <h3 className={styles.name}>{startup.name}</h3>
      <p className={styles.tagline}>{startup.tagline}</p>
      <div className={styles.foot}>
        <span ref={statRef} className={styles.stat}>
          {startup.stat}
        </span>
      </div>
    </article>
  )
})

export default StartupCard
