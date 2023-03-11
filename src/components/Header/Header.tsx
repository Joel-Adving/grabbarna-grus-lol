'use client'

import { useUser } from '@/hooks/useUser'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'

export default function Header() {
  const user = useUser()

  return (
    <header className={styles.header}>
      <nav className="container flex justify-between w-full min-h-[4rem] px-3 py-4 mx-auto sm:px-0">
        <div className="flex items-center">
          <div className="flex space-x-8">
            <Link href="/">HOME</Link>
            {user && <Link href="playlist">PLAYLIST</Link>}
          </div>
        </div>
        {!user && <button onClick={() => signIn()}>SIGN IN</button>}
        {user && (
          <div className="flex items-center ">
            <button onClick={() => signOut()}>SIGN OUT</button>
            <div className="w-8 h-8 ml-3 sm:mx-3 border-[2.5px] rounded-full border-victory">
              <Image className="rounded-full" src={user?.image as string} alt="User profile image" height={32} width={32} />
            </div>
            <h3 className="hidden sm:block text-text-highlight">{user?.name?.toUpperCase()}</h3>
          </div>
        )}
      </nav>
    </header>
  )
}
