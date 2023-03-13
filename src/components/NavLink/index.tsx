'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import styles from './styles.module.css'

export type NavLinkProps = {
  label: string
  href: string
  targetSegment: string
  className?: string
}

export default function NavLink({ label, href, targetSegment, className = '' }: NavLinkProps) {
  const activeSegment = useSelectedLayoutSegment()
  return (
    <Link className={`${styles.navlink} ${activeSegment === targetSegment ? styles.active : ''} ${className}`} href={href}>
      {label}
    </Link>
  )
}
