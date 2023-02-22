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
        <AuthContextProvider>
          <SWRConfig>
            {/* <Header /> */}
            {children}
          </SWRConfig>
        </AuthContextProvider>
      </body>
    </html>
  )
}
