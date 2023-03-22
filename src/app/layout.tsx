import './globals.css'
import Header from '@/components/Header/Header'
import Providers from '@/components/Providers'
import type { Metadata } from 'next'
import localFont from '@next/font/local'

const BeaufortBold = localFont({
  src: '../../public/fonts/BeaufortBold.woff2',
  variable: '--font-BeaufortBold',
  preload: true,
  fallback: ['Times New Roman', 'Times', 'serif']
})

const FrizQuadrata = localFont({
  src: '../../public/fonts/Friz-Quadrata-Regular.woff2',
  variable: '--font-FrizQuadrata',
  preload: true,
  fallback: ['Times New Roman', 'Times', 'serif']
})

const name = 'Grabbarna Grus'
const url = 'https://grabbarnagrus.lol/'
const preview = url + 'preview.png'
const description =
  'Grabbarna Grus is community of League of Legends players. Leader board with all the players current ranks. View each others match histories. See information about each individual match.'

export const metadata: Metadata = {
  title: name,
  viewport: 'width=device-width, initial-scale=1.0',
  description,
  colorScheme: 'dark',
  creator: name,
  authors: { name },
  icons: [
    { rel: 'alternate icon', type: 'image/png', href: '/favicon.png', url: '/favicon.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', url: '/favicon.svg' }
  ],
  themeColor: '#010a13',
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    url,
    title: name,
    description,
    images: [{ url: preview }]
  },
  twitter: {
    card: 'summary_large_image',
    title: name,
    description,
    images: [{ url: preview }],
    site: url
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${BeaufortBold.variable} ${FrizQuadrata.variable}`}>
      <head />
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
