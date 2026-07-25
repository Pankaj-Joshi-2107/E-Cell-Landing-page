import TeamCard from '@/components/TeamCard'
import { team } from '@/data/team'
import styles from './team.module.css'

export default function TeamPage() {
  return (
    <>
      <section className={`section container ${styles.hero}`}>
        <span className="eyebrow">The people</span>
        <h1 className={styles.heroTitle}>Team</h1>
        <p className={styles.heroLede}>
          A student-run board that treats E-Cell like the startup it actually is.
        </p>
      </section>

      <section className="section container">
        <div className={styles.teamGrid}>
          {team.map((m) => (
            <TeamCard key={m.id} member={m} />
          ))}
        </div>
      </section>
    </>
  )
}
