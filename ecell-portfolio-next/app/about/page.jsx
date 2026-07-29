import styles from './about.module.css'


const timeline = [
  { year: '2019', text: 'Founded by six students with a shared refusal to wait for graduation to start building.' },
  { year: '2021', text: 'First alumni fund closed — $250K committed to back campus-born startups.' },
  { year: '2023', text: 'Ignite Summit launches, becoming the region\u2019s largest student founder gathering.' },
  { year: '2026', text: '480+ founders trained, 62 startups launched, and counting.' }
]

export default function AboutPage() {
  return (
    <>
      <section className={`section container ${styles.hero}`}>

    

    <div className={styles.overlay}></div>

    <div className={styles.content}>
        <span className="eyebrow">About us</span>

        <h1 className={styles.heroTitle}>
            Empowering Students to Build the Future.
        </h1>

        <p className={styles.heroLede}>
            Entrepreneurship Cell, NIET is a student-led community dedicated to
            fostering innovation, creativity, and entrepreneurial thinking.
            We provide aspiring founders with the mentorship, resources, and
            opportunities needed to transform ideas into impactful ventures.
            Whether you're launching your first startup, exploring product
            development, or simply curious about entrepreneurship,
            E-Cell is where your journey begins.
        </p>
    </div>

</section>

      <section className="section container">
        <div className="section-head">
          <span className="eyebrow">Timeline</span>
          <h2 className={styles.heading}>How we got here</h2>
        </div>
        <ol className={styles.timeline}>
          {timeline.map((t) => (
            <li key={t.year} className={styles.timelineItem}>
              <span className={styles.timelineYear}>{t.year}</span>
              <span className={styles.timelineLine} aria-hidden="true"></span>
              <p className={styles.timelineText}>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section container">
        <div className={styles.values}>
          <div className={`card ${styles.value}`}>
            <h3>What we believe</h3>
            <p>Execution beats credentials. A working prototype outranks a perfect pitch deck every time.</p>
          </div>
          <div className={`card ${styles.value}`}>
            <h3>Who we&rsquo;re for</h3>
            <p>Anyone building something — first-time founders, second-time dropouts, and everyone testing an idea on the side.</p>
          </div>
        </div>
      </section>
    </>
  )
}
