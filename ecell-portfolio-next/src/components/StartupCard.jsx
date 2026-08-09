'use client'

import Image from "next/image"
import { forwardRef, useRef, useImperativeHandle } from 'react'
import styles from './StartupCard.module.css'

// Exposes { rootEl, statEl } to the parent — rootEl for the fade/slide-in
// animation, statEl for the count-up.
const StartupCard = forwardRef(function StartupCard({ startup }, ref) {
  const rootRef = useRef(null)
  const statRef = useRef(null)

  useImperativeHandle(ref, () => ({
    rootEl: rootRef.current,
    statEl: statRef.current
  }))

return (
  <article ref={rootRef} className={`card ${styles.startupCard}`}>
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src={startup.logo}
          alt={`${startup.name} logo`}
          width={80}
          height={80}
          className={styles.logo}
        />
      </div>

      <h3 className={styles.name}>{startup.name}</h3>
    </div>

    <p className={styles.tagline}>{startup.tagline}</p>

<div className={styles.foot}>
  <span ref={statRef} className={styles.stat}>
    {startup.stat}
  </span>

  <a
    href={startup.website}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.visitLink}
  >
    Visit ↗
  </a>
</div>
  </article>
)
})
export default StartupCard