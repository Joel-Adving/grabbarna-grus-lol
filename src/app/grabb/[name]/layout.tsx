import FriendList from '@/components/FriendList'
import NavLink, { NavLinkProps } from '@/components/NavLink'

export default function GrabbLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { name } = params

  const links = [
    {
      label: 'STATS',
      href: `/grabb/${name}/stats`,

      targetSegment: 'stats'
    },
    {
      label: 'MATCH HISTORY',
      href: `/grabb/${name}/matches`,

      targetSegment: 'matches'
    },
    {
      label: 'RANKED',
      href: `/grabb/${name}/ranked`,

      targetSegment: 'ranked'
    }
  ] as NavLinkProps[]

  return (
    <div className="container flex min-h-screen gap-4 px-4 py-5 mx-auto sm:px-0">
      <div className="w-full">
        <div className="flex gap-8 text-text font-BeaufortBold">
          {links.map((link, i) => (
            <NavLink key={i} {...link} />
          ))}
        </div>

        {children}
      </div>
      <div className="hidden md:block md:ml-auto">
        <FriendList />
      </div>
    </div>
  )
}
