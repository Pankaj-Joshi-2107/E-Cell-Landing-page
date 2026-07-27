import Link from 'next/link'
import { navRoutes } from '@/lib/nav-config'
import styles from './Footer.module.css'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'X', href: 'https://x.com' }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <span className={styles.word}>E-CELL</span>
          <p className={styles.tag}>Built by students who&rsquo;d rather ship than wait for permission.</p>
        </div>

        <div className={styles.col}>
          <span className="eyebrow">Explore</span>
          {navRoutes.map((r) => (
            <Link key={r.path} href={r.path} className={styles.link}>
              {r.label}
            </Link>
          ))}
        </div>

        <div className={styles.col}>
          <span className="eyebrow">Elsewhere</span>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={styles.link}>
              {s.label}
            </a>
          ))}
        </div>

        <div className={styles.col}>
          <span className="eyebrow">Reach us</span>
          <a href="mailto:hello@ecell.club" className={styles.link}>
            hello@ecell.club
          </a>
          <span className={`${styles.link} ${styles.linkMuted}`}>Innovation Block, Campus</span>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>&copy; {year} E-Cell. All rights reserved.</span>
    
      </div>
    </footer>
  )
}
