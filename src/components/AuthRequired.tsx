import React, { useEffect } from 'react'
// import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'

const AuthRequired: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // @ts-ignore
  //   const { user } = useAuth()
  //   const router = useRouter()

  //   useEffect(() => {
  //     if (!user) router.push('/')
  //   }, [user, router])

  //   return <div>{user && children}</div>

  return <div>{children}</div>
}

export default AuthRequired
