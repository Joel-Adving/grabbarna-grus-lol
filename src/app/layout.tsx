import './globals.css'
import Header from '@/components/Header/Header'
import Providers from '@/components/Providers'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import { PropsWithChildren } from 'react'

const name = 'Grabbarna Grus'
const url = 'https://grabbarnagrus.oki.gg/'
const preview = url + 'preview.png'
const description =
  'Grabbarna Grus is community of League of Legends players. Leader board with all the players current ranks. View each others match histories. See information about each individual match.'

export const viewport = {
  colorScheme: 'dark',
  viewport: 'width=device-width, initial-scale=1.0',
  themeColor: '#010a13'
}

export const metadata: Metadata = {
  title: name,
  description,
  creator: name,
  authors: { name },
  icons: [
    { rel: 'alternate icon', type: 'image/png', href: '/favicon.png', url: '/favicon.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', url: '/favicon.svg' }
  ],
  manifest: '/site.webmanifest'
}

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

export default function RootLayout({ children }: PropsWithChildren) {
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
