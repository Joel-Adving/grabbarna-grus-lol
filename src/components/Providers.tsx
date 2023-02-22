'use client'

import { AuthContextProvider } from '@/context/AuthContext'
import { SWRConfig } from 'swr'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SWRConfig>
  )
}
