'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'ecell-theme'
const THEMES = ['daylight', 'blackout']
const DEFAULT_THEME = 'blackout'

const ThemeContext = createContext(null)

/**
 * Wraps the app once in layout.jsx. Mirrors what the Vue version's
 * module-level `ref` did — one shared theme value every component reads
 * from and can update — but implemented as React context, since React
 * (unlike Vue's reactivity system) needs an explicit subscription
 * mechanism for a value shared across components to trigger re-renders.
 */
export function ThemeProvider({ children }) {
  // On first render, read whatever the pre-hydration inline script (in
  // layout.jsx) already set on <html data-theme="...">, so this matches
  // what's on screen instead of causing a flash/mismatch.
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return DEFAULT_THEME
    const current = document.documentElement.getAttribute('data-theme')
    return THEMES.includes(current) ? current : DEFAULT_THEME
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch (e) {
      // localStorage unavailable — theme still works for this session
    }
  }, [theme])

  function toggleTheme() {
    setTheme((t) => (t === 'daylight' ? 'blackout' : 'daylight'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
