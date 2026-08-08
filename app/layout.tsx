// import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Oswald, Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils"


const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'), // TODO: replace with your real production domain
  title: 'True Sports — NBA, NFL, MLB & Soccer News, Scores & Highlights',
  description:
    'Breaking sports news, live scores, and the hottest takes across the NBA, NFL, MLB, and world soccer. Your front-row seat to the game.',
  generator: 'v0.app',
  openGraph: {
    title: 'True Sports — NBA, NFL, MLB & Soccer News, Scores & Highlights',
    description:
      'Breaking sports news, live scores, and the hottest takes across the NBA, NFL, MLB, and world soccer. Your front-row seat to the game.',
    url: 'https://yourdomain.com', // TODO: replace with your real production domain
    siteName: 'True Sports',
    images: [
      {
        url: '/images/meta-logo-1.png',
        width: 1200,
        height: 630,
        alt: 'True Sports',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'True Sports — NBA, NFL, MLB & Soccer News, Scores & Highlights',
    description:
      'Breaking sports news, live scores, and the hottest takes across the NBA, NFL, MLB, and world soccer. Your front-row seat to the game.',
    images: ['/images/meta-logo-1.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0c0d10',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("dark", "bg-background", oswald.variable, inter.variable, "font-sans", geist.variable)}>
      <body className="antialiased font-sans">
     
        {children}
        {/* {process.env.NODE_ENV === 'production' && <Analytics />} */}
      </body>
    </html>
  )
}