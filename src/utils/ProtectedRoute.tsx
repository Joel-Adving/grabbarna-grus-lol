import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // @ts-ignore
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/')
  }, [user, router])

  return <div>{user && children}</div>
}

export default ProtectedRoute
