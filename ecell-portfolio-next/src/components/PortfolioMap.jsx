'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './PortfolioMap.module.css'

export default function PortfolioMap({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null)
  const observerRef = useRef(null)

  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter(Boolean)

    // Flags a section "active" once it crosses the vertical center band of
    // the viewport — the standard scrollspy technique.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    targets.forEach((el) => observerRef.current.observe(el))

    return () => observerRef.current?.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav className={styles.map} aria-label="Portfolio sections">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`${styles.link} cursor-dot ${activeId === item.id ? styles.linkActive : ''}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
