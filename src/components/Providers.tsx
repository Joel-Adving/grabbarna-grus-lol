'use client'

import { SWRConfig } from 'swr'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={{ dedupingInterval: 600000, provider: () => new Map() }}>{children}</SWRConfig>
}
