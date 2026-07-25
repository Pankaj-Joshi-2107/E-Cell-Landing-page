/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export, matching the original Vite build: `next build` produces
  // a fully static `out/` folder you can deploy anywhere (Netlify, GitHub
  // Pages, any static host) — no Node server required.
  // If you'd rather use Vercel's full feature set (ISR, server actions,
  // image optimization, etc.) later, just delete this line.
  output: 'export',

  images: {
    unoptimized: true // required alongside output: 'export' — we only use plain <img>/SVG anyway
  }
}

export default nextConfig
