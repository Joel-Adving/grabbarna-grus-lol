'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GrusGrabb({ params }: any) {
  const router = useRouter()

  useEffect(() => {
    router.push(`/grabb/${params.name}/matches`)
  }, [])

  return <></>
}
