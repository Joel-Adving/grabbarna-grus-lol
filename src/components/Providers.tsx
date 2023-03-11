'use client'

import { SWRConfig } from 'swr'
import { swrConfig } from '@/config'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SWRConfig value={swrConfig}>{children}</SWRConfig>
    </SessionProvider>
  )
}
