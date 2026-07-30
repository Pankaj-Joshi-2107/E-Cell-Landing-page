/**
 * TO ADD A NEW PAGE:
 * 1. Create app/your-page/page.jsx (Next.js routes by file location).
 * 2. Add one entry below with the matching path. That's the only other
 *    change needed — the header nav (desktop + mobile) and the footer's
 *    "Explore" list both render from this list automatically.
 */
export const navRoutes = [
  { path: '/', label: 'Home', order: 1 },
  { path: '/about', label: 'About', order: 2 },
  { path: '/portfolio', label: 'Portfolio', order: 3 },
  { path: '/events', label: 'Events', order: 4 },
  { label: 'Gallery', path: '/gallery', order: 5 },
  { path: '/contact', label: 'Contact', order: 6 }
].sort((a, b) => a.order - b.order)
