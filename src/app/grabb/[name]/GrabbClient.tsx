'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GrabbClient() {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    router.push(`/grabb/${params?.name}/matches`)
  }, [params?.name, router])

  return null
}
