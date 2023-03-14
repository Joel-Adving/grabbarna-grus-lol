'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import styles from './styles.module.css'

export type NavLinkProps = {
  children?: React.ReactNode
  href: string
  targetSegment?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export default function NavLink({ children, href, targetSegment, className = '', style, onClick = () => {} }: NavLinkProps) {
  const activeSegment = useSelectedLayoutSegment()

  return (
    <Link
      onClick={onClick}
      style={style}
      className={`
        ${targetSegment ? styles.navlinkUnderline : styles.navlink}
        ${targetSegment && activeSegment === targetSegment ? styles.active : ''}
        ${className}
      `}
      href={href}
    >
      {children}
    </Link>
  )
}
