import MainLayout from '@/components/MainLayout'
import { PropsWithChildren } from 'react'

export default function MatchLayout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>
}
