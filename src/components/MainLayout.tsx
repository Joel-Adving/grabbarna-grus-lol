import FriendList from './FriendList'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex min-h-[93vh] gap-4 px-4 py-4 mx-auto sm:px-0">
      <div className="w-full">{children}</div>
      <div className="hidden md:block md:ml-auto">
        <FriendList />
      </div>
    </div>
  )
}
