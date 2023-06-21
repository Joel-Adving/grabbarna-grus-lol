import { User } from '@/types'
import { useSession } from 'next-auth/react'

export function useUser() {
  const { data: session } = useSession()
  if (!session) return null
  return session?.user as User
}
