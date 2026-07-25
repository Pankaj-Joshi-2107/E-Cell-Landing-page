'use client'

import { forwardRef, useRef, useImperativeHandle } from 'react'
import styles from './PodiumCard.module.css'

// Exposes { cardEl, blockEl, valuationEl } to the parent (PortfolioView) via
// ref — same purpose as the Vue version's defineExpose({ cardEl, blockEl,
// valuationEl }). The parent orchestrates timing across all three slots.
const PodiumCard = forwardRef(function PodiumCard({ startup }, ref) {
  const cardRef = useRef(null)
  const blockRef = useRef(null)
  const valuationRef = useRef(null)

  useImperativeHandle(ref, () => ({
    cardEl: cardRef.current,
    blockEl: blockRef.current,
    valuationEl: valuationRef.current
  }))

  const rankClass = {
    1: styles.rank1,
    2: styles.rank2,
    3: styles.rank3
  }[startup.rank]

  return (
    <div className={`${styles.slot} ${rankClass}`}>
      <div ref={cardRef} className={`card ${styles.panel}`}>
        <span className={styles.badge}>{startup.rank}</span>
        <h3 className={styles.name}>{startup.name}</h3>
        <p className={styles.tagline}>{startup.tagline}</p>
      </div>
      <div ref={blockRef} className={styles.block}>
        <span ref={valuationRef} className={styles.valuation}>
          {startup.stat}
        </span>
      </div>
    </div>
  )
})

export default PodiumCard
