'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navRoutes } from '@/lib/nav-config'
import { useTheme } from './ThemeProvider'
import ThemeToggle from './ThemeToggle'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme } = useTheme() 

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
       <Link href="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
  <img src={theme === 'blackout' ? '/logo-dark.png' : '/logo.jpeg'}
            alt="E-Cell NIET"
            className={styles.logo} />
</Link>

        <nav className={`${styles.nav} ${styles.navDesktop}`} aria-label="Primary">
          {navRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`${styles.navLink} ${pathname === route.path ? styles.navLinkActive : ''}`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle className={styles.themeToggle} />
          <Link href="/contact" className={`btn btn-primary ${styles.cta}`}>
            Join E-Cell
          </Link>
          <button
            className={styles.burger}
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={menuOpen ? styles.burgerLineOpen : styles.burgerLine}></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={`${styles.nav} ${styles.navMobile}`} aria-label="Primary mobile">
          {navRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
