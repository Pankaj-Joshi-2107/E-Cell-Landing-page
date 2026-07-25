import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap'
})

export const metadata = {
  title: 'E-Cell',
  description: "E-Cell — the entrepreneurship cell building founders, one launch at a time.",
  icons: { icon: '/favicon.svg' }
}

// Runs before hydration to avoid a flash of the wrong theme — same purpose
// as the inline script that used to live in index.html. suppressHydrationWarning
// on <html> is required because this script can change data-theme (default
// "blackout") to "daylight" based on localStorage before React hydrates.
const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('ecell-theme');
    var theme = saved === 'daylight' ? 'daylight' : 'blackout';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'blackout');
  }
})();
`

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="blackout"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
