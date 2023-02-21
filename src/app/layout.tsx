'use client'

import './globals.css'
import Header from '@/components/Header'
import { RecoilRoot } from 'recoil'
import { authRequired } from '../util/config'
import ProtectedRoute from '@/util/ProtectedRoute'
import { usePathname } from 'next/navigation'
import { AuthContextProvider } from '@/context/AuthContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  return (
    <html lang="en">
      <head />
      <body>
        <AuthContextProvider>
          <RecoilRoot>
            <Header />
            {!authRequired.includes(pathName as string) ? children : <ProtectedRoute>{children}</ProtectedRoute>}
          </RecoilRoot>
        </AuthContextProvider>
      </body>
    </html>
  )
}
