import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <section className={`section container ${styles.notFound}`}>
      <span className="eyebrow">404</span>
      <h1 className={styles.title}>This page hasn&rsquo;t been founded yet.</h1>
      <p className={styles.lede}>Check the address, or head back and try again.</p>
      <Link href="/" className="btn btn-primary">
        Back to home
      </Link>
    </section>
  )
}
