'use client'

import FriendList from '@/components/FriendList'

export default function GrabbLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex min-h-screen gap-4 mx-auto">
      {children}
      <div className="hidden mt-6 md:block md:ml-auto">
        <FriendList />
      </div>
    </div>
  )
}
