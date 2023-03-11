'use client'

import { SWRConfig } from 'swr'

const swrConf = {
  dedupingInterval: 3600000, // one hour
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  provider: () => new Map()
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={swrConf}>{children}</SWRConfig>
}
