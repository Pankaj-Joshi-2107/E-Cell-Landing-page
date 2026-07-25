import styles from './TeamCard.module.css'

export default function TeamCard({ member }) {
  return (
    <article className={`card ${styles.teamCard}`}>
      <span className={styles.index}>{member.id}</span>
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.role}>{member.role}</p>
      <p className={styles.focus}>{member.focus}</p>
    </article>
  )
}
