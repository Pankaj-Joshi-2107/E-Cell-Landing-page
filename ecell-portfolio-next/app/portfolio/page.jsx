'use client'

import { useEffect, useRef } from 'react'
import { animate, onScroll } from 'animejs'
import PodiumCard from '@/components/PodiumCard'
import StartupCard from '@/components/StartupCard'
import PortfolioMap from '@/components/PortfolioMap'
import { podium, startups } from '@/data/startups'
import { animateCountUp } from '@/lib/useCountUp'
import styles from './portfolio.module.css'

// Section ids + titles for the side map — order here is the scroll order.
const mapItems = [
  { id: 'portfolio-overview', label: 'Overview' },
  { id: 'portfolio-podium', label: 'Podium' },
  { id: 'portfolio-grid', label: 'Portfolio' }
]

export default function PortfolioPage() {
  // Arrays of the imperative handles exposed by each PodiumCard/StartupCard
  // (see their forwardRef/useImperativeHandle setup) — the React equivalent
  // of the Vue version's podiumRefs/startupCardRefs template-ref arrays.
  const podiumRefs = useRef([])
  const startupRefs = useRef([])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const scrollObservers = []

    animatePodiumEntrance()
    animateStartupGridOnScroll(scrollObservers)

    // ScrollObservers attach their own listeners — clean them up on unmount
    // so they don't leak or fire against a component that's no longer mounted.
    return () => {
      scrollObservers.forEach((o) => o.revert?.())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Podium entrance: blocks rise lowest-rank-first (3rd, then 2nd, then 1st)
  // for a building sense of reveal. Each slot's card panel floats up shortly
  // after its own block, and its valuation counts up like a stopwatch.
  function animatePodiumEntrance() {
    podium.forEach((s, i) => {
      const slot = podiumRefs.current[i]
      if (!slot) return

      const riseDelay = (3 - s.rank) * 150

      animate(slot.blockEl, {
        scaleY: [0, 1],
        duration: 550,
        delay: riseDelay,
        ease: 'outExpo'
      })

      animate(slot.cardEl, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 500,
        delay: riseDelay + 300,
        ease: 'outQuad'
      })

      animateCountUp(slot.valuationEl, s.stat, {
        duration: 1100,
        delay: riseDelay + 200
      })
    })
  }

  // Scroll-triggered reveal for the grid below the podium. Each card gets
  // its own animation (paused via autoplay: false) plus its own onScroll()
  // observer that plays it — and starts its stat counting up — the moment
  // the card enters the viewport.
  function animateStartupGridOnScroll(scrollObservers) {
    startups.forEach((s, i) => {
      const comp = startupRefs.current[i]
      if (!comp) return

      const el = comp.rootEl
      const cardAnimation = animate(el, {
        opacity: [0, 1],
        translateY: [36, 0],
        duration: 600,
        ease: 'outExpo',
        autoplay: false
      })

      const observer = onScroll({
        target: el,
        enter: 'bottom-=60 top',
        onEnter: () => {
          cardAnimation.play()
          animateCountUp(comp.statEl, s.stat, { duration: 900, delay: 150 })
        }
      })

      scrollObservers.push(observer)
    })
  }

  return (
    <div className={styles.page}>
      <PortfolioMap items={mapItems} />

      <section id="portfolio-overview" className={`section container ${styles.hero}`}>
        <span className="eyebrow">Portfolio</span>
        <h1 className={styles.heroTitle}>Startups we&rsquo;ve backed</h1>
        <p className={styles.heroLede}>
          From first pitch to first customer — these are the teams E-Cell has
          funded, mentored, and put on stage.
        </p>
      </section>

      <section id="portfolio-podium" className={`section container ${styles.podiumSection}`}>
        <div className={styles.podium}>
          {podium.map((s, i) => (
            <PodiumCard key={s.id} ref={(el) => (podiumRefs.current[i] = el)} startup={s} />
          ))}
        </div>
      </section>

      <section id="portfolio-grid" className="section container">
        <div className="section-head">
          <span className="eyebrow">The rest of the portfolio</span>
          <h2 className={styles.sectionTitle}>More teams building right now</h2>
        </div>
        <div className={styles.startupGrid}>
          {startups.map((s, i) => (
            <StartupCard key={s.id} ref={(el) => (startupRefs.current[i] = el)} startup={s} />
          ))}
        </div>
      </section>
    </div>
  )
}
