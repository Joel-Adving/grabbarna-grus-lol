'use client'

import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { auth } from '../firebase/config'
import { User } from '../util/types'

export const AuthContext = createContext({})

export const AuthContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPending, setisPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          // @ts-ignore
          photoURL: getAuth().currentUser.photoURL,
          // @ts-ignore
          name: getAuth().currentUser.displayName
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signin = async () => {
    try {
      const google_provider = new GoogleAuthProvider()
      setisPending(true)
      setError(null)
      await signInWithPopup(auth, google_provider)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setisPending(false)
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      await signOut(auth)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signin, logout, error, isPending }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
