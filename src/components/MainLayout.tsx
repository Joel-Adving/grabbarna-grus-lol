import FriendList from './FriendList'
import { twMerge } from 'tailwind-merge'

export default function MainLayout({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('container flex min-h-[93vh] gap-4 px-4 py-4 mx-auto sm:px-0', className)}>
      <div className="w-full">{children}</div>
      <div className="hidden md:block md:ml-auto">
        {/* @ts-expect-error Server Component */}
        <FriendList />
      </div>
    </div>
  )
}
