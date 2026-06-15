import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'
import LenisProvider from '@/components/LenisProvider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BOHÈME — Live slowly. Live well.',
  description: 'Premium wellness rituals for the intentional life. Natural ingredients, ceremonial formulas, slow beauty.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <Cursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
