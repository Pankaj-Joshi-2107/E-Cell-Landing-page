# E-Cell Portfolio (Next.js)

Migrated from the original Vue 3 + Vite app to Next.js (App Router) —
**all functionality preserved**: both themes (Daylight/Blackout, Blackout
default), the ignition-stripe motif, all six pages, the Events filter tabs,
the Contact form, the Portfolio page's podium entrance animation + stopwatch
count-up + scroll-triggered reveals, the scrollspy side map, and the custom
cursor system.

## Run it

```bash
npm install
npm run dev       # http://localhost:3000
npm run build      # static export -> out/
npm run start       # only relevant if you remove `output: 'export'` from next.config.mjs
```

`next.config.mjs` sets `output: 'export'`, so `npm run build` produces a
plain static `out/` folder — deployable anywhere (Netlify, GitHub Pages, any
static host), matching how the original Vite build worked. Delete that line
if you'd rather deploy to Vercel with full SSR/server-feature support.

## What changed, and why

| Vue concept | Next.js equivalent | Notes |
|---|---|---|
| Vue Router (`router/index.js`) | File-based routing (`app/*/page.jsx`) | Nav labels/order now live in `src/lib/nav-config.js` — routing itself is by file location, which is how Next works |
| `<router-link>` / `router-link-exact-active` | `next/link` + `usePathname()` | Same active-link highlighting behavior |
| Composable `useTheme.js` (module-level `ref`) | `ThemeProvider.jsx` (React Context) | Vue's reactivity lets any component share one `ref` automatically; React needs an explicit Context to get the same "one shared value, everyone re-renders" behavior |
| `<style scoped>` in each `.vue` file | CSS Modules (`Component.module.css`) | Same style encapsulation — no `.vue` scoped-attribute mechanism in React, so each component gets its own module file instead |
| `defineExpose({ cardEl, blockEl, ... })` | `forwardRef` + `useImperativeHandle` | Used in `PodiumCard` and `StartupCard` so the Portfolio page can still directly animate their internal DOM nodes with anime.js |
| `onMounted` / `onBeforeUnmount` | `useEffect` (+ cleanup return) | Same lifecycle timing for the anime.js entrance/scroll animations |
| Google Fonts `<link>` in `index.html` | `next/font/google` in `app/layout.jsx` | Next's self-hosted, non-render-blocking font loading — same three fonts, same CSS variables |
| Inline theme-flash-prevention script in `index.html` | Inline script in `app/layout.jsx`'s `<head>`, `suppressHydrationWarning` on `<html>` | Same purpose: set `data-theme` before paint so there's no flash |

Nothing about what the site *does* changed — same pages, same content, same
animations, same theme behavior, same custom-cursor mechanism. This is a
structural/technical migration only.

## Project structure

```
app/
  layout.jsx              # fonts, theme init script, ThemeProvider, Header/Footer
  globals.css              # merged tokens.css + base.css — same design tokens as before
  page.jsx                 # Home
  about/page.jsx
  portfolio/page.jsx        # podium animation + scroll reveal + count-up + scrollspy map
  events/page.jsx           # 'use client' — has the filter tabs
  team/page.jsx
  contact/page.jsx          # 'use client' — has the form
  not-found.jsx              # Next's built-in 404 mechanism
src/
  components/                # Header, Footer, ThemeToggle, PodiumCard, StartupCard, PortfolioMap...
  data/                        # events.js, team.js, startups.js — unchanged from the Vue version
  lib/
    nav-config.js               # single source of truth for header/footer nav
    useCountUp.js                 # unchanged — was already framework-agnostic
public/
  cursors/                        # drop your own custom cursor image here (see its README)
```

## Adding a new page

1. Create `app/your-page/page.jsx`.
2. Add one entry to `src/lib/nav-config.js`:

```js
{ path: '/blog', label: 'Blog', order: 7 }
```

That's it — the header (desktop + mobile) and footer nav both render from
that list automatically, same ergonomics as before.

## Component/data files carried over unchanged

`src/data/events.js`, `src/data/team.js`, `src/data/startups.js`, and
`src/lib/useCountUp.js` are byte-for-byte the same logic as the Vue
version — they never touched Vue-specific APIs, so there was nothing to
convert.
