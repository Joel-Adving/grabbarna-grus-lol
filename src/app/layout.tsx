'use client'

import './globals.css'
import Header from '@/components/Header'
import { authRequired } from '../utils/config'
import ProtectedRoute from '@/utils/ProtectedRoute'
import { usePathname } from 'next/navigation'
import { AuthContextProvider } from '@/context/AuthContext'
import { SWRConfig } from 'swr'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  return (
    <html lang="en">
      <head />
      <body>
        <AuthContextProvider>
          <SWRConfig>
            <Header />
            {!authRequired.includes(pathName as string) ? children : <ProtectedRoute>{children}</ProtectedRoute>}
          </SWRConfig>
        </AuthContextProvider>
      </body>
    </html>
  )
}
