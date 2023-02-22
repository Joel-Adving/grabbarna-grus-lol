import FriendList from '@/components/FriendList'
import Link from 'next/link'

export default function GrabbLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link className="text-white text-7xl" href="/">
        Home
      </Link>
      <div className="container flex min-h-screen gap-4 mx-auto">
        {children}
        <div className="hidden mt-6 md:block md:ml-auto">
          <FriendList />
        </div>
      </div>
    </>
  )
}
