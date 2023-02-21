'use client'

import './globals.css'
import Header from '@/components/Header'
import { AuthContextProvider } from '@/context/AuthContext'
import { SWRConfig } from 'swr'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <SWRConfig>
          <AuthContextProvider>
            <>
              <Header />
              {children}
            </>
          </AuthContextProvider>
        </SWRConfig>
      </body>
    </html>
  )
}
